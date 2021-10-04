namespace Configuration
{
	// masterChain
	const containerIds = Synth.getIdList("Container");
	const masterChain = Synth.getChildSynth(containerIds[0]);	

	// Midi Muters
	const muterIds = Synth.getIdList("MidiMuter");
	const muters = [];
	
	for (id in muterIds)
	    muters.push(Synth.getMidiProcessor(id));

	// MIDI Processors
	const processorIds = Synth.getIdList("Script Processor");
	//const noteRangeFilter = Synth.getMidiProcessor("noteRangeFilter");
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
		local keyRanges = Patches.getKeyRanges(index);

		for (i = 0; i < 127; i++)
			Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.6));

		for (r in keyRanges)
       	{
			for (i = 0; i < 127; i++)
			{
				if (i >= r[0] && i <= r[1])
					Engine.setKeyColour(i, parseInt(r[2]));
			}
		}
	}
	
	inline function enableAllComponents(exceptions)
	{
		for (c in Content.getAllComponents(""))
			c.set("enabled", exceptions.indexOf(c.get("id")) == -1);
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
}