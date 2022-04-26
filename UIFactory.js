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

namespace UIFactory
{
	inline function createShell()
	{
		local a = [0, 0, 900, 689];

		Content.addPanel("pnlMain", 0, 0);
		Content.setPropertiesFromJSON("pnlMain", {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"bgColour": 0x00,
		    "borderSize": 0,
		    "borderRadius": 0
		});

		createHeader();
		createFooter();
		
		Content.addPanel("pnlPlay", 0, 0);
		Content.setPropertiesFromJSON("pnlPlay", {
			"x": 0, "y": 61, "width": a[2], "height": a[3] - 191,
		    "parentComponent": "pnlMain",
		    "bgColour": 0x00,
		    "itemColour": 0x00,
		    "itemColour2": 0x00,
		    "borderSize": 0,
		    "borderRadius": 0
		});
			
		createSettingsPanel();
		createPresetBrowser();
		createToolTipPanel();

		Content.addPanel("pnlSpinnerContainer", 0, 0);
		Content.setPropertiesFromJSON("pnlSpinnerContainer", {
			"x": 0, "y": 0, "width": a[2], "height": a[3],
		    "visible": false
		});
		
		Content.addPanel("pnlSpinner", 0, 0);
		Content.setPropertiesFromJSON("pnlSpinner", {
			"x": 0, "y": 0, "width": a[2], "height": a[3],
		    "parentComponent": "pnlSpinnerContainer"
		});

		Content.addPanel("pnlAbout", 0, 0);
		Content.setPropertiesFromJSON("pnlAbout", {
			"x": 0, "y": 0, "width": a[2], "height": a[3],
			"visible": false,
			"allowCallbacks": "Clicks Only"
		});
		
		createAdminPanel();
	}

	inline function createAdminPanel()
	{
		Content.addPanel("pnlAdmin", 0, 0);
		Content.setPropertiesFromJSON("pnlAdmin", {
			"x": 0, "y": 0, "width": 300, "height": 205,
		    "visible": false
		});
		
		Content.addKnob("knbPatch", 0, 0);
		Content.setPropertiesFromJSON("knbPatch", {
			"x": 0, "y": 0, "width": 128, "height": 48,
			"parentComponent": "pnlAdmin",
			"text": "Patch",
			"min": -1.0,
			"max": 50.0,
			"stepSize": 1.0,
			"middlePosition": 25.0,
			"enableMidiLearn": false
		});

		Content.addButton("btnBreathMode");
		Content.setPropertiesFromJSON("btnBreathMode", {
		    "x": 160, "y": 10, "width": 128, "height": 28,
		    "parentComponent": "pnlAdmin",
		    "text": "Breath",
		    "enableMidiLearn": false,
		    "processorId": "sampler0Legato",
		    "parameterId": "Breath"
		});
		
		Content.addButton("btnLoadDefault");
		Content.setPropertiesFromJSON("btnLoadDefault", {
		    "x": 160, "y": 50, "width": 128, "height": 28,
		    "parentComponent": "pnlAdmin",
		    "text": "Load Default",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "isMomentary": true
		});
		
		Content.addKnob("knbVibratoGain", 0, 0);
		Content.setPropertiesFromJSON("knbVibratoGain", {
			"x": 0, "y": 50, "width": 128, "height": 48,
			"parentComponent": "pnlAdmin",
			"text": "Vib Gain",
			"min": 0.0,
			"max": 1.0,
			"stepSize": 0.01,
			"middlePosition": 0.5,
			"enableMidiLearn": false,
			"isPluginParameter": true,
			"pluginParameterName": "Vibrato Gain",
			"processorId": "vibratoLFOHandler",
			"parameterId": "knbGain"
		});
		
		Content.addKnob("knbVibratoPitch", 0, 0);
		Content.setPropertiesFromJSON("knbVibratoPitch", {
			"x": 0, "y": 100, "width": 128, "height": 48,
			"parentComponent": "pnlAdmin",
			"text": "Vib Pitch",
			"min": 0.0,
			"max": 1.0,
			"stepSize": 0.01,
			"middlePosition": 0.5,
			"enableMidiLearn": false,
			"isPluginParameter": true,
			"pluginParameterName": "Vibrato Pitch",
			"processorId": "vibratoLFOHandler",
			"parameterId": "knbPitch"
		});
		
		Content.addKnob("knbVibratoTimbre", 0, 0);
		Content.setPropertiesFromJSON("knbVibratoTimbre", {
			"x": 0, "y": 150, "width": 128, "height": 48,
			"parentComponent": "pnlAdmin",
			"text": "Vib Timbre",
			"min": 0.0,
			"max": 1.0,
			"stepSize": 0.01,
			"middlePosition": 0.5,
			"enableMidiLearn": false,
			"isPluginParameter": true,
			"pluginParameterName": "Vibrato Timbre",
			"processorId": "vibratoLFOHandler",
			"parameterId": "knbXfade"
		});
	}

