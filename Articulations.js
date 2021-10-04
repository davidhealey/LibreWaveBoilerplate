/*
    Copyright 2021 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Articulations 
{
	const articulationGain = Synth.getMidiProcessor("articulationGain");
	const ROW_HEIGHT = 38;
	const ROW_SPACE = 7;

	// vptArticulations
	const vptArticulations = Content.getComponent("vptArticulations");
	
	// pnlArticulationList
	const pnlArticulationList = Content.getComponent("pnlArticulationList");
	pnlArticulationList.setValue(0);
	pnlArticulationList.setControlCallback(onpnlArticulationListControl);
	
	inline function onpnlArticulationListControl(component, value)
	{
		changeArticulation(value);
	}
	
	pnlArticulationList.setPaintRoutine(function(g)
	{
        var arts = Patches.getCurrentPatch().articulations.active;
        var ks = Patches.getKeyswitches();

		g.fillAll(THEME.articulations.bgColour);
		g.setFont("mediumitalic", 16);

		for (i = 0; i < arts.length; i++)
		{
			var artIndex = arts[i];
			var art = Manifest.articulations[artIndex];

			var a = [0, i * (ROW_HEIGHT + ROW_SPACE), this.getWidth(), ROW_HEIGHT];
                
			this.getValue() == artIndex ? g.setColour(THEME.articulations.itemColour) : g.setColour(THEME.articulations.itemColour2);
			g.fillRoundedRectangle(a, 3);

			g.setColour(THEME.articulations.textColour);

			// Articulation name
			var text;
			art.label != undefined ? text = art.label : text = art.id;
			g.drawAlignedText(text, [a[0] + 10, a[1] - 0.5, a[2], a[3]], "left");
                
			// Keyswitch                
			if (ks != undefined && ks[i] != undefined)
				g.drawAlignedText(Engine.getMidiNoteName(ks[i]), [a[0], a[1] - 0.5, a[2] - 25, a[3]], "right");
		}
	});
	
	pnlArticulationList.setMouseCallback(function(event)
	{
		var arts = Patches.getCurrentPatch().articulations.active;
        var value = Math.floor(event.y / this.getHeight() * arts.length);
        
        if (event.clicked)
        {
            this.setValue(value);
            this.changed();
        }
	});
	
	// slpArticulationGain
	const slpArticulationGain = Content.getComponent("slpArticulationGain");
	slpArticulationGain.setControlCallback(onslpArticulationGainControl);
	
	inline function onslpArticulationGainControl(component, value)
	{
	    local index = pnlArticulationList.getValue();
	
	    if (index == value)
	        setArticulationGain(index);
	}
	
    // pnlArticulationGain
    const pnlArticulationGain = Content.getComponent("pnlArticulationGain");
	
	pnlArticulationGain.setPaintRoutine(function(g)
	{
        var arts = Patches.getCurrentPatch().articulations.active;
        
		for (i = 0; i < arts.length; i++)
		{
			var a = this.data.sliders[i];
			var value = slpArticulationGain.getSliderValueAt(i);
			var h = a[3] * value - 4 * value;
			var y = a[1] + a[3] - a[3] * value - 2 + 4 * value;

			g.setColour(THEME.articulations.gainSlider.bgColour);
			g.fillRoundedRectangle(a, 4);

			g.setColour(THEME.articulations.gainSlider.itemColour);
			g.fillRoundedRectangle([a[0] + 2, y, a[2] - 4, h], 3);
		}
	});
	
	pnlArticulationGain.setMouseCallback(function(event)
	{
        if (event.clicked)
        {
            this.data.index = parseInt(event.y / (ROW_HEIGHT + ROW_SPACE));
            this.data.downValue = slpArticulationGain.getSliderValueAt(this.data.index);
        }
        
        if (event.doubleClick)
        {
            slpArticulationGain.setSliderAtIndex(this.data.index, 1);
            this.repaint();
        }

        if (event.drag)
        {
            var a = this.data.sliders[this.data.index];

            // Calculate the distance using diagonal drag support
             var dragDistance = event.dragX + -1.0 * event.dragY;
        
            // Calculate the sensitivity value based on the value range
            var dragSensitivity = 40 / (this.get("max") - this.get("min"));

            var normalizedDistance = dragDistance / dragSensitivity;
        
            // Calculate the new value (limit it to the given range)
            var value = Math.range(this.data.downValue + normalizedDistance, this.get("min"), this.get("max"));
        
            if (value != this.getValue())
            {
                slpArticulationGain.setSliderAtIndex(this.data.index, value);
                this.repaint();
                
                if (pnlArticulationList.getValue() == this.data.index)
                    setArticulationGain(this.data.index);
            }
        }  
	});
	
	// btnSingleArticulation - admin only control for now
	const btnSingleArticulation = Content.getComponent("btnSingleArticulation");

	// Functions
	inline function init()
	{
		local arts = Patches.getCurrentPatch().articulations.active;
		
        local pHeight = arts.length * (ROW_HEIGHT + ROW_SPACE) - ROW_SPACE;
        local pWidth = vptArticulations.getWidth() - 10;
        
        if (pHeight > vptArticulations.getHeight())
            pWidth = pWidth - 10;

        pnlArticulationList.setPosition(0, 0, pWidth, pHeight);
        pnlArticulationGain.setPosition(pnlArticulationList.getWidth() - 20, 0, 20, pHeight);
        
        updateGainSliderAreas();
        pnlArticulationList.repaint();
        pnlArticulationGain.repaint();

        changeArticulation(0);			
	}
	
	inline function changeArticulation(index)
	{
		local art = Manifest.articulations[index];
		
		// Set muters state
		for (i = 0; i < Configuration.muters.length; i++)
		{
			local m = Configuration.muters[i];
			m.setAttribute(m.ignoreButton, art.samplers.indexOf(i) == -1);
		}

		setArticulationGain(index);

		// Set sampler voice amount
		if (btnSingleArticulation.getValue())
		{
			local samplerData = [];

			for (i = 0; i < Manifest.samplers.length; i++)
			{
				samplerData[i] = {"id": "Sampler" + i, "properties": {"VoiceAmount": 1, "VoiceLimit": 1}};
				
				if (art.samplers.indexOf(i) != -1)
				{
					if (!isDefined(Manifest.samplers[i].properties.VoiceAmount)) continue;				
			
					samplerData[i].properties.VoiceAmount = Manifest.samplers[i].properties.VoiceAmount;
					samplerData[i].properties.VoiceLimit = Manifest.samplers[i].properties.VoiceLimit;
				}
			}
			
			if (samplerData.length > 0)
				Configuration.setSamplerAttributes(samplerData);			
		}

		// Update envelope
		Envelope.setEnabled(art.ahdsr !== false);
		
		if (isDefined(art.ahdsr) && typeof art.ahdsr == "string")
			Envelope.setProcessorId(art.ahdsr);
		
		Envelope.restoreFromSliderPack(index);

		// Disable components that are not used by the articulation
		if (isDefined(art.disabledComponents))
			Configuration.enableAllComponents(art.disabledComponents);
		else
			Configuration.enableAllComponents([]);

        Configuration.setMidiProcessorAttributes(art.scripts);
        Configuration.setModulatorAttributes(art.modulators);
        Configuration.setEffectAttributes(art.effects);
		Configuration.setKeyColours(index);

		pnlArticulationList.setValue(index);
		pnlArticulationList.repaint();
	}
		
	inline function getCurrent()
	{
		return pnlArticulationList.getValue();
	}
	
	inline function setArticulationGain(index)
	{
	    local v = slpArticulationGain.getSliderValueAt(index);        
	    local gainValue = (((v - 0) * (0 - -25)) / (1 - 0)) + -25;
	
	    articulationGain.setAttribute(articulationGain.Gain, gainValue);
	}
	
    inline function updateGainSliderAreas()
    {
		local p = pnlArticulationGain;
        local h = ROW_HEIGHT - 8;
        local w = p.getWidth() / 2;
        
        p.data.sliders = [];

        for (i = 0; i < Manifest.articulations.length; i++)
        {
            local x = p.getWidth() / 2;
            local y = (i * (ROW_HEIGHT + ROW_SPACE)) + ROW_HEIGHT / 2 - h / 2;
            local a = [w / 2, y, w, h];
            p.data.sliders.push(a);
        }
    }
    
	inline function onNoteOnHandler(note)
	{
		local arts = Patches.getCurrentPatch().articulations.active;
		local keyswitches = Patches.getKeyswitches();
		local index = keyswitches.indexOf(note);

		if (index != -1 && index != pnlArticulationList.getValue())
			changeArticulation(arts[index]);
    }
    
    inline function onControllerHandler(ccValue)
    {
		local arts = Patches.getCurrentPatch().articulations.active;

		for (i in arts)
		{
			if (ccValue == Manifest.articulations[i].program)
			{
				if (i != pnlArticulationList.getValue())
					changeArticulation(i);

				break;
			}
		}
    }
}
