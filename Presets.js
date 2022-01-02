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

namespace Presets
{
	const presetHandler = Engine.createUserPresetHandler();
	
	presetHandler.setPostCallback(function()
	{
		Configuration.loadSampleMaps(Manifest.patches[Patches.getPatchIndex()].samplers);
	});
    
    // pnlPresetBrowser
    const pnlPresetBrowser = Content.getComponent("pnlPresetBrowser");
    
    pnlPresetBrowser.setPaintRoutine(function(g)
    {
	   var a = [0, 0, this.getWidth(), this.getHeight()] ;
	   
	   g.setColour(this.get("bgColour"));
	   
	   g.fillRoundedRectangle(a, 5);
    });
    
    pnlPresetBrowser.setTimerCallback(function()
    {
		if (isDefined(Patches.getPatchIndex))
		{
			pnlPresetBrowser.showControl(Patches.getPatchIndex() == -1);
			btnPresetBrowser.setValue(Patches.getPatchIndex() == -1);			
		}

		this.stopTimer();
    });
    
	pnlPresetBrowser.startTimer(500);

    // pnlPresetNotesBlocker
    const pnlPresetNotesBlocker = Content.getComponent("pnlPresetNotesBlocker");
    
    pnlPresetNotesBlocker.setPaintRoutine(function(g)
    {
		var labels = ["LIBRARY", "BANK", "CATEGORY", "PRESET"];

        g.fillAll(this.get("bgColour"));

        g.setColour(this.get("textColour"));
        g.setFont("bold", 16);
        
        for (i = 0; i < labels.length; i++)
        {
	        var w = this.getWidth() / labels.length;
	        g.drawAlignedText(labels[i], [w * i, 3, w, this.getHeight()], "centred");
        }
    });
    
    // fltPresetBrowser
    const fltPresetBrowser = Content.getComponent("fltPresetBrowser");
    
    // btnPresetBrowser
    const btnPresetBrowser = Content.getComponent("btnPresetBrowser");
    btnPresetBrowser.setControlCallback(onbtnPresetBrowserControl);
    
    inline function onbtnPresetBrowserControl(component, value)
    {
		if (Patches.getPatchIndex() != -1)
        	pnlPresetBrowser.showControl(value);
        else
        {
	        pnlPresetBrowser.showControl(true);
	        component.setValue(1);
        }
    }
        
    // btnPreset - previous/next preset buttons
    const btnPreset = [];

    for (i = 0; i < 2; i++)
    {
        btnPreset.push(Content.getComponent("btnPreset" + i));
        btnPreset[i].setControlCallback(onbtnPresetControl);
    }
    
    inline function onbtnPresetControl(component, value)
    {
		if (Patches.getPatchIndex() != -1)
		{
	        local index = btnPreset.indexOf(component);
	        
	        if (value)
	        {
	            if (index)
	                Engine.loadPreviousUserPreset(false);
	            else
	                Engine.loadNextUserPreset(false);
	        }
		}
    }
        
    // Functions    
    inline function showPresetBrowser()
    {
        pnlPresetBrowser.showControl(true);
        btnPresetBrowser.setValue(1);
    }
    
    inline function hidePresetBrowser()
    {
		pnlPresetBrowser.showControl(false);
		btnPresetBrowser.setValue(0);	    
    }
}
