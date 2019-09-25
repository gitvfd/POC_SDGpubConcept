function embeddedView(sdgSelection){
    //hardcoding sdgSelection while trying to get the proper reference
    sdgSelection='no-poverty'
    console.log(sdgSelection)

    setSelectionEmbedView(nodes_raw.filter(function (d) { return d.name == sdgSelection; }))
    drawSelected() //Draw the selected nodes


}