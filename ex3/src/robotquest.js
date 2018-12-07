'use strict';
let features = require('./robotquest-features');

// This code is inspired from https://github.com/HackYourFuture/RobotApp

const R = features.SYMBOLS.robot;
const T = features.SYMBOLS.tree;
const F = features.SYMBOLS.flag;
const W = features.SYMBOLS.water;

const PLAY_BOARD = [
    [T,   T,    '.',   F],
    [T,   '.',  '.', '.'],
    ['.', '.',  '.', '.'],
    [R,   '.',  '.',   W]
];

//const STEPS_TO_FLAG = ['move', 'turn-right', 'move', 'move', 'move', 'turn-left', 'move', 'move']; // reaches flag
//const STEPS_TO_FLAG = ['move', 'move', 'move', 'move', 'turn-left', 'move', 'move'];//reaches tree
//const STEPS_TO_FLAG = ['move', 'turn-right', 'move', 'move', 'move', 'move', 'move' ,'move', 'move', 'move'];// moving out of board row-wise
//const STEPS_TO_FLAG = ['move', 'move', 'move', 'turn-right', 'move', 'move','move' ];// moving out of board column-wise
const STEPS_TO_FLAG = ['turn-right', 'move', 'move', 'move']; //reaches water
let ROBOT_START_STATE = {
    position: {
        line: 0,
        column: 0
    },
    head: 'up'
};

let moves = 0;
let turns = 0;


function main() {
    let maxLineIndex = PLAY_BOARD.length - 1; //  the size of array  - 1 = 3
    let maxColumnIndex = PLAY_BOARD[0].length - 1; // size of column -1 = 3
    let board = PLAY_BOARD.reverse(); // we play upside down, so the robot starts (0,0) in the bottom left

    let currentRobot = features.cloneRobot(ROBOT_START_STATE);
    let isFlagReached = false;
    let isTreeReached = false;
    let isWaterReached = false;
    let isMovedOut = false;
   //let newRobotPosition;

    renderBoard(board, isFlagReached, isTreeReached,isMovedOut,isWaterReached);

    for (let index in STEPS_TO_FLAG) {
        let step = STEPS_TO_FLAG[index];
        let previousRobotState = features.cloneRobot(currentRobot);

        let hasMoved = applyStep(currentRobot, step, maxLineIndex, maxColumnIndex);
        //let newMove ;
        isFlagReached = features.checkIfFlagReached(currentRobot, board);
        isTreeReached = features.checkIfTreeReached(currentRobot, board);
        isWaterReached = features.checkIfWaterReached(currentRobot,board);
        isMovedOut = movingOutOfBoard();
        //newRobotPosition  = reversingRobotPosition() ;
        features.updateBoard(board, previousRobotState, currentRobot);
        if (hasMoved) {
            renderBoard(board, isFlagReached, isTreeReached ,isMovedOut,isWaterReached);
        }
       /* if(newMove)
        {
            if( (isTreeReached == true) || (isMovedOut == true) || (isWaterReached == true))
            {

                newRobotPosition = ROBOT_START_STATE;

            }
            return newRobotPosition;
        }*/


    }
}


function renderBoard(board, flagReached, treeReached, isMovedOut,isWaterReached) {
   // console.clear();
    console.log('\n ' + moves + ':');

    for (let row = board.length - 1; row >= 0; row--) {
        const cells = board[row];
        let line = '';

        for (let col = 0; col < cells.length; col++) {
            line += ' ' + cells[col] + ' ';
        }
        console.log(line);
    }
    if(treeReached){
        console.log("you have hit the tree ");
    }
   if (flagReached) {
        console.log(`Bravo! Flag reached in ${moves} moves and ${turns} turns`);
    }
   if(isMovedOut){
       console.log ('Robot Moved Out of the Board');
   }
   if(isWaterReached){
       console.log("Opps you have reached water!");

   }
   /*if(newRobotPosition){
       console.log('position of robot is updated');

   }*/

   sleep(1000);
}

function applyStep(robot, step, maxLineIndex, maxColumnIndex) {

    if (step === 'turn-right' || step === 'turn-left') {
        turns = features.turn(robot, step, turns);
        return false;
    }

    moves = features.move(robot, maxLineIndex, maxColumnIndex, moves);
    return true;
}


function sleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay) { /* Do nothing while waiting */}
}

//Hackathon Task 2
function movingOutOfBoard(){
    let isMovedOut = false;

    if((moves > PLAY_BOARD.length) || (moves > PLAY_BOARD[0].length )){

        isMovedOut = true ;
    }
    return isMovedOut;


}

//Hackathon task4

/*function reversingRobotPosition(){

    let newRobotPosition ;
    let isTreeReached = features.checkIfTreeReached(currentRobot, board);
    let isWaterReached = features.checkIfWaterReached(currentRobot,board);

    if( (isTreeReached == true) || (isMovedOut == true) || (isWaterReached == true))
    {

        newRobotPosition = ROBOT_START_STATE;

    }

    return newRobotPosition;
}*/
/*
  Main method
 */

{
    // This is where the program starts.
    main();
}
