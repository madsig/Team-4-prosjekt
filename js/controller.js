
function moveCommandToProgram(id){
    model.game.runtime.program.commands.push({
        commandId : id,
        isSuccess : null,
        inProgram : true,
    });
    updateView();
}
function removeCommandFromProgram(index){
    model.game.runtime.program.commands.splice(index, 1)
    updateView();
}

function resetProgramList(){
    model.game.runtime.program.commands = []
    updateView()
}

function runProgram(){
    //Do something 

    //Go through the program list of commands
    stepThroughList()
    
}

function stepThroughList(){
    let stepCounter = 0;
    let interval = setInterval(()=>{
        if(stepCounter >= model.game.runtime.program.commands.length -1){
            clearInterval(interval)
        }
        //Placeholder: Check if the move is valid or not here
            model.game.runtime.program.commands[stepCounter].isSuccess = true;
        
        stepCounter++;
        updateView()
        }, 1000)
}


function changeLevel(level) {
    if (confirm("Forlat levelet?")) {
        let levelId = level - 1; //level 1 = index 0
        model.game.runtime.currentLevel = levelId;
        updateView();
    }
}