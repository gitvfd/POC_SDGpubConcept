function embeddedView(sdgSelection){
    //hardcoding sdgSelection while trying to get the proper reference
    sdgSelection='no-poverty'
    console.log(sdgSelection)

    d3.select("#canvas").style("opacity", 0.2)
    d3.select("#canvas-edge").style("opacity", 0)
    setSelectionEmbedView(nodes_raw.filter(function (d) { return d.name == sdgSelection; })[0])
    drawSelected() //Draw the selected nodes


}