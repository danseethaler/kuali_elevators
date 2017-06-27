// Controller will make assignments to elevators
// All elevators will be available to the controller

function Controller(elevators, floorCount) {
    this.elevators = elevators;
    this.floorCount = floorCount;
}

Controller.prototype.request = function(start, stop) {
    // Validate the ranges of the request
    // 4. An elevator cannot proceed above the top floor.
    // 5. An elevator cannot proceed below the ground floor (assume 1 as the min)
    if (start < 1 || start > this.floorCount) {
        return void console.log('Start floor is out of range.');
    }

    if (stop < 1 || stop > this.floorCount) {
        return void console.log('Stop floor is out of range.');
    }

    // Find the best elevator to make the stop
    // When an elevator request is made, the unoccupied elevator closest to it will answer the
    // call, unless an occupied elevator is moving and will pass that floor on its way. The
    // exception is that if an unoccupied elevator is already stopped at that floor, then it will
    // always have the highest priority answering that call.

    // Look for the unoccupied elevator on the same floor

    // Look for the closest unoccupied elevator

    // Check to see if an occupied elevator is passing

    const elevator = this.elevators[1];

    // Make the assignment
    elevator.assign([start, stop]);
};

module.exports = Controller;