	inline function createHeader()
	{
		Content.addPanel("pnlHeader", 0, 0);
		Content.setPropertiesFromJSON("pnlHeader", {
			"x": 0, "y": 0, "width": 900, "height": 60,
			"parentComponent": "pnlMain"
		});

		Content.addButton("btnLibraryManager", 0, 0);
		Content.setPropertiesFromJSON("btnLibraryManager", {
			"x": 432, "y": 20, "width": 20, "height": 20,
			"parentComponent": "pnlHeader",
			"saveInPreset": false,
			"text": "eject",
			"isMomentary": true,
			"enableMidiLearn": false,
			"tooltip": "Unload this instrument and open the library manager."
		});

		Content.addButton("btnSettings", 0, 0);
		Content.setPropertiesFromJSON("btnSettings", {
			"x": 858 , "y": 17, "width": 26, "height": 26,
		    "parentComponent": "pnlHeader",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "text": "settings",
		    "tooltip": "Open the settings page."
		});

		Content.addLabel("lblPreset", 0, 0);
		Content.setPropertiesFromJSON("lblPreset", {
			"x": 474, "y": 15, "width": 365, "height": 28,
		    "parentComponent": "pnlHeader",
		    "text": "",
		    "textColour": 0xffd0b58e,
		    "fontName": "Bold",
		    "fontSize": 18,
		    "alignment": "centred",
		    "editable": false
		});
		
		Content.addButton("btnPresetBrowser0", 0, 0);
		Content.setPropertiesFromJSON("btnPresetBrowser0", {
			"x": 10, "y": 10, "width": 15, "height": 11,
		    "parentComponent": "lblPreset",
		    "text": "iconOff-caretDown iconOn-caretUp",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "tooltip": "Open the preset browser."
		});
		
		Content.addButton("btnPresetBrowser1", 0, 0);
		Content.setPropertiesFromJSON("btnPresetBrowser1", {
			"x": 30, "y": 0, "width": 285, "height": 28,
		    "parentComponent": "lblPreset",
		    "saveInPreset": false,
		    "enableMidiLearn": false
		});
		
		Content.addButton("btnPreset0", 0, 0);
		Content.setPropertiesFromJSON("btnPreset0", {
			"x": 323, "y": 8, "width": 10, "height": 14,
		    "parentComponent": "lblPreset",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "isMomentary": true,
		    "text": "triangleLeft",
		    "tooltip": "Load the previous preset."
		});
		
		Content.addButton("btnPreset1", 0, 0);
		Content.setPropertiesFromJSON("btnPreset1", {
			"x": 345, "y": 8, "width": 10, "height": 14,
		    "parentComponent": "lblPreset",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "isMomentary": true,
		    "text": "triangleRight",
		    "tooltip": "Load the next preset."
		});
	}
	
