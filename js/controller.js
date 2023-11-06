
function moveCommandToProgram(id) {
    if (model.game.runtime.program.isRunning) return;
    model.game.runtime.program.commands.push({
        commandId: id,
        isSuccess: null,
        hasRun: false,
        inProgram: true,

    });
    resetProgramButtonStates();
    resetItems();
    resetPlayerPosition();
    updateView();
}
function removeCommandFromProgram(index) {
    if (model.game.runtime.program.isRunning) return;
    model.game.runtime.program.commands.splice(index, 1)
    for (let command of model.game.runtime.program.commands) {
        command.isSuccess = false;
    }
    resetPlayerPosition()
    resetItems();
    resetProgramButtonStates();
    updateView();
}

function resetProgramList() {
    model.game.runtime.program.commands = []
    resetItems()
    resetPlayerPosition()
    updateView()
}

function resetPlayerPosition() {
    model.game.runtime.player.index = model.game.runtime.board.characterStartIndex;
    model.game.runtime.player.direction = model.game.runtime.board.startDirection;
    model.game.runtime.player.marginLeft = 0;
    model.game.runtime.player.marginTop = 0;
    model.game.runtime.isPlayerOffTrack = false;
    setAnimationDirection()
}

function runProgram() {
    resetPlayerPosition();
    resetItems();
    stepThroughList();
}


function resetProgramButtonStates() {
    for (let command of model.game.runtime.program.commands) {
        command.isSuccess = false;
        command.hasRun = false;
    }
}

function failRemainingCommands(index){
    for(let i = index-1; i<model.game.runtime.program.commands.length;i++){
        model.game.runtime.program.commands[i].hasRun = true;
        model.game.runtime.program.commands[i].isSuccess = false;
    }


}

function stepThroughList() {
    resetProgramButtonStates();
    model.game.runtime.program.isRunning = true; 
    console.log("running commands")
    const player = model.game.runtime.player;
    let stepCounter = 0;
    let marginCounter = 0; // 0
    let currentCommand = model.game.runtime.program.commands[stepCounter]
    staggerFrames = 3; // 3 - Default during movement, so the animation has time to run in the pause between changes.
    
    let interval = setInterval(() => {

        if (model.game.runtime.program.commands.length <= stepCounter || model.game.runtime.isPlayerOffTrack) {
            clearInterval(interval) //Stop running the interval
            staggerFrames = 14; //Default speed for idle animations
            playerState = 'idle'; //Resets the state to the default idle animation after all commands are run.
            checkWinLoss() //Checks if the player ended up on the goal index
            model.game.runtime.program.isRunning = false; 
            console.log("finished running commands")
            return;
        }

        currentCommand = model.game.runtime.program.commands[stepCounter]
        // Doing things
        if(currentCommand.commandId == 1){
            turnLeft()
            marginCounter = 100; //kan løses bedre
            staggerFrames = 14;
        }else if(currentCommand.commandId == 2){
            turnRight()
            marginCounter = 100;
            staggerFrames = 14;
        }else if(currentCommand.commandId == 3){
            pickUpItem(model.game.runtime.player.index)
            marginCounter = 100;
            staggerFrames = 6;
        }else if(currentCommand.commandId == 4){
            useItem()
            marginCounter = 100;
            staggerFrames = 14;
        }


        //Moving things
        if (marginCounter < 100) {
            console.log("%cRunning inner interval", 'color: green; font-size: 12px;')
            marginCounter += 25; // How far the character moves pr update.
            if(currentCommand.commandId == 0){
                staggerFrames = 3;
                if (player.direction == 0) {//Facing North
                    model.game.runtime.player.marginTop = -marginCounter
                    playerState = 'walkUp';            
                } else if (player.direction == 1) {//Facing East
                    model.game.runtime.player.marginLeft = marginCounter
                    playerState = 'walkRight';
                } else if (player.direction == 2) {//Facing South
                    model.game.runtime.player.marginTop = marginCounter
                    playerState = 'walkDown';
                } else if (player.direction == 3) {//Facing West
                    model.game.runtime.player.marginLeft = -marginCounter
                    playerState = 'walkLeft';
                }
            
            }

        }else {
            console.log("%cRunning outer interval", 'color: red; font-size: 12px;')
            model.game.runtime.program.commands[stepCounter].hasRun = true;
            model.game.runtime.program.commands[stepCounter].isSuccess = true;
            if(currentCommand.commandId == 0)
                moveForward(stepCounter)
            if(currentCommand.commandId == 3){
                pickUpItem();
            }
            model.game.runtime.player.marginTop = 0;
            model.game.runtime.player.marginLeft = 0;
            stepCounter++;
            if(model.game.runtime.isPlayerOffTrack){failRemainingCommands(stepCounter);}
            marginCounter = 0;
        }
        updateView()
    }, 200); // 170 default

}

