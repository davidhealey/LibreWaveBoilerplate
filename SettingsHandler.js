namespace SettingsHandler
{
	// pnlSettings
	const pnlSettings = Content.getComponent("pnlSettings");
	
	pnlSettings.setPaintRoutine(function(g)
	{
	    var a = [15, 7, this.getWidth() - 30, this.getHeight() - 14];
	    
	    g.fillAll(0xff302c2a);
	    
	    g.setColour(0xff464241);
	    g.fillRoundedRectangle([a[0], a[1], a[2], THEME.card.title.height + 10], 5);
	    
	    g.setColour(0xff594f4b);
	    g.fillRoundedRectangle([a[0], a[1] + THEME.card.title.height, a[2], a[3] - THEME.card.title.height], 5);
	
	    g.setColour(0xffbfb9ac);
	    g.setFont("bold", 26);
	    g.drawAlignedText("SETTINGS", [0, 5, this.getWidth(), THEME.card.title.height], "centred");
	    
	    g.setColour(0xff3a3635);
	    g.fillRoundedRectangle([a[0] + 20, a[1] + 120, a[2] - 40, a[3] - 140], 5);
	});  
		
	// btnSettings
	const btnSettings = Content.getComponent("btnSettings");
	btnSettings.setControlCallback(onbtnSettingsControl);
	
	inline function onbtnSettingsControl(component, value)
	{
		pnlSettings.showControl(value);
	}
		
    // pnlSettingsTab
    const pnlSettingsTab = [];
    
    for (i = 0; i < 3; i++)
    	pnlSettingsTab.push(Content.getComponent("pnlSettingsTab" + i));
    
    // pnlSettingsTab1 - Midi
    pnlSettingsTab[1].setPaintRoutine(function(g)
    {
        g.setColour(0xff76726b);
        g.drawLine(245, 245, 25, this.getHeight() - 25, 1);
        
        g.setFont("bold", 22);
        g.drawAlignedText("CHANNEL", [25, 15, 100, 25], "left");
        g.drawAlignedText("AUTOMATION", [285, 15, 200, 25], "left");
    
        if (!Engine.isPlugin())
            g.drawAlignedText("INPUT", [25, 220, 100, 25], "left");
    });
	
	// pnlSettingsTab2 - Engine
    pnlSettingsTab[2].data.labels = ["Fine Tune"];
    pnlSettingsTab[2].setPaintRoutine(function(g) {pnlSettingsTabPaintRoutine(g);});
    pnlSettingsTab[2].data.components = [Content.getComponent("knbFineTuning")];
    
	pnlSettingsTab[2].setPaintRoutine(function(g)
	{
        g.setColour(THEME.card.label.textColour);
        g.setFont("bold", 16);

        for (i = 0; i < this.data.labels.length; i++)
        {
            var labelHeight = 26;
            var height = this.data.components[i].getHeight();            
            var x = this.data.components[i].get("x") - 110;
            var y = this.data.components[i].get("y") - labelHeight / 2 + height / 2;

            g.drawAlignedText(this.data.labels[i], [x, y, 100, labelHeight], "right");
        }
	});
	
    // fltMidiSource
    const fltMidiSource = Content.getComponent("fltMidiSource");
    fltMidiSource.showControl(!Engine.isPlugin());
    
    // fltMidiChannel
    const fltMidiChannel = Content.getComponent("fltMidiChannel");    
    Engine.isPlugin() ? fltMidiChannel.set("height", 270) : fltMidiChannel.set("height", 160);
	
    // btnSettingsTab
    const btnSettingsTab = [];
    
    for (i = 0; i < pnlSettingsTab.length; i++)
    {
        btnSettingsTab.push(Content.getComponent("btnSettingsTab" + i));
        btnSettingsTab[i].setControlCallback(onbtnSettingsTabControl);
    }
    
    positionTabButtons();
    
    inline function onbtnSettingsTabControl(component, value)
    {
        local index = btnSettingsTab.indexOf(component);
        changeTab(index);
    }
    
    // Functions
    inline function positionTabButtons()
    {
        local numButtons = btnSettingsTab.length;

        btnSettingsTab[0].showControl(!Engine.isPlugin());
        
        if (Engine.isPlugin())
            numButtons = 2;
            
        local w = pnlSettings.getWidth() / numButtons;
        
        for (i = Engine.isPlugin(); i < numButtons; i++)
        {
            local x = (i - Engine.isPlugin()) * w + w / 2 - btnSettingsTab[i].getWidth() / 2;
            btnSettingsTab[i].set("x", x);
        }
    }
      
    inline function changeTab(index)
    {
        for (i = 0; i < btnSettingsTab.length; i++)
        {
            btnSettingsTab[i].setValue(i == index);
            pnlSettingsTab[i].showControl(i == index);
        }
    }
    
    changeTab(1); // Default to tab 1
}