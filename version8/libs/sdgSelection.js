function selectItems(mainItem, otherItems) {
    d3.select("#helpIcon").remove();

    node_hover_selected_item.selectAll("circle").remove();

    d3.select("#canvas").style("opacity", 0.2);
    d3.select("#canvas-edge").style("opacity", 0);

    click_active = true;
    //Disable mouseover events
    mouse_zoom_rect.on("mouseout", null);

    //Set for reference
    current_click = nodes_raw.filter(function (d) { return d.name == mainItem; })[0];

    //Send out for pop-up
    showTooltip(current_click);
    //Find all edges and nodes connected to the "found" node
    setSelection(current_click);
    //Draw the connected edges and nodes
    drawSelected();
    //Draw the edges on the hidden canvas for edge hover
    // drawHiddenEdges(node)
    //Add the extra click icon in the bottom right
    renderClickIcon(current_click);
    //Draw rotating circle around the hovered node
    drawDottedHoverCircle(current_click);
    mouse_zoom_rect.on("click", null);

    if (otherItems!=null) {
        otherItems.forEach(function (k) {
            var node = nodes_raw.filter(function (d) { return d.name == k; })[0];
            node_hover_selected_item.append("circle")
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", node.r + Math.min(10, Math.max(5, node.r * 0.1)))
                .style("stroke", "#0bb89c")
                .style("fill", "none")
                .style("stroke-linecap", "round")
                .style("stroke-width", "3px")
                .style("pointer-events", "none")
                .style("display", null);
        });
    }
}