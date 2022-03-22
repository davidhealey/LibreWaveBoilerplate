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

namespace Tooltip
{
	// pnlTooltip
	const pnlTooltip = Content.getComponent("pnlTooltip");
	pnlTooltip.data.text = "";
	
	pnlTooltip.setPaintRoutine(function(g)
	{
		var a = [0, 0, this.getWidth(), this.getHeight()];

		var t = this.data.tooltip;
		
		if (this.data.text != "")
			t = this.data.text;

		t == "" ? g.fillAll(0x00) : g.fillAll(this.get("bgColour"));
		t == "" ? g.setColour(0x00) : g.setColour(this.get("textColour"));
				
		g.setFont("semibold", 16);
		g.drawFittedText(t, [50, 0, a[2] - 50, a[3]], "left", 2, 1);
		
		g.fillPath(Paths.icons.infoCircle, [10, a[3] / 2 - a[3] / 1.7 / 2, a[3] / 1.7, a[3] / 1.7]);
	});
	
	pnlTooltip.setTimerCallback(function()
	{
		this.data.tooltip = Content.getCurrentTooltip();		
		this.showControl(this.data.tooltip != "");
		
		this.repaint();
	});
		
	pnlTooltip.startTimer(250);
	
	// Functions
	inline function setText(text)
	{
		pnlTooltip.data.text = text;
	}
	
	inline function clear()
	{
		pnlTooltip.data.text = "";
	}
	
}