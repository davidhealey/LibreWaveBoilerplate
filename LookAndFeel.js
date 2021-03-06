/*
    Copyright 2021, 2022 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/
namespace LookAndFeel
{
    const laf = Engine.createGlobalScriptLookAndFeel();

	// empty
	const empty = Content.createLocalLookAndFeel();
	
	empty.registerFunction("drawToggleButton", function(g, obj) {});
	empty.registerFunction("drawRotarySlider", function(g, obj) {});

	// table
	const table = Content.createLocalLookAndFeel();
	
	table.registerFunction("drawTableBackground", function(g, obj)
	{
		var a = obj.area;

		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 5);
	});

	table.registerFunction("drawTablePath", function(g, obj)
	{
		var a = obj.area;

		g.setColour(obj.itemColour);
		g.fillPath(obj.path, a);
		
	    g.setColour(obj.itemColour2);
	    g.drawPath(obj.path, a, 2.0);
	});
	
	table.registerFunction("drawTablePoint", function(g, obj)
	{
		var a = obj.tablePoint;

		g.setColour(Colours.withAlpha(obj.itemColour2, obj.hover ? 1.0 : 0.5));
		g.fillEllipse(a);
	});

	table.registerFunction("drawTableRuler", function(g, obj)
	{
		var x = obj.position * obj.area[2];
		
	    g.setColour(Colours.withAlpha(obj.itemColour2, 0.1));	       
	    g.drawLine(x, x, 0, obj.area[3], 10.0);

	    g.setColour(obj.itemColour2);
	    g.drawLine(x, x, 0, obj.area[3], 0.6);
	});
	
	// AHDSR
	laf.registerFunction("drawAhdsrBackground", function(g, obj)
	{
		g.fillAll(0xff3a3635);
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(obj.area, 5);
	});
	
	laf.registerFunction("drawAhdsrPath", function(g, obj)
	{
		var a = obj.area;
		var p = obj.path;

		g.setColour(Colours.withAlpha(obj.itemColour, obj.enabled ? 1.0 : 0.5));
		g.fillPath(p, a);
		
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled && obj.isActive ? 0.2 : 0.0));
		g.fillPath(p, a);

		if (!obj.isActive)
		{
			g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
			g.drawPath(p, a, 2.0);
		}
	});

	laf.registerFunction("drawAhdsrBall", function(g, obj)
	{
		g.setColour(obj.itemColour2);

		if (obj.enabled)
			g.fillEllipse([obj.position[0] - 5, obj.position[1] - 5, 10, 10]);
	});

	// knob
	const knob = Content.createLocalLookAndFeel();
	
	knob.registerFunction("drawRotarySlider", function(g, obj)
	{
		var a = [obj.area[0] + 2, obj.area[1], obj.area[2] - 4, obj.area[3] - 4];
		var shadow = 4;
		
		if (obj.enabled)
		{
			g.setColour(Colours.withAlpha(Colours.black, obj.enabled ? 0.2 : 0.1));
			g.fillEllipse([a[0], a[1] + shadow, a[2], a[3]]);
		}
		
		g.setColour(Colours.withAlpha(obj.bgColour, obj.enabled ? 1.0 : 0.5));
		g.fillEllipse(a);
		
        var startOffset = 2.5;
        var endOffset = startOffset * 2 * obj.valueNormalized - startOffset;
        var markWidth = obj.area[2] / 12;
        
        g.rotate(endOffset, [obj.area[2] / 2, obj.area[2] / 2 - 2]);
        g.setColour(Colours.withAlpha(obj.itemColour1, obj.enabled ? 1.0 : 0.5));
        g.fillRoundedRectangle([2 + a[2] / 2 - markWidth / 2, 2, markWidth, a[3] / 3], 2);
	});
    
	// horizontalSlider
	const horizontalSlider = Content.createLocalLookAndFeel();
    
    horizontalSlider.registerFunction("drawLinearSlider", function(g, obj)
    {
		var a = obj.area;
	    
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 8);
	    
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
    });
    
    // verticalSlider
    const verticalSlider = Content.createLocalLookAndFeel();
    
    verticalSlider.registerFunction("drawLinearSlider", function(g, obj)
    {
		var a = obj.area;
	    
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 8);

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
    });

	// midiInputButtons
	const midiInputButtons = Content.createLocalLookAndFeel();

	midiInputButtons.registerFunction("drawToggleButton", function(g, obj)
	{
		var a = obj.area;

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
	});
        
    // textButton
    const textButton = Content.createLocalLookAndFeel();
    
    textButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var alignment = "centred";
		var text = obj.text;
				
		if (obj.bgColour != 0)
		{
			g.setColour(Colours.withAlpha(obj.bgColour, obj.over ? 1.0 : 0.8));
			
			if (!obj.enabled)
				g.setColour(Colours.withAlpha(obj.bgColour, 0.3));

			g.fillRoundedRectangle(a, 3);
		}

		if (obj.value && obj.itemColour1 != 0)
		{
			g.setColour(Colours.withAlpha(obj.itemColour1, obj.over ? 1.0 : 0.8));
			
			if (!obj.enabled)
				g.setColour(Colours.withAlpha(obj.itemColour1, 0.3));
			
			g.fillRoundedRectangle(a, 3);
		}

    	g.setFont("semibold", 18);
    	g.setColour(Colours.withAlpha(obj.textColour, obj.over ? 1.0 : 0.8));

		if (text.indexOf("underline-") != -1)
		{
			text = text.replace("underline-");
			alignment = "left";
			g.drawHorizontalLine(a[3] - 2, a[0], a[2]);
		}
    	
    	g.drawAlignedText(text, a, alignment);
    });
       
    // textToggleButton
    const textToggleButton = Content.createLocalLookAndFeel();
    
    textToggleButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var alignment = "centred";
		var text = obj.text;
		var colour = obj.value ? obj.bgColour : obj.itemColour1;
		
		g.setColour(Colours.withAlpha(colour, obj.over ? 1.0 : 0.8));
		g.fillRoundedRectangle(a, 3);		
		
    	g.setFont("medium", 18);
    	g.setColour(Colours.withAlpha(obj.textColour, obj.value ? 1.0 : 0.6));

    	g.drawAlignedText(text, a, alignment);
    });
       
    // iconButton
    const iconButton = Content.createLocalLookAndFeel();
    
    iconButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var icon = obj.text;

		if (icon.indexOf("iconOff") != -1 && !obj.value)
		{
			icon = icon.substring(icon.indexOf("iconOff-") + 8, icon.indexOf(" "));
		}
		else if (icon.indexOf("iconOn") != -1 && obj.value)
		{
			icon = icon.substring(icon.indexOf("iconOn-") + 7, icon.length);
		}
		else
		{
			if (icon.indexOf("circle-") != -1)
			{
				icon = icon.replace("circle-");
				
				g.setColour(Colours.withAlpha(obj.bgColour, obj.over ? 0.7 : 1.0));
				g.fillEllipse(a);
				a = [a[2] / 2 - (a[2] / 2) / 2, a[3] / 2 - (a[3] / 2) / 2, a[2] / 2, a[3] / 2];
			}
		}

		var colour = obj.value == 0 ? obj.itemColour1 : obj.itemColour2;
		g.setColour(Colours.withAlpha(colour, obj.over || !obj.enabled ? 0.7 : 1));
		g.fillPath(Paths.icons[icon], a);  
    });
    
    // checkBox
    const checkBox = Content.createLocalLookAndFeel();
    
    checkBox.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;

		g.setColour(Colours.withAlpha(obj.bgColour, obj.over ? 0.8 : 1.0));
		g.fillRoundedRectangle([a[0] + 0.5, a[1] + 0.5, a[3] - 1, a[3] - 1], 3);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, obj.over ? 0.8 : 1.0));
		g.drawRoundedRectangle([a[0] + 0.5, a[1] + 0.5, a[3] - 1, a[3] - 1], 3, 1);
		
		if (obj.value)
		{
			g.setColour(Colours.withAlpha(obj.itemColour2, obj.over ? 0.8 : 1.0));
			var iconArea = [a[3] / 2 - (a[3] / 1.5) / 2, a[3] / 2 - (a[3] / 1.5 * 0.7) / 2, a[3] / 1.5, a[3] / 1.5 * 0.7];
			g.fillPath(Paths.icons["check"], iconArea);
		}

		if (obj.text != "")
		{
			g.setFont("semibold", 16);
			g.setColour(obj.textColour);
			g.drawAlignedText(obj.text, [a[3] + 10, a[1], a[2] - a[3], a[3]], "left");
		}
    });
    
    // customSettings
    const customSettings = Content.createLocalLookAndFeel();
    
    customSettings.registerFunction("drawComboBox", function(g, obj)
    {
		var a = obj.area;

        // Background
		g.setColour(0xff584d49);
		g.fillRoundedRectangle(a, 5);

        // Triangle
		g.setColour(Colours.withAlpha(0xff968b81, obj.hover ? 0.6 : 1.0));
		g.fillPath(Paths.icons.caretDown, [a[0] + a[2] - 20, a[3] / 2 - 4, 12, 8]);

        // Text
        g.setFont("medium", 18);
        g.setColour(0xffdad7d3);

       	g.drawFittedText(obj.text, [a[0] + 12, a[1] - 0.5, a[2] - a[2] / 5, a[3]], "left", 1, 1);
    });
    
    customSettings.registerFunction("drawPopupMenuBackground", function(g, obj)
    {
	   drawPopupMenuBackground();
    });
    
    // Combo box
    const comboBox = Content.createLocalLookAndFeel();
    
    comboBox.registerFunction("drawComboBox", function(g, obj)
    {
        var a = obj.area;
        
        // Background
        g.setColour(Colours.withAlpha(obj.bgColour, obj.enabled ? 1 : 0.5));
        g.fillRoundedRectangle(a, 5);

        // Triangle
        if (a[2] > 55 && obj.itemColour1 != 0)
        {
            g.setColour(obj.itemColour1);
            g.fillPath(Paths.icons.caretDown, [a[0] + a[2] - 20, a[3] / 2 - 4, 12, 8]);
        }

        // Text
        g.setFont("medium", 18);
        g.setColour(obj.textColour);

        if (a[2] < 55 || obj.itemColour2 == 0)
            g.drawFittedText(obj.text, a, "centred", 1, 1);
        else
        	g.drawFittedText(obj.text, [a[0] + 12, a[1] - 0.5, a[2] - a[2] / 5, a[3]], "left", 1, 1);
    });

	const presetBrowser = Content.createLocalLookAndFeel();	

    // Preset browser dialog
    presetBrowser.registerFunction("drawPresetBrowserDialog", function(g, obj)
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
    presetBrowser.registerFunction("drawPresetBrowserColumnBackground", function(g, obj)
    {
	    var a = [obj.area[0], obj.area[1], obj.area[2], obj.area[3]];

	    if (obj.text == "Add a Bank")
	        obj.text = "Select a library";
	        
	    if (obj.text == "Select a Column")
	        obj.text = "Select a Category";
	        
	    if (a[2] > 300 && obj.text != "")
	        obj.text = "No Results";		

		g.setColour(obj.itemColour);    
	    g.fillRoundedRectangle([a[0], a[1], a[2] - 2, a[3]], 5);
	    
	    g.setColour(Colours.grey);
	    g.setFont("bold", 16);
	    g.drawAlignedText(obj.text, a, "centred");
    });

    // Preset browser list item
    presetBrowser.registerFunction("drawPresetBrowserListItem", function(g, obj)
    {
        var a = [obj.area[0] + 8, obj.area[1], obj.area[2] - 18, obj.area[3]];
        var col = obj.columnIndex;
        
        
        var colour = col == -1 || col == 1 ? 0xffbd8a79 : 0xffbb946e;
		g.setColour(Colours.withAlpha(colour, obj.hover ? 0.8 : 1.0));

        if (obj.selected)
            g.fillRoundedRectangle(a, 3);

        colour = obj.selected == 1 ? Colours.black : Colours.lightgrey;
        g.setColour(colour);
        
        g.setFont("semibold", 18);

        if (col == 2) a[0] += 10;

        g.drawAlignedText(obj.text, [a[0] + 10, a[1], a[2], a[3]], "left");       
    });
        
    // Preset browser search bar
    presetBrowser.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
    {
        var a = [obj.area[0] + 20, obj.area[1], obj.area[2] - 40 , obj.area[3]];
        var wh = a[3] / 1.6;

        g.setColour(Colours.withAlpha(0xff2a2625, 0.8));
        g.fillRoundedRectangle(a, 3);
        
        g.setColour(Colours.withAlpha(Colours.lightgrey, 0.8));        
        g.fillPath(obj.icon, [a[0] + a[2] - 30, a[1] + a[3] / 2 - wh / 2, wh, wh]);       
    });    
    
    presetBrowser.registerFunction("drawDialogButton", function(g, obj)
    {
		var a = obj.area;
		var editButtons = ["Add", "Rename", "Delete"];    

		if (editButtons.contains(obj.text))
		{
			var icons = ["add", "edit", "trash"];
			var path = Paths.icons[icons[editButtons.indexOf(obj.text)]];
		
			if (obj.text == "Delete")
				a = [a[0] + a[2] / 2 - 10, a[1] + a[3] / 2 - 11, 20, 22];
			else
				a = [a[0] + a[2] / 2 - 11, a[1] + a[3] / 2 - 11, 22, 22];

			drawPathButton(path, a, [0xff8e887f, 0xffafaa9f, 0x8f8e887f]);
		}
		else
		{
			drawTextButton(obj.text, a, [0xff746964, 0xff827670, 0xff6f6560, 0xff403a38]);
		}
    });    
    
    laf.registerFunction("drawPopupMenuBackground", function(g, obj)
    {
		drawPopupMenuBackground();
    });
    
    // Dialog button
    laf.registerFunction("drawDialogButton", function(g, obj)
    {
		var a = obj.area;
		drawTextButton(obj.text, a, [0xff746964, 0xff968b86, 0x8f746964, 0xff302c2a]);
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
        
        g.setColour(0xff89837d);
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
    
    // Keyboard floating tile    
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
		
		var noteName = Engine.getMidiNoteName(obj.noteNumber);
		
		if (noteName.indexOf("C") != -1)
		{
			g.setColour(Colours.black);
			g.setFont("semibold", 8);
			g.drawAlignedText(noteName, [a[0], a[1] + a[3] - 20, a[2], 20], "centred");
		}
		
		g.setGradientFill([Colours.withAlpha(Colours.black, 0.2), a[2] / 2, 0, 0x00, a[2] / 2, a[3] / 4]);
		g.fillRoundedRectangle(a, 3);
	});
	
	laf.registerFunction("drawBlackNote", function(g, obj)
	{
		var a = [obj.area[0] + 0.5, obj.area[1], obj.area[2] - 1, obj.area[3] - 8];
	
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
		
		g.setGradientFill([Colours.withAlpha(Colours.black, 0.5), a[2] / 2, 0, 0x00, a[2] / 2, a[3] / 4]);
		g.fillRoundedRectangle(a, 3);
	});
    
    // Helper functions
    inline function drawInput(component, icon)
    {
    	g.setColour(component.get("bgColour"));
    
    	var area = [component.get("x") - 10, component.get("y"), component.getWidth() + 13, component.getHeight()];
    	g.fillRoundedRectangle(area, 3);
    	
    	if (icon != "")
    	{
    		area[0] -= 30;
    		area[2] += 30; 
    		g.fillRoundedRectangle(area, 3);
    
    		g.setColour(Colours.withAlpha(component.get("itemColour2"), component.get("enabled") ? 1.0 : 0.5));
    		g.drawLine(area[0] + 35, area[0] + 35, area[1] + 4, area[1] + area[3] - 4, 1);		
    		g.fillPath(Paths.icons[icon.id], [area[0] + 35 / 2 - icon.width / 2, area[1] + area[3] / 2 - icon.height / 2, icon.width, icon.height]);
    	}
    }
    
    inline function drawPathButton(path, area, colours)
    {
        g.setColour(colours[0]);

        if (obj.over)
            g.setColour(colours[1]);
            
        if (obj.down)
            g.setColour(colours[2]);
            
        g.fillPath(path, area);
    }
    
    /*
    colours = [background, over, down, text]
    */
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
    
	inline function modelPanelBackground(g)
	{
		var area = this.getLocalBounds(0);
		var headerSize = 70;
		
		g.setColour(Colours.withMultipliedBrightness(this.get("itemColour"), this.get("enabled") ? 1.0 : 0.7));
		g.fillRoundedRectangle([area[0], area[1], area[2], headerSize + 10], 5);

		g.setColour(Colours.withMultipliedBrightness(this.get("bgColour"), this.get("enabled") ? 1.0 : 0.7));
		g.fillRoundedRectangle([area[0], headerSize, area[2], area[3] - headerSize], 5);
		
		g.setColour(Colours.withMultipliedBrightness(this.get("textColour"), this.get("enabled") ? 1.0 : 0.7));
		g.setFont("semibold", 22);
		g.drawAlignedText(this.get("text"), [area[0], area[1], area[2], headerSize], "centred");
	}
    
    inline function floatingWindowBackground(g)
    {
		var area = this.getLocalBounds(10);
		
		g.drawDropShadow(area, Colours.black, 12);

		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(area, 5);
		
		g.setColour(this.get("itemColour"));
		g.drawRoundedRectangle(area, 5, 2);
    }
    
    inline function drawPopupMenuBackground()
    {
	    var a = [0, 0, obj.width, obj.height];

	    g.setColour(0xff403e3c);
	    g.fillRoundedRectangle(a, 5);

	    g.setColour(0xff89837d);
	    g.drawRoundedRectangle(a, 5, 3);
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
}
