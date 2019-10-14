
////////////////// Draw a curved edge line ///////////////////
function drawCircleArc(context, p1, p2) {
    var r = Math.sqrt(sq(p2.x - p1.x) + sq(p2.y - p1.y)) * 2;
    //Find center of the arc function
    var centers = findCenters(r, p1, p2);
    sign = 1; //Math.random() > 0.5
    center = sign ? centers.c2 : centers.c1;

    var ang1 = Math.atan2(p1.y - center.y, p1.x - center.x);
    var ang2 = Math.atan2(p2.y - center.y, p2.x - center.x);
    context.arc(center.x, center.y, r, ang1, ang2, 1);
}//function drawCircleArc

function sq(x) { return x * x; }
///////////// Calculate center for curved edges /////////////
//https://stackoverflow.com/questions/26030023
//http://jsbin.com/jutidigepeta/3/edit?html,js,output
function findCenters(r, p1, p2) {
    // pm is middle point of (p1, p2)
    var pm = { x: 0.5 * (p1.x + p2.x), y: 0.5 * (p1.y + p2.y) };
    // compute leading vector of the perpendicular to p1 p2 == C1C2 line
    var perpABdx = - (p2.y - p1.y);
    var perpABdy = p2.x - p1.x;
    // normalize vector
    var norm = Math.sqrt(sq(perpABdx) + sq(perpABdy));
    perpABdx /= norm;
    perpABdy /= norm;
    // compute distance from pm to p1
    var dpmp1 = Math.sqrt(sq(pm.x - p1.x) + sq(pm.y - p1.y));
    // sin of the angle between { circle center,  middle , p1 }
    var sin = dpmp1 / r;
    // is such a circle possible ?
    if (sin < -1 || sin > 1) return null; // no, return null
    // yes, compute the two centers
    var cos = Math.sqrt(1 - sq(sin));   // build cos out of sin
    var d = r * cos;
    var res1 = { x: pm.x + perpABdx * d, y: pm.y + perpABdy * d };
    var res2 = { x: pm.x - perpABdx * d, y: pm.y - perpABdy * d };
    return { c1: res1, c2: res2 };
}//function findCenters

