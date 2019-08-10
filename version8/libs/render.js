//WARNINGTOSOLVE keyword to identify remaing issues
function render(param) {


    var simulation ;
    
    if(w>=h){
    simulation= d3.forceSimulation()
        .force("center", d3.forceCenter(w / 2, h / 2))
        .force("x", d3.forceX(w / 2).strength(500/w))
        .force("y", d3.forceY(h / 2).strength(950/w))
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink().strength(1).id(function (d) { return d.name; }).distance(1))
        .force("collide", d3.forceCollide(function (d) { return 1.35 * radius(d.iteration) }).iterations(1))
        //.alphaTarget(0)
        .alphaDecay(0.25)
    }
    else{
        simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(w / 2, h / 2))
            .force("x", d3.forceX(w / 2).strength(700 / w))
            .force("y", d3.forceY(h / 2).strength(100 / w))
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink().strength(1).id(function (d) { return d.name; }).distance(1))
            .force("collide", d3.forceCollide(function (d) { return 1.05 * radius(d.iteration) }).iterations(1))
            //.alphaTarget(0)
            .alphaDecay(0.25)
    }
    simulation
        .nodes(nodes_raw)
        .on("tick", ticked);

    simulation.force("link")
        .links(links_raw);


    //////////////////////////////////////////////////////////////
    ////////////////////// Set-up the voronoi ////////////////////
    //////////////////////////////////////////////////////////////
    voronoi = d3.voronoi()
        .x(d => d.x)
        .y(d => d.y)

    //initialize the voronoi    
    diagram = voronoi(nodes_raw)
    
    //draw initial network
    function ticked() {
        context.clearRect(0, 0, width, height);
        context.save();

        context_edges.clearRect(0, 0, width, height);
        context_edges.save();

        //draw links
         links_raw.forEach(function (d, i) {
            context_edges.beginPath();
            context_edges.moveTo(d.source.x, d.source.y);
            drawCircleArc(context_edges, d.source, d.target)
            context_edges.strokeStyle = d.color;
            context_edges.lineWidth = 0.25;
            context_edges.stroke();
        })

        //draw nodes
        nodes_raw.forEach(function (d, i) {
            context.beginPath();
            context.moveTo(d.x + 3, d.y);
            context.arc(d.x, d.y, radius(d.iteration), 0, 2 * Math.PI);
            context.closePath();
            context.fillStyle = d.color;
            context.fill();
            context.globalAlpha = 0.9 // added opacity to initial nodes for aesthetic reasons
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
                    img_h =  1.25*r * img_h / img_w
                    img_w=1.25*r 
                } else {
                    img_w =  1.25*r * img_w / img_h
                    img_h = 1.25*r
                }

                //Clip the image to the circle
                context.save()
                context.beginPath()
                context.arc(d.x, d.y, r, 0, pi2)
                context.clip()
                context.drawImage(d.img,d.x -  0.6* r, d.y -0.6 *r, img_w, img_h) 
                //context.drawImage(d.img,
                    //img_w, img_h, img_w, img_h, //sx, sy, swidth, sheight
                 //   d.x - 0.6 * r, d.y - 0.6 * r, img_w, img_h) //x, y, width, height
                context.restore()

            }//if
            
        })

        context.restore();
        context_edges.restore();
    }


    //////////////////////////////////////////////////////////////
    ///////////////// SET MOUSE OVER A?D CLICK ACTIONS ///////////
    //////////////////////////////////////////////////////////////


    mouse_zoom_rect.on("mousemove", mouseMoveChart)
                    .on("click", mouseClickChart)


}//end of render


