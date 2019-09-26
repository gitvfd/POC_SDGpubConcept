function loadData(data) {
alldata = data;

    ////////////////////////////////////////////////////////////
    /////////////// NODE CREATION 
    ////////////////////////////////////////////////////////////
    //load SDGs

    Object.keys(data[1]).forEach(function (o) {
        nodes_raw.push({ cat: "SDG", iteration: Object.keys(data[1][o]["doisByConcept"]).length, name: o, list: [o], color: color_SDG_scale(o), totPubList: Object.keys(data[1][o]["publications"]) })
    })
    

    var counter=0;
    //import SDG pics
    nodes_raw.forEach(function (d) {
        d.img = new Image
        d.img.src = "icons/" + d.name + ".png"
        d.img_loaded = false
        d.img.onload = function () {
            d.img_loaded = true
            counter++;
            if (counter == Object.keys(data[1]).length)
            render(); //launch render once all images are loaded to prevent chrome bug
        }//onload
    })


    Object.keys(data[1]).forEach(function (o) {
        Object.keys(data[1][o]["doisByConcept"]).forEach(function (d) {
            var toPush = "TRUE";
            nodes_raw.forEach(function (v) {
                if (v.name == d) {


                    
                   (data[1][o]["doisByConcept"][d]).forEach(function (k) {

                        /**var pushPub = "TRUE";
                        (v.totPubList).forEach(function (l){
                            if(l==k){

                                pushPub = "FALSE";

                                //console.log(l)
                            }
                        })
                        if (pushPub == "TRUE") {**/
                            (v.totPubList).push(k)
                        //}
                    })
                    v.totPubList = getUnique(v.totPubList);
                    v.iteration = (v.totPubList).length
                    v.list.push(o)
                    v.color = color_concept_scale(v.iteration)

                    toPush = "FALSE";
                }
            })
            if (toPush == "TRUE"){
                nodes_raw.push({ cat: "Concept", name: d, iteration: (data[1][o]["doisByConcept"][d]).length, list: [o], color: color_concept_scale((data[1][o]["doisByConcept"][d]).length),totPubList: data[1][o]["doisByConcept"][d] })
            }
        })
    })


    ////////////////////////////////////////////////////////////
    /////////////// LINKS CREATION CREATION 
    ////////////////////////////////////////////////////////////
    Object.keys(data[1]["no-poverty"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "no-poverty", target: d, color: color_SDG_scale("no-poverty") });
    })
    Object.keys(data[1]["zero-hunger"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "zero-hunger", target: d, color: color_SDG_scale("zero-hunger") })
    })
    Object.keys(data[1]["good-health"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "good-health", target: d, color: color_SDG_scale("good-health") })
    })
    Object.keys(data[1]["clean-water"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "clean-water", target: d, color: color_SDG_scale("clean-water") })
    })
    Object.keys(data[1]["affordable-energy"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "affordable-energy", target: d, color: color_SDG_scale("affordable-energy") })
    })
    Object.keys(data[1]["decent-work-growth"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "decent-work-growth", target: d, color: color_SDG_scale("decent-work-growth") })
    })
    Object.keys(data[1]["industry-innovation-and-infrastructure"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "industry-innovation-and-infrastructure", target: d, color: color_SDG_scale("industry-innovation-and-infrastructure") })
    })
    Object.keys(data[1]["sustainable-cities"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "sustainable-cities", target: d, color: color_SDG_scale("sustainable-cities") })
    })
    Object.keys(data[1]["responsible-consumption"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "responsible-consumption", target: d, color: color_SDG_scale("responsible-consumption") })
    })
    Object.keys(data[1]["climate-action"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "climate-action", target: d, color: color_SDG_scale("climate-action") })
    })
    Object.keys(data[1]["life-below-water"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "life-below-water", target: d, color: color_SDG_scale("life-below-water") })
    })
    Object.keys(data[1]["life-on-land"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "life-on-land", target: d, color: color_SDG_scale("life-on-land") })
    })
    Object.keys(data[1]["peace-justice-and-strong-institutions"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "peace-justice-and-strong-institutions", target: d, color: color_SDG_scale("peace-justice-and-strong-institutions") })
    })
    Object.keys(data[1]["quality-education"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "quality-education", target: d, color: color_SDG_scale("quality-education") })
    })
    Object.keys(data[1]["gender-equality"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "gender-equality", target: d, color: color_SDG_scale("gender-equality") })
    })
    Object.keys(data[1]["reduced-inequalities"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "reduced-inequalities", target: d, color: color_SDG_scale("reduced-inequalities") })
    })
    Object.keys(data[1]["partnerships-for-the-goals"]["doisByConcept"]).forEach(function (d) {
        links_raw.push({ source: "partnerships-for-the-goals", target: d, color: color_SDG_scale("partnerships-for-the-goals") })
    })

    // Create reference for search
    links_raw.forEach(d => {
        edge_by_id[d.source + "," + d.target] = true
    })
    nodes_raw.forEach(d => { node_by_id[d.id] = d })
    iteration_max = d3.max(nodes_raw, function (d) { return d.iteration; });
  //  render(); // render now launched once all images are loaded.
  

    ////////////////////////////////////////////////////////////
    /////////////// CONCEPT REFERENCEMENT
    ////////////////////////////////////////////////////////////
  

    Object.keys(data[1]).forEach(function (o) {
        var listPub=[]
        Object.keys(data[1][o]["publications"]).forEach(function (d) {
            listPub.push( data[1][o]["publications"][d] )
        })
        conceptList.push({ name: o, list: listPub })
    })


    Object.keys(data[1]).forEach(function (o) {
        Object.keys(data[1][o]["doisByConcept"]).forEach(function (d) {
            var toPushConcept = "TRUE";
            conceptList.forEach(function (v) {
                if (v.name === d) {
                    data[1][o]["doisByConcept"][d].forEach(function (k) {
                        var toPushPub = "TRUE";
                        v.list.forEach(function (l) {
                            if (k === l)
                                toPushPub = "FALSE"
                        })
                        if (toPushPub == "TRUE")
                            v.list.push(k)
                    })
                    v.list = getUnique(v.list);
                    toPushConcept = "FALSE";
                }
            })
            if (toPushConcept == "TRUE")
                conceptList.push({ name: d, list: data[1][o]["doisByConcept"][d] })
        })       
    })


    ////////////////////////////////////////////////////////////
    /////////////// PUB REFERENCEMENT
    ////////////////////////////////////////////////////////////


    Object.keys(data[1]).forEach(function (o) {
        data[1][o]["publications"].forEach(function (d) {
            var toPushPub = "TRUE";
            pubList.forEach(function (v) {
                if (v == d) {
                    toPushPub = "FALSE"
                    v.SDGOccurence = v.SDGOccurence+1;
                }
            })
            if (toPushPub == "TRUE"){
                var toPushMod=d;
                toPushMod.SDGOccurence=1;

                pubList.push(toPushMod)
                
                
            }
    
            
        })
    })




}
