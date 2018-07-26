function taggedNode(selTag){

  var selTagNodes= [];
  for (i = 0; i < nodes.length; i++) { 
    for (j = 0; j < nodes[i].keyword.length; j++) {  
    
      if(nodes[i].keyword[j]==selTag)
        selTagNodes.push(nodes[i])
    }
  }
 
  d3.select("#chart")
    .selectAll("circle")
    .style("fill",function(d){

      for (i = 0; i < selTagNodes.length; i++) { 
        if(d.name==selTagNodes[i].name)
          return "#ff0000"
      }
    });

}

function untaggedNode(){

 
  d3.select("#chart")
    .selectAll("circle").style("fill", function(d) { return color(d.cat); 
    });

}

function taggedNodeTheme(selTag){

                node.style("stroke-opacity", 0.05);
                node.style("fill-opacity", 0.05);
                link.style("stroke-opacity", 0.05);
                link.style("stroke", "#ddd");

  var selTagNodes= [];
  for (i = 0; i < nodes.length; i++) { 
    for (j = 0; j < nodes[i].keyword.length; j++) {  
    
      if(nodes[i].keyword[j]==selTag)
        selTagNodes.push(nodes[i])
    }
  }
 
  d3.select("#chart")
    .selectAll("circle")

    .attr("stroke",function(d){

      for (i = 0; i < selTagNodes.length; i++) { 
        if(d.name==selTagNodes[i].name)
          return "#ff0000";
      }
    })
    .attr("stroke-width",function(d){

      for (i = 0; i < selTagNodes.length; i++) { 
        if(d.name==selTagNodes[i].name)
          return "4px";
      }
    })
    .style("stroke-opacity",function(d){

      for (i = 0; i < selTagNodes.length; i++) { 
        if(d.name==selTagNodes[i].name)
          return 1;
      }
    })
    .style("fill-opacity",function(d){

      for (i = 0; i < selTagNodes.length; i++) { 
        if(d.name==selTagNodes[i].name)
          return 1;
      }
    });

}


function removeDuplicates(num) {
  var x,
      len=num.length,
      out=[],
      obj={};
 
  for (x=0; x<len; x++) {
    obj[num[x]]=0;
  }
  for (x in obj) {
    out.push(x);
  }
  return out;
}


function drawWordCloud(nodeName){
  d3.select("#wordcloud")
    .selectAll("*")
    .remove();

  //check nodeName type (as it comes from the node selection or the list selection ) and format it if needed.
  var objectConstructor = {}.constructor;
  if(nodeName.constructor === objectConstructor)
    nodeName=nodeName.name;

  var selNodes= nodes.filter(function(d){ return d.name==nodeName;})


//console.log(selNodes)
  var text_string=selNodes[0].keyword.join(';'); // 'Air-Eau-Feu';


  var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

  var word_count = {};
  var words = text_string.split(/['\-\(\)\*":;\[\]|{},.!?]+/);
  if (words.length == 1){
    word_count[words[0]] = 1;
  } else {
    words.forEach(function(word){
      var word = word.toLowerCase();
      if (word != "" && common.indexOf(word)==-1 && word.length>1){
        if (word_count[word]){
          word_count[word]++;
        } else {
          word_count[word] = 1;
        }
      }
    })
  }


  var svg_location = "#wordcloud";

  //var fill = d3.scaleOrdinal(d3.schemeCategory20);
  var fill = d3.scaleOrdinal().range(["#142f4e","#00b1b2","dcdf5a"]);

  var word_entries = d3.entries(word_count);

  var xScale = d3.scaleLinear()
    .domain([0, d3.max(word_entries, function(d) {
        return d.value;
      })
    ])
    .range([8,width/20]);
    //.range([7,75]);

  d3.layout.cloud().size([width, 2*width/3/2])
    .timeInterval(20)
    .words(word_entries)
    .fontSize(function(d) { return xScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Arial")                                                            //previously "Impact"
    .on("end", draw)
    .start();


  function draw(words) {
    d3.select(svg_location).append("svg")
        .attr("width", width)
        .attr("height", 2*width/3/2)
      .append("g")
        .attr("transform", "translate(" + [width >> 1, (2*width/3/2) >> 1] + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return xScale(d.value) + "px"; })
        .style("font-family", "Arial")                                           //previously "Impact"
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.key; })
        .on('mouseover',function(d){
          d3.select(this)
            .style("opacity",0.5);
          
          taggedNode(d.text);
        })
        .on('mouseout',function(d){
          d3.select(this)
          .style("opacity",1)

          untaggedNode();
        })
        /**.on("click",function(d){
          console.log(d.text);
        })**/;
  }

}
$('#box').keyup(function(){
   var valThis = $(this).val().toLowerCase();
    if(valThis == ""){
        $('.navList > li').show();
    } else {
        $('.navList  > li').each(function(){
            var text = $(this).text().toLowerCase();
            (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
   };
 });


/*Public function to update highlighted nodes from search */
/**network.updateSearch = function(searchTerm) {
  var searchRegEx;
  searchRegEx = new RegExp(searchTerm.toLowerCase());
  return node.each(function(d) {
    var element, match;
    element = d3.select(this);
    match = d.name.toLowerCase().search(searchRegEx);
    if (searchTerm.length > 0 && match >= 0) {
      element.style("fill", "#F38630").style("stroke-width", 2.0).style("stroke", "#555");
      return d.searched = true;
    } else {
      d.searched = false;
      return element.style("fill", function(d) {
        return nodeColors(d.artist);
      }).style("stroke-width", 1.0);
    }
  });
};

$("#search").keyup(function() {
  var searchTerm;
  searchTerm = $(this).val();
  return myNetwork.updateSearch(searchTerm);
});**/