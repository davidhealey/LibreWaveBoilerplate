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

namespace Cards
{	
	const TITLE_HEIGHT = 42;
	const components = {}; // Components indexed with their parent panel

	// Functions	
	inline function drawComponentBackgrounds()
	{
		local exclude = ["pnlHeader", "pnlFooter", "pnlMain", "pnlSettingsTab0", "pnlSettingsTab1", "pnlSettingsTab2", "pnlPresetBrowser", "pnlAdmin", "pnlMixerControls"];
		local panels = [];

        for (c in Content.getAllComponents("(knb)|(flt)|(tbl)"))
        {
			local parentId = c.get("parentComponent");

			if (exclude.indexOf(parentId) != -1 || parentId.indexOf("pnl") == -1) continue;

			if (components[parentId] == undefined)
			{
				components[parentId] = [];
				panels.push(Content.getComponent(parentId));
			}

			components[parentId].push(c);	
        }

        for (x in panels)
        {
	        x.setPaintRoutine(function(g)
	        {
				var id = this.get("id");

				if (isDefined(Manifest.labels[id]))
					drawLabels(g, Manifest.labels[id]);

		        for (c in components[id])
		        {
					var a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];

				 	switch (c.get("type"))
				 	{
				 		case "ScriptSlider":
				 			if (a[2] == 55 && a[3] == 55)
					 			drawKnobRange(g, c, this);
				 			else if (c.get("text").indexOf("[r]") != -1)
					 			drawSliderRange(g, c, data.range);
				 			
				 			if (c.get("text").indexOf("[nodefault]") == -1)    
				 				drawDefaultValueMarker(g, c);

							if (a[2] == a[3])				 			
				 				drawKnobLabel(g, c, a);

				 			break;
				 	}        
		        }
	        });
        }
	}

	inline function drawKnobLabel(g, c, a)
	{
		g.setFont("bold", 16);
		g.setColour(this.get("textColour"));	
		
		local text = c.get("text").replace("[nodefault]");
		
		if (text.indexOf("[r]") != -1)
			text = text.substring(0, c.get("text").indexOf("[r]"));
		
		local y = a[2] == 55 ? a[1] - 68 : a[1] - 30;
		
		g.drawAlignedText(text, [a[0] - 20, y, a[2] + 40, 25], "centred");
	}
	
	inline function drawLabels(g, labels)
	{
	    g.setColour(this.get("textColour"));

	    for (l in labels)
	    {
			local alignment = l.alignment == undefined ? "centred" : l.alignment;
			l.font == undefined ? g.setFont("semibold", 18) : g.setFont(l.font[0], l.font[1]);
	
	        g.drawAlignedText(l.text, l.area, alignment);
	    }
	}
	
    inline function drawKnobRange(g, c, pnl)
    {
        local a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];

        g.setColour(c.get("textColour"));
        g.fillEllipse([a[0] - 4, a[1] + a[3] - 1, 10, 10]);
        g.fillEllipse([a[0] + a[2] - 6, a[1] + a[3] - 1, 10, 10]);
       
        local p = Content.createPath();
        p.addArc([a[0] - 15, a[1] - 17, a[2] + 30, a[3] + 30], -2.5, 2.5);
    
        local pathArea = p.getBounds(1);
        g.drawPath(p, pathArea, 3);

		local range = getKnobRange(c);
        g.setFont("regular", 16);
        g.setColour(c.get("itemColour2"));
        g.drawAlignedText(range[0], [a[0] - a[2] / 2 + 1, a[1] + a[3] + 16, a[2], 20], "centred");
        g.drawAlignedText(range[1], [a[0] + a[2] - a[2] / 2 - 1, a[1] + a[3] + 16, a[2], 20], "centred");
    }
	
	inline function getKnobRange(c)
	{
		local t = c.get("text");
		
		if (t.indexOf("[r]") != -1)
		{
			local r = t.substring(t.indexOf("[r]") + 3, t.indexOf("[/r]"));
			return r.split(",");
		}
		else
		{
			return [c.get("min"), parseInt(c.get("max")) + c.get("suffix")];
		}
	}
	
    inline function drawDefaultValueMarker(g, c)
    {
        local a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];
        local skew = Math.log(0.5) / Math.log((c.get("middlePosition") - c.get("min")) / (c.get("max") - c.get("min")));
        local normalized = ((c.get("defaultValue") - c.get("min")) / (c.get("max") - c.get("min")));
        local v = Math.pow(normalized, skew);

        g.setColour(c.get("itemColour2"));

        switch(c.get("style"))
        {
            case "Horizontal":
                local w = a[2] * 0.2;
                local x = a[0] + a[2] * v - (w + 4) * v;
                g.fillEllipse([x + w / 2 - 3 / 2, a[1] - 15, 6, 6]);
                break;
            
            case "Vertical":
                local h = a[3] * 0.2;
                local y = a[1] + a[3] - a[3] * v - (h + 2) + (h + 4) * v;
                g.fillEllipse([a[0] - 15, y + h / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]);
                break;
            
            case "Knob":
                local ctx = a[0] + a[2] / 2;
                local cty = a[1] + a[2] / 2 - 2;
                local offset = 2.5 * 2 * v - 2.5;
                local ang = Math.toRadians(v * offset);
                local x = ctx + a[2] * Math.sin(ang + offset);
                local y = cty + a[2] * -Math.cos(ang + offset);
                
                g.fillEllipse([x - 3, y - 3, 6, 6]);
                break;
        }
    }
	
	inline function create(id, children)
	{
		local p = Content.getComponent(id);
		p.data.hover = -1;
		p.data.titles = children;
		p.data.children = [];		
		p.setControlCallback(onpnlCardControl);

		if (children.length > 1)
		{
			for (x in children)
			{
				if ("pnl" + x.replace(" ") != id)
					p.data.children.push(Content.getComponent("pnl" + x.replace(" ")));
			}
		}
		
		p.setPaintRoutine(function(g)
		{
			var a = this.getLocalBounds(0);

			g.setColour(this.get("itemColour"));
			g.fillRoundedRectangle([a[0], a[1], a[2], TITLE_HEIGHT + 10], 5);

			g.setColour(this.get("bgColour"));
			g.fillRoundedRectangle([a[0], a[1] + 43, a[2], a[3] - TITLE_HEIGHT], 5);

			// Titles
			for (i = 0; i < this.data.titles.length; i++)
			{
				var w = a[2] / this.data.titles.length;	
				var titleArea = [i * w, 0, w, TITLE_HEIGHT];

				// Title
				if (this.getValue() == i)
				{
					g.setFont("bold", 20);						
					g.setColour(Colours.withAlpha(this.get("itemColour2"), this.data.hover == i ? 0.8 : 1));
				}
				else 
				{
					g.setFont("bold", 16);
					g.setColour(Colours.withAlpha(this.get("textColour"), this.data.hover == i ? 0.8 : 1));
				}				
				
				if (this.data.titles.length > 1)
					g.drawAlignedText(this.data.titles[i].toUpperCase(), titleArea, "centred");
				else
					g.drawAlignedText(this.data.titles[i].toUpperCase(), [10, 0, a[2], TITLE_HEIGHT], "left");
				
        		// Separator
                if (i > 0)
                {
                    g.setColour(0xffa09994);
                    g.drawLine(titleArea[0], titleArea[0], titleArea[1] + 10, titleArea[1] + titleArea[3] - 11, 2);
                }
			}
		});
		
		p.setMouseCallback(function(event)
		{
			var value = Math.floor(event.x / this.getWidth() * this.data.titles.length);
			this.data.hover = event.hover ? value : -1;

			if (event.clicked)
			{
				this.setValue(value);
				this.changed();
			}
			else
			{
				this.repaint();
			}
		});
	}
	
	inline function onpnlCardControl(component, value)
	{
		for (i = 0; i < component.data.children.length; i++)
			component.data.children[i].showControl(i == value);

		component.repaint();
	}
}
