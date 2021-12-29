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

namespace VuMeter
{	
	//  pnlVuMeter
	const pnlVuMeter = Content.getComponent("pnlVuMeter");
	
	pnlVuMeter.setPaintRoutine(function(g)
	{
		var a = [0, 0, this.getWidth(), this.getHeight()];

		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(a, 8);

		g.setColour(Colours.withAlpha(this.get("itemColour"), 0.2 * this.getValue()));
		g.fillRoundedRectangle([a[0], a[1], a[2] * this.getValue(), a[3]], 8);
	});
	
	pnlVuMeter.setTimerCallback(function()
	{		
		var gain = Math.max(Engine.getMasterPeakLevel(0), Engine.getMasterPeakLevel(1));
		var v = 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));
	
		this.setValue(v);
	   	
		this.repaint();

		if (!Engine.getNumVoices())
			this.stopTimer();
	});
		
	inline function startTimer()
	{
		pnlVuMeter.startTimer(80);
	}
}