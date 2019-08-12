

//////////////////////////////////////////////////////////////
//////////////////// Mouse click functions ///////////////////
//////////////////////////////////////////////////////////////

/////////////////// When clicked in the chart ////////////////
function mouseClickChart() {
    d3.event.stopPropagation()

    //Find the nearest node to the mouse, within a distance of X pixels using the voronoi technique
    let m = d3.mouse(this)
    found = mouseNodeFind(m)
    found_edge = null

    d3.event.preventDefault()
    //Set a timeout to check for a double click
    clearTimeout(click_timeout)
    click_timeout = setTimeout(() => { click_double = false }, 500)

    //If no node is found, check if an edge is clicked (only needed during an active click)
    if (click_active && !found) removeMouseClick

    if (click_active && found_edge) {
        //Move to the other side of the edge
        let node = (current_click.id === found_edge.source.id ? found_edge.target : found_edge.source)
        performManualZoom(node, transform.k)
        found = node
        current_click = node
    } else if ((current_click === found || !found) && click_active) {
        //Reset
        removeMouseClick()
    } else if (found) { //Set a click
        //Calculate and draw the new state
        setMouseClick(found)
    }//else if

    click_double = !click_double
}//function mouseClickChart

//////////// Perform visual steps after "good" click /////////
function setMouseClick(node) {

    //update link to 
    document.getElementById("conceptLinkName").innerHTML = node.name.replace(/-/g," ");
    if (click_active == false) {
        d3.select("#conceptInfo").style("visibility", "visible")

    }

    click_active = true
    //Disable mouseover events
    // mouse_zoom_rect.on("mousemove", null)
    mouse_zoom_rect.on("mouseout", null)
    //Send out for pop-up
    showTooltip(node)
    //Find all edges and nodes connected to the "found" node
    setSelection(node)
    //Draw the connected edges and nodes
    drawSelected()
    //Draw the edges on the hidden canvas for edge hover
    // drawHiddenEdges(node)
    //Add the extra click icon in the bottom right
    renderClickIcon(node)
    //Draw rotating circle around the hovered node
    drawDottedHoverCircle(node)
    //Set for reference
    current_click = node
}//function setMouseClick

//////////// Reset visual steps after "empty" click //////////
function removeMouseClick() {


    if (click_active == true)
        d3.select("#conceptInfo").style("visibility", "hidden")
    click_active = false
    current_click = null
    nodes_selected = nodes_raw
    //Re-instate the mouse events
    mouse_zoom_rect.on("mouseout", d => { if (current_hover !== null) mouseOutNode() })
    //Release click
    mouseOutNode()
    hideTooltip()
    //Hide the rotating circle
    node_hover.style("display", "none")

}//function removeMouseClick
