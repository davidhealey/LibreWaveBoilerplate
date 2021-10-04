namespace Presets
{
    // fltPresetBrowser
    const fltPresetBrowser = Content.getComponent("fltPresetBrowser");
    
    // pnlPresetBrowser
    const pnlPresetBrowser = Content.getComponent("pnlPresetBrowser");
    //pnlPresetBrowser.showControl(false);
    pnlPresetBrowser.setControlCallback(onpnlPresetBrowserControl);
    
    inline function onpnlPresetBrowserControl(component, value)
    {
        //Mixer.setupControls();
    }
    
    pnlPresetBrowser.setPaintRoutine(function(g)
    {
        var a = [10, 7, this.getWidth() - 20, this.getHeight() - 14];
        
        g.setColour(THEME.ScriptFloatingTile.PresetBrowser.bgColour2);
        g.fillRoundedRectangle(a, 5);
        
        g.setColour(0xff2a2625);
        g.fillRoundedRectangle([26, 100, 279, 370], 5);
        g.fillRoundedRectangle([313, 100, 279, 370], 5);
        g.fillRoundedRectangle([600, 100, 271, 370], 5);
    });
    
    // pnlPresetNotesBlocker
    const pnlPresetNotesBlocker = Content.getComponent("pnlPresetNotesBlocker");
    
    pnlPresetNotesBlocker.setPaintRoutine(function(g)
    {
        g.fillAll(0xff524844);

        g.setColour(0xff8d8681);
        g.setFont("bold", 16);
        g.drawAlignedText("BANK", [15, 0, 279, this.getHeight() - 7], "centred");
        g.drawAlignedText("CATEGORY", [302, 0, 279, this.getHeight() - 7], "centred");
        g.drawAlignedText("PRESET", [589, 0, 271, this.getHeight() - 7], "centred");
        
        g.setColour(0xff2a2625);
        g.fillRoundedRectangle([15, 35, 279, 370], 5);
        g.fillRoundedRectangle([302, 35, 279, 370], 5);
        g.fillRoundedRectangle([589, 35, 271, 370], 5);
    });
    
    // btnPresetBrowser
    const btnPresetBrowser = Content.getComponent("btnPresetBrowser");
    btnPresetBrowser.setControlCallback(onbtnPresetBrowserControl);
    btnPresetBrowser.setValue(0);
    
    inline function onbtnPresetBrowserControl(component, value)
    {
        pnlPresetBrowser.showControl(value);
    }
    
    // btnPreset - previous/next preset buttons
    const btnPreset = [];

    for (i = 0; i < 2; i++)
    {
        btnPreset.push(Content.getComponent("btnPreset" + i));
        btnPreset[i].setControlCallback(onbtnPresetControl);
    }
    
    inline function onbtnPresetControl(component, value)
    {
        local index = btnPreset.indexOf(component);
        
        if (value)
        {
            if (index)
                Engine.loadPreviousUserPreset(true);
            else
                Engine.loadNextUserPreset(true);
            
            Header.redraw();
        }
    }
    
    // Functions    
    inline function forceShowBrowser()
    {
        pnlPresetBrowser.showControl(true);
        btnPresetBrowser.setValue(1);
        btnPresetBrowser.set("enabled", false);
    }
}