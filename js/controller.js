function moveCommandToProgram(id){
    model.game.runtime.program.commands.push({
        commandId : id,
        isSuccess :null,
        inProgram : true,
    });
    updateView();
}
function removeCommandFromProgram(id){
    model.game.runtime.program.commands.splice(id, 1)
    updateView();
}


function changeLevel(level) {
    if (confirm("Forlat levelet?")) {
        let levelId = level - 1;
        model.game.runtime.currentLevel = levelId;
        updateView();
    }
}