let model = {
    app: {
        //kasnkje i css fil
        theme: 'light',
        fontStyles:{
            fontHeader: "Cavet", //må kanskje importeres.
            fontParagraph: "Lato"
        },
        colorPallete:{
            commandButtonDefault: "#ABC123",
            levelSelectButtons: "",
            commandSucess: "",
            commandFail: "",
            overlayPanelColor: "", //Må ha transparency 90ish.
            
        },
    },

    game: {
        runtime: {
            robot: {
                index: 0,
                direction: 'north',
                inventory: null,
            },
            board: {
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 7 },
                ],
            },
        },
        commands: [
            { id: 0, name: 'Gå', jsName: 'moveForward()', },  // eval
            //Default har tekst "Snu", endrer navn når spilleren velger retning of legger den til i programmet
            { id: 1, name: ['Snu', 'Snu høyre', 'Snu venstre'], jsName: ['turn(Left)', 'turn(Right)'] }, 
            { id: 2, name: 'Plukk opp', jsName: 'pickUpItem()', }, 
            { id: 3, name: 'Bruk', jsName: 'useItem()', }, 

        ],
        program: {
            currentCommandIndex: 1,
            //kommandoene som ikke har kjørt enda er null
            commands: [
                { commandId: 0, isSuccess: true },
                { commandId: 1, isSuccess: false },
                { commandId: 0, isSuccess: null},
            ],
        },

        levels: [
            { id: 0, boardId: 0, availableCommands: [0,0,1,2] },//2 gå kommandoer, 1 snu, 1 plukk opp
            { id: 1, boardId: 0 },
            { id: 2, boardId: 1 },
        ],


        boards: [
            {
                id: 0,
                characterStartIndex: 7,
                finishIndex: 9,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 16, iconUrl: 'dfhdhg.png', pickedUp: false, },
                    { id: 1, name: 'kake', indexInBoard: 23, iconUrl: 'hliah.png', pickedUp: false, }
                ],
                disabledCellIds: [7, 5, 3],
                paths: [31, 23, 16, 17, 18, 19],
            },
        ],

        backgroundImages: [],
        pathwayImages: [],
        itemImages: [
            { yellowKeyIcon: "img/yellowkey.png" },
            { yellowDoor: "img/yellowdoor.png" }
        ],
    },
}

//Backgroundbilder
//itemBilder
//Pathwaybilder

