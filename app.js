// Entry point for the app

const Elevator = require('./elevator');
const Controller = require('./controller');

// 1. Initialize the elevator simulation with the desired number of elevators, and the desired
// number of floors. Assume ground/min of 1.
// Pull in environment variables to initialize the program
const elevatorCount = process.env.ELEVATOR_COUNT || 1;
const floorCount = process.env.FLOOR_COUNT || 1;

const elevators = [];

for (var i = 0; i < elevatorCount; i++) {
    elevators.push(new Elevator(i));
}

const contrlOb = new Controller(elevators, floorCount);

console.log(`Controller initialized with ${elevatorCount} elevators.`);

// Allow for standard input requesting elevators
process.stdin.resume();
process.stdin.setEncoding('utf8');

// 6. An elevator request can be made at any floor, to go to any other floor.
process.stdin.on('data', function(floorStartStop) {
    const startStop = floorStartStop.split(' ');
    if (startStop.length != 2) return console.log('Invalid input.');
    contrlOb.request(parseInt(startStop[0]), parseInt(startStop[1]));
});