	inline function createFooter()
	{
		Content.addPanel("pnlFooter", 0, 0);
		Content.setPropertiesFromJSON("pnlFooter", {
			"x": 0, "y": 560, "width": 900, "height": 129,
			"parentComponent": "pnlMain"
		});
		
		Content.addFloatingTile("fltKeyboard", 0, 0);
		Content.setPropertiesFromJSON("fltKeyboard", {
			"x": 15, "y": 50, "width": 870, "height": 72,
			"ContentType": "Keyboard",
		    "parentComponent": "pnlFooter",
		    "Data": "{\n  \"KeyWidth\": 15.0,\n  \"DisplayOctaveNumber\": false,\n  \"LowKey\": 14,\n  \"HiKey\": 127,\n  \"CustomGraphics\": false,\n  \"DefaultAppearance\": false,\n  \"BlackKeyRatio\": 0.699999988079071,\n  \"ToggleMode\": false,\n  \"MidiChannel\": 1,\n  \"UseVectorGraphics\": true,\n  \"UseFlatStyle\": false,\n  \"MPEKeyboard\": false,\n  \"MPEStartChannel\": 2,\n  \"MPEEndChannel\": 16\n}"
		});
		
		Content.addFloatingTile("fltStats", 0, 0);
		Content.setPropertiesFromJSON("fltStats", {
			"x": 11, "y": 13, "width": 223, "height": 20,
		    "parentComponent": "pnlFooter",
		    "ContentType": "PerformanceLabel",
		    "updateAfterInit": true,
		    "Font": "bold",
		    "FontSize": 14
		});
		
		Content.addPanel("pnlVuMeter", 0, 0);
		Content.setPropertiesFromJSON("pnlVuMeter", {
			"x": 640, "y": 16, "width": 100, "height": 16,
			"parentComponent": "pnlFooter",
			"saveInPreset": false,
			"bgColour": 0xff514A47,
			"itemColour": 0xff000000
		});
		
		Content.addKnob("knbMasterGain", 0, 0);
		Content.setPropertiesFromJSON("knbMasterGain", {
			"x": 640, "y": 16, "width": 100, "height": 16,
		    "parentComponent": "pnlFooter",
		    "isPluginParameter": true,
		    "pluginParameterName": "Master Volume",
		    "mode": "Decibel",
		    "defaultValue": -6.0,
		    "showTextBox": false,
		    "dragDirection": "Horizontal",
		    "showValuePopup": "Below",
		    "style": "Horizontal",		    
		    "text": "Gain",
		    "processorId": "masterGain",
		    "parameterId": "Gain",
		    "tooltip": "Master volume."
		});

		Content.addKnob("knbMasterPan", 0, 0);
		Content.setPropertiesFromJSON("knbMasterPan", {
			"x": 804, "y": 16, "width": 80, "height": 16,
		    "parentComponent": "pnlFooter",
		    "isPluginParameter": true,
		    "pluginParameterName": "Master Pan",
		    "dragDirection": "Horizontal",
		    "showValuePopup": "Below",
		    "showTextBox": false,
		    "mode": "Pan",
		    "style": "Horizontal",
		    "text": "pan-bipolar",
		    "tooltip": "Master pan."
		});
		
		Content.addButton("btnPanic", 0, 0);
		Content.setPropertiesFromJSON("btnPanic", {
			"x": 6, "y": 6, "width": 200, "height": 30,
			"parentComponent": "pnlFooter",
			"saveInPreset": false,
			"isMomentary": true,
			"enableMidiLearn": false,
			"tooltip": ""
		});
		
		Content.addButton("btnAbout", 0, 0);
		Content.setPropertiesFromJSON("btnAbout", {
			"x": 375, "y": 8, "width": 147, "height": 30,
			"parentComponent": "pnlFooter",
			"saveInPreset": false,
			"isMomentary": true,
			"enableMidiLearn": false,
			"tooltip": ""
		});		
	}

	inline function createToolTipPanel()
	{
		Content.addPanel("pnlTooltip", 0, 0);
		Content.setPropertiesFromJSON("pnlTooltip", {
			"x": 0, "y": 645, "width": 900, "height": 42,
			"parentComponent": "pnlMain",
			"saveInPreset": false,
			"bgColour": "0",
			"itemColour": 0x30000000,
			"itemColour2": 0x30000000,
			"textColour": 0xc4ffffff,
			"borderSize": 0.0,
			"borderRadius": 0.0
		});
	}

	inline function createPresetBrowser()
	{
		Content.addPanel("pnlPresetBrowser", 0, 0);
		Content.setPropertiesFromJSON("pnlPresetBrowser", {
			"x": 13, "y": 68, "width": 874, "height": 484,
		    "parentComponent": "pnlMain",
		    "visible": false
		});
		
		Content.addFloatingTile("fltPresetBrowser", 0, 0);
		Content.setPropertiesFromJSON("fltPresetBrowser", {
			"x": 13, "y": 14, "width": 848, "height": 455,
		    "parentComponent": "pnlPresetBrowser",
		    "ContentType": "PresetBrowser",
		    "Font": "bold",
		    "FontSize": 14,
		    "Data": "{\n  \"ShowSaveButton\": true,\n  \"ShowExpansionsAsColumn\": true,\n  \"ShowFolderButton\": true,\n  \"ShowNotes\": true,\n  \"ShowEditButtons\": true,\n  \"EditButtonOffset\": 15,\n  \"ButtonsInsideBorder\": true,\n  \"ShowAddButton\": false,\n  \"ShowRenameButton\": true,\n  \"ShowDeleteButton\": true,\n  \"ShowFavoriteIcon\": true,\n  \"NumColumns\": 3,\n  \"ColumnWidthRatio\": [\n    0.3333333333333333,\n    0.3333333333333333,\n    0.3333333333333333\n  ],\n  \"ListAreaOffset\": [\n    0,\n    10,\n    -5,\n    -20\n  ],\n  \"ColumnRowPadding\": [\n    0,\n    0,\n    0,\n    0\n  ],\n  \"SearchBarBounds\": [\n    200,\n    4,\n    500,\n    32\n  ],\n  \"FavoriteButtonBounds\": [\n    136,\n    5,\n    30,\n    30\n  ]\n}"
		});
		
		Content.addPanel("pnlPresetNotesBlocker", 0, 0);
		Content.setPropertiesFromJSON("pnlPresetNotesBlocker", {
			"x": 18, "y": 54, "width": 837, "height": 38,
			"parentComponent": "pnlPresetBrowser"
		});
	}

