namespace Footer
{       
    // pnlFooter
    const var pnlFooter = Content.getComponent("pnlFooter");
    
    pnlFooter.setPaintRoutine(function(g) 
    {
        // Footer
        g.setColour(THEME.footer.bgColour);
        g.fillRect([0, 0, this.getWidth(), 45]);
        
        g.setColour(0xff3a322d);
        g.fillRect([0, 46, this.getWidth(), 5]);
        
        g.setColour(0xff493d38);
        g.fillRect([0, 51, this.getWidth(), this.getHeight() - 49]);
        
        g.setColour(0xff3a322d);
        g.fillRect([10, 49, this.getWidth() - 20, this.getHeight() - 49]);
        
        // Logo
        g.setColour(THEME.logoColour);
        g.fillPath(Paths.librewave, [this.getWidth() / 2 - 128 / 2, 45 / 2 - 15 / 2, 128, 15]);
        
        // Labels
        g.setColour(THEME.footer.textColour);
        g.setFont("bold", 14);
        g.drawAlignedText("PAN", [knbMasterPan.get("x") - 90, knbMasterPan.get("y") - 0.5, 80, knbMasterPan.getHeight()], "right");
        g.drawAlignedText("VOL", [knbMasterGain.get("x") - 90, knbMasterGain.get("y") - 0.5, 80, knbMasterGain.getHeight()], "right"); 
        
        // Default value markers
        g.setColour(0xffa19b8c);
        g.fillEllipse([knbMasterPan.get("x") + knbMasterPan.getWidth() / 2 - 4 / 2, knbMasterPan.get("y") - 8, 4, 4]);
        g.fillEllipse([knbMasterGain.get("x") + knbMasterGain.getWidth() / 2 - 4 / 2 + 25.5, knbMasterGain.get("y") - 8, 4, 4]);
        
    });
    
	// knbMasterPan
	const knbMasterPan = Content.getComponent("knbMasterPan");
	knbMasterPan.setControlCallback(onknbMasterPanControl);
	
	inline function onknbMasterPanControl(component, value)
	{
		Configuration.masterChain.setAttribute(Configuration.masterChain.Balance, value / 100);
	}

    // knbMasterGain
    const knbMasterGain = Content.getComponent("knbMasterGain");
}