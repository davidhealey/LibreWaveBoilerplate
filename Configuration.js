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

namespace Configuration
{
	const keyRanges = [];
	const keySwitches = [];	

	// masterChain
	const containerIds = Synth.getIdList("Container");
	const masterChain = Synth.getChildSynth(containerIds[0]);	

	// Midi Muters
	const masterMuter = Synth.getMidiProcessor("masterMidiMuter");
	const muterIds = Synth.getIdList("MidiMuter");
	const muters = [];
	
	for (id in muterIds)
	{
		if (id != "masterMidiMuter")
			muters.push(Synth.getMidiProcessor(id));
	}

	// MIDI Processors
	const noteRangeFilter = Synth.getMidiProcessor("noteRangeFilter");
	const processorIds = Synth.getIdList("Script Processor");
	const scriptProcessors = [];
	    
	for (id in processorIds)
	    scriptProcessors.push(Synth.getMidiProcessor(id));
	     
	const processorAttributeIds = getAttributeIds(scriptProcessors);
	
	// Modulators
	const modulatorIds = [];
	const modulators = [];
	
	for (m in Synth.getAllModulators(""))
	{
	    var id = m.getId();
	
	    if (m.getType() == "ModulatorChain") continue;
	
	    modulatorIds.push(id);
	    modulators.push(m);
	}
	
	const modulatorAttributeIds = getAttributeIds(modulators);
		
	// Effects
	const effectIds = [];
	const effects = [];
	
	for (e in Synth.getAllEffects(""))
	{        
	    effectIds.push(e.getId());
	    effects.push(e);
	}    
	
	const effectAttributeIds = getAttributeIds(effects);
		
	// Samplers
	const samplerIds = Synth.getIdList("Sampler");
	const samplers = [];

	for (id in samplerIds)
    	samplers.push(Synth.getChildSynth(id));
    
	const samplerAttributeIds = getAttributeIds(samplers);

	// Functions
    inline function getAttributeIds(modules)
    {
        local result = {};
        local i;
        
        for (m in modules)
        {
            result[m.getId()] = [];
            
            for (i = 0; i < m.getNumAttributes(); i++)
                result[m.getId()].push(m.getAttributeId(i));
        }
        
        return result;
    }
    
    inline function toggleModulesBypass(modules, ignoreIds, state)
    {
        for (m in modules)
        {
            if (ignoreIds.contains(m.getId()) != -1) continue;
            m.setBypassed(state);
        }
    }
    
    inline function bypassAllModules()
    {
        toggleModulesBypass(scriptProcessors, ["Interface"], true);
        toggleModulesBypass(modulators, [], true);
        toggleModulesBypass(effects, [], true);
    }
    
    inline function enableAllModules()
    {
        toggleModulesBypass(scriptProcessors, ["Interface"], false);
        toggleModulesBypass(modulators, [], false);
        toggleModulesBypass(effects, [], false);
    }
    
    inline function setAttributes(modules, moduleIds, attributeIds, data)
    {
        Console.assertTrue(Array.isArray(data));

        for (d in data)
        {
            local props = d.properties;
            local index = moduleIds.indexOf(d.id);

            if (index != -1)
            {
                // Enable the module
                modules[index].setBypassed(false);

                // Get attribute Ids
                local id = d.id;
                local attributes = attributeIds[id];

                // Set attribute values
                if (props != undefined)
                {
                    for (p in props)
                    {
                        if (!attributes.contains(p) && p != "Bypass" && p != "Intensity") continue;

                        if (p == "Bypass")
                            modules[index].setBypassed(props[p]);
                        else if (p == "Gain" && samplerIds.contains(id))
                            modules[index].setAttribute(attributes.indexOf(p), Engine.getGainFactorForDecibels(props[p]));
                        else if (p == "Intensity")
                            modules[index].setIntensity(props[p]);
                        else if (attributes.contains(p))
                            modules[index].setAttribute(attributes.indexOf(p), props[p]);
                    }
                }
            }
            else
            {
                Console.print(d.id);
                Console.assertTrue(index != -1);
            }
        }
    }
    
