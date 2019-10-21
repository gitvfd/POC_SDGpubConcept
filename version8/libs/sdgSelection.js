function selectItems(mainItem, otherItems) {
    //Set for reference
    current_click = nodes_raw.filter(function (d) { return d.name == mainItem; })[0];
    if (otherItems !== null) {
        selectedOtherItems = nodes_raw.filter(function(d) { return otherItems.indexOf(d.name) >= 0; });
    }
    drawSelectedItems();
}

function drawSelectedItems() {
    d3.select("#helpIcon").remove();

    node_hover_selected_item.selectAll("circle").remove();

    d3.select("#canvas").style("opacity", 0.2);
    d3.select("#canvas-edge").style("opacity", 0);

    click_active = true;
    //Disable mouseover events
    mouse_zoom_rect.on("mouseout", null);

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

    if (selectedOtherItems !== null) {
        selectedOtherItems.forEach(function (node) {
            node_hover_selected_item.append("circle")
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", node.r + 3)
                .style("stroke", "#0bb89c")
                .style("fill", "none")
                .style("stroke-linecap", "round")
                .style("stroke-width", "2px")
                .style("pointer-events", "none")
                .style("display", null);
        });
    }
}