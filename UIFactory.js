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

namespace UIFactory
{
	inline function createShell()
	{
		local a = [0, 0, 900, 689];

		Content.addPanel("pnlMain", 0, 0);
		Content.setPropertiesFromJSON("pnlMain", {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3]
		});

		createHeader();
		createFooter();
		
		Content.addPanel("pnlPlay", 0, 0);
		Content.setPropertiesFromJSON("pnlPlay", {
			"x": 0, "y": 61, "width": a[2], "height": a[3] - 191,
		    "parentComponent": "pnlMain"
		});
			
		createSettingsPanel();
		createPresetBrowser();

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

		Content.addButton("btnSettings", 0, 0);
		Content.setPropertiesFromJSON("btnSettings", {
			"x": 824 , "y": 19, "width": 22, "height": 22,
		    "parentComponent": "pnlHeader",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "text": "icon-settings"
		});
		
		Content.addButton("btnUnload", 0, 0);
		Content.setPropertiesFromJSON("btnUnload", {
			"x": 860 , "y": 22, "width": 16, "height": 16,
		    "parentComponent": "pnlHeader",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "text": "icon-eject"
		});
			
		Content.addLabel("lblPreset", 0, 0);
		Content.setPropertiesFromJSON("lblPreset", {
			"x": 427, "y": 15, "width": 365, "height": 28,
		    "parentComponent": "pnlHeader",
		    "text": "",
		    "editable": false
		});
		
		Content.addButton("btnPresetBrowser", 0, 0);
		Content.setPropertiesFromJSON("btnPresetBrowser", {
			"x": 10, "y": 10, "width": 15, "height": 11,
		    "parentComponent": "lblPreset",
		    "text": "iconOff-caretDown iconOn-caretUp",
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
		    "text": "icon-caretLeft"
		});
		
