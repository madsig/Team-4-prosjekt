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
    let gameWindowHtml = '';
    let colors = ['#478559', '#161748', '#f95d9b', '#39a0ca'];
    
    for (let i=0; i<7**2; i++) {
        let rng = Math.floor(Math.random()*4)
        let color = colors[rng];

        let backgroundImage = game.boards[currentBoard].paths.includes(i) ? game.pathwayImages[0] : game.backgroundImages[0];
        gameWindowHtml += /*HTML*/ `
            <div class="gridBlock" style="background-image: url(${backgroundImage})">${i}</div>
        `;
    }
    return '<div class="gameGrid">'+gameWindowHtml+'</div>';
}

function generateProgramWindow(){
    let programList = [...model.game.levels[model.game.runtime.currentLevel].availableCommands];
    let programHTML = `<div><h1>Program</h1><div class="programWindow" style="height:${programList.length*40}px;">`
    
    for(let i = 0; i < 3;i++){
        btnText = model.game.commands[model.game.runtime.program.commands[i].commandId].name
        //Må håndtere at Snu er en liste med names, og ikke name
        programHTML += `<button id="${programList[i]}" class="codeButtonEmpty">${model.game.runtime.program.commands[i].inProgram ? btnText:""}</button>`
    }
    programHTML+= `</div></div>`
    return programHTML;
}


function generateCommandsWindow(){
    let commandList = [...model.game.levels[model.game.runtime.currentLevel].availableCommands];
    let commandsHTML = `<div><h1>Commands</h1><div class="commandsWindow" style="height:${commandList.length*40}px;">`
    
    for(let i = 0; i < commandList.length;i++){
        commandsHTML += `<button id="${commandList[i]}" class="codeButtonDefault">${model.game.commands[i].name}</button>`
    }
    commandsHTML+= `</div></div>`
    return commandsHTML;
    
}

function generateLevelsWindow(){
    let levelHTML = /*HTML*/ `
        <div class="levelsWindow">
            Levels<br/>
            <button onclick="changeLevel(1)">Level 1</button>
            <button onclick="changeLevel(3)">Level 3</button>
            <button onclick="changeLevel(4)">Level 4</button>
        </div>
    `;
    return levelHTML;
}