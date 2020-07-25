let MASS_SCALE = 10;
let DENSITY_SCALE = 1;
let ACCELERATION_CONSTRAINT = 1;
let VELOCITY_CONSTRAINT = 8;
let BORDER_EFFECT = 100;


class Boids{
    constructor(width, height, chunk_size){
        this.width = width;
        this.height = height;
        this.chunk_size = chunk_size;
        
        this.chunks = {}
        this.boids = []
    }

    index(position){
        let chunk_location = p5.Vector.div(position, this.chunk_size);
        return `${parseInt(chunk_location.x)}-${parseInt(chunk_location.y)}`;
    }

    create(id){
        let mass = random(0.2, 0.7) * MASS_SCALE;
        let boid = {
            'id': id,
            'chunk_index': '',
            'position': createVector(random(this.width), random(this.height)),
            'mass': mass,
            'size': mass / DENSITY_SCALE,
            'velocity': createVector(Math.random(), Math.random()),
            'acceleration': createVector(),
        }
        // boid.chunk_index = this.index(boid.position)
        this.boids.push(boid)
        this.move(boid)
         
    }

    move(element){
        // Remove element from old index
        if(this.chunks[element.chunk_index]){
            delete this.chunks[element.chunk_index][element.key];
        }
        // Update chunk index
        element.chunk_index = this.index(element.position)
        // Add element to new chunk index
        if(! this.chunks[element.chunk_index]){
            this.chunks[element.chunk_index] = {};
        }

        this.chunks[element.chunk_index][element.key] = element;
    }

    get(element, radius){
        let chunk_location = p5.Vector.div(element.position, this.chunk_size);
        let chunk_vector = createVector(parseInt(chunk_location.x), parseInt(chunk_location.y));
        let elements = [];
        let chunk_index;

        for(let i = chunk_vector.x - radius; i < chunk_vector.x + radius; i++){
            for(let j = chunk_vector.y - radius; j < chunk_vector.y + radius; j++){
                chunk_index = `${i}-${j}`;
                if(! this.chunks[chunk_index]){
                    this.chunks[chunk_index] = {};
                }
                elements = elements.concat(Object.values(this.chunks[chunk_index]));
            }
        }
        return elements;
    }

    draw(){
        for(let boid of this.boids){
            circle(boid.position.x, boid.position.y, boid.size);
        }
    }

    apply_force(force){
        this.acceleration.add(p5.Vector.div(force, this.mass));
        this.acceleration.setMag(ACCELERATION_CONSTRAINT);
    }

    border(element){
        let force = createVector()
        if(element.position.x < BORDER_EFFECT){
            force.x = 1;
        }
        else if(element.position.x > this.width - BORDER_EFFECT){
            force.x = -1;
        }

        if(element.position.y < BORDER_EFFECT){
            force.y = 1;
        }
        else if(element.position.y > this.height - BORDER_EFFECT){
            force.y = -1;
        }

        // this.apply_force(force);
        element.acceleration.add(force);
    }

    update(){
        // Apply all forces
        for(let boid of this.boids){
            this.border(boid);

            boid.acceleration.setMag(ACCELERATION_CONSTRAINT);
        }

        // Updated velocity and position
        for(let boid of this.boids){
            boid.velocity.add(boid.acceleration);
            boid.velocity.setMag(VELOCITY_CONSTRAINT);

            boid.position.add(boid.velocity);
            this.move(boid);

            boid.acceleration = createVector();
        }
    }
}
