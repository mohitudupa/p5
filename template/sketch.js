let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;


function windowResized() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    boids.width = WIDTH;
    boids.height = HEIGHT;
    resizeCanvas(windowWidth, windowHeight);
}


function setup(){
    canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas");

    frameRate(60)
    background(33,33,33);

    noStroke();
    fill(255);
}


function draw(){
    
}