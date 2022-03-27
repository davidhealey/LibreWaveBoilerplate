/*
    Copyright 2021, 2022 David Healey

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
		Engine.showYesNoWindow(l10n.get("Unload"), l10n.get("Do you want to unload " + Engine.getName() + "?"), function(response)
		{
			if (response)
				expHandler.setCurrentExpansion("");
		});
	}
}
