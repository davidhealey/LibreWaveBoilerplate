reg lastNote = -1;
reg lastVelocity = 1;function onNoteOn()
{
	lastNote = Message.getNoteNumber();
	lastVelocity = Message.getVelocity();
}
 function onNoteOff()
{
	local n = Message.getNoteNumber();
	
	if (n == lastNote)
		Synth.playNote(n, Math.max(1, lastVelocity / 2));
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
 