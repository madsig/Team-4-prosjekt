function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/ `
        <div><h1>${model.app.gameTitle}</h1><div class="gameWindow">${generateGameWindow()}</div></div>
        ${generateProgramWindow()}
        ${generateCommandsWindow()}
        ${generateLevelsWindow()}
    `
}



function generateGameWindow() {
    let game = model.game;
    let currentLevel = game.runtime.currentLevel;
    let currentBoard = game.levels[currentLevel].boardId;
    let pathArray = game.boards[currentBoard].paths;
    let gameWindowHtml = '';
    let backgroundImage;
    console.log('%c------------------------', 'color: red; font-size: 28px;');
    console.log(pathArray);
    for (let i = 0; i < 7 ** 2; i++) {
        backgroundImage = getBackgroundImage(i);
        let flag = game.boards[currentBoard].finishIndex === i ? game.flagImage : '';
        let player = game.boards[currentBoard].characterStartIndex === i ? game.playerImage : '';
        gameWindowHtml += /*HTML*/ `
            <div class="gridBlock" style="background-image: url(${backgroundImage})">
                <div class="gridNumber">${i}</div>
                <div class="gridImage"><img src="${player} ${flag}"></div>
            </div>
        `;;
    }
    return '<div class="gameGrid">' + gameWindowHtml + '</div>';
}

function getBackgroundImage(index) {
    let game = model.game;
    let currentLevel = game.runtime.currentLevel;
    let currentBoard = game.levels[currentLevel].boardId;
    let pathArray = game.boards[currentBoard].paths;
    let pathwayImages = game.pathwayImages;

    if (pathArray.includes(index)) {
        console.log(index)
        pathIndex = pathArray.indexOf(index);
        console.log("pathIndex: " + pathIndex);
        let nextPathDiff = pathArray[pathIndex + 1] - index;
        console.log("nextPathDiff: " + nextPathDiff);
        let lastPathDiff = pathArray[pathIndex - 1] - index;
        console.log("lastPathDiff: " + lastPathDiff);
        let totalDiff = nextPathDiff + lastPathDiff;
        console.log("totalDiff: " + totalDiff);

        switch (totalDiff) {
            case 8:
                return pathwayImages.turnSE;
            case 6:
                return pathwayImages.turnSW;
            case -8:
                return pathwayImages.turnNW;
            case -6:
                return pathwayImages.turnNE;
            case 0:
                return Math.abs(nextPathDiff) == 1 ? pathwayImages.vertical : pathwayImages.horizontal;
            default:
                switch (true) {
                    case nextPathDiff === 1 || lastPathDiff === 1:
                        return pathwayImages.endW;
                    case nextPathDiff === -1 || lastPathDiff === -1:
                        return pathwayImages.endE;
                    case nextPathDiff === 7 || lastPathDiff === 7:
                        return pathwayImages.endN;
                    case nextPathDiff === -7 || lastPathDiff === -7:
                        return pathwayImages.endS;
                };
                break;
        };
    }
    return game.backgroundImages[0];
}

function generateProgramWindow() {
    let programList = [...model.game.runtime.program.commands];
    let programHTML = `<div><h1>Program</h1><div class="programWindow" style="height:${(programList.length * 40) + 60}px;">`
    for (let i = 0; i < programList.length; i++) {
        btnText = model.game.commands[programList[i].commandId].name
        programHTML += `<button id="${i}" class="${programList[i].isSuccess ? "codeButtonSuccess" : "codeButtonProgram"} onclick="removeCommandFromProgram(${i})">${model.game.runtime.program.commands[i].inProgram ? btnText : ""}</button>`
    }
    programHTML += `
    
    <div class="programControlButtons">
    <button class="resetButton" onclick="resetProgramList()">Reset</button>
    <button class="runProgramButton" onclick="runProgram()">Run</button>
    </div></div></div>`
    return programHTML;
}


function generateCommandsWindow() {
    let commandList = [...model.game.levels[model.game.runtime.currentLevel].availableCommands];
    let commandsHTML = `<div><h1>Commands</h1><div class="commandsWindow" style="height:${commandList.length * 40}px;">`

    for (let i = 0; i < commandList.length; i++) {
        commandsHTML += `<button id="${commandList[i]}" class="codeButtonDefault" onclick="moveCommandToProgram(${commandList[i]})">${model.game.commands[i].name}</button>`
    }
    commandsHTML += `</div></div>`
    return commandsHTML;

}

function generateLevelsWindow() {
    let levelHTML = /*HTML*/ `
        <div class="levelsWindow">
            <h2 class="levelsHeader">Levels:</h2>
            <button class="${model.game.runtime.currentLevel != 0 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(1)">Level 1</button>
            <button class="${model.game.runtime.currentLevel != 1 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(2)">Level 2</button>
            <button class="${model.game.runtime.currentLevel != 2 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(3)">Level 3</button>
            <button class="${model.game.runtime.currentLevel != 3 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(4)">Level 4</button>
        </div>
    `;
    return levelHTML;
}