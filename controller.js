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

    var assignmentElevator = this.findElevator(start);

    if (!assignmentElevator) return false;

    // Make the assignment
    assignmentElevator.assign([start, stop]);
};

Controller.prototype.findElevator = function(start) {
    // Find the best elevator to make the stop
    // When an elevator request is made, the unoccupied elevator closest to it will answer the
    // call, unless an occupied elevator is moving and will pass that floor on its way. The
    // exception is that if an unoccupied elevator is already stopped at that floor, then it will
    // always have the highest priority answering that call.

    // Make sure we have elevators that are available
    var availableElevators = this.elevators.filter(elevator =>
        elevator.available()
    );

    if (!availableElevators.length) {
        return void console.log('There are no available elevators :(');
    }

    var foundElevator;

    var unoccupiedElevators = availableElevators.filter(elevator => {
        if (!elevator.available()) return false;
        if (elevator.inTransit) return false;
        return true;
    });

    if (unoccupiedElevators.length) {
        // Look for the unoccupied elevator on the same floor
        foundElevator = unoccupiedElevators.find(elevator => {
            if (elevator.currentFloor !== start) return false;
            return true;
        });

        // Look for the closest unoccupied elevator
        if (!foundElevator) {
            foundElevator = unoccupiedElevators
                .sort((a, b) => {
                    var aDiff = Math.abs(a.currentFloor - start);
                    var bDiff = Math.abs(b.currentFloor - start);

                    return aDiff - bDiff;
                    // Pull off the first element in the response
                })
                .shift();
        }
    }

    // Check to see if an occupied elevator is passing
    if (!foundElevator) {
        var occupiedElevators = availableElevators.filter(elevator => {
            if (!elevator.available()) return false;
            if (!elevator.inTransit) return false;
            return true;
        });

        foundElevator = occupiedElevators.find(elevator => {
            const floors = elevator.floorPath();
            if (floors.indexOf(start) >= 0) return true;
        });
    }

    return foundElevator;
};

module.exports = Controller;
