// Controller will make assignments to elevators
// All elevators will be available to the controller

function Controller(elevators, floorCount) {
    this.elevators = elevators;
    this.floorCount = floorCount;
}

Controller.prototype.request = function(floor) {
    if (floor < 1 || floor > this.floorCount) {
        return void console.log('Floor is outside of range');
    }
};

module.exports = Controller;
