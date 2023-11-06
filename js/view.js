"use strict";

/*${generateOverlayWindow()}*/
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/ `
        ${model.app.showOverlay ? generateOverlayWindow() : ''}
        <div>${generateTopImageAndText()}<div class="gameWindow">${generateGameWindow()}${showVictoryOverlay()}</div></div>
        ${generateProgramWindow()}
        ${generateCommandsWindow()}
        ${generateLevelsWindow()}
    `;
    getCanvas()
}

function showVictoryOverlay(){
    return model.game.runtime.currentLevelStatus ? `<div class="victoryImage"><img src="img/victory.png"></div>`:"";
}
function generateTopImageAndText(){
 let topHTML = `
    <div class="topImageAndText">
    <img src="${model.game.runtime.board.boardFace}">
    <h1>${!model.game.runtime.isPlayerOffTrack ? model.game.runtime.board.boardTask : model.game.failQuotes[RNG(model.game.failQuotes.length)]}</h1>
    </div>`
    return topHTML;
}
function initializeLevel() {
    model.game.runtime.board = JSON.parse(JSON.stringify(model.game.boards[model.game.runtime.currentLevel]));
    model.game.runtime.player.direction = model.game.runtime.board.startDirection;
    model.game.runtime.player.index = model.game.runtime.board.characterStartIndex;
    model.game.runtime.board.backgroundImagesCache = [];
    model.app.pathObject = {};
    model.game.runtime.player.inventory = null;
}

function generateGameWindow() {
    const game = model.game;
    const board = game.runtime.board;
    const pathArray = board.paths;
    const playerIndex = model.game.runtime.player.index;
    let gameWindowHtml = '';
    let backgroundImage;
    let objective;

    if(board.objectives.length != 0){
        objective = board.objectives.indexOnBoard;
    }

    //console.log('%c------------------------', 'color: red; font-size: 28px;');
    //console.log("pathArray: "+pathArray);
    for (let i = 0; i < 7 ** 2; i++) {
        backgroundImage = board.backgroundImagesCache.length === 49 ? board.backgroundImagesCache[i] : getBackgroundImage(i);
        let flag = board.finishIndex === i ? game.flagImage : '';
        let obj = objective === i ? board.objectives.iconUrl: '';
        
        //If the building is locked (objectives) and it exists on the finishIndex, dont draw the flag. If the building is Opened, dont draw it.
        if(board.finishIndex == board.objectives.indexOnBoard && !board.objectives.isOpened){
            obj = objective === i ? board.objectives.iconUrl: '';
            flag = '';
        }else{
            obj = '';
        }

        //let player = game.boards[currentBoard].characterStartIndex === i ? game.playerImage : '';
        let player = playerIndex === i ? `<canvas style="top: ${model.game.runtime.player.marginTop + 35}%; left: ${model.game.runtime.player.marginLeft + 50}%" id="canvasRookie"></canvas>` : '';
        gameWindowHtml += /*HTML*/ `
            <div class="gridBlock" style="background-image: url(${backgroundImage})">
                <div class="gridNumber">${model.app.isTesting ? i:""}</div>
                <div class="gridImage"><img src="${flag} ${obj}${getItems(i)}" width="64" style="margin-top:-8%"> ${player}</div>
            </div>
        `;
    }
    //console.table(model.degub.pathObject)
    return '<div class="gameGrid">' + gameWindowHtml + '</div>';
}

function getBackgroundImage(index) {
    const game = model.game;
    const pathArray = game.runtime.board.paths;
    const pathwayImages = game.pathwayImages;

    let pathIndex = pathArray.indexOf(index);
    let nextPathDiff = pathArray[pathIndex + 1] - index;
    let lastPathDiff = pathArray[pathIndex - 1] - index;
    let totalDiff = nextPathDiff + lastPathDiff;
    if (pathArray.includes(index)) model.debug.pathObject[index] = {pathIndex, nextPathDiff, lastPathDiff, totalDiff};

    const diff = totalDiff;
    const pi = pathwayImages;
    const next = nextPathDiff;
    const last = lastPathDiff;


    let image =  pathIndex === -1 ? game.backgroundImages[RNG(game.backgroundImages.length)]
        : diff === 8 ? pi.turnSE
        : diff === 6 ? pi.turnSW
        : diff === -8 ? pi.turnNW
        : diff === -6 ? pi.turnNE
        : diff === 0 ? (Math.abs(next) === 1 ? pi.vertical : pi.horizontal)
        : next === 1 || last === 1 ? pi.endW
        : next === -1 || last === -1 ? pi.endE
        : next === 7 || last === 7 ? pi.endN
        : next === -7 || last === -7 ? pi.endS
        : game.backgroundImages[-1];
    if (index === 45 && model.game.runtime.board.inventory.length > 0) image = game.inventoryImage;  
    game.runtime.board.backgroundImagesCache.push(image);
    return image;
}
function getItems(index) {
    const runtime = model.game.runtime;
    const inventory = runtime.board.inventory

    if (index === 45 && runtime.player.inventory != null) return inventory[runtime.player.inventory].iconUrl;

    let item = '';
    if (inventory.length === 0) return item;
    for (let j=0; j<inventory.length; j++) {
        if (inventory[j].indexOnBoard === index && !inventory[j].pickedUp) {
            item = inventory[j].iconUrl;
        }
    }
    return item;
}

