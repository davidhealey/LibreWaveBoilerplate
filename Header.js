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

namespace Header
{    
    // pnlHeader
    const pnlHeader = Content.getComponent("pnlHeader");

    pnlHeader.setPaintRoutine(function(g)
    {
        // Header
        g.fillAll(this.get("bgColour"));

        // Preset display
        var a = [lblPreset.get("x"), lblPreset.get("y"), lblPreset.getWidth(), lblPreset.getHeight() + 2];
        g.setColour(this.get("itemColour"));
        g.fillRoundedRectangle(a, 5);
        
	    // Product title
	    var titleSize = Manifest.titleSize == undefined ? 28 : Manifest.titleSize;
	
	    g.setFont("title", titleSize);
	    g.setColour(this.get("textColour"));
	    g.drawAlignedText(Manifest.title, [15, 1, 400, this.getHeight()], "left");
    });

    // lblPreset
    const lblPreset = Content.getComponent("lblPreset");

    // Functions
    inline function updatePresetLabel(patchName)
    {
        local presetName = Engine.getCurrentUserPresetName();
        local text = patchName;

		if (text.toLowerCase() != "select a preset")
		{
	        if (isDefined(presetName) && presetName != "")
	        {
		        if (text != "")
		        {
					if (presetName.indexOf(text) == -1)
			        	text += " - " + presetName;
			        else
			        	text = presetName;
		        }
		        else
		        {
			        text = presetName;
		        }
	        }            
	
			if (text == "" && isDefined(Manifest.defaultPreset))
				text = Manifest.defaultPreset;
		}
        
        lblPreset.set("text", text);
    }
}
