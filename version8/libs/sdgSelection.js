function embeddedView(sdgSelection){
    //hardcoding sdgSelection while trying to get the proper reference
    sdgSelection='no-poverty'
    console.log(sdgSelection)

    d3.select("#canvas").style("opacity", 0.2)
    d3.select("#canvas-edge").style("opacity", 0)
   // setSelectionEmbedView(nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0])
    //drawSelected() //Draw the selected nodes



    click_active = true
    //Disable mouseover events
    // mouse_zoom_rect.on("mousemove", null)
    mouse_zoom_rect.on("mouseout", null)
    //Send out for pop-up
    showTooltip(nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0])
    //Find all edges and nodes connected to the "found" node
    setSelection(nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0])
    //Draw the connected edges and nodes
    drawSelected()
    //Draw the edges on the hidden canvas for edge hover
    // drawHiddenEdges(node)
    //Add the extra click icon in the bottom right
    renderClickIcon(nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0])
    //Draw rotating circle around the hovered node
    drawDottedHoverCircle(nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0])
    //Set for reference
    current_click = nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0]

    mouse_zoom_rect.on("click", null)




}