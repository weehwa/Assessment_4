const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


//using class constructor to set the objects 
class field {
  constructor(field = [[]]){
    this.field = field;
    this.xAxis = 0;
    this.yAxis = 0;
    this.field[0][0] = pathCharacter;
  }

//set direction keys
ask() {
  const direction = prompt('Please select the direction? (W=up)/(A=left)/(D=right)/(S=down)/(Q=quit game) ').toUpperCase();
    switch(direction) {
    case 'W':
      this.yAxis -= 1;
      break;
    case 'S':
      this.yAxis += 1;
      break;
    case 'A':
      this.xAxis -= 1;
      break;
    case 'D':
      this.xAxis += 1;
      break;
    case 'Q':
      console.log('You have exited the game')
      process.exit()
    default:
    this.ask();
    break;
   }
  }

    // update position of pathcharacter every round
    this.field[this.yAxis][this.xAxis] = pathCharacter
  } 
}

//set direction keys
ask() {
  const direction = prompt('Please select the direction? (W=up)/(A=left)/(D=right)/(S=down) ').toUpperCase();
    switch(direction) {
    case 'W':
      this.yAxis -= 1;
      break;
    case 'S':
      this.yAxis += 1;
      break;
    case 'A':
      this.xAxis -= 1;
      break;
    case 'D':
      this.xAxis += 1;
      break;
    default:
    this.ask();
    break;
   }
  }

  // locate hat location 
  hatLocation() {
    return this.field[this.yAxis][this.xAxis] == hat
  }
  // locate hole location 
  holeLocation() {
    return this.field[this.yAxis][this.xAxis] == hole
  }
  // define playing field 
  insidePlayingField() {
    return (
      this.yAxis >= 0 &&
      this.xAxis >= 0 &&
      this.yAxis < this.field.length &&
      this.xAxis < this.field[0].length
    );
  }
  // print rows and join with /n to create new row
  print() {
    const displayField = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(displayField);
  }

  static createField(height, width, percentage=0.1) {
    // generate new array with height and width 
    const field = new Array(height).fill(0).map(row => new Array(width));
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
      // generate random number between 0 to 1, compare against percentage 
      // if random number is larger than percentage it will be fieldcharacter 
      // else it will be a hole
       field[i][j] = (Math.random()*1) > percentage ? fieldCharacter : hole;
      }
    }
    // Random locate the "hat" position
    const setHatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }
    // set hat location
    field[setHatLocation.y][setHatLocation.x] = hat;
    return field
  }
}

// set field size and Initialise game 
const myNewField = new field(field.createField(10, 10));
myNewField.game();
