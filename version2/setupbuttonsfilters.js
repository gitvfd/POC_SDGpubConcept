function setupButtons() {

    d3.select('#toolbar')
      .selectAll('.button')
      .on('click', function () {
        // Remove active class from all buttons
        d3.selectAll('.button').classed('active', false);
        // Find the button just clicked
        var button = d3.select(this);

        // Set it as the active button
        button.classed('active', true);

        // Get the id of the button
        var buttonId = button.attr('id');


        var alternate=0;

        document.getElementById("list").innerHTML = '';
        
        if (buttonId== "document"){

          node.style("stroke-opacity", 1);
          node.style("fill-opacity", 1);
          link.style("stroke-opacity", 1);
          link.style("stroke", "#ddd");

          document.getElementById("list").innerHTML = 'documents';
          
          changeNodeSize("document")

          toplist = d3.select("#list").append("ul").attr("class","navList");
          toplist.selectAll("li")
              .data(nodes.filter(function(d){ return d.cat=="document" }).sort(function(a, b){ return d3.ascending(a.name, b.name); }))
              .enter()
              .append("li")
              .attr("class",function(){
                if (alternate==0){
                  alternate=1
                  return "formatList"
                }
                else{
                  alternate=0;
                  return  "formatList light"
                }
              })
              .attr("id",function(d){return d.name;})
              .text(function(d){return d.name;})
              .on("mouseover",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")


                d3.select("#chart").select(nodeSel).style("fill","#939393");


                d3.select("#chart").select(nodeSel).attr("r",function(d){
                  return  1.15 * radius(d.value);
                })
              })
              .on("mouseout",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")

                d3.select("#chart").select(nodeSel).style("fill",function(d) { return color(d.cat); });


                d3.select("#chart").select(nodeSel).attr("r",function(d){
                  return  radius(d.value);
                })
              })
              .on("click",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")
                var nodeSel=d3.select("#chart").select(nodeSel)._groups["0"]["0"].__data__

                clickOverList(nodeSel,0.15)
          
              
              });
        } else if (buttonId== "concept"){

          node.style("stroke-opacity", 1);
          node.style("fill-opacity", 1);
          link.style("stroke-opacity", 1);
          link.style("stroke", "#ddd");

          document.getElementById("list").innerHTML = 'Concept';

          changeNodeSize("concept")
          toplist = d3.select("#list").append("ul").attr("class","navList");
          toplist.selectAll("li")
              .data(nodes.filter(function(d){ return d.cat=="Concept" }).sort(function(a, b){ return d3.ascending(a.name, b.name); }))
              .enter()
              .append("li")
              .attr("class",function(){
                if (alternate==0){
                  alternate=1
                  return "formatList"
                }
                else{
                  alternate=0;
                  return  "formatList light"
                }
              })
              .attr("id",function(d){return d.name;})
              .text(function(d){
                            return d.name;
                      })
              .on("mouseover",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")



                d3.select("#chart").select(nodeSel).style("fill","#939393");


                d3.select("#chart").select(nodeSel).attr("r",function(d){
                  return 1.15 * radius(d.value);
                })
              })
              .on("mouseout",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")

                d3.select("#chart").select(nodeSel).style("fill",function(d) { return color(d.cat); });


                d3.select("#chart").select(nodeSel).attr("r",function(d){
                  return  radius(d.value);
                })
              })
                .on("click",function(d){
                
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")
                var nodeSel=d3.select("#chart").select(nodeSel)._groups["0"]["0"].__data__

                clickOverList(nodeSel,0.15)
          
              
              });
        }else if (buttonId== "sdg"){

          node.style("stroke-opacity", 1);
          node.style("fill-opacity", 1);
          link.style("stroke-opacity", 1);
          link.style("stroke", "#ddd");


          document.getElementById("list").innerHTML = 'SDGs';

          changeNodeSize("sdg")
          toplist = d3.select("#list").append("ul").attr("class","navList");
          toplist.selectAll("li")
              .data(nodes.filter(function(d){ return (d.cat=="SDG") }).sort(function(a, b){ return d3.ascending(a.name, b.name); }))
              .enter()
              .append("li")
              .attr("class", function(){
                if (alternate==0){
                  alternate=1
                  return "formatList"
                }
                else{
                  alternate=0;
                  return  "formatList light"
                }
              })
              .attr("id",function(d){return d.name;})
              .text(function(d){return d.name;})
              .on("mouseover",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")



                d3.select("#chart").select(nodeSel).style("fill","#939393");

                d3.select("#chart").select(nodeSel).attr("r",function(d){
                  return  1.15 * radius(d.value);
                })
              })
              .on("mouseout",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")

                d3.select("#chart").select(nodeSel).style("fill",function(d) { return color(d.cat); });


                d3.select("#chart").select(nodeSel).attr("r",function(d){
                  return  radius(d.value);
                })
              })
                .on("click",function(d){
                var nodeSel="#"+d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_")
                var nodeSel=d3.select("#chart").select(nodeSel)._groups["0"]["0"].__data__

                clickOverList(nodeSel,0.15)
          
              
              });
        }
      })
  }  
    
setupButtons();
// check the dictionary to see if nodes are linked
function isConnectedList(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}
// fade nodes on hover
function clickOverList(nodeSel,opacity) {

    d3.select("#chart").selectAll("g").style("stroke-opacity", 1);

    
    d3.select("#chart").selectAll("g").style("fill-opacity", 1);
    
    d3.select("#chart").selectAll(".link").style("stroke-opacity", 1);
    
    d3.select("#chart").selectAll(".link").style("stroke", "##999");


    /**return function(d) {
        // check all other nodes to see if they're connected
        // to this one. if so, keep the opacity at 1, otherwise
        // fade**/
        node.style("stroke-opacity", function(o) {
            thisOpacity = isConnectedList(nodeSel, o) ? 1 : 0.1;
            return thisOpacity;
        });
        node.style("fill-opacity", function(o) {
            thisOpacity = isConnectedList(nodeSel, o) ? 1 : 0.1;
            return thisOpacity;
        });
        // also style link accordingly
        link.style("stroke-opacity", function(o) {
            return o.source === nodeSel || o.target === nodeSel ? 1 : 0.1;
        });
        link.style("stroke", function(o){
            return o.source === nodeSel || o.target === nodeSel ? o.source.colour : "#ddd";
        });
        
        //console.log(nodeSel)
        
        drawWordCloud(nodeSel);
    //};
}

function changeNodeSize(variable){

  if (variable=="Document"){
    d3.select("#chart")
      .selectAll("circle")
      .transition().duration(500)
      .attr("stroke","#939393")
      .attr("stroke-width", function(d){
        if(d.cat=="document")
          return "4px";

        if(d.cat=="concept")
          return "0px";

        if(d.cat=="Integrated Policy Framework")
          return "0px";
      })

  };
  if (variable=="Concept"){
    d3.select("#chart")
      .selectAll("circle")
      .transition().duration(500)
      .attr("stroke","#939393")
      .attr("stroke-width",function(d){
        if(d.cat=="document")
          return "0px";

        if(d.cat=="concept")
          return "4px";


        if(d.cat=="Integrated Policy Framework")
          return "0px";
      })
  };
  if (variable=="SDG"){
    d3.select("#chart")
      .selectAll("circle")
      .transition().duration(500)
      .attr("stroke","#939393")
      .attr("stroke-width", function(d){
        if(d.cat=="document")
          return "0px";

        if(d.cat=="concept")
          return "0px";


        if(d.cat=="Integrated Policy Framework")
          return "4px";
      })
  };


}