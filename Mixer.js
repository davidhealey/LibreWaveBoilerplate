/*
    Copyright 2021, 2022 David Healey

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
	// vptMixer
	const vptMixer = Content.getComponent("vptMixer");
	
	// pnlMixerControls
	const pnlMixerControls = Content.getComponent("pnlMixerControls");
	pnlMixerControls.data.levels = [0, 0, 0, 0, 0, 0];

	pnlMixerControls.setPaintRoutine(function(g)
	{
		var numChannels = Manifest.channels.length;
		var channelWidth = vptMixer.getWidth() / numChannels;
		
		for (i = 0; i < Manifest.channels.length; i++)
		{
			var a = [i * channelWidth, knbPan[i].get("y") - 40, channelWidth, 15];

			g.setColour(this.get("textColour"));
			g.setFont("bold", 15);
			g.drawAlignedText(Manifest.channels[i], a, "centred");

			Cards.drawDefaultValueMarker(g, knbGain[i]);

			drawVuMeter(g, knbGain[i], i);
		}

		if (knbPan.length > 0 && cmbOutput.length > 0)
		{
			g.setColour(Colours.withAlpha(this.get("textColour"), 0.5));
			g.drawRect([cmbOutput[0].get("x"), knbPan[0].get("y") - 13, cmbOutput[numChannels - 1].get("x") + cmbOutput[numChannels - 1].getWidth() - cmbOutput[0].get("x"), knbPan[0].getHeight() + 20], 1);
		}
		
		if (cmbOutput.length > 0)
		{
			g.setColour(this.get("textColour"));
			g.drawAlignedText("OUTPUTS", [cmbOutput[0].get("x"), cmbOutput[0].get("y") - 30, cmbOutput[numChannels - 1].get("x") + cmbOutput[0].getWidth() - cmbOutput[0].get("x"), 10], "centred");
			
			g.setColour(Colours.withAlpha(this.get("textColour"), 0.5));
			g.drawLine(cmbOutput[0].get("x"), cmbOutput[numChannels - 1].get("x") + cmbOutput[0].getWidth(), cmbOutput[0].get("y") - 12, cmbOutput[0].get("y") - 12, 1);
		}
	});
	
	pnlMixerControls.setTimerCallback(function()
	{
		var shouldStop = false;
		
		for (i = 0; i < Configuration.mixerGain.length; i++)
		{
			var e = Configuration.mixerGain[i];
			var gain = Math.max(e.getCurrentLevel(false), e.getCurrentLevel(true));
			var v = 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));

			this.data.levels[i] = v;
			
			shouldStop = v < -80;
		}

		this.repaint();
	
		if (!Engine.getNumVoices() && shouldStop)
			this.stopTimer();
	});
		
	// knbPan
	const knbPan = [];
	
	for (i = 0; i < Manifest.channels.length; i++)
		knbPan.push(Content.getComponent("knbPan" + i));
	
	// knbGain
	const knbGain = [];
	
	for (i = 0; i < Manifest.channels.length; i++)
		knbGain.push(Content.getComponent("knbGain" + i));
	
	// btnPurge
	const btnPurge = []
	
	for (i = 0; i < Manifest.channels.length; i++)
	{
		btnPurge.push(Content.getComponent("btnPurge" + i));
		btnPurge[i].setLocalLookAndFeel(LookAndFeel.iconButton);
	}
		
	// cmbOutput
	const cmbOutput = []
	
	for (i = 0; i < Manifest.channels.length; i++)
	{
		cmbOutput.push(Content.getComponent("cmbOutput" + i));
		cmbOutput[i].setLocalLookAndFeel(LookAndFeel.comboBox);
		cmbOutput[i].setControlCallback(oncmbOutputControl);
		Engine.isPlugin() ? cmbOutput[i].set("items", "1/2\n3/4\n5/6\n7/8") : cmbOutput[i].set("items", "1/2");
	}	

    inline function oncmbOutputControl(component, value)
    {
		local index = cmbOutput.indexOf(component);
		local matrix = Configuration.masterChain.getRoutingMatrix();
		local success = true;

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
	inline function startVuTimer()
	{
		pnlMixerControls.startTimer(50);
	}
	
	inline function drawVuMeter(g, c, index)
	{
		local a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];
		local v = this.data.levels[index];
		
		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(a, 8);		
	
		g.setColour(Colours.withAlpha(this.get("itemColour"), 0.2 * v));
		g.fillRoundedRectangle([a[0], a[1] + a[3] / 3 + a[3] - a[3] * v, a[2], a[3] * v - a[3] / 3], 8);
	}
	
	inline function positionControls()
	{
		local channelWidth = vptMixer.getWidth() / Manifest.channels.length;
		
		pnlMixerControls.set("width", vptMixer.getWidth());
		pnlMixerControls.set("height", vptMixer.getHeight());

		for (i = 0; i < Manifest.channels.length; i++)
		{
			local x = i * channelWidth + channelWidth / 2;

			knbGain[i].set("x", x - knbGain[i].getWidth() / 2);
			knbPan[i].set("x", x - knbPan[i].getWidth() / 2);
			btnPurge[i].set("x", x - btnPurge[i].getWidth() / 2);
			cmbOutput[i].set("x", x - cmbOutput[i].getWidth() / 2);
		}
	}
	
	// Function calls
	positionControls();
}
