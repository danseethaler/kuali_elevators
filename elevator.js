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
    this.openCloseDoors = 0;

    // Wether the elevator is currently moving
    this.inTransit = false;
}

// Assign a new floor for the elevator to go to
Elevator.prototype.assign = function(trip) {
    // Ensure the elevator is able to take assignments
    if (this.trips >= 100) return false;

    // Add the assignment to the queue
    this.queue.concat(trip);

    // If the assignment starts at the current floor
    // don't add the starting point to the total trips
    if (trip[0] === this.floor) {
        this.trips.push(trip[1]);
    } else {
        this.trips.concat(trip);
    }

    this.go();
};

Elevator.prototype.go = function() {
    if (this.inTransit) return false;
    const destination = this.queue.shift();

    if (destination === this.floor) return this.reachedFloor();

    setTimeout(function() {}, 10000);
};

// When a floor is passed
// 2. Each elevator will report as is moves from floor to floor.
Elevator.prototype.passedFloor = function(direction) {
    if (direction === 'up') {
        this.floor++;
    } else {
        this.floor--;
    }
    this.floorsPassed++;
};

// When a floor is reached
Elevator.prototype.reachedFloor = function(floor) {
    // 3. Each elevator will report when it opens or closes its doors.
    this.openCloseDoors++;
};

Elevator.prototype.available = function() {
    return this.trips < 100;
};

module.exports = Elevator;
