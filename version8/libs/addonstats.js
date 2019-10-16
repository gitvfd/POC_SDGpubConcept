
///////// Place modal open icon next to clicked node /////////
function renderClickIcon(node) {
    if (node.cat == "Concept") {
        document.getElementById("chartblockSDG").style.display = "none";        
        document.getElementById("magicFig").innerHTML=node.iteration;
        if (node.iteration==1)
            document.getElementById("docSentence").innerHTML = " document relates to ";
        else
            document.getElementById("docSentence").innerHTML = " documents relate to ";      
        
        document.getElementById("conceptName").innerHTML = node.name.replace(/-/g, " ");
        createDonut([node.iteration, pubList.length - node.iteration],node.cat);

        document.getElementById("conceptLinkhtml").onclick = function () { sdgAppRedirect('concept', node.name); };
    }
    
    if (node.cat == "SDG") {
        document.getElementById("magicFig").innerHTML = node.iteration;
        if (node.iteration == 1)
            document.getElementById("docSentence").innerHTML = " topic relates to ";
        else
            document.getElementById("docSentence").innerHTML = " topics relate to ";
        
        document.getElementById("conceptName").innerHTML = node.name.replace(/-/g, " ");
        createDonut([node.iteration, conceptList.length - node.iteration], node.cat);
        document.getElementById("chartblockSDG").style.display = "block";
        document.getElementById("magicFigSDG").innerHTML = alldata[1][node.name]["publications"].length;
        if (alldata[1][node.name]["publications"].length == 1)
            document.getElementById("docSentenceSDG").innerHTML = " document relates to "
        else
            document.getElementById("docSentenceSDG").innerHTML = " documents relate to "
        document.getElementById("conceptNameSDG").innerHTML = node.name.replace(/-/g, " ");

        createDonutSDG([alldata[1][node.name]["publications"].length, pubList.length - alldata[1][node.name]["publications"].length]);

        document.getElementById("conceptLinkhtml").onclick = function () { sdgAppRedirect('sdg', node.name); };
    }
    // could display number of publications relating to this concept
    //how much it weighs in each concept
}//function renderClickIcon

function createDonut(data,cat) {
    svgDonut.selectAll("*").remove();
    
    var gDonut=svgDonut.append("g")
        .attr("transform", "translate(" + widthDonut / 2 + "," + heightDonut / 2 + ")");

    var path = gDonut.datum(data).selectAll("path")
        .data(pie)
        .enter().append("path")
        .attr("fill", function (d, i) { return color(i); })
        .attr("d", arcDonut);
      
    svgDonut.append("text")
        .attr("x", widthDonut / 2)
        .attr("y", heightDonut / 2)
        .attr("class", "magicFigDisp")
        .attr("text-anchor", "middle")  
        .text(d3.format(".1%")(data[0]/data[1]));

    svgDonut.append("text")
        .attr("x", 2*widthDonut / 3)
        .attr("y", heightDonut / 2)
        .attr("class", "contextFig")
        .attr("text-anchor", "start")
        .text(function() {
            if(cat=="Concept")
                return "of all documents";
            else
                return "of all topics";
        });    
}

function createDonutSDG(data) {
    svgDonutSDG.selectAll("*").remove();

    var gDonutSDG = svgDonutSDG.append("g")
        .attr("transform", "translate(" + widthDonut / 2 + "," + heightDonut / 2 + ")");

    var path = gDonutSDG.datum(data).selectAll("path")
        .data(pie)
        .enter().append("path")
        .attr("fill", function (d, i) { return colorSDG(i); })
        .attr("d", arcDonut);

    svgDonutSDG.append("text")
        .attr("x", widthDonut / 2)
        .attr("y", heightDonut / 2)
        .attr("class", "magicFigDispSDG")
        .attr("text-anchor", "middle")
        .text(d3.format(".1%")(data[0] / data[1]));

    svgDonutSDG.append("text")
        .attr("x", 2 * widthDonut / 3)
        .attr("y", heightDonut / 2)
        .attr("class", "contextFigSDG")
        .attr("text-anchor", "start")
        .text( "of all documents");

}
