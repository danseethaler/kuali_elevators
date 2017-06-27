// Controller will make assignments to elevators
// All elevators will be available to the controller

function Controller(elevators, floorCount) {
    this.elevators = elevators;
    this.floorCount = floorCount;
}

Controller.prototype.request = function(start, stop) {
    // Validate the ranges of the request
    if (start < 1 || start > this.floorCount) {
        return void console.log('Start floor is out of range.');
    }
    if (stop < 1 || stop > this.floorCount) {
        return void console.log('Stop floor is out of range.');
    }

    // Find the best elevator to make the stop
    // TODO: Impliment logic for finding the elevator
    const elevator = this.elevators[1];

    // Make the assignment
    elevator.assign([start, stop]);
};

module.exports = Controller;
