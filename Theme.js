namespace Theme
{
	reg current = 0;

	const styles = [
		{
			"components": {
				"pnlMain": {"bgColour": 0xff242220, "itemColour": 0xff242220, "itemColour2": 0xff242220},
				"pnlLibrary": {"bgColour": 0xff242220, "textColour": 0xffcdcdcd},
				"pnlHeader": {"bgColour": 0xff7c6c63, "itemColour": 0xff403e3c, "textColour": 0xffd7d0bc},
				"btnSettings": {"itemColour": 0xff403e3c, "itemColour2": 0xffd7d0bc},
				"btnPresetBrowser0": {"itemColour": 0xff968b81, "itemColour2": 0xffd7d0bc},
				"btnPreset0": {"itemColour": 0xff968b81, "itemColour2": 0xff695b54},
				"btnPreset1": {"itemColour": 0xff968b81, "itemColour2": 0xff695b54},
				"pnlFooter": {"bgColour": 0xff695b54, "itemColour": 0xffede6d8, "itemColour2": 0xffd7d0bc, "textColour": 0xffd7d0bc},
				"fltStats": {"textColour": 0xffa29b98},
				"knbMasterGain": {"bgColour": 0xff4c4441, "itemColour": 0xff7c6c63, "itemColour2": 0xffd7d0bc, "textColour": 0xff695b54},
				"knbMasterPan": {"bgColour": 0xff4c4441, "itemColour": 0xff7c6c63, "itemColour2": 0xffd7d0bc, "textColour": 0xff695b54},
				"btnSettingsTab0": {"bgColour": 0xff97675e, "itemColour": 0xff403e3c, "textColour": 0xffede6d8},
				"btnSettingsTab1": {"bgColour": 0xff97675e, "itemColour": 0xff403e3c, "textColour": 0xffede6d8},
				"pnlSettings": {"bgColour": 0xff594f4b, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc2bcae},
				"fltMidiLearn": {"bgColour": 0, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc0baac},
				"fltMidiChannel": {"bgColour": 0, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc0baac},
				"fltMidiSource": {"bgColour": 0, "itemColour": 0xff464241, "itemColour2": 0xff3a3635, "textColour": 0xffc0baac},
				"pnlSettingsTab0": {"bgColour": 0, "itemColour": 0, "itemColour2": 0, "textColour": 0xffc0baac},
				"fltAudioSettings": {"textColour": 0xffc0baac},
				"fltEngineSettings": {"textColour": 0xffc0baac},
				"pnlPresetBrowser": {"bgColour": 0xff524844, "itemColour": 0, "itemColour2": 0, "textColour": 0xffc0baac},
				"fltPresetBrowser": {"bgColour": 0, "itemColour": 0xff2a2625, "itemColour2": 0, "textColour": 0xffc0baac},
				"pnlPresetNotesBlocker": {"bgColour": 0xff524844, "itemColour": 0, "itemColour2": 0, "textColour": 0xffc0baac},
				"btnLibraryManager": {"bgColour": 0xff524844, "itemColour": 0xffc0baac, "itemColour2": 0, "textColour": 0xffc0baac},
				"cmbFilter": {"bgColour": 0xff393736, "itemColour": 0xffc1c1c1, "textColour": 0xffc1c1c1}
			},
			"types": {
				"ScriptComboBox": {"bgColour": 0xff393736, "itemColour": 0xff2d2a29, "textColour": 0xffc1c1c1}
			}
		}
	];
	
	// Functions
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
		}
	}
	
	// Function calls
	setComponentColours();
}