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

namespace Patches
{
	const articulationHandler = Synth.getMidiProcessor("articulationHandler");
	reg current;

	// knbPatch
	const knbPatch = Content.getComponent("knbPatch");
	knbPatch.setControlCallback(onknbPatchControl);
	
	inline function onknbPatchControl(component, value)
	{
		changePatch(value);
	}
	
	// Functions	
	inline function changePatch(index)
	{
		local patch;

		for (i = 0; i < Manifest.patches.length; i++)
		{
			if (Manifest.patches[i].index == parseInt(index))
			{
				current = i;
				patch = Manifest.patches[i];
				break;
			}
		}
		
		articulationHandler.setAttribute(articulationHandler.knbPatch, current);
		
		Configuration.enableAllModules();
		
		// Apply manifest level settings
		Configuration.setMidiProcessorAttributes(Manifest.scripts);
		Configuration.setModulatorAttributes(Manifest.modulators);
		Configuration.setEffectAttributes(Manifest.effects);
		Configuration.setSamplerAttributes(Manifest.samplers);
		
		// Apply patch level settings
		Configuration.setMidiProcessorAttributes(patch.scripts);
		Configuration.setModulatorAttributes(patch.modulators);
		Configuration.setEffectAttributes(patch.effects);
		Configuration.setSamplerAttributes(patch.samplers);
		Configuration.loadSampleMaps(patch.samplers);
		
		Configuration.updateKeySwitches(patch);
		Configuration.updateKeyRanges(patch);
		Header.updatePresetLabel(patch.id);
		Articulations.init();
	}

	inline function getCurrentPatch()
	{
		return Manifest.patches[current];
	}
}
