class Chunks{
    constructor(size){
        this.size = size;
        this.chunks = {};
        this.loockup = {};
    }

    add(location, key, element){
        let chunk_location = p5.Vector.div(location, this.size);
        let chunk_index = `${parseInt(chunk_location.x)}-${parseInt(chunk_location.y)}`;

        if(! this.chunks[chunk_index]){
            this.chunks[chunk_index] = {};
        }

        this.chunks[chunk_index][key] = element;
        this.loockup[key] = createVector(parseInt(chunk_location.x), parseInt(chunk_location.y));
    }

    remove(key){
        let chunk_vector = this.loockup[key];
        let chunk_index = `${chunk_vector.x}-${chunk_vector.y}`;

        // if(! this.chunks[chunk_index]){
        //     this.chunks[chunk_index] = {};
        //     return undefined;
        // }

        let element = this.chunks[chunk_index][key]
        delete this.chunks[chunk_index][key];

        return element;
    }

    update(new_location, key){
        let element = this.remove(key);
        this.add(new_location, key, element);
    }

    get(key, radius){
        let chunk_vector = this.loockup[key];
        let objects = [];
        let chunk_index;

        for(let i = chunk_vector.x - radius; i < chunk_vector.x + radius; i++){
            for(let j = chunk_vector.y - radius; j < chunk_vector.y + radius; j++){
                chunk_index = `${i}-${j}`;
                if(! this.chunks[chunk_index]){
                    this.chunks[chunk_index] = {};
                }
                objects = objects.concat(Object.values(this.chunks[chunk_index]));
            }
        }
        return objects;
    }
}