	inline function createSettingsPanel()
	{
		Content.addPanel("pnlSettings", 0, 0);
		Content.setPropertiesFromJSON("pnlSettings", {
			"x": 13, "y": 68, "width": 874, "height": 484,
		    "parentComponent": "pnlMain",
		    "visible": false
		});
	
		local text = ["ENGINE", "MIDI"];

		for (i = 0; i < text.length; i++)
		{
			Content.addButton("btnSettingsTab" + i, 0, 68);
			Content.setPropertiesFromJSON("btnSettingsTab" + i, {
				"width": 120,
				"height": 34,
				"parentComponent": "pnlSettings",
				"text": text[i],
				"saveInPreset": false,
				"enableMidiLearn": false
			});
		}
		
		local tabWidth = 830;
		local tabHeight = 344;

		for (i = 0; i < text.length; i++)
		{
			Content.addPanel("pnlSettingsTab" + i, 0, 0);
			Content.setPropertiesFromJSON("pnlSettingsTab" + i, {
			    "x": 22,
			    "y": 127,
			    "width": tabWidth,
			    "height": tabHeight,
			    "parentComponent": "pnlSettings",
			    "visible": false
			});
		}
		
		Content.addFloatingTile("fltAudioSettings", 0, 0);
		Content.setPropertiesFromJSON("fltAudioSettings", {
		    "x": 0, "y": 7, "width": 400, "height": 300,
		    "parentComponent": "pnlSettingsTab0",
		    "ContentType": "CustomSettings",
		    "Data": "{\n  \"Driver\": true,\n  \"Device\": true,\n  \"Output\": true,\n  \"BufferSize\": true,\n  \"SampleRate\": true,\n  \"GlobalBPM\": false,\n  \"StreamingMode\": false,\n  \"ScaleFactor\": false,\n  \"VoiceAmountMultiplier\": false,\n  \"ClearMidiCC\": false,\n  \"SampleLocation\": false,\n  \"DebugMode\": false,\n  \"UseOpenGL\": false,\n  \"ScaleFactorList\": [\n    0.5,\n    0.75,\n    1.0,\n    1.25,\n    1.5,\n    2.0\n  ]\n}",
		    "Font": "bold",
		    "FontSize": 16.0
		});

		Content.addFloatingTile("fltEngineSettings", 0, 0);
		Content.setPropertiesFromJSON("fltEngineSettings", {
		    "x": 400, "y": 7, "width": 400, "height": 300,
		    "parentComponent": "pnlSettingsTab0",
		    "ContentType": "CustomSettings",
		    "Data": "{\n  \"Driver\": false,\n  \"Device\": false,\n  \"Output\": false,\n  \"BufferSize\": false,\n  \"SampleRate\": false,\n  \"GlobalBPM\": true,\n  \"StreamingMode\": true,\n  \"ScaleFactor\": true,\n  \"VoiceAmountMultiplier\": true,\n  \"ClearMidiCC\": false,\n  \"SampleLocation\": false,\n  \"UseOpenGL\": false,\n  \"DebugMode\": false,\n  \"ScaleFactorList\": [\n    0.5,\n    0.75,\n    1.0,\n    1.25,\n    1.5,\n    2.0\n  ]\n}",
		    "Font": "bold",
		    "FontSize": 16.0
		});
		
		Content.addKnob("knbCoarseTuning", 0, 0);
		Content.setPropertiesFromJSON("knbCoarseTuning", {
		    "x": 173, "y": 225, "width": 188, "height": 20,
		    "text": "Coarse Tuning-bipolar",
		    "parentComponent": "pnlSettingsTab0",
		    "style": "Horizontal",
		    "min": -12.0,
		    "max": 12.0,
		    "middlePosition": 0.0,
		    "suffix": "st",
		    "stepSize": 1.0,
		    "isPluginParameter": true,
		    "pluginParameterName": "Coarse Tuning",
		    "showTextBox": false,
		    "showValuePopup": "Above",
		    "processorId": "coarseFineTune",
		    "parameterId": "Coarse"
		});
		
		Content.addKnob("knbFineTuning", 0, 0);
		Content.setPropertiesFromJSON("knbFineTuning", {
		    "x": 173, "y": 258, "width": 188, "height": 20,
		    "text": "Fine Tuning-bipolar",
		    "parentComponent": "pnlSettingsTab0",
		    "style": "Horizontal",
		    "min": -100.0,
		    "max": 100.0,
		    "middlePosition": 0.0,
		    "suffix": "ct",
		    "stepSize": 1.0,
		    "isPluginParameter": true,
		    "pluginParameterName": "Fine Tuning",
		    "showTextBox": false,
		    "showValuePopup": "Above",		    
		    "processorId": "coarseFineTune",
		    "parameterId": "Fine"
		});
		
		Content.addKnob("knbTranspose", 0, 0);
		Content.setPropertiesFromJSON("knbTranspose", {
		    "x": 173, "y": 291, "width": 188, "height": 20,
		    "text": "Transpose",
		    "parentComponent": "pnlSettingsTab0",
		    "style": "Horizontal",
		    "min": -2.0,
		    "max": 2.0,
		    "middlePosition": 0.0,
		    "suffix": "st",
		    "stepSize": 1.0,
		    "isPluginParameter": true,
		    "pluginParameterName": "Transpose",
		    "showTextBox": false,
		    "showValuePopup": "Above",		    
		    "processorId": "transposer",
		    "parameterId": "SemiTone"
		});

		Content.addButton("btnDebug", 0, 0);
		Content.setPropertiesFromJSON("btnDebug" + i, {
			"x": 573, "y": 183, "width": 188, "height": 30,
			"parentComponent": "pnlSettingsTab0",
			"text": "Debug Mode",
			"saveInPreset": false,
			"bgColour": 0xff584d49,
			"itemColour":0xff8b7559,
			"itemColour2": 0x0,
			"textColour": Colours.white,
			"enableMidiLearn": false
		});
		
		Content.addButton("btnSampleLocation", 0, 0);
		Content.setPropertiesFromJSON("btnSampleLocation" + i, {
			"x": 573, "y": 223, "width": 188, "height": 30,
			"parentComponent": "pnlSettingsTab0",
			"text": "Relocate Samples",
			"saveInPreset": false,
			"bgColour": 0xff584d49,
			"itemColour":0xff8b7559,
			"itemColour2": 0x0,
			"textColour": Colours.white,
			"enableMidiLearn": false,
			"isMomentary": true
		});
		
		Content.addPanel("pnlSampleLocation", 0, 0);
		Content.setPropertiesFromJSON("pnlSampleLocation" + i, {
			"x": 520, "y": 269, "width": 280, "height": 60,
			"parentComponent": "pnlSettingsTab0",
			"saveInPreset": false,
			"bgColour": 0x0,
			"itemColour":0x0,
			"itemColour2": 0x0,
			"textColour": 0xffc0baac,
			"allowCallbacks": "Clicks Only",
			"enableMidiLearn": false
		});

		Content.addFloatingTile("fltMidiLearn", 0, 0);
		Content.setPropertiesFromJSON("fltMidiLearn", {
			"x": 285, "y": 54, "width": 520, "height": 266,
		    "parentComponent": "pnlSettingsTab1",
		    "Font": "bold",
		    "FontSize": 16.0,
		    "ContentType": "MidiLearnPanel",
		    "Data": "{\r\n}"
		});
		
		Content.addFloatingTile("fltMidiChannel", 0, 0);
		Content.setPropertiesFromJSON("fltMidiChannel", {
			"x": 22, "y": 49, "width": 205, "height": 100,
		    "parentComponent": "pnlSettingsTab1",
		    "Font": "bold",
		    "FontSize": 16.0,
		    "ContentType": "MidiChannelList",
		    "Data": "{\r\n}"
		});
		
		Content.addFloatingTile("fltMidiSource", 0, 0);
		Content.setPropertiesFromJSON("fltMidiSource", {
			"x": 22, "y": 256, "width": 205, "height": 64,
		    "parentComponent": "pnlSettingsTab1",
		    "Font": "bold",
		    "FontSize": 16.0,
		    "ContentType": "MidiSources",
		    "Data": "{\r\n}"
		});
	}
	
