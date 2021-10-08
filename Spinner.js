namespace Spinner
{
	// pnlSpinnerContainer
	const pnlSpinnerContainer = Content.getComponent("pnlSpinnerContainer");
	
	// pnlSpinner
	const pnlSpinner = Content.getComponent("pnlSpinner");

	pnlSpinner.setPaintRoutine(function(g)
	{
		var a = [this.getWidth() / 2 - 50, this.getHeight() / 2 - 50, 100, 100];

	    for (i = 0; i < 10; i++)
	    {
	        this.getValue() == i ? g.setColour(Colours.white) : g.setColour(Colours.grey);
	        
	        var x = this.getWidth() / 2 - 0;
	        var y1 = a[1] + 20;
	        var y2 = this.getHeight() / 2 - 70;
	        
	        g.drawLine(x, x, y1, y2, 4);
	        
	        g.rotate(Math.toRadians(360 / 10), [this.getWidth() / 2, this.getHeight() / 2]);
	    }

		g.setColour(Colours.withAlpha(Colours.white, 1 / 10 * this.getValue()));
		
		g.setFont("bold", 18);
		if (this.data.msg != "")
        	g.drawAlignedText(this.data.msg, [0, a[1] + a[3] + 50, this.getWidth(), 30], "centred");
	});

	pnlSpinner.setLoadingCallback(function(isPreloading)
	{
		this.data.progress = 0.0;
		pnlSpinnerContainer.set("visible", isPreloading);
		Configuration.setMasterMuter(isPreloading);
		isPreloading ? this.startTimer(150) : this.stopTimer();
	});
		
	pnlSpinner.setTimerCallback(function()
	{
		var v = (this.getValue() + 1) % 10;
		this.setValue(v);
		this.data.msg = "Loading";
		this.repaint();
	});	
}