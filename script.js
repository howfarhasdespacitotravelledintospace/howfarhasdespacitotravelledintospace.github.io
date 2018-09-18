const DESP_RELEASE = 1484179200000;
const C = 299792458;

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

stage = acgraph.create('container');

drawLYCircle(stage, 3, true);
drawLYCircle(stage, 6, true);
drawLYCircle(stage, 10, true);

//Stars
drawStar(stage, 0, 0, 12, "Earth" , "#48f", "below");

drawStar(stage, 4.22, 29.7/60 * 2 * Math.PI, 20, "Proxima Centauri" , "Red", "left");

drawStar(stage, 4.40, 39.7 * 2/60 * Math.PI, 30, "Alpha Centauri" , "Yellow", "right");
drawStar(stage, 4.40, 38.7 * 2/60 * Math.PI, 20, "" , "Orange", "right");

drawStar(stage, 5.94, 57.8 * 2/60 * Math.PI, 20, "Barnard's Star" , "Red", "right");

drawStar(stage, 7.80, 56.5 * 2/60 * Math.PI, 20, "Wolf 359" , "Red", "right");

drawStar(stage, 8.31, 3.3 * 2/60 * Math.PI, 20, "Lalande 21185" , "Red", "left");

drawStar(stage, 8.60, 45.1 * 2/60 * Math.PI, 30, "Sirius" , "White", "right");
drawStar(stage, 8.60, 44.5 * 2/60 * Math.PI, 30, "" , "White", "right");

drawStar(stage, 8.73, 39.0 * 2/60 * Math.PI, 20, "L 726-8" , "Red", "right");
drawStar(stage, 8.73, 38.5 * 2/60 * Math.PI, 20, "" , "Red", "right");

drawStar(stage, 9.69, 49.8 * 2/60 * Math.PI, 20, "Ross 154" , "Red", "left");

//Despacito Travelled
sphereDespacito(stage);

var dist = despacitoText(stage);

setInterval(() => {
    distUpdt(dist);
}, 30);


/*Proxima Centauri  C  M5.5  772.33  4.22
Alpha Centauri    A  G2    742.12  4.40
Alpha Centauri    B  K0    742.12  4.40
Barnard's Star       M5    549.01  5.94
Wolf 359             M6    418.3   7.80
Lalande 21185        M2    392.40  8.31
Sirius            A  A1    379.21  8.60
Sirius            B  DA2   379.21  8.60
L 726-8           A  M5.5  373.7   8.73
L 726-8           B  M5.5  373.7   8.73
Ross 154             M4.5  336.48  9.69*/

function getDistStr(){
    var km  = C * (Date.now() - DESP_RELEASE)/(1000*1000);
    var s = ""+Math.floor(km);
    for(var i=3; i<s.length;i+=4){
        s = s.slice(0, s.length-i) + "'" + s.slice(s.length-i);
    }
    return s;
}

function distUpdt(dist){
    dist.text(getDistStr()  + " km");
}

function despacitoText(stage){
    var km  = C * (Date.now() - DESP_RELEASE)/(1000*1000);

    var ox=-100; var oy=600;
    if(w < h){
        ox = 300; var oy = -150;
    }
    stage.rect(ox,oy,400,110).stroke("black",2).fill("white").zIndex(4);

    stage.text(ox + 10, oy + 5,"Despacito has travelled", {fontSize: "25px", fontWeight: "bold", color: "black"}).zIndex(4);
    
    var dist = stage.text(ox + 8, oy + 40, getDistStr()  + " KM", {fontSize: "29px", fontWeight: "bold", color: "black"}).zIndex(4);

    stage.text(ox + 10, oy + 75,"into the void of space", {fontSize: "25px", fontWeight: "bold", color: "black"}).zIndex(4);

    return dist;
}

function sphereDespacito(stage){
    var rad  = C * (Date.now() - DESP_RELEASE)/(1000*1000) * 0.00000000000010570 * 50;
    var img = stage.circle(500, 500, rad).fill({src: 'ay.jpg'}).zIndex(1);
	img.domElement().style="animation: blinker 2s ease-in-out infinite;";
	stage.circle(500, 500, rad).fill("#ff1000",0.2).stroke("black",3).zIndex(2);

    var text = stage.text();
    text.style({fontSize: "25px", fontWeight: "bold", color: "#ff3355", letterSpacing: "2px"}).zIndex(5);
    text.text("Despacito: " + Math.floor(rad*2)/100 + " LY");
    text.domElement().style="text-shadow:-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;";
    var circlePath = stage.path();//text.getWidth()/2
    var phi = Math.atan(text.getWidth()/2 / rad) * (180/Math.PI);
    circlePath.circularArc(500, 500, rad + 25, rad + 25, -270 + phi, -360);
    text.path(circlePath);
}

function drawStar(stage, lys, angle, size, name, color, tpos, invert=false){
    const x = 500 + lys * 50 * Math.cos(angle); const y = 500 + lys * 50 * Math.sin(angle);
    stage.circle(x,y, size).fill(color).stroke("black",2).zIndex(4);

    var text = stage.text();
    if(invert){
        text.style({fontSize: "17px", color: "black"});
    }else{
        text.style({fontSize: "17px", color: "white"});
    }
    
    text.text(name).zIndex(5);
	text.domElement().style="text-shadow:-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;";
    if(tpos == "right"){
        text.setPosition(x + size + 5, y - text.getHeight()/2);
    }else if(tpos == "left"){
		text.setPosition(x - size - 5 - text.getWidth(), y - text.getHeight()/2);
    }else if(tpos == "below"){
        text.setPosition(x - text.getWidth()/2 , y + 5 +size );
    }
}

function drawLYCircle(stage, lys, inside){
	const op = 0.5;
    const rad = lys * 50
    stage.circle(500, 500, rad).stroke({color: "#ccffff", thickness: 2, opacity: op}).zIndex(3);

    var text = stage.text();
    text.style({fontSize: "20px", color: "#ccffff", opacity: op}).zIndex(4);
    text.text(lys+" Lightyears");

    var circlePath = stage.path();
    var crad;
    if(inside) crad=rad-20;
    else crad = rad + 10;
    var phi = Math.atan(text.getWidth()/2 / crad) * (180/Math.PI);
    circlePath.circularArc(500, 500, crad, crad, 270 - phi, 360);

    text.path(circlePath);
}

var s = Math.min(w,h);
var scale = s / 1040;
stage.translate(w/2 - 500, h/2 - 500);
stage.scale(scale,scale,w/2,h/2);