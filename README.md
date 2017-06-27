This app is designed to be run as a node command line application. You can initialize the app with `ELEVATOR_COUNT=3 FLOOR_COUNT=10 node app.js`. This will open up the standard input to allow requests. Entering two integers separated with a space will issue an elevator request. I didn't quite have enough time to finish out all of the implementation details but it's close.

I decided to use elevator objects to track their own state and have a controller handle the requests/assignments. There is a lot of state to manage so it made sense to have the elevators track their own state and interact with the controller via the elevator methods. This approach made it easier to think about the logic.

One of the changes that I made to the design while I was building this application was to have the elevators simply track the next floor in their journey rather than just moving from their current floor to the destination floor. This made it much easier to reason about and also allowed adding stops during transit.

Some of the implementation details that still remain are:
- Make the assignment to an 'in transit' elevator at the beginning of it's queue
- Don't give 'in transit' elevators an assignment that would change their direction
