namespace About
{
	const projectData = getData();

	// pnlAbout
	const pnlAbout = Content.getComponent("pnlAbout");
	
	pnlAbout.setPaintRoutine(function(g)
	{
		var a = this.getLocalBounds(250);
		
		g.fillAll(this.get("bgColour"));
		
		g.drawDropShadow(this.getLocalBounds(240), Colours.withAlpha(Colours.black, 0.5), 20);
		
		g.setColour(this.get("itemColour"));
		g.fillRoundedRectangle(a, 5);
		
		g.setColour(Colours.withAlpha(this.get("itemColour2"), 0.6));
		g.drawRoundedRectangle(a, 5, 2);
		
		g.setColour(this.get("textColour"));
		
		a = [a[0] + 25, a[1] + 18, a[2] - 50, 30];
		
		g.setFont("bold", 22);
		g.drawAlignedText(projectData.ProjectName, a, "centred");
		
		g.setFont("medium", 18);
		g.drawAlignedText("Version: " + projectData.ProjectVersion, [a[0], a[1] + 40, a[2], a[3]], "centred");
		
		if (isDefined(projectData.BuildDate))
			g.drawAlignedText("Built: " + projectData.BuildDate, [a[0], a[1] + 80, a[2], a[3]], "centred");

		g.drawAlignedText(projectData.CompanyCopyright.replace("(c)", "© "), [a[0], a[1] + 120, a[2], a[3]], "centred");

		a = this.getLocalBounds(250);		
		g.fillPath(Paths.icons["x"], [a[0] + a[2] - 20, a[1] + 10, 12, 12]);
	});
	
	pnlAbout.setMouseCallback(function(event)
	{
		if (event.clicked)
			hide();
	});	

	// btnAbout
	const btnAbout = Content.getComponent("btnAbout");
	btnAbout.setLocalLookAndFeel(LookAndFeel.empty);
	btnAbout.setControlCallback(onbtnAboutControl);
	
	inline function onbtnAboutControl(component, value)
	{
		if (value)
			show();
	}	

	// Functions
	inline function getData()
	{
		local e = Expansions.getCurrent();
		local data = Engine.getProjectInfo();
		
		if (isDefined(e))
		{
			local props = e.getProperties();

			return {
				"ProjectName": props.Name,
				"ProjectVersion": props.Version,
				"CompanyCopyright": data.CompanyCopyright
			};
		}
		
		return data;
	}
	
	inline function show()
	{
		pnlAbout.showControl(true);
	}
	
	inline function hide()
	{
		pnlAbout.showControl(false);
	}
	
	// Function calls
	hide();
}
