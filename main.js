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

  // initailising the game 
  game(){
    let playing = true;
    while (playing){
    this.print() // print field
    this.ask()  // prompt question every round
        if (this.hatLocation()){
          console.log('Congrates, You found the Hat!!!')
          playing = false
          break
        }else if (this.holeLocation()){
          console.log('Oops you fall into the hole, please try again')
          playing = false
          break
        }else if (!this.insidePlayingField()){
          console.log('you are outside of the playing field, please try again')
          playing = false
          break
        }
    // update position of pathcharacter every round
    this.field[this.yAxis][this.xAxis] = pathCharacter
  } 
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
  findShortestPath() {
    const visited = new Set();
    const queue = [{ x: 0, y: 0, path: [] }];

    while (queue.length > 0) {
      const current = queue.shift();
      const { x, y, path } = current;

      if (this.field[y][x] === hat) {
        return path;
      }

      visited.add(`${x},${y}`);

      // Define possible moves (up, down, left, right)
      const moves = [
        { dx: 0, dy: -1, direction: 'up' },
        { dx: 0, dy: 1, direction: 'down' },
        { dx: -1, dy: 0, direction: 'left' },
        { dx: 1, dy: 0, direction: 'right' },
      ];

      for (const move of moves) {
        const newX = x + move.dx;
        const newY = y + move.dy;

        if (
          newX >= 0 &&
          newY >= 0 &&
          newX < this.field[0].length &&
          newY < this.field.length &&
          this.field[newY][newX] !== hole &&
          !visited.has(`${newX},${newY}`)
        ) {
          queue.push({ x: newX, y: newY, path: [...path, move.direction] });
        }
      }
    }

    return null; // No path found
  }
}


// set field size and Initialise game 
const myNewField = new field(field.createField(10, 10));
myNewField.game();
const shortestPath = myNewField.findShortestPath();
if (shortestPath) {
  console.log('Shortest path to the hat:', shortestPath.join(' -> '));
} else {
  console.log('No path to the hat found.');
}