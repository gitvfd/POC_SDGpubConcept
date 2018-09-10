
function drawLegend(){
  var svglegend = d3.select("#legend").append("svg")
            .attr("width", width)
            .attr("height",heightLeg);

  var dataLegend=[{name:"SDG"},{name:"SDG Concept"},{name:"Pub Concept"},{name:"Publication"}]

  var nodeLegend = svglegend
    .selectAll("g")
    .data(dataLegend)
    .enter()
    .append("g")
    .attr("class", function(d){
      return d.name;
    })
    .attr("transform",function(d,i){
          i++;
          return "translate("+i*width/5 + ","+heightLeg/4 + ")"
        });

    var radiusLegend=heightLeg/4
    nodeLegend.append("circle")
      .attr("r", radiusLegend)
      .attr("fill", function(d) { 
        if(d.name=="SDG Concept")
          return "#123123";
        else if(d.name=="Pub Concept")
          return color("Concept");
        else
          return color(d.name); })

        
    nodeLegend.append("text")
      .attr("class","usage")
      .attr("dy", "0.35em")
      .attr('text-anchor', 'middle')
      .attr('font-size',"14px")
      .style("fill","#464646")
      .style("font-weight","bold")
      .attr("x",0)
      .attr("y",radiusLegend+10)
      .text(function(d){
        return d.name;
      })
      .call(wrap,wrapWidth);
    
    /**nodeLegend.append("image")
        .attr("xlink:href", function(d){
          var key=key=d.name.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()]/g,"_"); //see how to remove all special characters no bugs / [.,\/#!$%\^&\*;:{}=\-_`~()]/g
          var url="icons/"+key+".svg";
            return url;
        })
        .attr("x",  function(d){
          
            return -radiusLegend/2;
        })
        .attr("y",function(d){
          
            return -radiusLegend/2;
        })
        .attr("width", function(d){
          
            return radiusLegend;
        })
        .attr("height",  function(d){
         
            return radiusLegend;
        });**/
}
