namespace VuMeter
{
	const MasterGain = Synth.getEffect("Master Gain");
	
	//  pnlVuMeter
	const pnlVuMeter = Content.getComponent("pnlVuMeter");
	
	pnlVuMeter.setPaintRoutine(function(g)
	{
		var a = [0, 0, this.getWidth(), this.getHeight()];

		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(a, 8);

		g.setColour(Colours.withAlpha(this.get("itemColour"), 0.2 * this.getValue()));
		g.fillRoundedRectangle([a[0], a[1], a[2] * this.getValue(), a[3]], 8);
	});
	
	pnlVuMeter.setTimerCallback(function()
	{		
		var gain = Math.max(MasterGain.getCurrentLevel(0), MasterGain.getCurrentLevel(1));
		var v = 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));
	
		this.setValue(v);
	   	
		this.repaint();
		
		if (!Engine.getNumVoices())
			this.stopTimer();
	});
		
	inline function startTimer()
	{
		pnlVuMeter.startTimer(80);
	}
}