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

namespace Mixer
{
	const CHANNEL_WIDTH = 70;	

	// vptMixer
	const vptMixer = Content.getComponent("vptMixer");
	
	// pnlMixer
	const pnlMixer = Content.getComponent("pnlMixer");
	pnlMixer.setPosition(0, 0, Manifest.channels.length * CHANNEL_WIDTH, vptMixer.getHeight());

	pnlMixer.setPaintRoutine(function(g)
	{
		var numChannels = Manifest.channels.length;

		g.setColour(THEME.card.label.textColour);
		g.setFont("bold", 15);
		
		for (i = 0; i < Manifest.channels.length; i++)
		{
			var a = [i * CHANNEL_WIDTH, knbPan[i].get("y") - 40, CHANNEL_WIDTH, 15];
			g.drawAlignedText(Manifest.channels[i], a, "centred");
		}
		
		for (x in knbGain)
			Cards.drawDefaultValueMarker(g, x);

		if (knbPan.length > 0 && cmbOutput.length > 0)
		{
			g.setColour(Colours.withAlpha(THEME.card.label.textColour, 0.5));
			g.drawRect([cmbOutput[0].get("x"), knbPan[0].get("y") - 12, cmbOutput[numChannels - 1].get("x") + cmbOutput[numChannels - 1].getWidth() - cmbOutput[0].get("x"), knbPan[0].getHeight() + 20], 2);
		}
		
		if (cmbOutput.length > 0)
		{
			g.setColour(THEME.card.label.textColour);
			g.drawAlignedText("OUTPUTS", [cmbOutput[0].get("x"), cmbOutput[0].get("y") - 30, cmbOutput[numChannels - 1].get("x") + cmbOutput[0].getWidth() - cmbOutput[0].get("x"), 10], "centred");
			
			g.setColour(Colours.withAlpha(THEME.card.label.textColour, 0.5));
			g.drawLine(cmbOutput[0].get("x"), cmbOutput[numChannels - 1].get("x") + cmbOutput[0].getWidth(), cmbOutput[0].get("y") - 12, cmbOutput[0].get("y") - 12, 1);
		}
	});
	
	// Gather components - knbPan, knbGain, btnPurge, cmbOutput
	const knbPan = [];
	const knbGain = [];
	const btnPurge = [];
	const cmbOutput = [];
	
	for (i = 0; i < Manifest.channels.length; i++)
	{
		knbPan.push(Content.getComponent("knbPan" + i));
		
		knbGain.push(Content.getComponent("knbGain" + i));
		
		btnPurge.push(Content.getComponent("btnPurge" + i));
		btnPurge[i].setControlCallback(onbtnPurgeControl);
		
		cmbOutput.push(Content.getComponent("cmbOutput" + i));
		cmbOutput[i].setControlCallback(oncmbOutputControl);
	}

    // btnPurge
	inline function onbtnPurgeControl(component, value)
	{
		local index = btnPurge.indexOf(component);
		
		for (s in Configuration.samplers)
		{
			if (s.asSampler().getNumMicPositions() > 1)
			{
				local n = s.asSampler().getMicPositionName(index);
				s.asSampler().purgeMicPosition(n, !value);
			}
		}
    }

    // cmbOutput
    inline function oncmbOutputControl(component, value)
    {
		local index = cmbOutput.indexOf(component);
		local matrix = Configuration.masterChain.getRoutingMatrix();
		local success = true; // Checks if the output channel exists.

		switch(value)
		{
			case 1:
				matrix.addConnection(0 + (index * 2), 0);
				matrix.addConnection(1 + (index * 2), 1);
				break;
                
			case 2:
				matrix.addConnection(0 + (index * 2), 2);
				success = matrix.addConnection(1 + (index * 2), 3);
				break;
                
			case 3:
				matrix.addConnection(0 + (index * 2), 4);
				success = matrix.addConnection(1 + (index * 2), 5);
				break;
                
			case 4:
				matrix.addConnection(0 + (index * 2), 6);
				success = matrix.addConnection(1 + (index * 2), 7);
				break;
		}

		//Reset to Channel 1+2 in case of an error
		if (!success)
		{
			matrix.addConnection(0 + (index * 2), 0);
			matrix.addConnection(1 + (index * 2), 1);
		}
	}
	
	// Functions
	inline function positionControls()
	{
		for (i = 0; i < Manifest.channels.length; i++)
		{
			local x = i * CHANNEL_WIDTH + CHANNEL_WIDTH / 2;
			
			knbGain[i].set("x", x - knbGain[i].getWidth() / 2);			
			knbPan[i].set("x", x - knbPan[i].getWidth() / 2);
			btnPurge[i].set("x", x - btnPurge[i].getWidth() / 2);
			cmbOutput[i].set("x", x - cmbOutput[i].getWidth() / 2);
		}
	}
	
	positionControls();
}
