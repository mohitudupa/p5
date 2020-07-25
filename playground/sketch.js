let images = [];
let img;
let COUNT = 5;
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let CHUNK_SIZE = 100;
let canvas;
let boids = new Boids(WIDTH, HEIGHT, CHUNK_SIZE);


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

    for(let i = 0; i < COUNT; i++){
        boids.create(i)
    }
}


function draw(){
    background(33,33,33, 50);
    boids.update();
    boids.draw();
}