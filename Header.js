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

namespace Header
{    
    // pnlHeader
    const pnlHeader = Content.getComponent("pnlHeader");

    pnlHeader.setPaintRoutine(function(g)
    {
        // Header
        g.fillAll(THEME.header.bgColour);

        // Preset display
        g.setColour(THEME.presetDisplay.bgColour);
        var a = [lblPreset.get("x"), lblPreset.get("y"), lblPreset.getWidth(), lblPreset.getHeight() + 2];
        g.fillRoundedRectangle(a, 5);
        
	    // Product title
	    var titleSize = 26;
	
	    if (isDefined(Manifest.titleSize))
	      titleSize = Manifest.titleSize;
	
	    g.setFont("title", titleSize);
	    g.setColour(THEME.header.textColour);
	    g.drawAlignedText(Manifest.title, [20, 0, 400, this.getHeight()], "left");
    });

    // lblPreset
    const lblPreset = Content.getComponent("lblPreset");

    // Functions
    inline function updatePresetLabel(patchName)
    {
        local presetName = Engine.getCurrentUserPresetName();
        local text = "";

        if (isDefined(patchName) && patchName != "")
            text = patchName;

        if (isDefined(presetName) && presetName != "")
        {
	        if (text.indexOf(presetName) == -1)
	        {
		        if (text != "")
		        	text += " - " + presetName;
		        else 
		        	text = presetName;
	        }
        }            

		if (text == "" && isDefined(Manifest.defaultPreset))
			text = Manifest.defaultPreset;
        
        lblPreset.set("text", text);
    }
}
