//WARNINGTOSOLVE keyword to identify remaing issues
function render() {
    var simulation;

    if (w >= h) {
        simulation= d3.forceSimulation()
            .force("center", d3.forceCenter(w / 2, h / 2))
            .force("x", d3.forceX(w / 2).strength(500/w))
            .force("y", d3.forceY(h / 2).strength(950/w))
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink().strength(1).id(function (d) { return d.name; }).distance(1))
            .force("collide", d3.forceCollide(function (d) { return 1.2 * d.r }).iterations(1))
            //.alphaTarget(0)
            .alphaDecay(0.25);
    }
    else{
        simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(w / 2, h / 2))
            .force("x", d3.forceX(w / 2).strength(700 / w))
            .force("y", d3.forceY(h / 2).strength(100 / w))
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink().strength(1).id(function (d) { return d.name; }).distance(1))
            .force("collide", d3.forceCollide(function (d) { return 1.05 * d.r }).iterations(1))
            //.alphaTarget(0)
            .alphaDecay(0.25);
    }
    
    simulation
        .nodes(nodes_raw)
        .on("tick", drawNetwork);

    simulation.force("link")
        .links(links_raw);

    
    simulation.on('end', function() {
        addZoomingFeature();
        sdgAppSignalAnimDone();
    });
    
    //////////////////////////////////////////////////////////////
    ////////////////////// Set-up the voronoi ////////////////////
    //////////////////////////////////////////////////////////////
    voronoi = d3.voronoi()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

    //initialize the voronoi    
    diagram = voronoi(nodes_raw)

    //////////////////////////////////////////////////////////////
    ///////////////// SET MOUSE OVER AND CLICK ACTIONS ///////////
    //////////////////////////////////////////////////////////////

    mouse_zoom_rect.on("mousemove", mouseMoveChart)
        .on("click", mouseClickChart);

    //////////////////////////////////////////////////////////////
    ///////////////// Launch SDG and CONCEPT VIEWS ///////////
    //////////////////////////////////////////////////////////////

}//end of render

function drawNetwork() {
    context.clearRect(0, 0, width, height);
    context.save();
    context_edges.clearRect(0, 0, width, height);
    context_edges.save();

    //links_raw = links_raw.slice(0, 1000);

    //draw links
        links_raw.forEach(function (d, i) {
        context_edges.beginPath();
        context_edges.moveTo(d.source.x, d.source.y);
        drawCircleArc(context_edges, d.source, d.target);
        context_edges.strokeStyle = d.color;
        context_edges.lineWidth = 0.25;
        context_edges.stroke();
    });

    //draw nodes
    nodes_raw.forEach(function (d, i) {
        context.beginPath();
        context.moveTo(d.x + 3, d.y);
        context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = d.color;
        context.fill();
        context.globalAlpha = 0.9 // added opacity to initial nodes for aesthetic reasons

        //add SDG icons to SDG nodes
        if (d.cat === "SDG") {
            var img_w = d.img.width;
            var img_h = d.img.height;
            var min_size = Math.min(img_w, img_h);
            //When saving, making the stroke width smaller
            //let radius = show_photos ? r - (d.stroke_width * 0.2) / 2 : r - d.stroke_width / 2
            if (img_w > img_h) {
                img_h =  1.25 * d.r * img_h / img_w;
                img_w = 1.25 * d.r;
            } else {
                img_w = 1.25 * d.r * img_w / img_h;
                img_h = 1.25 * d.r;
            }

            //Clip the image to the circle
            context.save();
            context.beginPath();
            context.arc(d.x, d.y, d.r, 0, pi2);
            context.clip();
            context.drawImage(d.img,
                //   img_w, img_h, img_w, img_h, //sx, sy, swidth, sheight
                d.x - 0.6 * d.r, d.y - 0.6 * d.r, img_w, img_h); //x, y, width, height
            context.restore();
        }//if
    })

    context.restore();
    context_edges.restore();
}