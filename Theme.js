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

namespace Theme
{    
    reg current = 0;
    
    // Functions
    inline function changeTheme(index)
    {
        THEME = styles[index];
        current = index;

        setComponentPropertiesFromTheme();
    }
    
    inline function repaintAllPanels()
    {
		for (c in Content.getAllComponents(""))
		{
		    if (c.get("id").indexOf("pnl") == 0)
		        c.repaint();
		}	    
    }
    
    inline function refresh()
    {
        changeTheme(current);
        repaintAllPanels();
    }
    
    inline function setLastTheme(index)
    {
        Engine.dumpAsJSON({"style":index}, "theme.json");
    }
    
    inline function getLastTheme()
    {
        local result = 0;
        
        local data = Engine.loadFromJSON("theme.json");
        
        if (data != undefined)
            result = data.style;

        return result;
    }
    
    inline function getStyleList()
    {
        local result = [];

        for (s in styles)
            result.push(s.id);

        return result;
    }
    
    inline function setComponentPropertiesFromTheme()
    {
        if (THEME == undefined)
        {
            THEME = styles[0];
            setLastTheme(0);
        }

        for (component in Content.getAllComponents(""))
        {
            local type = component.get("type");
            local properties;

            switch (type)
            {
                case "ScriptSlider":
                    
                    local style = component.get("style");
                    local text = component.get("text");
                    
                    properties = THEME[type][style].clone();

                    if (style == "Knob")
                    {
                        if (text.indexOf("-colourV2") != -1 && properties.itemColourV2 != undefined)
                            properties.itemColour = properties.itemColourV2;

                        if (text.indexOf("-colourV3") != -1 && properties.itemColourV3 != undefined)
                            properties.itemColour = properties.itemColourV3;
                    }
                        
                    break;
                    
                case "ScriptButton":
                
                    local id = component.get("id");
                    local text = component.get("text");

                    for (b in THEME[type])
                    {
                        if (id.indexOf(b) != -1 || text.indexOf(b) !=-1)
                        {
                            properties = THEME[type][b];
                            break;
                        }
                    }
                        
                    break;

                case "ScriptLabel":
                    properties = THEME[type][component.get("id")];
                    break;
                    
                case "ScriptFloatingTile":
                    properties = THEME[type][component.get("ContentType")];                    
                    break;

                default:
                    properties = THEME[type];
            }
            
            if (properties != undefined)
            {
                local c = component;
                local allProps = c.getAllProperties();

                for (p in properties)
                {
                    if (allProps.contains(p))
                        c.set(p, properties[p]);
                }                    
            }
        }
    }
    
    const styles = [
    {
            "id": "Zenith",
            "bgColour": 0xff302c2a,
            "logoColour": 0xffbbab9f,
            "header": {
                "bgColour": 0xff87746a,
                "textColour": 0xffede6d8
            },
            "footer": {
                "bgColour": 0xff695c54,
                "textColour": 0xfffbe9b4
            },
            "presetDisplay": {
                "bgColour": 0xff403e3c
            },
            "card": {
                "bgColour": 0xff3a3635,
                "bgColour2": 0x8fcbc8ae,
                "title": {
                    "height": 43,
                    "bgColour": 0xff5b504c,
                    "textColour": 0xfff6f5f1
                },
                "label": {
                    "textColour": 0xff98908e
                }
            },
            "articulations": {
                "itemColour": 0xff968b81,
                "itemColour2": 0xff5a5452,
                "textColour": Colours.ivory,
                "gainSlider":{
                    "bgColour":0xff413c3b,
                    "itemColour":0xff9f8369
                }
            },
            "table":{
              "bgColour": 0xff4c4441
            },
            "ScriptSlider": {
                "Knob": {
                    "bgColour": 0xff97675e,
                    "itemColour": 0xff97675e,
                    "itemColourV2":0xff6e514b,
                    "itemColourV3": 0xff6a5e58,
                    "itemColour2": 0xffcec7b5,
                    "textColour": 0xff524e4c
                },
                "Vertical": {
                    "bgColour": 0xff514a47,
                    "itemColour": 0xff6a5e58,
                    "itemColour2": 0xffcec7b5,
                    "textColour": 0xff524e4c
                },
                "Horizontal": {
                    "bgColour": 0xff514a47,
                    "itemColour": 0xff6a5e58,
                    "itemColour2": 0xffcec7b5,
                    "textColour": 0xff836e6b
                }                
            },
            "ScriptLabel":{
                "lblPreset":{
                    "textColour": 0xffd0b58e
                }
            },            
            "ScriptButton": {
                "btnAddExpansion": {
                    "textColour": 0xff3c1a13
                },
                "btnPreset": {
                    "itemColour": 0xff7c6c63
                },
                "btnSettingsTab":
                {
                    "bgColour": 0xff8c8780,
                    "itemColour":0xff9e6a5d,
                    "itemColour2":0xff504744,
                    "textColour": 0xffebe1d4
                },
                "btnSettings": {
                    "itemColour": 0xff5b504c,
                    "itemColour2": 0xffb6a79a
                },
                "btnPurge": {
                    "itemColour": 0xff7f726c,
                    "itemColour2": 0xffcec7b5
                },
                "icon": {
                    "itemColour": 0xffaaa591,
                    "itemColour2": 0xff333333
                }
            },
            "ScriptComboBox": {
                "bgColour": 0xff584d49,
                "textColour": Colours.white,
                "itemColour2": 0xff333333
            },
            "ScriptTable": {
                "bgColour":0x00,
                "itemColour": 0xff7a6052,
                "itemColour2": 0xffd2c2b2
            },
            "ScriptFloatingTile": {
                "AHDSRGraph": {
                    "bgColour":0x00,
                    "itemColour": 0xff8b7559,
                    "itemColour2": 0xff8b7559
                },
                "CustomSettings": {
                    "textColour": 0xff98908e
                },
                "MidiLearnPanel": {
                    "bgColour": 0x00,
                    "itemColour": 0xff474342,
                    "textColour": 0xff99958f
                },
                "AboutPagePanel": {
                    "itemColour": Colours.black,
                    "textColour": Colours.darkgrey
                },
                "PresetBrowser": {
                    "bgColour": 0x00000000,
                    "bgColour2": 0xff524844,
                    "itemColour": 0xff000000,
                    "textColour": Colours.black
                },
                "PerformanceLabel": {
                    "textColour": 0x5fffffff
                }
            }
        },
    ];
}