function pickUpItem(index) {
    playerState = 'pickUp';
    const boardInv = model.game.runtime.board.inventory;
    console.log(`player inventory: ${model.game.runtime.player.inventory}`)
    // if (model.game.runtime.player.inventory != null) {
    //     console.log("inventory full");
    //     return;
    // }
    for (let i = 0; i < boardInv.length; i++) {
        if (boardInv[i].indexOnBoard === index && !boardInv[i].pickedUp) {
            console.log("item found")
            console.log("board inventory item id: " + i)
            boardInv[i].pickedUp = true;
            model.game.runtime.player.inventory = i;
            updateView();
            return;
        }
    }
    console.log("no item")
}
function useItem() {
    if(model.game.runtime.board.inventory[0].isUsable && model.game.runtime.player.index == model.game.runtime.board.inventory[0].indexOnBoard){
        model.game.runtime.board.objectives.isOpened = true;
        model.game.runtime.board.inventory[0].pickedUp = true;
    }
    if (model.game.runtime.player.inventory === null) {
        console.log("no item in inventory")
        return;
    }
    model.game.runtime.board.inventory[model.game.runtime.player.inventory].indexOnBoard = model.game.runtime.player.index;
    //model.game.runtime.board.inventory[model.game.runtime.player.inventory].pickedUp = false;
    //model.game.runtime.player.inventory = null;
    console.log("item used/dropped");
    updateView();
}
function resetItems() {
    const currentBoard = model.game.levels[model.game.runtime.currentLevel].boardId;
    model.game.runtime.board.inventory = JSON.parse(JSON.stringify(model.game.boards[currentBoard].inventory));
    model.game.runtime.player.inventory = null;
}

function moveForward() {
    characterDir = model.game.runtime.player.direction;

    if (characterDir == 0) {
        model.game.runtime.player.index -= 7;
    } else if (characterDir == 1) {
        model.game.runtime.player.index += 1;
    } else if (characterDir == 2) {
        model.game.runtime.player.index += 7;
    } else if (characterDir == 3) {
        model.game.runtime.player.index -= 1;
    }

    if(!model.game.runtime.board.paths.includes(model.game.runtime.player.index)){
        model.game.runtime.isPlayerOffTrack = true;
    }
    
}

function turnRight() {
    model.game.runtime.player.direction -= 1;
    model.game.runtime.player.direction = (4 + model.game.runtime.player.direction) % 4;
    console.log("I'm right about everything");
}

function turnLeft() {
    model.game.runtime.player.direction += 1;
    model.game.runtime.player.direction = (4 + model.game.runtime.player.direction) % 4;
    console.log("I'm left in the dark");
}


function changeLevel(level) {
    let levelId = level - 1; //level 1 = index 0
    model.app.showOverlay = true;
    if(levelId < 10){
        model.game.runtime.currentLevel = levelId;
        model.game.runtime.currentLevelStatus = null;
        setAnimationDirection()
        resetProgramList()
        initializeLevel();
    }else{
        model.game.hasGameEnded = true;
    }

    updateView();
}

function toggleTestMode() {
    model.app.isTesting = !model.app.isTesting;
    updateView()
}

function RNG(max) {
    let number = Math.floor(Math.random() * max);
    return number
}


function checkWinLoss() {
    if (model.game.runtime.player.index === model.game.runtime.board.finishIndex) {
        if (model.game.runtime.board.inventory.length > 0 && !model.game.runtime.board.inventory[0].pickedUp && model.game.runtime.currentLevel != 9) {
             //loose()
            console.log("loose")
            model.game.runtime.board.boardTask = "Du glemte "+model.game.runtime.board.inventory[0].name+"!";
            
        }else{
        //win()
        playerState = 'victoryPose';
        console.log("win")
        model.game.runtime.currentLevelStatus = true;
        model.game.runtime.board.boardTask = model.game.victoryQuotes[RNG(model.game.victoryQuotes.length)];
        }
    }
    updateView()
}
function setAnimationDirection() {
    level = model.game.runtime.currentLevel
    if(model.game.boards[level].startDirection == 1){
        playerState = 'rightIdle'
    }
    if(model.game.boards[level].startDirection == 2){
        playerState = 'idle'
    }
    if(model.game.boards[level].startDirection == 0){
        playerState = 'upIdle'
    }
    if(model.game.boards[level].startDirection == 3){
        playerState = 'leftIdle'
    }
}