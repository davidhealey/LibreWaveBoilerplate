namespace Velocity
{
	// tblVelocity
	const tblVelocity = Content.getComponent("tblVelocity");
	tblVelocity.setLocalLookAndFeel(LookAndFeel.table);
	
	tblVelocity.setTablePopupFunction(function(x, y)
	{
		return Math.round(129 * x) + " | " + Math.round(127 * y + 1);
	});
}