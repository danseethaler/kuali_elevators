// Class for individual elevators
// Elevators will manage their own state
// what floor they're on, next stop/stops, direction of travel

function Elevator() {
    // Initial position
    this.floor = 1;

    // Outstanding floor assignments in order
    this.queue = [];

    // A list of all trips (assignments) this elevator has received
    this.trips = [];
    this.floorsPassed = 0;

    // Wether the elevator is currently moving
    this.inTransit = false;
}

// Assign a new floor for the elevator to go to
Elevator.prototype.assign = function(floor) {
    // Ensure the elevator is able to take assignments
    if (this.trips >= 100) return false;

    // Add the assignment to the queue
    this.queue.push(floor);
    this.trips.push(floor);
};

// When a floor is passed
Elevator.prototype.passedFloor = function(floor) {};

// When a floor is reached
Elevator.prototype.reachedFloor = function(floor) {};

Elevator.prototype.available = function() {
    return this.trips < 100;
};

module.exports = Elevator;
