let boids = []
let COUNT = 2;
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let CHUNK_SIZE = 100;
let CHUNKS = new Chunks(CHUNK_SIZE);


function setup(){
    var canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas");

    frameRate(60)
    background(33,33,33);

    noStroke();
    fill(255);

    for(let i = 0; i < COUNT; i++){
        let boid = new Boids(i, WIDTH, HEIGHT);
        CHUNKS.add(boid.position, i, boid);
        boids.push(boid);
    }
}


function draw(){
    background(33,33,33, 50);
    for(boid of boids){
        boid.update(CHUNKS);
        boid.draw();
    }
}