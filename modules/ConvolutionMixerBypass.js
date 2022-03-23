// sends
const sendIds = Synth.getIdList("Send Effect");
const sends = [];

for (x in sendIds)
	sends.push(Synth.getEffect(x));
	
// effects
const effectIds = Synth.getIdList("Convolution Reverb");
const effects = [];

for (x in effectIds)
	effects.push(Synth.getEffect(x));

// btnBypass
const btnBypass = [];

for (i = 0; i < effects.length; i++)
{
	btnBypass.push(Content.addButton("Bypass" + i, 10 + i * 150, 10));
	btnBypass[i].set("text", "Enable " + i);
	btnBypass[i].setControlCallback(onbtnBypassControl);
}

inline function onbtnBypassControl(component, value)
{
	local index = btnBypass.indexOf(component);
	
	sends[index].setBypassed(!value);
	sends[3 + index].setBypassed(!value);
	effects[index].setBypassed(!value);
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
 