	inline function createKnobPanel(parentId, id, a, data)
	{
		Content.addPanel(id, 0, 0);
		Content.setPropertiesFromJSON(id, {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": parentId,
		});
		
		local col = a[2] / data.length;

		for (i = 0; i < data.length; i++)
		{
			if (!isDefined(data[i].properties))
				data[i].properties = {};

			if (data[i].properties.x == undefined)
				data[i].properties.x = col * i + col / 2 - 55 / 2;
				
			data[i].properties.y = 85;
			data[i].properties.width = 55;
			data[i].properties.height = 55;
			data[i].properties.parentComponent = id;
			
			Content.addKnob(data[i].id, 0, 0);
			Content.setPropertiesFromJSON(data[i].id,  data[i].properties);
		}
	}
	
	inline function spaceControlsHorizontally(panelId, controlIds)
	{
		local panel = Content.getAllComponents(panelId)[0];

		local a = [0, 0, panel.getWidth(), panel.getHeight()];
		local col = a[2] / controlIds.length;
	
		for (i = 0; i < controlIds.length; i++)
		{
			local id = controlIds[i];
			local c = Content.getAllComponents(id)[0];
			
			c.set("x", col * i + col / 2 - c.getWidth() / 2);			
		}
	}
	
	inline function createDynamicsPanel(parentId, a)
	{
		local data = [
			{
				"id": "knbExpression",
				"properties": {
					"text": "EXPRESSION",
				    "isPluginParameter": true,
				    "pluginParameterName": "Expression",
				    "max": 127.0,
				    "defaultValue": 64.0,
				    "middlePosition": 64.0,
				    "stepSize": 1.0,
				    "showTextBox": false,
				    "showValuePopup": "Below",
				    "processorId": "ccExpression",
				    "parameterId": "DefaultValue"
				}
			},
			{
				"id": "knbDynamics",
				"properties": {
				    "text": "DYNAMICS[r]SOFT,HARD[/r]",
				    "isPluginParameter": true,
				    "pluginParameterName": "Dynamics",
				    "max": 127.0,
				    "defaultValue": 64.0,
				    "middlePosition": 64.0,
				    "stepSize": 1.0,
				    "showTextBox": false,
				    "showValuePopup": "Below",
				    "processorId": "ccDynamics",
				    "parameterId": "DefaultValue"
				}
			}
		];
		
		createKnobPanel(parentId, "pnlDynamics", a, data);
	}
	