function generateProgramWindow() {
    let programList = [...model.game.runtime.program.commands];
    let nextLevel = model.game.runtime.currentLevel + 2;
    let programHTML = `<div><h1>Program</h1><div class="programWindow">` // style="height:${(programList.length * 44) + 60}px;
    let btnText = "";
    for (let i = 0; i < programList.length; i++) {
        btnText = model.game.commands[programList[i].commandId]
        programHTML += `
        <button id="${i}" 
        class="${!programList[i].hasRun ? "codeButtonProgram" : programList[i].isSuccess ? "codeButtonSuccess" : "codeButtonFailed"}"
        onclick="removeCommandFromProgram(${i})"
        >${programList[i].hasRun ? btnText.jsName : btnText.name}</button>`
    }

    if(model.game.runtime.currentLevelStatus){
        programHTML += /*HTML*/`
        <div class="programControlButtons">
        <button class="continueButton" onclick="changeLevel(${nextLevel})">Next level</button>
        </div></div></div>`
    }else{
    programHTML += /*HTML*/`
    <div class="programControlButtons">
            <button ${model.game.runtime.program.commands.length == 0 ? "disabled":""} class="resetButton" onclick="resetProgramList()">↺</button>
            <button ${model.game.runtime.program.commands.length == 0 ? "disabled":""} class="runProgramButton" onclick="runProgram()">⏵</button>
        </div></div></div>`}
    return programHTML;
}


function generateCommandsWindow() {
    let commandList = [...model.game.levels[model.game.runtime.currentLevel].availableCommands];
    let commandsHTML = `<div><h1>Commands</h1><div class="commandsWindow">` //style="height:${(commandList.length * 44)+10}px;
    
    for (let i = 0; i < commandList.length; i++) {
        commandsHTML += /*HTML*/`
            <button id="${commandList[i]}" class="codeButtonDefault" onclick="moveCommandToProgram(${commandList[i]})">${model.game.commands[commandList[i]].name}</button>      
        `
    }
    commandsHTML += `</div></div>`
    return commandsHTML;

}

function generateLevelsWindow() {
    const currentLevel = model.game.runtime.currentLevel;
    let levelHTML = /*HTML*/ `
        <div>
            <h2 class="levelsHeader">Levels</h2>
            <div class="levelsWindow">
            <button class="${currentLevel != 0 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(1)">1</button>
            <button class="${currentLevel != 1 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(2)">2</button>
            <button class="${currentLevel != 2 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(3)">3</button>
            <button class="${currentLevel != 3 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(4)">4</button>
            <button class="${currentLevel != 4 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(5)">5</button>
            <button class="${currentLevel != 5 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(6)">6</button>
            <button class="${currentLevel != 6 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(7)">7</button>
            <button class="${currentLevel != 7 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(8)">8</button>
            <button class="${currentLevel != 8 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(9)">9</button>
            <button class="${currentLevel != 9 ? "levelButton" : "levelButtonDisabled"}" onclick="changeLevel(10)">10</button>
        </div></div>
    `;
    return levelHTML;
}


function generateOverlayWindow(){
   let overlayHTML = 
        /*HTML*/
        `
        <div class="overlayWindow">
         <h2 class="overlayHeader">${model.game.hasGameEnded ? model.game.gameEndOverlay.overlayTitle : model.game.runtime.board.overlayTitle}</h2>
         <div class="overlayImages">
         ${model.game.hasGameEnded ? `<img src="img/computer.png" width=96px>`:""}
         ${model.game.hasGameEnded ? `<img src="img/terjeMedHatt.gif" width=96px>`:""}
         <img src="img/rookieHIGH14.png" width="128px">
         ${model.game.hasGameEnded ? `<img src="img/eskil.gif" width=96px>`:""}
         ${model.game.hasGameEnded ? `<img src="img/microphonemuted.png" width=96px>`:""}
         </div>
         <div class="storyText">
         ${model.game.hasGameEnded ? "" : `<img src="${model.game.runtime.board.overlayFace}" width="96px" height="96px">`}
         <p>
          ${model.game.hasGameEnded ? model.game.gameEndOverlay.overlayText : model.game.runtime.board.overlayStory}
         </p>
         </div>
         ${model.game.hasGameEnded ? "" : `<button onclick="toggleOverlay()" class="startButton">Start!</button>`}

        </div>
         `;
        
   return overlayHTML;
}

function toggleOverlay(){
    model.app.showOverlay = !model.app.showOverlay;
    updateView()
}


