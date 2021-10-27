namespace Expansions
{
	const expHandler = Engine.createExpansionHandler();
	
	// btnUnload
	const btnUnload = Content.getComponent("btnUnload");
	btnUnload.setControlCallback(onbtnUnloadControl);
	
	inline function onbtnUnloadControl(component, value)
	{
		if (value)
		{
			Engine.showYesNoWindow("Unload Instrument", "Do you want to unload this instrument?", function(response)
			{
				if (response)
					unload();
			});
		}
	}

	// Functions
	inline function unload()
	{
		expHandler.setCurrentExpansion("");
	}
}
