namespace ReleaseTriggers
{
	// knbReleaseGain
	const knbReleaseGain = Content.getComponent("knbReleaseGain");
	knbReleaseGain.setControlCallback(onknbReleaseGainControl);
	
	inline function onknbReleaseGainControl(component, value)
	{
      	local gf = Engine.getGainFactorForDecibels(value);
      	local s = Configuration.samplers;
        s[s.length - 1].setAttribute(s[0].Gain, gf);
	}
}