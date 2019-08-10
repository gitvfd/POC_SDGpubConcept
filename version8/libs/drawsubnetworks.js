


//////////////////////////////////////////////////////////////
////////////////////// Identify subnetwork ///////////////////
//////////////////////////////////////////////////////////////

function setSelection(node) {
    if (!node) return

    //For all non regions, just draw all connected edges & do this for all when a click is active
    //  if (click_active) {
    //Only keep edges that are connected to the current node
    //    edges_selected = links_raw.filter(d => d.source === node || d.target === node)

    //Save only those that are neighbors
    //  nodes_selected = nodes_raw.filter(d => neighboring(node, d) || node.id === d.id)
    //   } else { //For regions look all the way down to the countries and elements
    edges_selected = []
    nodes_selected = [node]
    //Go into a recursive function that searches the regions, countries and
    //then to the elements connected to the countries
    connectedNodes(node)
    //  }//else
}//function setSelection

//////////////// Check which nodes are a neighbor ////////////
function neighboring(a, b) {
    //From https://stackoverflow.com/questions/8739072
    return edge_by_id[a.id + "," + b.id] || edge_by_id[b.id + "," + a.id]
}//function neighboring

//////////// Recursive node drawing for the regions //////////
function connectedNodes(n) {
    //Save the edges for which n is a target and the source is a region, country or element
    let connected_edges = links_raw.filter(d => (d.target === n || d.source === n))
    //https://stackoverflow.com/questions/1374126
    //Save in array for drawing
    edges_selected.push.apply(edges_selected, connected_edges)

    let connected_nodes;
    //Find the nodes connected to this node for which n is a target and the source is a region, country or element

    if (n.cat === "Concept") {
        connected_nodes = nodes_raw.filter(d => n.list.includes(d.name))
    }
    else {
        connected_nodes = nodes_raw.filter(d => d.list.includes(n.name))
    }

    //Save in array for drawing
    nodes_selected.push.apply(nodes_selected, connected_nodes)
}//function connectedNodes


//////////////////////////////////////////////////////////////
////////////////////// Draw subnetwork ///////////////////
//////////////////////////////////////////////////////////////

////////////// Draw the selected nodes and edges /////////////
function drawSelected() {
    if (timer_draw) timer_draw.stop()

    //Clear all the canvases
    //WARNINGTOSOLVE// context.clearRect(0, 0, width, height);
    context_hover.clearRect(0, 0, width, height);
    //Draw the edges
    edges_selected.forEach(d => {
        //Make the selected edges more visually apparent
        drawEdges(context_hover, d, d.gradient_hover, 0.5)
    })

    if (nodes_raw !== nodes_selected) {
        //First make all the nodes lightly drawn
        // context.globalAlpha = node_fade_opacity
        nodes_selected.forEach(d => {
            // d.opacity = node_fade_opacity
            drawNodes(context_hover, d, radius(d.iteration))
        })
        //And do the same for the labels inside
        //renderNodeLabels(context, nodes)
    }//if
    //Draw the selected nodes in full
    /**   context.globalAlpha = 1
      nodes_selected.forEach(d => {
          d.opacity = 1
          drawNodes(context, d, radius(d.iteration))
      })*/

}//function drawSelected

/////////////////////// Draw the nodes ///////////////////////
function drawNodes(ctx, d, r, opacity) {

    // nodes_raw.forEach(function (d, i) {
    ctx.beginPath();
    ctx.moveTo(d.x + 3, d.y);
    ctx.arc(d.x, d.y, radius(d.iteration), 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    //context.strokeStyle = d.color;
    //context.stroke();

    //add SDG icons to SDG nodes
    if (d.cat === "SDG") {
        let img_w = d.img.width
        let img_h = d.img.height
        let min_size = Math.min(img_w, img_h)
        //When saving, making the stroke width smaller
        //let radius = show_photos ? r - (d.stroke_width * 0.2) / 2 : r - d.stroke_width / 2
        let r = radius(d.iteration);

        if (img_w > img_h) {
            img_h = 1.25 * r * img_h / img_w
            img_w = 1.25 * r
        } else {
            img_w = 1.25 * r * img_w / img_h
            img_h = 1.25 * r
        }

        //Clip the image to the circle
        ctx.save()
        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, pi2)
        ctx.clip()
        ctx.drawImage(d.img,
            //img_w, img_h, img_w, img_h, //sx, sy, swidth, sheight
            d.x - 0.6 * r, d.y - 0.6 * r, img_w, img_h) //x, y, width, height
        ctx.restore()

    }//if
    //  })
}//function drawNodes

//////// Draw the hovered node element on the ctx_hover //////
function drawHoveredNode(node) {
    drawNodes(context_hover, node_by_id[node.id], radius(node.iteration), 1)
}//function drawHoveredNode


/////// Draw the dotted circle around the hovered node ///////
function drawDottedHoverCircle(node) {
    //Draw rotating circle around the node

    node_hover
        .attr("cx", node.x)
        .attr("cy", node.y)
        .attr("r", radius(node.iteration) + Math.min(10, Math.max(5, radius(node.iteration) * 0.1)))
        .style("stroke", node.color)
        .style("display", null)
}//function drawDottedHoverCircle

/////////////////////// Draw the edges ///////////////////////
function drawEdges(ctx, d, stroke, line_width) {
    //if (stroke) ctx.strokeStyle = stroke
    //if (line_width) ctx.lineWidth = line_width

    //draw links
    ctx.beginPath();
    ctx.moveTo(d.source.x, d.source.y);
    drawCircleArc(ctx, d.source, d.target)
    ctx.strokeStyle = d.color;
    ctx.lineWidth = 0.75;
    ctx.stroke();

}//function drawEdges
