const featuresToTest = require('../src/robotquest-features');


// hackathon task1

test(' will get alert msg when it reaches tree',() => {
    let maxLineIndex = 3; // 4 lines
    let maxColumnIndex = 3; // 4 columns
    const treePosition = {
        position: {
            line: 0,
            column: 2
        },
        position1:{
            line :3,
            column : 0
        },
        position2 : {
            line : 3,
            column : 1
        },
        head: 'up'
    };
    let robot = {
        position: {
            line: 3,
            column: 1
        },
        head: 'up'
    };

    let isTreeReached = featuresToTest.treeReached(robot, maxLineIndex, maxColumnIndex, treePosition);
    expect(isTreeReached).toBe(true);
});

//hackathon task 3

test(' will get alert msg when it reaches water',() => {
    let maxLineIndex = 3; // 4 lines
    let maxColumnIndex = 3; // 4 columns
    const waterPosition = {
        position: {
            line: 0,
            column:3
        },
        head: 'up'
    };
    let robot = {
        position: {
            line: 0,
            column: 3
        },
        head: 'up'
    };

    let isWaterReached = featuresToTest.waterReached(robot, maxLineIndex, maxColumnIndex, waterPosition);
    expect(isWaterReached).toBe(true);
});



test('robot reaches the flag when its position meets `F` on the board', () => {
    let board = [
        ['.', 'F'] // only one line to this board
    ];
    let winningRobot = {
        position: {
            line: 0,
            column: 1
        },
        head: 'right'
    };

    let anotherRobot = {
        position: {
            line: 0,
            column: 0
        },
        head: 'right'
    };


    expect(featuresToTest.checkIfFlagReached(winningRobot, board)).toBe(true);
    expect(featuresToTest.checkIfFlagReached(anotherRobot, board)).toBe(false);

});

// TODO: write some more tests on checkIfFlagReached