    inline function loadSampleMaps(data)
    {
        if (isDefined(data))
        {            
            // Get IDs of samplers used by patch
            local patchSamplerIds = [];
        
            for (x in data)
                patchSamplerIds.push(x.id);

            for (i = 0; i < samplerIds.length; i++)
            {
                local id = samplerIds[i];
            
                if (patchSamplerIds.contains(id))
                {
                    local sampleMap = data[patchSamplerIds.indexOf(id)].SampleMap;

                    samplers[i].setBypassed(false);
                    samplers[i].asSampler().loadSampleMap(sampleMap);
                }
                else
                {
                    samplers[i].setBypassed(true);
                    samplers[i].asSampler().clearSampleMap();
                    samplers[i].setAttribute(samplers[i].VoiceAmount, 1);  
                    samplers[i].setAttribute(samplers[i].VoiceLimit, 1);
                }            
            }
        }
    }
    
	inline function setAllMutersIgnoreState(state)
	{
        for (m in muters)
            m.setAttribute(m.ignoreButton, state);
	}
	
	inline function setKeyColours(index)
	{
		local kr = keyRanges[index];

		if (isDefined(kr))
		{
			for (i = 0; i < 127; i++)
				Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.6));
	
			for (r in kr)
	       	{
				for (i = 0; i < 127; i++)
				{
					if (i >= r[0] && i <= r[1])
						Engine.setKeyColour(i, r[2]);
				}
			}
		}
	}
	
	inline function setNoteRangeFilter(index)
	{
		local kr = keyRanges[index];

		noteRangeFilter.setAttribute(noteRangeFilter.LowNote, kr[0][0]);
		noteRangeFilter.setAttribute(noteRangeFilter.HighNote, kr[0][1]);
	}
	
	inline function enableAllComponents(exceptions)
	{
		for (c in Content.getAllComponents(""))
		{
			if (!c.get("enabled"))
				c.set("enabled", exceptions.indexOf(c.get("id")) == -1);
		}
	}
	
	inline function updateKeyRanges(patch)
	{
		local patchArts = patch.articulations;

		keyRanges.clear();
	
		for (i = 0; i < patchArts.active.length; i++)
		{
			local range = [];
			
			if (isDefined(patch.keyRanges))
				range = patch.keyRanges.clone();
			else if (isDefined(Manifest.keyRanges))
				range = Manifest.keyRanges.clone();
	
			keyRanges[patchArts.active[i]] = range;
	
			if (isDefined(patchArts.keyRanges[i]))
			{
				for (j = 0; j < patchArts.keyRanges[i].length; j++)
					range[j] = patchArts.keyRanges[i][j];
			}
			else if (isDefined(Manifest.articulations[patchArts.active[i]].keyRanges))
			{
				for (j = 0; j < Manifest.articulations[patchArts.active[i]].keyRanges.length; j++)
					range[j] = Manifest.articulations[patchArts.active[i]].keyRanges[j];
			}
		}
	}
	
	inline function updateKeySwitches(patch)
	{
		keySwitches.clear();
	
		local firstKs = patch.firstKs;
		local numArts = patch.articulations.active.length;
	
        for (i = 0; i < numArts; i++)
            keySwitches.push(firstKs + i);
	}
		
	// Helpers
	inline function setMidiProcessorAttributes(data)
	{
		if (isDefined(data))
	    	setAttributes(scriptProcessors, processorIds, processorAttributeIds, data);
	}
	
	inline function setModulatorAttributes(data)
	{
		if (isDefined(data))
	    	setAttributes(modulators, modulatorIds, modulatorAttributeIds, data);
	}
	
	inline function setEffectAttributes(data)
	{
		if (isDefined(data))
	    	setAttributes(effects, effectIds, effectAttributeIds, data);
	}
	
	inline function setSamplerAttributes(data)
	{
		if (isDefined(data))
			setAttributes(samplers, samplerIds, samplerAttributeIds, data);	    	
	}
	
	inline function setMasterMuter(state)
	{
		masterMuter.setAttribute(masterMuter.ignoreButton, state);
	}
}
