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

namespace LookAndFeel
{            
    const laf = Engine.createGlobalScriptLookAndFeel();

    // Knob
    laf.registerFunction("drawRotarySlider", function(g, obj)
    {
        var a = [obj.area[0] + 2, obj.area[1], obj.area[2] - 4, obj.area[3] - 4];
        var shadow = 4;

        g.setColour(0xff352f2e);
        g.fillEllipse([a[0], a[1] + shadow, a[2], a[3]]);

        g.setColour(Colours.withAlpha(obj.itemColour1, obj.enabled ? 1 : 0.5));
        g.fillEllipse(a);
        
        var startOffset = 2.5;
        var endOffset = startOffset * 2 * obj.valueNormalized - startOffset;
        var markWidth = obj.area[2] / 12;
        
        g.rotate(endOffset, [obj.area[2] / 2, obj.area[2] / 2 - 2]);
        
        obj.enabled == 1 ? g.setColour(0xffebe7df) : g.setColour(Colours.withAlpha(0xffebe7df, 0.5));
        g.fillRoundedRectangle([2 + a[2] / 2 - markWidth / 2, 2, markWidth, a[3] / 3], 2);
    });
    
    // Slider
    laf.registerFunction("drawLinearSlider", function(g, obj)
    {
        var a = obj.area;
        
        g.setColour(obj.bgColour);
        g.fillRoundedRectangle(a, 8);
        
        if (obj.style == 2) // Horizontal
        {
            g.setColour(obj.itemColour1);
            g.fillRoundedRectangle([12, a[3] / 2 - 3 / 2, a[2] - 24, 3], 2);
            
            var w = a[2] * 0.2;
            
            g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1 : 0.5));

            if (w >= 30)
            {
                var x = a[2] * obj.valueNormalized - (w + 4) * obj.valueNormalized + 2;
                g.fillRoundedRectangle([x + 1, a[3] / 2 - (a[3] - 4) / 2, w - 2, a[3] - 4], 8);
                
                g.setColour(obj.textColour);
                g.fillEllipse([x + w / 2 - a[3] / 4 / 2, a[3] / 2 - a[3] / 4 / 2, a[3] / 4, a[3] / 4]);
            }                
            else
            {
                var c = a[3] - 4;
                var x = a[2] * obj.valueNormalized - (c + 4) * obj.valueNormalized + 2;
                g.fillEllipse([x, a[3] / 2 - c / 2, c, c]);

                g.setColour(obj.textColour);
                g.fillEllipse([x + c / 2 - a[3] / 4 / 2, a[3] / 2 - a[3] / 4 / 2, a[3] / 4, a[3] / 4]);
            }
        }
        else if (obj.style == 3) // Vertical
        {
            g.setColour(obj.itemColour1);
            g.fillRoundedRectangle([a[2] / 2 - 3 / 2, 12, 3, a[3] - 24], 2);
            
            var h = a[3] * 0.2;
            
            obj.enabled == 1 ? g.setColour(obj.itemColour2) : g.setColour(Colours.withAlpha(obj.itemColour2, 0.5));
            
            if (h > 30)
            {
                var y = a[3] - a[3] * obj.valueNormalized - (h + 2) + (h + 4) * obj.valueNormalized;

                g.fillRoundedRectangle([a[2] / 2 - (a[2] - 4) / 2, y + 1, a[2] - 4, h - 2], 8);
            
                g.setColour(obj.textColour);
                g.fillEllipse([a[2] / 2 - a[2] / 4 / 2, y + h / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]);
            }
            else 
            {
                var c = a[2] - 4;
                var y = a[3] - a[3] * obj.valueNormalized - (c + 2) + (c + 4) * obj.valueNormalized;
                g.fillEllipse([a[2] / 2 - c / 2, y, c, c]);

                g.setColour(obj.textColour);
                g.fillEllipse([a[2] / 2 - a[2] / 4 / 2, y + c / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]);
            }
        }
    });    
    
    // Button
    laf.registerFunction("drawToggleButton", function(g, obj)
    {
        var a = obj.area;

        if (obj.text.indexOf("icon") != -1)
        {
			var icon = undefined;

            var colour = obj.value == 0 ? obj.itemColour1 : obj.itemColour2;
            g.setColour(Colours.withAlpha(colour, obj.over ? 0.7 : 1));

            if (obj.text.indexOf("iconOff") != -1 && !obj.value)
            {
                icon = obj.text.substring(obj.text.indexOf("-") + 1, obj.text.indexOf(" "));
            }
            else if (obj.text.indexOf("iconOn") != -1 && obj.value)
            {
                icon = obj.text.substring(obj.text.indexOf("iconOn-") + 7, obj.text.length);
            }
            else if (obj.text == "icon-install")
            {
                var path = Paths.icons.add;
                a = [a[0] + a[2] / 2 - 11, a[1] + a[3] / 2 - 11, 22, 22];
                drawPathButton(path, a, [0xff8e887f, 0xffafaa9f, 0x8f8e887f]);
            }
            else 
            {
                icon = obj.text.replace("icon-");
            }
            
            if (icon != undefined)
                g.fillPath(Paths.icons[icon], a);
        }
        else if (obj.text.indexOf("toggle-") != -1)
        {
            obj.value == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.itemColour2);
            g.fillRoundedRectangle(a, 3);
            obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.bgColour);
        }
        else if (obj.parentType == "MidiSources" || obj.parentType == "MidiChannelList")
        {
            g.setColour(0xffa8a49d);
            g.setFont("bold", 14);
            var a1 = [a[0] + 12, a[1], a[2] - 40, a[3]];
            g.drawAlignedText(obj.text, a1, "left");
            
            g.setColour(0xff66635e);
            var a2 = [a[0] + 2, a[1] + 2, a[2] - 35, a[3] - 4];
            g.drawRoundedRectangle(a2, 3, 2);
            
            obj.value == 1 ? g.setColour(0xffddd9d3) : g.setColour(0xff5a5452);
            var a3 = [a[2] - 22, a[1] + a[3] / 2 - 15 / 2, 15, 15];
            g.fillPath(Paths.icons["power"], a3);
        }
        
        if (obj.text.indexOf("text-") != -1)
        {
            var alignment = "centred";
            
            // Text - colour should be set in other clause
            g.setFont("bold", 18);
            var text = obj.text.replace("toggle-", "");
            text = text.replace("text-", "");
            g.drawAlignedText(text, a, alignment);
        }
    });
    
    // Combo box
    laf.registerFunction("drawComboBox", function(g, obj)
    {
        var a = obj.area;

        // Background
        g.setColour(Colours.withAlpha(THEME.ScriptComboBox.bgColour, obj.enabled ? 1 : 0.5));
        g.fillRoundedRectangle(a, 5);

        // Outline
        if (THEME.ScriptComboBox.itemColour1 != 0)
        {
            g.setColour(THEME.ScriptComboBox.itemColour1);
            g.drawRoundedRectangle([a[0] + 1, a[1] + 1, a[2] - 2, a[3] - 2], 5, 2);
        }

        // Triangle
        if (a[2] > 55 && THEME.ScriptComboBox.itemColour2 != 0)
        {
            g.setColour(THEME.ScriptComboBox.itemColour2);
            g.fillPath(Paths.icons.caretDown, [a[0] + a[2] - 20, a[3] / 2 - 4, 12, 8]);
        }
       
        // Text
        g.setColour(THEME.ScriptComboBox.textColour);
        g.setFont("regular", 16);

        if (a[2] < 55 || THEME.ScriptComboBox.itemColour2 == 0)
            g.drawAlignedText(obj.text, a, "centred");
        else
            g.drawAlignedText(obj.text, [a[0] + 12, a[1] - 0.5, a[2], a[3]], "left");        
    });
       
    // Preset browser dialog
    laf.registerFunction("drawPresetBrowserDialog", function(g, obj)
    {
        var a = obj.area;
        var h = 53;
        
        g.setColour(0xff5b504c);
        g.fillRoundedRectangle([a[0] - 50, a[1] - 50, a[2] + 100, h], 5);
        
        g.setFont("semibold", 20);
        g.setColour(0xfff6f5f1);
        g.drawAlignedText(obj.title, [a[0] - 35, a[1] - 53, a[2] + 100, h], "left");        
        
        g.setColour(0xff3a3635);
        g.fillRoundedRectangle([a[0] - 50, a[1] - 3, a[2] + 100, a[3] + 53], 5);
        
        g.setFont("medium", 18);
        g.setColour(Colours.antiquewhite);
        
        if (obj.labelArea[2] != 0)
        {
            g.drawAlignedText(obj.text, [a[0], a[1] + 15, a[2], 20], "centred");
            g.setColour(0xff2a2625);
            g.fillRoundedRectangle(obj.labelArea, 5);
        }
        else
        {
            g.drawAlignedText(obj.text, [a[0], a[1] + 40, a[2], 20], "centred");
        }
        
        g.setColour(Colours.black);
        g.drawRoundedRectangle([a[0] - 50, a[1] - 50, a[2] + 100, a[3] + 100], 5, 2);
    });

    // Preset browser column
    laf.registerFunction("drawPresetBrowserColumnBackground", function(g, obj)
    {
        var a = [obj.area[0], obj.area[1], obj.area[2], obj.area[3]];
        
        if (obj.text == "Add a Bank")
            obj.text = "Select a library";
            
        if (obj.text == "Select a Column")
            obj.text = "Select a Category";
        
        g.setColour(Colours.grey);
        g.setFont("bold", 16);
        g.drawAlignedText(obj.text, a, "centred");
    });
    
    // Preset browser list item
    laf.registerFunction("drawPresetBrowserListItem", function(g, obj)
    {
        var a = [obj.area[0] + 8, obj.area[1], obj.area[2] - 18, obj.area[3]];
        var col = obj.columnIndex;
        
        col == -1 || col == 1 ? g.setColour(0xffbd8a79) : g.setColour(0xffbb946e);
        
        if (obj.selected)            
            g.fillRoundedRectangle(a, 3);
        
        obj.selected == 1 ? g.setColour(Colours.black) : g.setColour(Colours.lightgrey);
        
        col == -1 ? g.setFont("bold", 16) : g.setFont("bold", 18);
        
        g.drawAlignedText(obj.text, [a[0] + 10, a[1], a[2], a[3]], "left");       
    });
    
    // Preset browser search bar
    laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
    {
        var a = [obj.area[0], obj.area[1], obj.area[2] - 10, obj.area[3]];
        g.setColour(0x8fbcb8b2);
        g.fillRoundedRectangle(a, 3);
        
        g.setColour(Colours.lightgrey);
        var wh = a[3] / 1.6;
        g.fillPath(obj.icon, [a[0] + 7, a[1] + a[3] / 2 - wh / 2, wh, wh]);       
    });    
    
    // Dialog button
    laf.registerFunction("drawDialogButton", function(g, obj)
    {
        var a = obj.area;
        var presetButtons = ["Add", "Rename", "Delete"];
                
        // Preset browser icon buttons
        if (presetButtons.contains(obj.text))
        {
            var icons = ["add", "edit", "trash"];            
            var path = Paths.icons[icons[presetButtons.indexOf(obj.text)]];

            if (obj.text == "Delete")
                a = [a[0] + a[2] / 2 - 10, a[1] + a[3] / 2 - 11, 20, 22];
            else
                a = [a[0] + a[2] / 2 - 11, a[1] + a[3] / 2 - 11, 22, 22];

            drawPathButton(path, a, [0xff8e887f, 0xffafaa9f, 0x8f8e887f]);
        }
        else
        {
            drawTextButton(obj.text, a, [0xff746964, 0xff968b86, 0x8f746964, 0xff302c2a]);
        }
    });

    // Alert window
    laf.registerFunction("drawAlertWindow", function(g, obj)
    {        
        var a = obj.area;
        var h = 53;

        g.setColour(0xff5b504c);
        g.fillRoundedRectangle([a[0], a[1], a[2], h], 5);
        
        g.setFont("semibold", 20);
        g.setColour(0xfff6f5f1);
        g.drawAlignedText(obj.title, [a[0] + 15, a[1] - 5, a[2], h], "left");        
        
        g.setColour(0xff3a3635);
        g.fillRoundedRectangle([a[0], a[1] + 43, a[2], a[3] - 43], 5);
        
        g.setColour(Colours.black);
        g.drawRoundedRectangle(a, 5, 3);
    });
    
    laf.registerFunction("getAlertWindowMarkdownStyleData", function(obj)
    {
        obj.font = "medium";
        obj.fontSize = 18;
        obj.textColour = Colours.antiquewhite;
        return obj;
    });
    
	laf.registerFunction("drawAlertWindowIcon", function(g, obj)
    {
        var a = [obj.area[0], obj.area[1] + 10, obj.area[2], obj.area[3] - 10];
        var path = Paths.icons[obj.type.toLowerCase()];
		var multiplier = 1;		
		
        switch (obj.type)
        {
	        case "Question":
	        	multiplier = 0.55;
        		break;
        		
	        case "Info":
	        	multiplier = 0.27;
        		break;
        		
        	default:
        		multiplier = 0.18;
		}

		g.setColour(0xff87746a);
		g.fillPath(path, [a[0], a[1], a[3] * multiplier, a[3]]);
    });
    
	laf.registerFunction("drawWhiteNote", function(g, obj)
	{
		var a = [obj.area[0], obj.area[1], obj.area[2], obj.area[3] - 1];

		if (obj.down)
			a[3] += 1;
	
		g.setColour(Colours.white);
		g.fillRoundedRectangle(a, 3);

		if (obj.down)
		{
			g.setGradientFill([0x00, a[0], a[1], Colours.withAlpha(Colours.black, 0.2), a[0], a[3]]);
			g.fillRect(a);
		}
		
		if (obj.keyColour != 0)
		{
			g.setColour(obj.keyColour);
			g.fillRoundedRectangle(a, 3);
		}
		
		if (obj.hover)
		{
			g.setColour(Colours.withAlpha(Colours.coral, 0.3));
			obj.down ? g.fillRect(a) : g.fillRoundedRectangle(a, 3);
		}
	
		g.setColour(0xff3a322d);
		g.drawRoundedRectangle(a, 3 - (3 * obj.down), 2);

		g.drawLine(a[0], a[2], a[1], a[1], 3);
		
		var noteName = Engine.getMidiNoteName(obj.noteNumber);
		
		if (noteName.indexOf("C") != -1)
		{
			g.setColour(Colours.black);
			g.setFont("semibold", 8);
			g.drawAlignedText(noteName, [a[0], a[1] + a[3] - 20, a[2], 20], "centred");
		}
		
	});
	
	laf.registerFunction("drawBlackNote", function(g, obj)
	{
		var a = [obj.area[0] + 0.5, obj.area[1] + 1.5, obj.area[2] - 1, obj.area[3] - 8];
	
		g.setColour(0xff52413d);
		g.fillRoundedRectangle(a, 1);
	
		if (obj.down)
		{
			g.setGradientFill([0x00, a[0], a[1], Colours.withAlpha(0xff87796e, 0.7), a[0], a[3]]);
			g.fillRect(a);
		}
	
		if (obj.keyColour != 0)
		{
			g.setColour(obj.keyColour);
			g.fillRoundedRectangle(a, 1);
		}
			
		if (obj.hover)
		{
			g.setColour(Colours.withAlpha(Colours.coral, 0.3));
			obj.down ? g.fillRect(a) : g.fillRoundedRectangle(a, 1);
		}

		g.setColour(0xff3a322d);
		//g.drawLine(a[0], a[2], a[1], a[1], 3);
	});
    
    inline function drawPathButton(path, area, colours)
    {
        g.setColour(colours[0]);

        if (obj.over)
            g.setColour(colours[1]);
            
        if (obj.down)
            g.setColour(colours[2]);
            
        g.fillPath(path, area);
    }
    
    inline function drawTextButton(text, area, colours)
    {
        g.setColour(colours[0]);

        if (obj.over)
            g.setColour(colours[1]);
            
        if (obj.down)
            g.setColour(colours[2]);
            
        g.fillRoundedRectangle(area, 3);
        
        g.setColour(colours[3]);
        g.setFont("bold", 16);
        g.drawAlignedText(text, area, "centred");
    }
    
    // Value Popups
    Content.setValuePopupData(
    {
        "fontName": "bold",
        "fontSize": 20,
        "borderSize": 3,
        "borderRadius": 3,
        "margin": 8,
        "bgColour": 0xcc8b7559,
        "itemColour": 0xcc5b504c,
        "itemColour2": 0xcc5b504c,
        "textColour": 0xccebe7df
    });
    
    //pnlMain
    const pnlMain = Content.getComponent("pnlMain");

    pnlMain.setPaintRoutine(function(g)
    {
        g.fillAll(THEME.bgColour);
    });
}
