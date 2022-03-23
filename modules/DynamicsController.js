const attackAccent = Synth.getMidiProcessor("attackAccent");
const sampler0Legato = Synth.getMidiProcessor("sampler0Legato");

// knbValue
const knbValue = Content.addKnob("knbValue", 0, 0);
knbValue.set("text", "Value");
knbValue.setRange(0, 127, 1);
knbValue.setControlCallback(onknbValueControl);

inline function onknbValueControl(component, value)
{
	attackAccent.setAttribute(attackAccent.Dynamics, value);
	sampler0Legato.setAttribute(sampler0Legato.Pressure, value);
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
 