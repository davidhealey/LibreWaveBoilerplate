namespace Theme
{
	reg current = 0;

	const styles = [
		{
			"components": {
				"pnlMain": {"bgColour": 0xff242220, "itemColour": 0xff302c2a, "itemColour2": 0xff302c2a},
				"pnlVelocity": {"bgColour": 0x0, "itemColour": 0x0, "itemColour2": 0x0, "textColour": 0x0},
				"tblVelocity": {"bgColour": 0xff4c4441, "itemColour": 0xff7a6052, "itemColour2": 0xffd2c2b2},
				"pnlPlay": {"bgColour": 0x00, "itemColour": 0x00, "itemColour2": 0x00},
				"pnlArticulationList": {"bgColour": 0x00, "itemColour": 0xff5a5452, "itemColour2": 0xff968b81, "textColour": Colours.white},
				"pnlHeader": {"bgColour": 0xff7c6c63, "itemColour": 0xff403e3c, "textColour": 0xffd7d0bc},
				"btnLibraryManager": {"itemColour": 0xff403e3c, "itemColour2": 0xffd7d0bc},
				"btnSettings": {"itemColour": 0xff403e3c, "itemColour2": 0xffd7d0bc},
				"btnPresetBrowser0": {"itemColour": 0xff968b81, "itemColour2": 0xffd7d0bc},
				"btnPreset0": {"itemColour": 0xff968b81, "itemColour2": 0xff695b54},
				"btnPreset1": {"itemColour": 0xff968b81, "itemColour2": 0xff695b54},
				"pnlFooter": {"bgColour": 0xff695b54, "itemColour": 0xffede6d8, "itemColour2": 0xffd7d0bc, "textColour": 0xffd7d0bc},
				"fltStats": {"textColour": 0xffa29b98},
				"knbMasterGain": {"itemColour": 0xff7c6c63, "itemColour2": 0xffd7d0bc, "textColour": 0xff695b54},
				"knbMasterPan": {"bgColour": 0xff514a47, "itemColour": 0xff7c6c63, "itemColour2": 0xffd7d0bc, "textColour": 0xff695b54},
				"btnSettingsTab0": {"bgColour": 0xff97675e, "itemColour": 0xff403e3c, "textColour": 0xffede6d8},
				"btnSettingsTab1": {"bgColour": 0xff97675e, "itemColour": 0xff403e3c, "textColour": 0xffede6d8},
				"pnlSettings": {"bgColour": 0xff594f4b, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc2bcae},
				"pnlSettingsTab1": {"bgColour": 0x00, "itemColour": 0x55c1c1c1, "textColour": 0xffc1c1c1},
				"fltMidiLearn": {"bgColour": 0, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc0baac},
				"fltMidiChannel": {"bgColour": 0, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc0baac},
				"fltMidiSource": {"bgColour": 0, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc0baac},
				"pnlSettingsTab0": {"bgColour": 0, "itemColour": 0, "itemColour2": 0, "textColour": 0xffc0baac},
				"btnDebug": {"bgColour": 0xff584d49, "itemColour": 0xff8b7559, "itemColour2": 0xfb111111, "textColour": Colours.white},
				"fltAudioSettings": {"textColour": 0xffc0baac},
				"fltEngineSettings": {"textColour": 0xffc0baac},
				"pnlPresetBrowser": {"bgColour": 0xff524844, "itemColour": 0, "itemColour2": 0, "textColour": 0xffc0baac},
				"fltPresetBrowser": {"bgColour": 0, "itemColour": 0xff2a2625, "itemColour2": 0, "textColour": 0xffc0baac},
				"pnlPresetNotesBlocker": {"bgColour": 0xff524844, "itemColour": 0, "itemColour2": 0, "textColour": 0xffc0baac},
				"cmbFilter": {"bgColour": 0xff393736, "itemColour": 0xffc1c1c1, "textColour": 0xffc1c1c1},
				"pnlTooltip": {"bgColour": 0xaa000000, "textColour": Colours.white},
				"pnlSpinnerContainer": {"bgColour": 0x00, "itemColour": 0x89000000, "itemColour2": 0x89000000},
				"fltEnvelope": {"bgColour": 0xff4c4441, "itemColour": 0xff8b7559, "itemColour2": 0xffd2c2b2},
				"pnlMixerControls": {"bgColour": 0xff514a47, "itemColour": 0x00, "itemColour2": 0x00},
				"pnlVuMeter": {"bgColour": 0xff514a47, "itemColour": 0x00, "itemColour2": 0x00, "textColour": 0x0},
				"pnlArticulationGain": {"bgColour": 0xff413c3b, "itemColour": 0xff9f8369},
				"pnlAbout": {"bgColour": 0x88000000, "itemColour": 0xff3a3635, "itemColour2": 0xff89837d, "textColour": Colours.white},
				"knbAHDSR0": {"bgColour": 0xff745852, "itemColour": 0xfff3ebd7, "itemColour2": 0xffcec7b5, "textColour": 0xff524e4c},
				"knbAHDSR1": {"bgColour": 0xff6a5e58, "itemColour": 0xfff3ebd7, "itemColour2": 0xffcec7b5, "textColour": 0xff524e4c},
				"knbAHDSR2": {"bgColour": 0xff6a5e58, "itemColour": 0xfff3ebd7, "itemColour2": 0xffcec7b5, "textColour": 0xff524e4c},
				"knbAHDSR3": {"bgColour": 0xff6a5e58, "itemColour": 0xfff3ebd7, "itemColour2": 0xffcec7b5, "textColour": 0xff524e4c},
				"knbAHDSR4": {"bgColour": 0xff6a5e58, "itemColour": 0xfff3ebd7, "itemColour2": 0xffcec7b5, "textColour": 0xff524e4c},
				"knbAHDSR5": {"bgColour": 0xff6a5e58, "itemColour": 0xfff3ebd7, "itemColour2": 0xffcec7b5, "textColour": 0xff524e4c}
			}
		}
	];
	
	// Functions
	inline function getComponentColours(id)
	{
		return styles[current].components[id];
	}
	
	inline function setComponentColours()
	{
		for (x in Content.getAllComponents(""))
		{
			local id = x.get("id");
			local type = x.get("type");
			local c = x;

			if (isDefined(styles[current].components[id]))
			{
				for (p in styles[current].components[id])
					c.set(p, styles[current].components[id][p]);
			}
			else if (isDefined(styles[current].types[type]))
			{
				for (p in styles[current].types[type])
					c.set(p, styles[current].types[type][p]);
			}

			if (type == "ScriptPanel")
				c.repaint();
				
			if (type == "ScriptSlider")
			{
				if (c.getWidth() == c.getHeight())
					c.setLocalLookAndFeel(LookAndFeel.knob);
				else if (c.getWidth() > c.getHeight())
					c.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
				else
					c.setLocalLookAndFeel(LookAndFeel.verticalSlider);
			}
		}
	}
	
	// Function calls
	setComponentColours();
}