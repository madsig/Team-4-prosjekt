let model = {
    app: {
        //kasnkje i css fil
        theme: 'light',
        
        //Trenger man dette i modellen?
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
            currentLevel: 0,
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

            program: {
                currentCommandIndex: 1,
                //kommandoene som ikke har kjørt enda er null
                //setter inn kommandoene som ligger i lista til levels og endrer bare her
                commands: [
                    { commandId: 0, isSuccess: true, inProgram: false, },
                    { commandId: 2, isSuccess: false, inProgram: false, },
                    { commandId: 3, isSuccess: null, inProgram: true, },
                ],
                programList: [0,2,3]
            },


        },
        //
        commands: [
            { id: 0, name: 'Gå', jsName: 'moveForward()', },  // eval
            //Default har tekst "Snu", endrer navn når spilleren velger retning of legger den til i programmet
            { id: 1, name: ['Snu', 'Snu høyre', 'Snu venstre'], jsName: ['turn(Left)', 'turn(Right)'] }, 
            { id: 2, name: 'Plukk opp', jsName: 'pickUpItem()', }, 
            { id: 3, name: 'Bruk', jsName: 'useItem()', }, 

        ],
        

        levels: [
            { id: 0, boardId: 0, availableCommands: [0,0,1,2] },//2 gå kommandoer, 1 snu, 1 plukk opp disse matcher commands.id
            { id: 1, boardId: 0, availableCommands: [0,0,1,2] },
            { id: 2, boardId: 1, availableCommands: [0,0,1,2] },
            { id: 3, boardId: 2, availableCommands: [0,0,1,2] },
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
                paths: [31, 23, 16, 17, 18, 19, 26, 32, 2, 5],
            },
            {
                id: 1,
                characterStartIndex: 7,
                finishIndex: 9,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 16, iconUrl: 'dfhdhg.png', pickedUp: false, },
                    { id: 1, name: 'kake', indexInBoard: 23, iconUrl: 'hliah.png', pickedUp: false, }
                ],
                disabledCellIds: [7, 5, 3],
                paths: [2, 5, 17, 18, 23, 26, 30, 31, 32, 33],
            },
            {
                id: 3,
                characterStartIndex: 7,
                finishIndex: 9,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 16, iconUrl: 'dfhdhg.png', pickedUp: false, },
                    { id: 1, name: 'kake', indexInBoard: 23, iconUrl: 'hliah.png', pickedUp: false, }
                ],
                disabledCellIds: [7, 5, 3],
                paths: [2, 5, 23, 24, 25, 26],
            },
        ],

        backgroundImages: ["img/tiles/grass.png"],
        pathwayImages: ["img/tiles/horizontal_path.png"],
        itemImages: [
            { yellowKeyIcon: "img/yellowkey.png" },
            { yellowDoor: "img/yellowdoor.png" }
        ],
    },
}

//Backgroundbilder
//itemBilder
//Pathwaybilder

