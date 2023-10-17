function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/ `
        <div class="gameWindow">${generateGameWindow()}</div>
        ${generateProgramWindow()}
        ${generateCommandsWindow()}
        ${generateLevelsWindow()}
    `
}



function generateGameWindow(){
    let gameWindowHtml = '';
    let colors = ['#478559', '#161748', '#f95d9b', '#39a0ca'];
    
    for (i=0; i<7**2; i++) {
        let color = colors[i%4];
        gameWindowHtml += /*HTML*/ `
            <div class="gridBlock" style="background-color: ${color};">${i}</div>
        `;
    }
    return '<div class="gameGrid">'+gameWindowHtml+'</div>';
}

function generateProgramWindow(){
    let programHTML = `<div><h1>Program</h1><div class="programWindow" style="height:${20*40}px;">`
    for(let i = 0; i < 8;i++){
        programHTML += `<button class="codeButtonEmpty"></button>`
    }
    programHTML+= `</div></div>`
    return programHTML;

}

function generateCommandsWindow(){
    let commandsHTML = `<div><h1>Commands</h1><div class="commandsWindow" style="height:${20*40}px;">`
    
    for(let i = 0; i < 8;i++){
        commandsHTML += `<button class="codeButtonDefault">Something</button>`
    }
    commandsHTML+= `</div></div>`


    return commandsHTML;
    
}

function generateLevelsWindow(){
    let levelHTML = `<div class="levelsWindow"}">Levels</div>`;
    return levelHTML;
}