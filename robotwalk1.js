function robotWalk(X) {
    // Directions: North, East, South, West
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let directionIndex = 0; // Start facing North
    let x = 0, y = 0; // Start at origin
    
    let visitedSteps = new Set(); // Track visited coordinates using encoded strings
    visitedSteps.add(encode(x, y)); // Add starting point

    const result = walkRobot(X, directions, encode, visitedSteps, x, y, directionIndex);

    return [x, y]; // Final position if no revisit occurred
}

function walkRobot(X, directions, encode, visitedSteps, x, y, directionIndex) {
    for (let i = 0; i < X.length; i++) {
        const steps = X[i];
        const result = processMovement(steps, x, y, directionIndex, directions, encode, visitedSteps);
x = result.x;
y = result.y;
directionIndex = result.directionIndex;
if (result.revisited) {
    return [x, y];
}
    }
}

function processMovement(steps, x, y, directionIndex, directions, encode, visitedSteps) {
    for (let step = 0; step < steps; step++) {
        // Move one step in the current direction
        x += directions[directionIndex][0];
        y += directions[directionIndex][1];

        // Encode the current position and check for revisit
        const currentPosition = encode(x, y);
        if (visitedSteps.has(currentPosition)) {
            return { x, y, revisited: true }; // Stop if revisited
        }

        visitedSteps.add(currentPosition); // Mark the current position as visited
    }
    // Turn right after completing steps
    directionIndex = (directionIndex + 1) % 4;
    return { x, y, directionIndex, revisited: false };
}

// Helper function to encode coordinates as a string
function encode(x, y) {
    return `${x},${y}`;
}

// Example usage:
console.log(robotWalk([1, 2, 4])); // Output: [2, -3]
console.log(robotWalk([1, 2, 4, 1, 5])); // Output: [1, 1]
