/*
    Copyright 2021, 2022 David Healey

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

namespace UserSettings
{
	// pnlSettings
	const pnlSettings = Content.getComponent("pnlSettings");

	pnlSettings.setPaintRoutine(function(g)
	{
	    var a = this.getLocalBounds(0);
	    
	    g.setColour(this.get("bgColour"));
	    g.fillRoundedRectangle(a, 5);
	    
	    g.setColour(this.get("itemColour"));
	    g.fillRoundedRectangle([a[0], a[1], a[2], 60], 5);
	    
	    g.setColour(this.get("bgColour"));
	    g.fillRoundedRectangle([a[0], a[1] + 50, a[2], a[3] - 50], 5);
	
	    g.setColour(this.get("textColour"));
	    g.setFont("bold", 26);
	    g.drawAlignedText("SETTINGS", [0, 0, this.getWidth(), 50], "centred");
	    
	    g.setColour(this.get("itemColour2"));
	    g.fillRoundedRectangle([a[0] + 20, a[1] + 120, a[2] - 40, a[3] - 140], 5);
	});  
		
	// btnSettings
	const btnSettings = Content.getComponent("btnSettings");
	btnSettings.setValue(pnlSettings.get("visible"));
	btnSettings.setLocalLookAndFeel(LookAndFeel.iconButton);
	btnSettings.setControlCallback(onbtnSettingsControl);
	
	inline function onbtnSettingsControl(component, value)
	{
		value ? show() : hide();
	}
		
    // pnlSettingsTab
    const pnlSettingsTab = [];
    
    for (i = 0; i < 2; i++)
    	pnlSettingsTab.push(Content.getComponent("pnlSettingsTab" + i));
    
    // pnlSettingsTab2 - Audio\Engine
	pnlSettingsTab[0].data.labels = ["Coarse Tune", "Fine Tune", "Transpose"];
	pnlSettingsTab[0].setPaintRoutine(function(g) {pnlSettingsTabPaintRoutine(g);});
	pnlSettingsTab[0].data.components = [Content.getComponent("knbCoarseTuning"), Content.getComponent("knbFineTuning"), Content.getComponent("knbTranspose")];
    
    pnlSettingsTab[0].setPaintRoutine(function(g)
    {
            g.setColour(this.get("textColour"));
            g.setFont("bold", 16);
    
            for (i = 0; i < this.data.labels.length; i++)
            {
                var labelHeight = 26;
                var height = this.data.components[i].getHeight();            
                var x = this.data.components[i].get("x") - 110;
                var y = this.data.components[i].get("y") - labelHeight / 2 + height / 2;
    
                g.drawAlignedText(this.data.labels[i], [x, y, 100, labelHeight], "right");
            }
    });
    
    // pnlSettingsTab1 - Midi
    pnlSettingsTab[1].setPaintRoutine(function(g)
    {
        g.setColour(this.get("bgColour"));
        g.drawLine(245, 245, 25, this.getHeight() - 25, 1);
        
        g.setFont("bold", 22);
        g.drawAlignedText("CHANNEL", [25, 15, 100, 25], "left");
        g.drawAlignedText("AUTOMATION", [285, 15, 200, 25], "left");
    
        if (!Engine.isPlugin())
            g.drawAlignedText("INPUT", [25, 220, 100, 25], "left");
    });
	
    // fltMidiSource
    const fltMidiSource = Content.getComponent("fltMidiSource");
    fltMidiSource.showControl(!Engine.isPlugin());
    
    // fltMidiChannel
    const fltMidiChannel = Content.getComponent("fltMidiChannel");    
    Engine.isPlugin() ? fltMidiChannel.set("height", 270) : fltMidiChannel.set("height", 160);
	
    // btnSettingsTab
    const btnSettingsTab = [];
    
    for (i = 0; i < pnlSettingsTab.length; i++)
    {
        btnSettingsTab.push(Content.getComponent("btnSettingsTab" + i));
        btnSettingsTab[i].setLocalLookAndFeel(LookAndFeel.textToggleButton);
        btnSettingsTab[i].setControlCallback(onbtnSettingsTabControl);
    }
        
    inline function onbtnSettingsTabControl(component, value)
    {
        local index = btnSettingsTab.indexOf(component);
        changeTab(index);
    }
    
    // Functions
    inline function show()
    {
		btnSettings.setValue(true);
	    pnlSettings.showControl(true);
	    Presets.hide();
    }
    
    inline function hide()
    {
		btnSettings.setValue(false);
	    pnlSettings.showControl(false);
    }
    
    inline function positionTabButtons()
    {
        local numButtons = btnSettingsTab.length;

        btnSettingsTab[0].showControl(!Engine.isPlugin());
                    
        local w = pnlSettings.getWidth() / numButtons;

        for (i = Engine.isPlugin(); i < numButtons; i++)
        {
            local x = (i - Engine.isPlugin()) * w + w / 2 - btnSettingsTab[i].getWidth() / 2;
            btnSettingsTab[i].set("x", x);
        }
    }
      
    inline function changeTab(index)
    {
        for (i = 0; i < btnSettingsTab.length; i++)
        {
            btnSettingsTab[i].setValue(i == index);
            pnlSettingsTab[i].showControl(i == index);
        }
    }
    
    // Function calls
    positionTabButtons();
    changeTab(0);
}
