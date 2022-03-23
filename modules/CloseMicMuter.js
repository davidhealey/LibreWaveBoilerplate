const var simpleGain = Synth.getEffect("mixerGain0");
const var Interface = Synth.getMidiProcessor("Interface");

// btnMute
const btnMute = Content.addButton("Mute", 10, 10);
btnMute.set("text", "Enable");
btnMute.setControlCallback(onbtnMuteControl);

inline function onbtnMuteControl(component, value)
{
	local v;

	if (value)
		v = Interface.getAttribute(Interface.knbGain0);
	else
		v = -100;

	simpleGain.setAttribute(simpleGain.Gain, v);
}function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 