
///////// Place modal open icon next to clicked node /////////
function renderClickIcon(node) {

    document.getElementById("publicationsList").innerHTML="";

    if (node.cat == "Concept") {

        document.getElementById("chartblockSDG").style.display = "none";
        
        document.getElementById("magicFig").innerHTML=node.iteration;

        if (node.iteration==1)
            document.getElementById("docSentence").innerHTML = " document relates to "
        else
            document.getElementById("docSentence").innerHTML = " documents relate to "       
        
        document.getElementById("conceptName").innerHTML = node.name.replace(/-/g, " ");;
        
        createDonut([node.iteration, pubList.length - node.iteration],node.cat)

        conceptList.forEach(function (d) {
            if (node.name == d.name){

                var listtot = [];
        
                d.list.forEach(function(v){
                    pubList.forEach(function(k){
                        if (v==k.doi)
                            listtot.push(k)
                    })
                })
                console.log(listtot)

                listtot = getUniqueJson(listtot);
                for(var i=0;i<20;i++){
                    var x = document.createElement("P");        
                    var temp_link = document.createElement("a");
                    temp_link.href = "http://dx.doi.org/" + sortJSON(listtot, "publicationDate", "321")[i].doi
                    temp_link.target = '_blank';
                    temp_link.innerHTML = sortJSON(listtot, "publicationDate", "321")[i].title;
                    x.setAttribute("class", 'tableclass'+i%2);
                    x.appendChild(temp_link);
                    document.getElementById("publicationsList").appendChild(x); 
                }       
            }

        })
    }
    if (node.cat == "SDG") {

        document.getElementById("magicFig").innerHTML = node.iteration;
        if (node.iteration == 1)
            document.getElementById("docSentence").innerHTML = " concept relates to "
        else
            document.getElementById("docSentence").innerHTML = " concepts relate to "
        document.getElementById("conceptName").innerHTML = node.name.replace(/-/g, " ");;

        createDonut([node.iteration, conceptList.length - node.iteration], node.cat)



        document.getElementById("chartblockSDG").style.display = "block";



        document.getElementById("magicFigSDG").innerHTML = alldata[1][node.name]["publications"].length;
        if (alldata[1][node.name]["publications"].length == 1)
            document.getElementById("docSentenceSDG").innerHTML = " document relates to "
        else
            document.getElementById("docSentenceSDG").innerHTML = " documents relate to "
        document.getElementById("conceptNameSDG").innerHTML = node.name.replace(/-/g, " ");;

        createDonutSDG([alldata[1][node.name]["publications"].length, pubList.length - alldata[1][node.name]["publications"].length])
       
        conceptList.forEach(function (d) {
            if (node.name == d.name) {
                for (var i = 0; i < 20; i++) {
                    var x = document.createElement("P");
                    var temp_link = document.createElement("a");
                    temp_link.href = "http://dx.doi.org/" + sortJSON(d.list, "publicationDate", "321")[i].doi
                    temp_link.target = '_blank';
                    temp_link.innerHTML = sortJSON(d.list, "publicationDate", "321")[i].title;
                    x.setAttribute("class", 'tableclass' + i % 2);
                    x.appendChild(temp_link);
                    document.getElementById("publicationsList").appendChild(x); 
                }       
            }
        })

    }

    // could display number of publications relating to this concept
    //how much it weighs in each concept
}//function renderClickIcon

function createDonut(data,cat){
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
        .text(d3.format(".1%")(data[0]/data[1]))

    svgDonut.append("text")
        .attr("x", 2*widthDonut / 3)
        .attr("y", heightDonut / 2)
        .attr("class", "contextFig")
        .attr("text-anchor", "start")
        .text(function(){
            if(cat=="Concept")
                return "of all documents";
            else
                return "of all concepts";

        })
    
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
        .text(d3.format(".1%")(data[0] / data[1]))

    svgDonutSDG.append("text")
        .attr("x", 2 * widthDonut / 3)
        .attr("y", heightDonut / 2)
        .attr("class", "contextFigSDG")
        .attr("text-anchor", "start")
        .text( "of all documents")

}

function sortJSON(data, key, way) {
    return data.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}
