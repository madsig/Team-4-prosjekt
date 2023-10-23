
function moveCommandToProgram(id){
    model.game.runtime.program.commands.push({
        commandId : id,
        isSuccess : null,
        inProgram : true,
        
    });
    resetProgramButtonStates();
    updateView();
}
function removeCommandFromProgram(index){
    model.game.runtime.program.commands.splice(index, 1)
    for(let command of model.game.runtime.program.commands){
        command.isSuccess = false;
    }
    resetPlayerPosition()
    resetProgramButtonStates();
    updateView();
}

function resetProgramList(){
    model.game.runtime.program.commands = []
    resetPlayerPosition()
    updateView()
}

function resetPlayerPosition(){
    model.game.runtime.player.index = model.game.runtime.board.characterStartIndex;
    model.game.runtime.player.direction = model.game.runtime.board.startDirection;
}

function runProgram(){
    //Go through the program list of commands
    stepThroughList()
    
}

function resetProgramButtonStates(){
    for(let command of model.game.runtime.program.commands){
        command.isSuccess = false;}
    }

function stepThroughList(){
    resetProgramButtonStates()
    let stepCounter = 0;
    let i = 1;
    
    let interval = setInterval(()=>{
        if(stepCounter >= model.game.runtime.program.commands.length -1){
            clearInterval(interval)
        }
        //Placeholder: Check if the move is valid or not here
        model.game.runtime.program.commands[stepCounter].isSuccess = true;
        //moveCharacter(i)
        i++;
        stepCounter++;
        updateView()
        }, 1000)
}

function moveCharacter(i){
    commandList = model.game.runtime.program.commands;
    levelInfo = model.game.boards[model.game.runtime.currentLevel];
    playerIndex = model.game.runtime.player.index;
    characterDir = model.game.runtime.player.direction;

    // Noe feil her, legger man til Gå Fram 2 ganger, hopper den 2 ruter fram.
    for(let command of commandList){
       for(let c of model.game.commands){
            if(c.id == command.commandId){
                if(c.id == 0){ //Gå fram
                    if(characterDir == 0){
                        model.game.runtime.player.index -=7;
                    }else if(characterDir == 1){
                        model.game.runtime.player.index +=1;
                    }else if(characterDir == 2){
                        model.game.runtime.player.index +=7;
                    }else if(characterDir == 3){
                        model.game.runtime.player.index -=1;
                    }
                    
                }else if(c.id == 1){ //Snu venstre
                    turnLeft();
                }else if(c.id == 2){//Snu høyre
                    turnRight();
                }else if(c.id == 3){//Plukk opp
                    pickUpItem();
                }else if(c.id == 4){//Bruk
                    useItem();
                }
            }
            console.log("index: "+model.game.runtime.player.index)
        }
    }
}
//index = (maxNr + index) % maxNr

function pickUpItem(){
    //pick up item on index in paths[inventory.itemOnIndex]
    //add item to players "inventory" window, bottom of the gameWindow
}
function useItem(){
    //use item on index in paths
    
}
function turnRight(){
    model.game.runtime.player.direction = (3 + model.game.runtime.player.direction) % 3
    console.log(model.game.directions[model.game.runtime.player.direction])
}
function turnLeft(){
    model.game.runtime.player.direction = (3 - model.game.runtime.player.direction) % 3
    console.log(model.game.runtime.player.direction)
}


function changeLevel(level) {
    if (confirm("Forlat levelet?")) {
        let levelId = level - 1; //level 1 = index 0
        model.game.runtime.currentLevel = levelId;
        resetProgramList()
        initializeLevel();
        updateView();
    }
}

function toggleTestMode(){
    model.app.isTesting = !model.app.isTesting;
    updateView()
}

function RNG(max) {
    let number = Math.floor(Math.random()*max);
    return number
}