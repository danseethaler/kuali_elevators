// Entry point for the app
// Pull in environment variables to initialize the program

const Elevator = require('./elevator');
const Controller = require('./controller');

const elevatorCount = process.env.ELEVATOR_COUNT || 1;

const elevators = [];

for (var i = 0; i < elevatorCount; i++) {
    elevators.push(new Elevator());
}

new Controller(elevators);
