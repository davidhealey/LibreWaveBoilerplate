reg target = 64;
const var ccDynamics = Synth.getModulator("ccDynamics");

// btnMute
const btnMute = Content.addButton("Mute", 10, 10);

// knbDynamics
const knbDynamics = Content.addKnob("Dynamics", 150, 0);
knbDynamics.setRange(0, 127, 1);
knbDynamics.setControlCallback(onknbDynamicsControl);

inline function onknbDynamicsControl(component, value)
{
    ccDynamics.setAttribute(ccDynamics.DefaultValue, value);
}function onNoteOn()
{
    if (!btnMute.getValue())
    {
        if (Message.getVelocity() > 64 && Message.getVelocity() > knbDynamics.getValue())
        {
            target = knbDynamics.getValue();
            ccDynamics.setAttribute(ccDynamics.DefaultValue, knbDynamics.getValue() + 40);
            Synth.startTimer(0.005);
        }
    }
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	if (ccDynamics.getAttribute(ccDynamics.DefaultValue) > target && ccDynamics.getAttribute(ccDynamics.DefaultValue) > knbDynamics.getValue())
    {
        ccDynamics.setAttribute(ccDynamics.DefaultValue, ccDynamics.getAttribute(ccDynamics.DefaultValue) - 1);
    }
    else
    {
        Synth.stopTimer();
    }
}
 function onControl(number, value)
{
	
}
 