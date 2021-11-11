const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const points = document.getElementById("Points");
const iteration = document.getElementById("Iteration");
const label = document.getElementById("pi");
const mathpi = document.getElementById("mathpi");
var radius = canvas.width;
var center = {x:0,y:radius}
var total = 0;
var in_circle = 0;

function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_setting();
    total = 0;
    in_circle = 0;
}

function draw_setting(fill=true){
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, radius, radius, 0, Math.PI*2);
    ctx.stroke();
    if (fill){
        ctx.fillStyle ="pink"
        ctx.fill();
    }
    ctx.closePath();
    ctx.beginPath();
    //ctx.arc(0, radius, radius, 0, Math.PI*2);
    ctx.rect(0,0,radius,radius);
    ctx.stroke();
    ctx.closePath();
}

function draw_point(x,y, color){
    ctx.beginPath();
    ctx.arc(x,y,1,0,Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function distance_euclidean(m1, m2){
    return Math.hypot(m1.x-m2.x,m1.y-m2.y);
}

function add_point(){
    let rx = radius*Math.random();
    let ry = radius*Math.random();
    total += 1;
    if (distance_euclidean({x:rx,y:ry},center)<=radius){
        in_circle += 1;
        draw_point(rx,ry,"red");
    }else{
        draw_point(rx,ry,"blue");
    }
    //console.log(total, in_circle);
}

function calculate(){
    init();
    let point_v = parseInt(points.value);
    let loop_v = parseInt(iteration.value);
    for (let i = 0; i < loop_v; i++){
        for (let j = 0; j < point_v; j++){
            add_point();
        }
    }
    draw_setting(false);
    x = in_circle/total * 4;
    label.innerText = x;
}

function calculate_2(){
    init();
    let pi_total = 0;
    let point_v = parseInt(points.value);
    let loop_v = parseInt(iteration.value);
    for (let i = 0; i < loop_v; i++){
        total = 0;
        in_circle = 0;
        for (let j = 0; j < point_v; j++){
            add_point();
        }
        pi_approx = in_circle/total * 4;
        pi_total += pi_approx;
    }
    draw_setting(false);
    x = pi_total / loop_v;
    label.innerText = x;
}

mathpi.innerText = Math.PI;
init();