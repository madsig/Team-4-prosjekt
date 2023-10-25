
function moveCommandToProgram(id){
    model.game.runtime.program.commands.push({
        commandId : id,
        isSuccess : null,
        inProgram : true,
        
    });
    resetProgramButtonStates();
    resetPlayerPosition();
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
    //moveCharacter()
}

function resetProgramButtonStates(){
    for(let command of model.game.runtime.program.commands){
        command.isSuccess = false;}
    }

function stepThroughList(){
    resetProgramButtonStates()
    const player = model.game.runtime.player;
    let stepCounter = 0;
    let i = 0;
    let marginCounter = 0;

    let charPosition = 0;
    let charDistance = 50;
    
    
    let interval = setInterval(()=>{
        if(stepCounter >= model.game.runtime.program.commands.length -1){
            clearInterval(interval)
        }

      //  requestAnimationFrame(animate);
        model.game.runtime.program.commands[stepCounter].isSuccess = true;
        let slideImageInterval = setInterval(() => {
            if(marginCounter >= 100){
                clearInterval(slideImageInterval);
            }
            console.log("%cRunning inner interval", 'color: green; font-size: 12px;')
            marginCounter += 5;
            if(player.direction == 0){//Facing North
                //model.game.runtime.player.marginTop = -marginCounter
                moveCharacter(-marginCounter)
                
            //    canvasRookie.style.top = -marginCounter+'px'
            }else if(player.direction == 1){//Facing East
                //model.game.runtime.player.marginLeft = marginCounter
                //canvasRookie.style.top = -marginCounter+'px'
                moveCharacter(marginCounter)
            }else if(player.direction == 2){//Facing South
                //model.game.runtime.player.marginTop = marginCounter
                moveCharacter(marginCounter)
                //canvasRookie.style.top = -marginCounter+'px'
            }else if(player.direction == 3){//Facing West
                //model.game.runtime.player.marginLeft = -marginCounter
                moveCharacter(-marginCounter)
            }

            updateView()

        }, 50);
        
        if(marginCounter >= 100){
            console.log("%cRunning outer interval", 'color: red; font-size: 12px;')
            model.game.runtime.player.marginTop = 0;
            moveCharacter(i)
            i++;
            stepCounter++;
            marginCounter = 0;
        updateView()}
        }, 1000)
    }

let charPosition = 0;
let charDistance = 6;

function moveCharacter(charDistance){
   charPosition += charDistance;
   console.log(charPosition)
   document.getElementById("canvasRookie").style.top = charPosition + 'px';
}
    

function moveCharacter2(i){
    commandList = model.game.runtime.program.commands;
    levelInfo = model.game.boards[model.game.runtime.currentLevel];
    playerIndex = model.game.runtime.player.index;
    characterDir = model.game.runtime.player.direction;

    
        if(commandList[i].commandId == 0){ //Gå fram
            console.log("Running command ID: "+commandList[i].commandId)
            if(characterDir == 0){
                model.game.runtime.player.index -=7;
                playerState = 'walkUp';
            }else if(characterDir == 1){
                model.game.runtime.player.index +=1;
                playerState = 'walkRight';
            }else if(characterDir == 2){
                model.game.runtime.player.index +=7;                
                playerState = 'walkDown';
            }else if(characterDir == 3){
                model.game.runtime.player.index -=1;
                playerState = 'walkLeft';
            }
            
        }else if(commandList[i].commandId == 1){ //Snu venstre
            turnLeft();
        }else if(commandList[i].commandId == 2){//Snu høyre
            turnRight();
        }else if(commandList[i].commandId == 3){//Plukk opp
            console.log("plukk opp")
            pickUpItem(playerIndex);
        }else if(commandList[i].commandId == 4){//Bruk
            useItem();
            }

       
        

    }
    

function pickUpItem(index){
    for (let i=0; i<model.game.runtime.board.inventory.length; i++) {
        if (model.game.runtime.board.inventory[i].indexOnBoard === index) {
            console.log("item found")
            console.log(i)
            model.game.runtime.board.inventory[i].pickedUp = true;
            model.game.runtime.player.inventory = i;
            updateView();
            return;
        }
    }
    console.log("no item")
}
function useItem(){
    //use item on index in paths[]
    
}
function moveForward(){
    
}

function turnRight(){
    model.game.runtime.player.direction += 1;
    model.game.runtime.player.direction = (4 + model.game.runtime.player.direction) % 4;
    console.log(model.game.directions[model.game.runtime.player.direction]);
}

function turnLeft(){
    model.game.runtime.player.direction -= 1;
    model.game.runtime.player.direction = (4 + model.game.runtime.player.direction) % 4;
    console.log(model.game.directions[model.game.runtime.player.direction]);
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