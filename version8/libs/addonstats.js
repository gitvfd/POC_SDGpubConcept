
///////// Place modal open icon next to clicked node /////////
function renderClickIcon(node) {
    console.log(node)
    if (node.cat == "Concept") {
        conceptList.forEach(function (d) {
            if (node.name == d.name)
                console.log(d.list)
        })
    }
}//function renderClickIcon
