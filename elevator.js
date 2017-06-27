// Class for individual elevators
// Elevators will manage their own state
// what floor they're on, next stop/stops, direction of travel

function Elevator() {
    // Initial position
    this.floor = 1;

    // Outstanding floor assignments in order
    this.queue = [];

    // A full list of all assignments
    this.queueStack = [];
}

// Assign a new floor for the elevator to go to
Elevator.prototype.assign = function(floor) {
    // Ensure the elevator is able to take assignments
    if (this.queueStack >= 100) return false;

    // Add the assignment to the queue
    this.queue.push(floor);
    this.queueStack.push(floor);
};

// When a floor is reached
Elevator.prototype.reachedFloor = function(floor) {};

Elevator.prototype.available = function() {
    return this.queueStack < 100;
};

module.exports = Elevator;
