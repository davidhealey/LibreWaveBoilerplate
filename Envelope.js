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

namespace Envelope
{
	const ahdsrController = Synth.getMidiProcessor("ahdsrController");

	// fltEnvelope
	const fltEnvelope = Content.getComponent("fltEnvelope");

	// knbAHDSR
	const knbAHDSR = [];
	
	for (i = 0; i < 6; i++)
	{
		knbAHDSR.push(Content.getComponent("knbAHDSR" + i));
		knbAHDSR[i].setControlCallback(onknbAHDSRControl);
	}
	
	inline function onknbAHDSRControl(component, value)
	{
		local index = knbAHDSR.indexOf(component);
        local attributes = [ahdsrController.AttackCurve, ahdsrController.Attack, ahdsrController.Hold, ahdsrController.Decay, ahdsrController.Sustain, ahdsrController.Release];
        local art = isDefined(Articulations.getCurrent) ? Articulations.getCurrent() : 0;

        ahdsrController.setAttribute(attributes[index], value);
        slpAHDSR.setSliderAtIndex(art * knbAHDSR.length + index, value);
	}

	// slpAHDSR
	const slpAHDSR = Content.getComponent("slpAHDSR");
	
	// Functions
    inline function restoreFromSliderPack(index)
    {
		for (i = 0; i < knbAHDSR.length; i++)
		{
			knbAHDSR[i].setValue(slpAHDSR.getSliderValueAt(knbAHDSR.length * index + i));
			knbAHDSR[i].changed();
		}
	}
    
	inline function setProcessorId(id)
	{
		fltEnvelope.set("Data", '{\r\n  \"ProcessorId\": \"' + id + '\",\r\n  \"Index\": -1\r\n}');
	}
    
    inline function setEnabled(state)
    {
		local colours = Theme.getComponentColours("fltEnvelope");

	    for (x in knbAHDSR)
	    	x.set("enabled", state);
	    	
	    for (x in colours)
	    {
			if (x == "bgColour") continue;

			local c = Colours.withAlpha(colours[x], state ? 1.0 : 0.5);
			fltEnvelope.set(x, parseInt(c));
	    }
    }
    
    // Function calls
    setProcessorId("sampler2GainAHDSR");
}
