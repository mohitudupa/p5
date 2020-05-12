let MASS_SCALE = 10;
let DENSITY_SCALE = 1;
let VELOCITY_SCALE = 5;
let G_SCALE = 1;
let RADIUS = 2;
let ACCELERATION_CONSTRAINT = 1;
let VELOCITY_CONSTRAINT = 10;


class Boids{
    constructor(key, width, height){
        this.key = key;
        this.width = width;
        this.height = height;

        this.position = createVector(Math.random() * this.width, Math.random() * this.height);

        this.mass = Math.random() * MASS_SCALE;
        this.size = this.mass / DENSITY_SCALE;

        this.velocity = createVector(Math.random(), Math.random());
        this.velocity.mult(VELOCITY_SCALE);

        this.acceleration = createVector();
    }

    draw(){
        circle(this.position.x, this.position.y, this.size);
    }

    apply_force(force){
        this.acceleration.add(p5.Vector.div(force, this.mass));
        this.acceleration.limit(ACCELERATION_CONSTRAINT);
    }

    gravity(chunks){
        let boids = chunks.get(this.key, RADIUS);
        let force, distance_squared, strength
        for(boid of boids){
            force = p5.Vector.sub(this.position, boid.position);
            distance_squared = force.magSq();
            strength = G_SCALE * this.mass + boid.mass / distance_squared;

            force.setMag(strength)
            this.apply_force(force)
        }
    }

    update(chunks){
        this.gravity(chunks);
        this.velocity.add(this.acceleration);
        this.velocity.limit(VELOCITY_CONSTRAINT);

        let new_position = p5.Vector.add(this.position, this.velocity);

        if(new_position.x < 0 || new_position.x > this.width){
            new_position.x = parseInt(new_position.x) % parseInt(this.width);
        }
        if(new_position.y < 0 || new_position.y > this.height){
            new_position.y = parseInt(new_position.y) % parseInt(this.height);
        }

        chunks.update(new_position, this.key);
        this.position = new_position;
    }

}