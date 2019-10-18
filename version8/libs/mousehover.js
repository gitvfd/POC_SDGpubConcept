
//////////////////////////////////////////////////////////////
////////////////////// Mouse events ////////////////////
//////////////////////////////////////////////////////////////

/////////////////// Run on "mouseout" of node ////////////////
function mouseOutNode() {

    if (timer_draw) timer_draw.stop();

    //context.globalAlpha = 1;

    //Reset
    edges_selected = [];
    nodes_selected = nodes_raw;

    //Is this from a true mouse-out or forced programmatically?
    // if (!forced_load) {
    //Draw without fade
    //WARNINGTOSOLVE//context.clearRect(0, 0, width, height);
    //  context_hover.clearRect(0, 0, width, height);

    //  edges_primary.forEach(l => { drawEdges(ctx_edges, l, l.gradient) })
    //   nodes.forEach(n => { drawNodes(ctx_nodes, n, n.r) })
    //   renderNodeLabels(context, nodes)
    // } else fadeCanvasBackIn()

}//function mouseOutNode

/////// Hit test + voronoi to find possible hovered node /////
function mouseNodeFind(m) {
    //First do hit-test of largest nodes
    var hit_test = false;
    var found = null;
    var max_size = click_active ? 1 : 2;

    for (var i = 0; i < nodes_raw.length; i++) {
        if (nodes_raw[i].r < max_size) continue;
        var dx = nodes_raw[i].x - m[0];
        var dy = nodes_raw[i].y - m[1];
        if (sq(dx) + sq(dy) < sq(nodes_raw[i].r)) {
            //The mouse is within the radius of a bigger node
            hit_test = true;
            found = nodes_raw[i];
            break;
        }//if
    }//for i

    //If no bigger node is found, do the voronoi finding algorithm
    if (!hit_test && transform) {
        //Take any zoom+pan into account
        var x_find = (m[0] - transform.x) / transform.k;
        var y_find = (m[1] - transform.y) / transform.k;
        found = diagram.find(x_find, y_find, max_size / transform.k);
        if (found) found = found.data;
    }//if

    return found;
}//function mouseNodeFind


/////// What mouseover action to run depending on state //////
function mouseMoveActions(found_hover, found_edge, m) {
    m = m ? m : [0, 0]; //default value

    if (!click_active) {
        if (current_hover === found_hover && found_hover !== null) {
            //do nothing
        } else if (found_hover === null && current_hover === null) {
            removeTooltip();
            node_hover.style("display", "none");
            context_hover.clearRect(0, 0, width, height);
        } else if (found_hover) {
            //Only run this if there is no click active, but a node hover is found
            found = found_hover;
            setSelection(found);
            drawSelected(); //Draw the selected nodes
        }
    } else if (click_active) {

        if (current_hover === found_hover && found_hover !== null) {
            //do nothing
        } else if (found_hover === null && current_hover === null) {
            removeTooltip();
        } else if (found_hover) {
            drawDottedHoverCircle(found_hover);
        }
    } else {//Reset
        removeTooltip();
        nodes_selected = nodes_raw; //Reset the selected nodes
        //WARNINGTOSOLVE//node_hover.style("display", "none") //Hide the rotating circle
        // if (!click_active) mouseOutNode()
    }
    current_hover = found_hover;
}//function mouseMoveActions

/////////////// Check if the mouse is close enough ///////////
function mouseMoveChart() {
    if (d3.event) {
        d3.event.stopPropagation();
        m = d3.mouse(this);
    } else {
        current_hover = null;
    }//else
    //Find the nearest person to the mouse, within a distance of X pixels
    //Using the voronoi technique
    var found_hover = mouseNodeFind(m);
    found_edge = null;

    if (found_hover) createTooltip(found_hover);

    //If no node is found, check if an edge is clicked (only needed during an active click)
    //if (click_active && !found_hover) found_edge = mouseEdgeFind(m)

    //Run the correct "interaction" event
    mouseMoveActions(found_hover, found_edge, m);
}//function mouseMoveChart
