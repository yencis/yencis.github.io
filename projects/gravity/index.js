const disjointSet = require("./disjointSet");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const s_mass = document.getElementById("s_mass");
const s_x = document.getElementById("s_x");
const s_y = document.getElementById("s_y");
const s_vx = document.getElementById("s_vx");
const s_vy = document.getElementById("s_vy");
var masses = new Set();
//PHYSICAL CONSTANTS
const G = 6.67408 * 10 ** -11; //universal grav constant
const D = 10**25; //density
const d_t = 0.05; //delta time interval
const scale = 10**9;
var count = 0;
var stop = false;

class Mass{
    constructor(mass, x, y, vx, vy){
        this.id = count;
        this.mass = mass;
        this.x = x;
        this.y = y;
        this.vx = vx; // velocity
        this.vy = vy;
        this.ax = 0; // acceleration
        this.ay = 0;
        this.x2 = x;
        this.y2 = y;
        this.stationary = false;
        count += 1;
    }

    //get the drawn radius
    get radius(){
        return ((this.mass*3)/(D*4*Math.PI))**(1/3);
    }

    static distance_euclidean(m1, m2){
        return Math.hypot(m1.x-m2.x,m1.y-m2.y);
    }

    static distance_vector(m1, m2){
        return [m2.x-m1.x, m2.y-m1.y, Math.hypot(m2.x-m1.x,m2.y-m1.y)];
    }

    static last_distance_vector(m1, m2){
        return [m2.x2-m1.x2, m2.y2-m1.y2, Math.hypot(m2.x2-m1.x2,m2.y2-m1.y2)];
    }

    static angle(x,y){ //angle of displacement vector
        let theta = Math.acos(x/Math.hypot(x,y));
        if (y<0){
            theta = Math.PI*2-theta;
        }
        return theta;
    }

    static gravity(m1, m2, distance){
        return G*m1.mass*m2.mass/(distance)**2;
    }

    kinetic_energy(){
        return 0.5*this.mass*(this.vx**2+this.vy**2);
    }

    update_acceleration(){
        for (let m of masses){
            if (m.id == this.id) continue;
            let vector = Mass.last_distance_vector(this,m);
            let dx = vector[0];
            let dy = vector[1];
            let dist = vector[2];
            let theta = Mass.angle(dx,dy);
            //console.log("theta "+theta,dx,dy);
            let pull = Mass.gravity(this,m,dist)/this.mass;
           // console.log("pull",pull);
            this.ax = pull*Math.cos(theta)/scale;
            this.ay = pull*Math.sin(theta)/scale;
            //console.log(this.id,"a "+this.ax,this.ay);
        }
    }

    update_velocity(){
        this.vx += this.ax;
        this.vy += this.ay;
    }

    update_displacement(){
        this.x2 = this.x;
        this.y2 = this.y;
        this.x += this.vx;
        this.y += this.vy;
    }

    update(){
        if (!this.stationary){
            this.update_acceleration();
            this.update_velocity();
            this.update_displacement();
        }
        //console.log(this.id,this.x,this.y,this.vx,this.vy,this.ax,this.ay);
    }

    set_stationary(){
        this.stationary = true;
        this.ax = this.ay = this.vx = this.vy = 0;
    }
}

function toggle_sim(){
    stop = !stop;
    console.log(stop);
    if (!stop){
        draw();
    }
}

function drawMass(mass){
    ctx.beginPath();
    ctx.arc(mass.x/1000, mass.y/1000, mass.radius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    masses.forEach(mass=>drawMass(mass));
    masses.forEach(mass=>mass.update());
    check_collisions();
    check_collisions(); //check twice for update
    if (!stop){
        requestAnimationFrame(draw);
    }
    
}

function check_collisions(){
    let set = disjointSet();
    for (let m1 of masses){
        for (let m2 of masses){
            if (m1.id == m2.id || m1.stationary || m2.stationary) continue;
            console.log(Math.abs(m1.x-m2.x)+" "+Math.abs(m1.y-m2.y));
            if (Math.abs(m1.x-m2.x)<8000&&Math.abs(m1.y-m2.y)<8000){
                m1.set_stationary();
                m2.set_stationary();
                set.add(m1);
                set.add(m2);
                set.union(m1,m2);
                console.log("Collision!")
            }
        }
    }
    let collisions = set.extract();
    // if (collisions) console.log(collisions);
    for (collision of collisions){
        let total = 0;
        let nx = collision[0].x;
        let ny = collision[0].y;
        for (mass of collision){
            total += mass.mass;
            masses.delete(mass);
        }
        masses.add(new Mass(total,collision[0].x,collision[0].y,0,0));
    }
}

function add_mass(){
    let m = parseFloat(s_mass.value) * 10**30
    let x = parseFloat(s_x.value) * 1000
    let y = parseFloat(s_y.value) * 1000
    let vx = parseFloat(s_vx.value)
    let vy = parseFloat(s_vy.value)
    masses.add(new Mass(m,x,y,vx,vy))
    draw();
}

masses.add(new Mass(10**30,300*1000,300*1000,0,0))
masses.add(new Mass(10**28,233259.2,300*1000,0,1000))
draw();
