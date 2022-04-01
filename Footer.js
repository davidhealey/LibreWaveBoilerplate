/*
    Copyright 2021 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Footer
{       
    // pnlFooter
    const var pnlFooter = Content.getComponent("pnlFooter");
    
    pnlFooter.setPaintRoutine(function(g) 
    {
		var a = this.getLocalBounds(0);

        // Footer
        g.setColour(this.get("bgColour"));
        g.fillRect([0, 0, a[2], a[3]]);
        
        g.setColour(0xff3a322d);
        g.fillRect([0, 46, a[2], 5]);
        
        g.setColour(0xff493d38);
        g.fillRect([0, 51, a[2], a[3] - 49]);
        
        g.setColour(0xff3a322d);
        g.fillRect([10, 49, a[2] - 20, a[3] - 49]);
        
        // Logo
        g.setColour(this.get("itemColour"));
        g.fillPath(Paths.librewave, [a[2] / 2 - 128 / 2, 45 / 2 - 15 / 2, 128, 15]);
        
        // Labels
        g.setColour(this.get("textColour"));
        g.setFont("bold", 14);
        g.drawAlignedText("PAN", [knbMasterPan.get("x") - 90, knbMasterPan.get("y") - 0.5, 80, knbMasterPan.getHeight()], "right");
        g.drawAlignedText("VOL", [knbMasterGain.get("x") - 90, knbMasterGain.get("y") - 0.5, 80, knbMasterGain.getHeight()], "right"); 
        
        // Default value markers
        g.setColour(this.get("itemColour2"));
        g.fillEllipse([knbMasterPan.get("x") + knbMasterPan.getWidth() / 2 - 4 / 2, knbMasterPan.get("y") - 8, 4, 4]);
        g.fillEllipse([knbMasterGain.get("x") + knbMasterGain.getWidth() / 2 - 4 / 2 + 25.5, knbMasterGain.get("y") - 8, 4, 4]);
        
    });
    
	// knbMasterPan
	const knbMasterPan = Content.getComponent("knbMasterPan");
	knbMasterPan.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
	knbMasterPan.setControlCallback(onknbMasterPanControl);
	
	inline function onknbMasterPanControl(component, value)
	{
		if (isDefined(Configuration.masterChain))
			Configuration.masterChain.setAttribute(Configuration.masterChain.Balance, value / 100);
	}

    // knbMasterGain
    const knbMasterGain = Content.getComponent("knbMasterGain");
    knbMasterGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
    
    // btnPanic
    const btnPanic = Content.getComponent("btnPanic");
    btnPanic.setLocalLookAndFeel(LookAndFeel.empty);
    btnPanic.setControlCallback(onbtnPanicControl);
    
    inline function onbtnPanicControl(component, value)
    {
	    if (value)
	    	Engine.allNotesOff();
    }
}
