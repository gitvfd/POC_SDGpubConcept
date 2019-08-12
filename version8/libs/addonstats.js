
///////// Place modal open icon next to clicked node /////////
function renderClickIcon(node) {

    console.log(node)
    document.getElementById("publicationsList").innerHTML="";
    if (node.cat == "Concept") {
        conceptList.forEach(function (d) {
            if (node.name == d.name){

                var listtot = [];
        
                d.list.forEach(function(v){
                    pubList.forEach(function(k){
                        if (v==k.doi)
                            listtot.push(k)
                    })
                })
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
        conceptList.forEach(function (d) {
            if (node.name == d.name) {
                var listtot = [];

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


function sortJSON(data, key, way) {
    return data.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}
