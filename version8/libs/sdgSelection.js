function selectItems(mainItem, otherItems) {
    d3.select("#helpIcon").remove();

    node_hover_selected_item.selectAll("circle").remove();

    d3.select("#canvas").style("opacity", 0.2);
    d3.select("#canvas-edge").style("opacity", 0);

    click_active = true;
    //Disable mouseover events
    mouse_zoom_rect.on("mouseout", null);
    //Send out for pop-up
    showTooltip(nodes_raw.filter(function (d) { return d.name == mainItem; })[0]);
    //Find all edges and nodes connected to the "found" node
    setSelection(nodes_raw.filter(function (d) { return d.name == mainItem; })[0]);
    //Draw the connected edges and nodes
    drawSelected();
    //Draw the edges on the hidden canvas for edge hover
    // drawHiddenEdges(node)
    //Add the extra click icon in the bottom right
    renderClickIcon(nodes_raw.filter(function (d) { return d.name == mainItem; })[0]);
    //Draw rotating circle around the hovered node
    drawDottedHoverCircle(nodes_raw.filter(function (d) { return d.name == mainItem; })[0]);
    //Set for reference
    current_click = nodes_raw.filter(function (d) { return d.name == mainItem; })[0];

    mouse_zoom_rect.on("click", null);

    if (otherItems!=null) {
        otherItems.forEach(function (k) {
            var node = nodes_raw.filter(function (d) { return d.name == k; })[0];
            node_hover_selected_item.append("circle")
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", radius(node.iteration) + Math.min(10, Math.max(5, radius(node.iteration) * 0.1)))
                .style("stroke", "#0bb89c")
                .style("fill", "none")
                .style("stroke-linecap", "round")
                .style("stroke-width", "3px")
                .style("pointer-events", "none")
                .style("display", null);
        });
    }
}