	inline function createVibratoPanel(parentId, a)
	{
		local data = [
			{
				"id": "knbVibratoRate",
				"properties": {
				    "text": "RATE[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "defaultValue": 0.5,
				    "isPluginParameter": true,
				    "pluginParameterName": "Vibrato Rate",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO0",
				    "parameterId": "Frequency",
				    "tooltip": "Controls the speed of vibrato."
				}
			},
			{
				"id": "knbVibratoDepth",
				"properties": {
				    "text": "DEPTH[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "isPluginParameter": true,
				    "pluginParameterName": "Vibrato Depth",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO0",
				    "parameterId": "Value",
				    "tooltip": "Controls the amount of vibrato."
				}
			}
		];	

		createKnobPanel(parentId, "pnlVibrato", a, data);
	}
	
	inline function createGrowlFlutterPanel(parentId, a)
	{
		local data = [
			{
				"id": "knbGrowl",
				"properties": {
				    "text": "GROWL[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "isPluginParameter": true,
				    "pluginParameterName": "Growl",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO1",
				    "parameterId": "Value",
				    "tooltip": "Controls the speed of growl."
				}
			},
			{
				"id": "knbFlutter",
				"properties": {
				    "text": "FLUTTER[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "isPluginParameter": true,
				    "pluginParameterName": "Flutter",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO2",
				    "parameterId": "Value",
				    "tooltip": "Controls the speed of flutter tongue."
				}
			}
		];

		createKnobPanel(parentId, "pnlGrowlFlutter", a, data);
	}
	
