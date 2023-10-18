function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/ `
        <div class="gameWindow">${generateGameWindow()}</div>
        ${generateProgramWindow()}
        ${generateCommandsWindow()}
        ${generateLevelsWindow()}
    `
}



function generateGameWindow(){
    let game = model.game;
    let currentLevel = game.runtime.currentLevel;
    let currentBoard = game.levels[currentLevel].boardId;
    let pathArray = game.boards[currentBoard].paths;
    let gameWindowHtml = '';
    let backgroundImage;
    let path;
    for (let i=0; i<7**2; i++) {
        if (pathArray.includes(i)) {
            let pathIndex = pathArray.indexOf(i);
            let pathDifference = pathArray[pathIndex] - pathArray[pathIndex + 1];
            console.log(pathDifference);
            //path peker mot neste path, neste steg er svinger
            switch(pathDifference) {
                case 1: 
                case -1:
                    path = game.pathwayImages[0];
                    break;
                case 7 :
                case -7:
                    path = game.pathwayImages[1];
                    break;
            }
            backgroundImage = path;
        }
        else backgroundImage = game.backgroundImages[0];

        let flag = game.boards[currentBoard].finishIndex === i ? game.flagImage : '';
        let player = game.boards[currentBoard].characterStartIndex === i ? game.playerImage : '';
        gameWindowHtml += /*HTML*/ `
            <div class="gridBlock" style="background-image: url(${backgroundImage})">
                <div class="gridNumber">${i}</div>
                <div class="gridImage"><img src="${player} ${flag}"></div>
            </div>
        `;
    }
    return '<div class="gameGrid">'+gameWindowHtml+'</div>';
}

function generateProgramWindow(){
    let programList = [...model.game.runtime.program.commands];
    let programHTML = `<div><h1>Program</h1><div class="programWindow" style="height:${(programList.length*40)+50}px;">`
    for(let i = 0; i < programList.length;i++){
        btnText = model.game.commands[programList[i].commandId].name
        programHTML += `<button id="${i}" class="codeButtonEmpty" onclick="removeCommandFromProgram(${i})">${model.game.runtime.program.commands[i].inProgram ? btnText:""}</button>`
    }
    programHTML+= `
    
    <div class="programControlButtons">
    <button class="resetButton">Reset</button>
    <button class="runProgramButton">Run</button>
    </div></div></div>`
    return programHTML;
}


function generateCommandsWindow(){
    let commandList = [...model.game.levels[model.game.runtime.currentLevel].availableCommands];
    let commandsHTML = `<div><h1>Commands</h1><div class="commandsWindow" style="height:${commandList.length*40}px;">`
    
    for(let i = 0; i < commandList.length;i++){
        commandsHTML += `<button id="${commandList[i]}" class="codeButtonDefault" onclick="moveCommandToProgram(${commandList[i]})">${model.game.commands[i].name}</button>`
    }
    commandsHTML+= `</div></div>`
    return commandsHTML;
    
}

function generateLevelsWindow(){
    let levelHTML = /*HTML*/ `
        <div class="levelsWindow">
            Levels<br/>
            <button class="${model.game.runtime.currentLevel != 0 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(1)">Level 1</button>
            <button class="${model.game.runtime.currentLevel != 1 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(2)">Level 2</button>
            <button class="${model.game.runtime.currentLevel != 2 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(3)">Level 3</button>
            <button class="${model.game.runtime.currentLevel != 3 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(4)">Level 4</button>
        </div>
    `;
    return levelHTML;
}