		Content.addButton("btnPreset1", 0, 0);
		Content.setPropertiesFromJSON("btnPreset1", {
			"x": 345, "y": 8, "width": 10, "height": 14,
		    "parentComponent": "lblPreset",
		    "saveInPreset": false,
		    "enableMidiLearn": false,
		    "isMomentary": true,
		    "text": "icon-caretRight"
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
		    "Data": "{\r\n  \"KeyWidth\": 15,\r\n  \"DisplayOctaveNumber\": true,\r\n  \"LowKey\": 14,\r\n  \"HiKey\": 127,\r\n  \"CustomGraphics\": false,\r\n  \"DefaultAppearance\": false,\r\n  \"BlackKeyRatio\": 0.699999988079071,\r\n  \"ToggleMode\": false,\r\n  \"MidiChannel\": 1,\r\n  \"UseVectorGraphics\": true,\r\n  \"UseFlatStyle\": false,\r\n  \"MPEKeyboard\": false,\r\n  \"MPEStartChannel\": 2,\r\n  \"MPEEndChannel\": 16\r\n}"		    
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
		    "processorId": "Master Gain",
		    "parameterId": "Gain"
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
		    "text": "pan-bipolar"
		});
	}

	inline function createPresetBrowser()
	{
		Content.addPanel("pnlPresetBrowser", 0, 0);
		Content.setPropertiesFromJSON("pnlPresetBrowser", {
			"x": 0, "y": 61, "width": 900, "height": 498,
		    "parentComponent": "pnlMain",
		    "saveInPreset": true,
		    "visible": false
		});
		
		Content.addFloatingTile("fltPresetBrowser", 0, 0);
		Content.setPropertiesFromJSON("fltPresetBrowser", {
			"x": 20, "y": 25, "width": 860, "height": 433,
		    "parentComponent": "pnlPresetBrowser",
		    "ContentType": "PresetBrowser",
		    "Font": "bold",
		    "FontSize": 14,
		    "Data": "{\r\n  \"ShowSaveButton\": true,\r\n  \"ShowExpansionsAsColumn\": false,\r\n  \"ShowFolderButton\": true,\r\n  \"ShowNotes\": true,\r\n  \"ShowEditButtons\": true,\r\n  \"ShowFavoriteIcon\": false,\r\n  \"NumColumns\": 3,\r\n  \"ColumnWidthRatio\": [\r\n    0.3333333333333333,\r\n    0.3333333333333333,\r\n    0.3333333333333333\r\n  ]\r\n}"
		});
		
		Content.addPanel("pnlPresetNotesBlocker", 0, 0);
		Content.setPropertiesFromJSON("pnlPresetNotesBlocker", {
			"x": 11, "y": 63, "width": 878, "height": 43,
			"parentComponent": "pnlPresetBrowser"
		});
	}

	inline function createSettingsPanel()
	{
		Content.addPanel("pnlSettings", 0, 0);
		Content.setPropertiesFromJSON("pnlSettings", {
			"x": 0, "y": 61, "width": 900, "height": 498,
		    "parentComponent": "pnlMain",
		    "visible": false
		});
	
		local text = ["toggle-text-AUDIO", "toggle-text-MIDI", "toggle-text-ENGINE"];

		for (i = 0; i < 3; i++)
		{
			Content.addButton("btnSettingsTab" + i, 0, 71);
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

		for (i = 0; i < 3; i++)
		{
			Content.addPanel("pnlSettingsTab" + i, 0, 0);
			Content.setPropertiesFromJSON("pnlSettingsTab" + i, {
			    "x": 35,
			    "y": 127,
			    "width": tabWidth,
			    "height": tabHeight,
			    "parentComponent": "pnlSettings",
			    "visible": false
			});
		}		
		
		Content.addFloatingTile("fltAudioSettings", 0, 0);
		Content.setPropertiesFromJSON("fltAudioSettings", {
		    "x": 180, "y": 2, "width": 400, "height": 235,
		    "parentComponent": "pnlSettingsTab0",
		    "ContentType": "CustomSettings",
		    "Data": "{\r\n  \"Driver\": true,\r\n  \"Device\": true,\r\n  \"Output\": true,\r\n  \"BufferSize\": true,\r\n  \"SampleRate\": true,\r\n  \"GlobalBPM\": false,\r\n  \"StreamingMode\": false,\r\n  \"ScaleFactor\": false,\r\n  \"VoiceAmountMultiplier\": false,\r\n  \"ClearMidiCC\": false,\r\n  \"SampleLocation\": false,\r\n  \"DebugMode\": false,\r\n  \"ScaleFactorList\": [\r\n    0.5,\r\n    0.75,\r\n    1.0,\r\n    1.25,\r\n    1.5,\r\n    2.0\r\n  ]\r\n}",
		    "Font": "bold",
		    "FontSize": 16.0
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
		
		Content.addFloatingTile("fltEngineSettings", 0, 0);
		Content.setPropertiesFromJSON("fltEngineSettings", {
		    "x": 180, "y": 2, "width": 400, "height": 235,
		    "parentComponent": "pnlSettingsTab2",
		    "ContentType": "CustomSettings",
		    "Data": "{\r\n  \"Driver\": false,\r\n  \"Device\": false,\r\n  \"Output\": false,\r\n  \"BufferSize\": false,\r\n  \"SampleRate\": false,\r\n  \"GlobalBPM\": true,\r\n  \"StreamingMode\": true,\r\n  \"ScaleFactor\": true,\r\n  \"VoiceAmountMultiplier\": true,\r\n  \"ClearMidiCC\": false,\r\n  \"SampleLocation\": false,\r\n  \"DebugMode\": false,\r\n  \"ScaleFactorList\": [\r\n    0.5,\r\n    0.75,\r\n    1.0,\r\n    1.25,\r\n    1.5,\r\n    2.0\r\n  ]\r\n}",
		    "Font": "bold",
		    "FontSize": 16.0
		});

		Content.addKnob("knbCoarseTuning", 0, 0);
		Content.setPropertiesFromJSON("knbCoarseTuning", {
		    "x": 351, "y": 183, "width": 188, "height": 20,
		    "text": "Coarse Tuning-bipolar",
		    "parentComponent": "pnlSettingsTab2",
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
		    "x": 351, "y": 218, "width": 188, "height": 20,
		    "text": "Fine Tuning-bipolar",
		    "parentComponent": "pnlSettingsTab2",
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
		    "x": 351, "y": 253, "width": 188, "height": 20,
		    "text": "Transpose-bipolar",
		    "parentComponent": "pnlSettingsTab2",
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
					"text": "Expression",
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
				    "text": "[r]SOFT,HARD[/r]",
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
				    "text": "Rate[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "defaultValue": 0.5,
				    "isPluginParameter": true,
				    "pluginParameterName": "Vibrato Rate",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO0",
				    "parameterId": "Frequency"
				}
			},
			{
				"id": "knbVibratoDepth",
				"properties": {
				    "text": "Depth[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "isPluginParameter": true,
				    "pluginParameterName": "Vibrato Depth",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO0",
				    "parameterId": "Value"
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
				    "text": "Growl[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "isPluginParameter": true,
				    "pluginParameterName": "Growl",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO1",
				    "parameterId": "Value"
				}
			},
			{
				"id": "knbFlutter",
				"properties": {
				    "text": "Flutter[r]0,100%[/r]",
				    "showValuePopup": "Right",
				    "isPluginParameter": true,
				    "pluginParameterName": "Flutter",
				    "mode": "NormalizedPercentage",
				    "processorId": "LFO2",
				    "parameterId": "Value"
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
				    "text": "Gain",
				    "isPluginParameter": true,
				    "pluginParameterName": "Release Trigger Gain",
				    "mode": "Decibel",
				    "max": -6.0,				    
				    "min": -100.0,
				    "defaultValue": -15.0,
				    "middlePosition": -18.0,
				    "stepSize": 0.1,
				    "showValuePopup": "Right"
				}
			}
		];
	
		createKnobPanel(parentId, "pnlRelease", a, data);
	}
	
	inline function createTablePanel(parentId, panelId, tableId, processorId, a)
	{
		Content.addPanel(panelId, 0, 0);
		Content.setPropertiesFromJSON(panelId, {
			"x": 0, "y": 0, "width": a[2], "height": a[3],
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
		    "processorId": processorId
		});
	}
	
	inline function createMixer(parentId, num_channels, a)
	{
		Content.addViewport("vptMixer", 0, 0);
		Content.setPropertiesFromJSON("vptMixer", {
			"x": a[0], "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": parentId,
			"saveInPreset": false,
			"scrollBarThickness": 10
		});
		
		Content.addPanel("pnlMixerControls", 0, 0);
		Content.setPropertiesFromJSON("pnlMixerControls", {
			"x": 0, "y": 0, "width": a[2] - 3, "height": a[3],
			"parentComponent": "vptMixer"
		});

		for (i = 0; i < num_channels; i++)
		{
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
				"processorId": "Simple Gain" + i,
				"parameterId": "Gain"
			});
			
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
				"processorId": "Simple Gain" + i,
				"parameterId": "Balance"
			});
						
			Content.addButton("btnPurge" + i, 0, 0);
			Content.setPropertiesFromJSON("btnPurge" + i, {
				"enableMidiLearn": false,
				"text": "icon-power",
				"parentComponent": "pnlMixerControls"
			});
			
			Content.addComboBox("cmbOutput" + i, 0, 0);
			Content.setPropertiesFromJSON("cmbOutput" + i, {
				"enableMidiLearn": false,
				"text": "Output",
				"parentComponent": "pnlMixerControls"
			});			
		}
	}
	
	inline function createArticulationList(parentId, a)
	{		
		Content.addViewport("vptArticulations", 0, 0);
		Content.setPropertiesFromJSON("vptArticulations",  {
			"x": 0, "y": a[1], "width": a[2], "height": a[3],
			"parentComponent": parentId,
			"saveInPreset": false,
			"scrollBarThickness": 10
		});
		
		Content.addPanel("pnlArticulationList", 0, 0);
		Content.setPropertiesFromJSON("pnlArticulationList",  {
			"x": 0, "y": 0, "width": a[2] - 10, "height": 25,
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
			Content.addKnob("knbAHDSR" + i, 0, 0);
			Content.setPropertiesFromJSON("knbAHDSR" + i, {
				"parentComponent": "pnlEnvelope",
				"style": "Knob",
				"saveInPreset": false,
				"isPluginParameter": true
			});
		}
		
		Content.setPropertiesFromJSON("knbAHDSR0", {
			"text": "Curve-colourV2[nodefault]",
			"pluginParameterName": "Attack Curve",
			"mode": "NormalizedPercentage",
			"middlePosition": 0.5,
			"defaultValue": 0.5,
			"showValuePopup": "Below"
		});
		
		Content.setPropertiesFromJSON("knbAHDSR1", {
			"text": "A-colourV3[nodefault]",
			"pluginParameterName": "Attack",
			"mode": "Time",
			"defaultValue": 5.0,
			"showValuePopup": "Below"
		});
		
		Content.setPropertiesFromJSON("knbAHDSR2", {
			"text": "H-colourV3[nodefault]",
			"pluginParameterName": "Hold",
			"mode": "Time",
			"defaultValue": 10.0,
			"showValuePopup": "Below"
		});
		
		Content.setPropertiesFromJSON("knbAHDSR3", {
			"text": "D-colourV3[nodefault]",
			"pluginParameterName": "Decay",
			"mode": "Time",
			"defaultValue": 1000.0,
			"showValuePopup": "Below"
		});
		
		Content.setPropertiesFromJSON("knbAHDSR4", {
			"text": "S-colourV3[nodefault]",
			"pluginParameterName": "Sustain",
			"mode": "Decibel",
			"defaultValue": -2.0,
			"showValuePopup": "Below"
		});
		
		Content.setPropertiesFromJSON("knbAHDSR5", {
			"text": "R-colourV3[nodefault]",
			"pluginParameterName": "Release",
			"mode": "Time",
			"defaultValue": 500.0,
			"showValuePopup": "Below"
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

