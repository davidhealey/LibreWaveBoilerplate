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

namespace Patches
{
	const articulationHandler = Synth.getMidiProcessor("articulationHandler");

	// knbPatch
	const knbPatch = Content.getComponent("knbPatch");
	knbPatch.setControlCallback(onknbPatchControl);
	
	inline function onknbPatchControl(component, value)
	{
		changePatch(value);	
	}
	
	// btnLoadDefault
	const btnLoadDefault = Content.getComponent("btnLoadDefault");
	btnLoadDefault.setControlCallback(onbtnLoadDefaultControl);
	
	inline function onbtnLoadDefaultControl(component, value)
	{
		if (value)
		{
			Configuration.loadDefaults();
			knbPatch.setValue(-1);
		}			
	}
	
	// Functions	
	inline function changePatch(index)
	{
		if (index != -1)
		{
			local patch = Manifest.patches[index];
			articulationHandler.setAttribute(articulationHandler.knbPatch, index);
	
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
	
			Configuration.updateKeySwitches(patch);
			Configuration.updateKeyRanges(patch);
			Header.updatePresetLabel(patch.id);
			
			Presets.setButtonsEnabled(true);

			if (isDefined(Articulations.init))
				Articulations.init();
				
			Configuration.setMasterMuter(false);
		}
		else
		{
			Header.updatePresetLabel("Select a Preset");
			Settings.clearMidiLearn();
			Presets.setButtonsEnabled(false);
			UserSettings.setSettingsButtonEnabled(false);
			UserSettings.hide();
			Presets.show();
			Configuration.setMasterMuter(true);
			Configuration.setKeyColours(0);
		}
	}

	inline function getCurrentPatch()
	{
		return Manifest.patches[knbPatch.getValue()];
	}
	
	inline function getPatchIndex()
	{
		return knbPatch.getValue();
	}
	
	inline function set(value)
	{
		knbPatch.setValue(value);
		knbPatch.changed();
	}
}
