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
    let lastIndex = null;
    let path;
    console.log('%c------------------------', 'color: red; font-size: 18px;');
    console.log(pathArray);
    for (let i=0; i<7**2; i++) {
        if (pathArray.includes(i)) {
            console.log(i)
            pathIndex = pathArray.indexOf(i);
            console.log("pathIndex: "+pathIndex);
            let nextPathDiff = pathArray[pathIndex+1] - i;
            console.log("nextPathDiff: "+nextPathDiff);
            let lastPathDiff = pathArray[pathIndex-1] - i;
            console.log("lastPathDiff: "+lastPathDiff);
            let totalDiff = nextPathDiff + lastPathDiff;
            console.log("totalDiff: "+totalDiff);

            switch(totalDiff) {
                case 8:
                    path = game.pathwayImages[2];
                    break;
                case 6:
                    path = game.pathwayImages[3];
                    break;
                case -8:
                    path = game.pathwayImages[4];
                    break;
                case -6:
                    path = game.pathwayImages[5];
                    break;
                case 0:
                    path = nextPathDiff == 1 ? game.pathwayImages[0] : game.pathwayImages[1];
                    break;
                default:
                    path = game.backgroundImages[0]
                    break;
            };

            // let pathIndex = pathArray.indexOf(i);
            // let pathDifference = pathArray[pathIndex] - pathArray[pathIndex + 1];
            // console.log(i);
            // console.log(pathDifference);
            // lastIndex = pathIndex-1;
            //path peker mot neste path, neste steg er svinger
            // switch(pathDifference) {
            //     case 1: 
            //     case -1:
            //         console.log("lastIndex: " + pathArray[lastIndex])
            //         console.log("pathIndex: " + pathArray[pathIndex])
            //         lastPathDiff = pathArray[lastIndex] - pathArray[pathIndex];
            //         console.log("lastPathDiff : " + lastPathDiff)
            //         console.log("lastPathDiff abs : " + Math.abs(lastPathDiff))
            //         lastPathDiff = pathArray[lastIndex] - pathArray[pathIndex];
            //         if ( Math.abs(lastPathDiff ) === 7) {
            //             console.log("sving tror jeg")
            //             path = pathDifference == 1 ? game.pathwayImages[4] : game.pathwayImages[5]
            //         }
            //         else path = game.pathwayImages[0]
            //         break;
            //     case 7 :
            //     case -7:
            //         console.log("lastIndex: " + pathArray[lastIndex])
            //         console.log("pathIndex: " + pathArray[pathIndex])
            //         lastPathDiff = pathArray[lastIndex] - pathArray[pathIndex];
            //         console.log("lastPathDiff : " + lastPathDiff)
            //         console.log("lastPathDiff abs : " + Math.abs(lastPathDiff))
            //         if ( Math.abs(lastPathDiff ) === 1) {
            //             console.log("sving tror jeg")
            //             path = pathDifference == 7 ? game.pathwayImages[2] : game.pathwayImages[3]
            //         }
            //         else path = game.pathwayImages[1];
            //         break;
            // }
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
        `;;
    }
    return '<div class="gameGrid">'+gameWindowHtml+'</div>';
}

function generateProgramWindow(){
    let programList = [...model.game.runtime.program.commands];
    let programHTML = `<div><h1>Program</h1><div class="programWindow" style="height:${(programList.length*40)+60}px;">`
    for(let i = 0; i < programList.length;i++){
        btnText = model.game.commands[programList[i].commandId].name
        programHTML += `<button id="${i}" class="${programList[i].isSuccess ? "codeButtonSuccess":"codeButtonProgram"} onclick="removeCommandFromProgram(${i})">${model.game.runtime.program.commands[i].inProgram ? btnText:""}</button>`
    }
    programHTML+= `
    
    <div class="programControlButtons">
    <button class="resetButton" onclick="resetProgramList()">Reset</button>
    <button class="runProgramButton" onclick="runProgram()">Run</button>
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
            <h2 class="levelsHeader">Levels:</h2>
            <button class="${model.game.runtime.currentLevel != 0 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(1)">Level 1</button>
            <button class="${model.game.runtime.currentLevel != 1 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(2)">Level 2</button>
            <button class="${model.game.runtime.currentLevel != 2 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(3)">Level 3</button>
            <button class="${model.game.runtime.currentLevel != 3 ? "levelButton":"levelButtonDisabled"}" onclick="changeLevel(4)">Level 4</button>
        </div>
    `;
    return levelHTML;
}