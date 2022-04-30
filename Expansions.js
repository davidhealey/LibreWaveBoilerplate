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

namespace Expansions
{
	const expHandler = Engine.createExpansionHandler();
		
	// btnLibraryManager
	const btnLibraryManager = Content.getComponent("btnLibraryManager");
	btnLibraryManager.setLocalLookAndFeel(LookAndFeel.iconButton);
	btnLibraryManager.showControl(!Engine.isPlugin());
	btnLibraryManager.setControlCallback(onbtnLibraryManagerControl);

	inline function onbtnLibraryManagerControl(component, value)
	{
		if (!value)
			Expansions.unloadWithPrompt();	
	}

	// Functions
	inline function unloadWithPrompt()
	{
		local e = expHandler.getCurrentExpansion();
		local name = Engine.getName();
		
		if (isDefined(e))
			name = e.getProperties().Name;	

		Engine.showYesNoWindow(l10n.get("Unload"), l10n.get("Do you want to unload " + name + "?"), function(response)
		{
			if (response)
				expHandler.setCurrentExpansion("");
		});
	}
	
	inline function relocateSamples()
	{		
		var e = expHandler.getCurrentExpansion();
	
		if (!isDefined(e))
			return Engine.showMessageBox("No Library", "No library is currently loaded.", 1);

		Engine.showYesNoWindow("Relocate Samples", "Select the folder containing the library's samples", function(response)
		{
			if (response)
			{				
				FileSystem.browseForDirectory(e.getSampleFolder(), function(dir)
				{
					if (isDefined(dir) && dir.isDirectory())
					{
						if (e.setSampleFolder(dir))
							Engine.showMessageBox("Success", "The sample folder was relocated. Please reload the library.", 0);
						else
							Engine.showMessageBox("Failed", "The selected folder could not be used.", 3);
							
						pnlSampleLocation.repaint();
					}
				});
			}
		});		
	}

	inline function getCurrent()
	{
		return expHandler.getCurrentExpansion();
	}
	
	inline function disableDuplicateSamples()
	{
		local e = expHandler.getCurrentExpansion();
		
		if (isDefined(e))
			e.setAllowDuplicateSamples(false);
	}
}
