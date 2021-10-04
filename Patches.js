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
	reg current;
	const keyswitches = [];
	const keyRanges = [];

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
		local patch = Manifest.patches[index];
		current = index;
		
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

		updateKeyswitches(index);
		updateKeyRanges(index);
		Articulations.init();
	}

	inline function getCurrentPatch()
	{
		return Manifest.patches[current];
	}
	
	inline function getKeyRanges(index)
	{
		return keyRanges[index];
	}
	
	inline function getKeyswitches()
	{
		return keyswitches;
	}
	
	inline function updateKeyswitches(index)
	{
		local patch = Manifest.patches[index];
		keyswitches.clear();

		local firstKs = patch.firstKs;
		local numArts = patch.articulations.active.length;

        for (i = 0; i < numArts; i++)
            keyswitches.push(firstKs + i);
	}
	
	inline function updateKeyRanges(index)
	{
		local patch = Manifest.patches[index];
		keyRanges.clear();

		for (i = 0; i < patch.articulations.active.length; i++)
		{
			local range = [];
			range = patch.keyRanges.clone();
			keyRanges.push(range);
			
			if (!isDefined(patch.articulations.keyRanges)) continue;
			if (!isDefined(patch.articulations.keyRanges[i])) continue;
			if (patch.articulations.keyRanges[i].length == 0) continue;

			for (j = 0; j < patch.articulations.keyRanges[i].length; j++)
				range[j] = patch.articulations.keyRanges[i][j];
		}
	}
}
