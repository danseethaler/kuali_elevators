// Class for individual elevators
// Elevators will manage their own state
// what floor they're on, next stop/stops, direction of travel

function Elevator() {
    // Initial position
    this.currentFloor = 1;

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
    if (trip[0] === this.currentFloor) {
        this.trips.push(trip[1]);
    } else {
        this.trips.concat(trip);
    }

    this.go();

    // Successful assignment
    return true;
};

Elevator.prototype.go = function() {
    if (this.inTransit) return false;
    if (!this.queue.length) return false;
    const destination = this.queue[0];

    if (destination === this.currentFloor) return this.reachedFloor();

    // Find the next floor
    // By tracking the next floor in the sequence rather than the next
    // destination we're able to add a stop during transit
    var nextFloor;
    if (destination > this.currentFloor) {
        nextFloor = this.currentFloor - 1;
    } else {
        nextFloor = this.currentFloor + 1;
    }

    // This elevator is now in transit
    this.inTransit = true;
    setTimeout(() => {
        this.reachedFloor(nextFloor);
    }, 10000);
};

// When a floor is reached
Elevator.prototype.reachedFloor = function(floor) {
    // 2. Each elevator will report as is moves from floor to floor.
    this.floorsPassed++;

    // Not in transit when floor is reached
    this.inTransit = false;

    // Keep track of the floor we're on
    this.currentFloor = floor;

    // 3. Each elevator will report when it opens or closes its doors.
    if (floor === this.currentFloor) {
        setTimeout(() => {
            this.openCloseDoors++;
            // Proceed to next floor/assignment
            this.go();
        });
    } else {
        // Proceed to next floor/assignment
        this.go();
    }
};

// Return the floors in the path of the elevator
Elevator.prototype.floorPath = function() {
    if (!this.inTransit) return [];

    var highEnd = this.queue[0];
    // +1 to to skip the current floor since it's already been passed
    var lowEnd = this.currentFloor + 1;

    if (this.currentFloor > this.queue[0]) {
        // +1 to to skip the current floor since it's already been passed
        highEnd = this.currentFloor - 1;
        lowEnd = this.queue[0];
    }

    var floorsInPath = [];
    for (var i = lowEnd; i <= highEnd; i++) {
        floorsInPath.push(i);
    }

    return floorsInPath;
};

// The elevator should keep track of how many trips it has made, and how many floors it
// has passed. The elevator should go into maintenance mode after 100 trips, and stop
// functioning until serviced, therefore not be available for elevator calls.
Elevator.prototype.available = function() {
    return this.trips < 100;
};

module.exports = Elevator;
