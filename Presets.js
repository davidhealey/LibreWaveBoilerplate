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
        var a = [10, 7, this.getWidth() - 20, this.getHeight() - 14];
        
        g.setColour(this.get("itemColour"));
        g.fillRoundedRectangle(a, 5);
        
        g.setColour(0xff2a2625);
        g.fillRoundedRectangle([26, 100, 209, 370], 5);
        g.fillRoundedRectangle([241, 100, 209, 370], 5);
        g.fillRoundedRectangle([456, 100, 209, 370], 5);
        g.fillRoundedRectangle([671, 100, 203, 370], 5);
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
        g.fillAll(0xff524844);

        g.setColour(0xff8d8681);
        g.setFont("bold", 16);        
        g.drawAlignedText("LIBRARY", [15, 0, 209, this.getHeight() - 7], "centred");
        g.drawAlignedText("BANK", [230, 0, 209, this.getHeight() - 7], "centred");
        g.drawAlignedText("CATEGORY", [445, 0, 209, this.getHeight() - 7], "centred");
        g.drawAlignedText("PRESET", [660, 0, 203, this.getHeight() - 7], "centred");
        
        g.setColour(0xff2a2625);
        g.fillRoundedRectangle([15, 35, 209, 370], 5);
		g.fillRoundedRectangle([230, 35, 209, 370], 5);
		g.fillRoundedRectangle([445, 35, 209, 370], 5);
		g.fillRoundedRectangle([660, 35, 203, 370], 5);
		
		g.fillRoundedRectangle([26, 100, 209, 370], 5);
		g.fillRoundedRectangle([241, 100, 209, 370], 5);
		g.fillRoundedRectangle([456, 100, 209, 370], 5);
		g.fillRoundedRectangle([671, 100, 203, 370], 5);
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
