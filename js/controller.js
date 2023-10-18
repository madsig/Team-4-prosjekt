function MoveCommandToProgram(){

}

function changeLevel(level) {
    let levelId = level - 1;
    model.game.runtime.currentLevel = levelId;
    updateView();
}