namespace Header
{
    reg title = "";
    
    // pnlHeader
    const pnlHeader = Content.getComponent("pnlHeader");

    pnlHeader.setPaintRoutine(function(g)
    {
        // Header
        g.fillAll(THEME.header.bgColour);

        // Preset display
        g.setColour(THEME.presetDisplay.bgColour);
        var a = [lblPreset.get("x"), lblPreset.get("y"), lblPreset.getWidth(), lblPreset.getHeight() + 2];
        g.fillRoundedRectangle(a, 5);
        
        // Expansion name
        g.setFont("bold", 24);
        g.setColour(THEME.header.textColour);
        g.drawAlignedText(title, [20, this.getHeight() / 2 - 30 / 2, 300, 26], "left");
    });

    // lblPreset
    const lblPreset = Content.getComponent("lblPreset");
    lblPreset.set("text", "");
    
    // Function    
    inline function redraw()
    {
        if (Expansions.getCurrentExpansionName() != undefined)
        {
            title = Expansions.getCurrentExpansionName();
            pnlHeader.repaint();
            updatePresetLabel();
        }
    }
    
    inline function updatePresetLabel()
    {
        local patchName = Patches.getCurrentPatchName();
        local presetName = Engine.getCurrentUserPresetName();
        local text = "";
        
        lblPreset.set("text", "");

        if (patchName != undefined && patchName != "")
            text = patchName + "  -  ";
            
        if (presetName != undefined)
        {
            text += presetName;
            lblPreset.set("text", text);
        }
    }
}