	inline function createReleasePanel(parentId, a)
	{
		local data = [
			{
				"id": "knbReleaseGain",
				"properties": {
				    "text": "GAIN",
				    "isPluginParameter": true,
				    "pluginParameterName": "Release Trigger Gain",
				    "mode": "Decibel",
				    "max": -6.0,				    
				    "min": -100.0,
				    "defaultValue": -15.0,
				    "middlePosition": -18.0,
				    "stepSize": 0.1,
				    "showValuePopup": "Right",
				    "tooltip": "Release samples volume."
				}
			}
		];
	
		createKnobPanel(parentId, "pnlRelease", a, data);
	}
	
	inline function createTablePanel(parentId, panelId, tableId, processorId, a)
	{
		Content.addPanel(panelId, 0, 0);
		Content.setPropertiesFromJSON(panelId, {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": parentId
		});
		
		local tableWidth = Math.round(a[3] * 0.81);
		
		Content.addTable(tableId, 0, 0);
		Content.setPropertiesFromJSON(tableId, {
			"x": a[2] / 2 - tableWidth / 2,
			"y": a[3] / 2 - tableWidth / 2,
			"width": tableWidth,
			"height": tableWidth,
			"parentComponent": panelId,
		    "processorId": processorId,
		    "customColours": true
		});
	}
		
	inline function createMixer(num_channels, a)
	{
		Content.addPanel("pnlMixer", 0, 0);
		Content.setPropertiesFromJSON("pnlMixer", {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": "pnlPlay"
		});

		Content.addViewport("vptMixer", 0, 0);
		Content.setPropertiesFromJSON("vptMixer", {
			"x": 0, "y": 42, "width": a[2], "height": a[3] - 42,
			"parentComponent": "pnlMixer",
			"saveInPreset": false,
			"scrollBarThickness": 10
		});
		
		Content.addPanel("pnlMixerControls", 0, 0);
		Content.setPropertiesFromJSON("pnlMixerControls", {
			"x": 0, "y": 0, "width": a[2] - 3, "height": a[3] - 42,
			"parentComponent": "vptMixer"
		});

		for (i = 0; i < num_channels; i++)
		{
			Content.addKnob("knbPan" + i, 0, 0);
			Content.setPropertiesFromJSON("knbPan" + i, {
				"mode": "Pan",
				"style": "Knob",
				"showValuePopup": "Below",
				"showTextBox": false,
				"isPluginParameter": true,
				"pluginParameterName": "Channel " + (i + 1) + " pan",
				"text": "Pan-colourV2[nodefault]",
				"parentComponent": "pnlMixerControls",
				"processorId": "mixerGain" + i,
				"parameterId": "Balance",
				"tooltip": "Set the channel's pan."
			});
			
			Content.addKnob("knbGain" + i, 0, 0);
			Content.setPropertiesFromJSON("knbGain" + i, {
				"mode": "Decibel",
				"max": 3.0,
				"style": "Vertical",
				"defaultValue": -3,
				"showValuePopup": "Right",
				"showTextBox": false,
				"isPluginParameter": true,
				"pluginParameterName": "Channel " + (i + 1) + " volume",
				"text": "Gain",
				"parentComponent": "pnlMixerControls",
				"processorId": "mixerGain" + i,
				"parameterId": "Gain",
				"tooltip": "Set the channel's volume."
			});

			if (i == num_channels - 1)
			{
				Content.setPropertiesFromJSON("knbGain" + i, {
					"showValuePopup": "left"				
				});
			}
	
			Content.addButton("btnPurge" + i, 0, 0);
			Content.setPropertiesFromJSON("btnPurge" + i, {
				"enableMidiLearn": false,
				"text": "icon-power",
				"parentComponent": "pnlMixerControls",
				"tooltip": "Purge or load this channel's samples."
			});
			
			Content.addComboBox("cmbOutput" + i, 0, 0);
			Content.setPropertiesFromJSON("cmbOutput" + i, {
				"enableMidiLearn": false,
				"text": "Output",
				"parentComponent": "pnlMixerControls",
				"items": "1/2",
				"tooltip": "Set the channel's output."
			});			
		}
	}
	
