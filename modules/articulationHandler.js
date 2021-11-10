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

include("Manifest.js");
include("librewave-boilerplate-hise-scripts/Configuration.js");

reg currentPatch;
reg lastArticulation = 0;

// knbPatch
const knbPatch = Content.addKnob("knbPatch", 0, 0);
knbPatch.set("text", "Patch");
knbPatch.setRange(0, 100, 1);
knbPatch.setControlCallback(onknbPatchControl);

inline function onknbPatchControl(component, value)
{
	local patch = Manifest.patches[value];

	currentPatch = value;
	Configuration.updateKeySwitches(patch);
	Configuration.updateKeyRanges(patch);
	changeArticulation(0);
}

// knbArticulation
const knbArticulation = Content.addKnob("knbArticulation", 150, 0);
knbArticulation.set("text", "Articulation");
knbArticulation.setRange(0, 100, 1);
knbArticulation.setControlCallback(onknbArticulationControl);

inline function onknbArticulationControl(component, value)
{
	changeArticulation(value);	
}

// slpArticulationGain
const slpArticulationGain = Content.addSliderPack("slpArticulationGain", 300, 0);
if (isDefined(g_slpArticulationGainSliderPackData)) slpArticulationGain.referToData(g_slpArticulationGainSliderPackData);
slpArticulationGain.set("min", 0);
slpArticulationGain.set("max", 1);
slpArticulationGain.set("stepSize", 0.01);
slpArticulationGain.set("sliderAmount", 25);
slpArticulationGain.set("width", 128);

// Functions
inline function changeArticulation(index)
{
	local art = Manifest.articulations[index];
	
	// Set muters state
	for (i = 0; i < Configuration.muters.length; i++)
	{
		local m = Configuration.muters[i];
		m.setAttribute(m.ignoreButton, !art.samplers.contains(i));
	}

	Configuration.setMidiProcessorAttributes(art.scripts);
	Configuration.setModulatorAttributes(art.modulators);
	Configuration.setEffectAttributes(art.effects);
	Configuration.setNoteRangeFilter(index);
	
	lastArticulation = index;
}

inline function getArticulationGain(index)
{
	local v = slpArticulationGain.getSliderValueAt(index);        
	return (((v - 0) * (0 - -25)) / (1 - 0)) + -25;	
}function onNoteOn()
{
	local n = Message.getNoteNumber();
	local patch = Manifest.patches[currentPatch];
	local index = Configuration.keySwitches.indexOf(n);

	if (index != -1 && index != lastArticulation)
	{
		knbArticulation.setValue(patch.articulations.active[index]);
		changeArticulation(patch.articulations.active[index]);
	}
	else
	{
		Message.setGain(getArticulationGain(knbArticulation.getValue()));
	}
}
 function onNoteOff()
{
	Message.setGain(getArticulationGain(knbArticulation.getValue()));
}
 function onController()
{
	local cc = Message.getControllerNumber();
	local cv = Message.getControllerValue();
	local patch = Manifest.patches[currentPatch];
	local arts = patch.articulations.active;

	if (cc == 32 || Message.isProgramChange())
	{
		for (i in arts)
		{
			if (ccValue == Manifest.articulations[i].program)
			{
				if (i != lastArticulation)
				{
					knbArticulation.setValue(arts[index]);
					knbArticulation.changed();
				}

				break;
			}
		}
	}
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 