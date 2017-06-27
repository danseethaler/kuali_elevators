// Entry point for the app

const Elevator = require('./elevator');
const Controller = require('./controller');

// Pull in environment variables to initialize the program
const elevatorCount = process.env.ELEVATOR_COUNT || 1;
const floorCount = process.env.FLOOR_COUNT || 1;

const elevators = [];

for (var i = 0; i < elevatorCount; i++) {
    elevators.push(new Elevator());
}

const contrlOb = new Controller(elevators, floorCount);

console.log(`Controller initialized with ${elevatorCount} elevators.`);

// Allow for standard input requesting elevators
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(floor) {
    floor = parseInt(floor);
    contrlOb.request(floor);
});