	inline function createArticulationList(a)
	{	
		Content.addPanel("pnlArticulations", 0, 0);
		Content.setPropertiesFromJSON("pnlArticulations",  {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": "pnlPlay"
		});

		Content.addViewport("vptArticulations", 0, 0);
		Content.setPropertiesFromJSON("vptArticulations",  {
			"x": 10, "y": 53, "width": a[2] - 13, "height": a[3] - 60,
			"parentComponent": "pnlArticulations",
			"saveInPreset": false,
			"scrollBarThickness": 10
		});
		
		Content.addPanel("pnlArticulationList", 0, 0);
		Content.setPropertiesFromJSON("pnlArticulationList",  {
			"x": 0, "y": 0, "width": a[2] - 20, "height": 25,
			"parentComponent": "vptArticulations",
			"saveInPreset": true,
			"allowCallbacks": "All Callbacks"
		});

		Content.addPanel("pnlArticulationGain", 0, 0);
		Content.setPropertiesFromJSON("pnlArticulationGain", {
			"parentComponent": "pnlArticulationList",
			"allowCallbacks": "All Callbacks"
		});

		Content.addSliderPack("slpArticulationGain", 0, 0);
		Content.setPropertiesFromJSON("slpArticulationGain", {
			"parentComponent": "pnlArticulationList",
			"saveInPreset": true,
			"sliderAmount": 25,
			"stepSize": 0.01,
			"min": 0.0,
			"max": 1.0,
			"flashActive": false,
			"showValueOverlay": false,
			"visible": false
		});
	}

	inline function createEnvelope(parentId, processorId, a)
	{
		Content.addPanel("pnlEnvelope", 0, 0);
		Content.setPropertiesFromJSON("pnlEnvelope",  {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": parentId,
		});
		
		local fltEnvelope = Content.addFloatingTile("fltEnvelope", 0, 0);
		local tileData = {"Type": "AHDSRGraph"};
		fltEnvelope.setContentData(tileData);
		Content.setPropertiesFromJSON("fltEnvelope",  {
			"x": 10, "y": 10, "width": a[2] - 20, "height": a[3] - 80,
			"parentComponent": "pnlEnvelope",
			"Data": "{\r\n  \"ProcessorId\": \"\",\r\n  \"Index\": -1\r\n}"
		});

		for (i = 0; i < 6; i++)
		{
			local x = i == 0 ? 22 : Math.round(70 + ((i - 1) * ((a[2] - 22 - 60) / 5)));

			Content.addKnob("knbAHDSR" + i, 0, 0);
			Content.setPropertiesFromJSON("knbAHDSR" + i, {
				"x": x, "y": a[3] - 38, "width": 30, "height": 30,
				"parentComponent": "pnlEnvelope",
				"style": "Knob",
				"saveInPreset": false,
				"isPluginParameter": true
			});
		}
		
		Content.setPropertiesFromJSON("knbAHDSR0", {
			"text": "CURVE[nodefault]",
			"pluginParameterName": "Attack Curve",
			"mode": "NormalizedPercentage",
			"middlePosition": 0.5,
			"defaultValue": 0.5,
			"showValuePopup": "Below",
			"tooltip": "Envelope attack curve."
		});
		
		Content.setPropertiesFromJSON("knbAHDSR1", {
			"text": "A[nodefault]",
			"pluginParameterName": "Attack",
			"mode": "Time",
			"defaultValue": 5.0,
			"showValuePopup": "Below",
			"tooltip": "Envelope attack time."
		});
		
		Content.setPropertiesFromJSON("knbAHDSR2", {
			"text": "H[nodefault]",
			"pluginParameterName": "Hold",
			"mode": "Time",
			"defaultValue": 10.0,
			"showValuePopup": "Below",
			"tooltip": "Envelope hold time."
		});
		
		Content.setPropertiesFromJSON("knbAHDSR3", {
			"text": "D[nodefault]",
			"pluginParameterName": "Decay",
			"mode": "Time",
			"defaultValue": 1000.0,
			"showValuePopup": "Below",
			"tooltip": "Envelope decay time."
		});
		
		Content.setPropertiesFromJSON("knbAHDSR4", {
			"text": "S[nodefault]",
			"pluginParameterName": "Sustain",
			"mode": "Decibel",
			"defaultValue": -2.0,
			"showValuePopup": "Below",
			"tooltip": "Envelope sustain level."
		});
		
		Content.setPropertiesFromJSON("knbAHDSR5", {
			"text": "R[nodefault]",
			"pluginParameterName": "Release",
			"mode": "Time",
			"defaultValue": 500.0,
			"showValuePopup": "Below",
			"tooltip": "Envelope release time."
		});

		Content.addSliderPack("slpAHDSR", 0, 0);
		Content.setPropertiesFromJSON("slpAHDSR", {
			"parentComponent": "pnlEnvelope",
			"saveInPreset": true,
			"min": -100,
			"max": 20000,
			"sliderAmount": 250,
			"stepSize": 0.01,
			"flashActive": false,
			"showValueOverlay": false,
			"visible": false
		});
	}
}

