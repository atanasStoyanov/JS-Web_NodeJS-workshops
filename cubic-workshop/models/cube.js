const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const databseFile = path.join(__dirname, '..', '/config/database.json');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No Name';
        this.description = description;
        this.imageUrl = imageUrl || 'placeholder';
        this.difficulty = difficulty || 0;
    }

    save() {
        const data = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty

        }

        fs.readFile(databseFile, (err, dbData) => {
            if (err) {
                throw err;
            }

            const cubes = JSON.parse(dbData);
            cubes.push(data);
            
            fs.writeFile(databseFile, JSON.stringify(cubes), err => {
                if (err) {
                    throw err;
                }
    
                console.log('New cube is successfully stored');
            });
        });

    }
}

module.exports = Cube;