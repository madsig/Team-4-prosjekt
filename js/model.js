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
            currentLevel: 1,
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
                commands: [],
            },


        },
        //
        commands: [
            { id: 0, name: 'Gå fram', jsName: 'moveForward()', },  // eval
            //Default har tekst "Snu", endrer navn når spilleren velger retning of legger den til i programmet
            { id: 1, name: 'Snu venstre', jsName: 'turn(Left)', }, 
            { id: 2, name: 'Snu høyre', jsName: 'turn(Right)', }, 
            { id: 3, name: 'Plukk opp', jsName: 'pickUpItem()', }, 
            { id: 4, name: 'Bruk', jsName: 'useItem()', }, 

        ],
        

        levels: [
            { id: 0, boardId: 0, availableCommands: [0,] },
            { id: 1, boardId: 1, availableCommands: [0,1,2] },
            { id: 2, boardId: 2, availableCommands: [0,1,2,3,4] },
            { id: 3, boardId: 3, availableCommands: [0,1,2,3,4] },
        ],


        boards: [
            {
                id: 0,
                characterStartIndex: 23,
                finishIndex: 25,
                inventory: [],
                paths: [23,24,25],
            },
            {
                id: 1,
                characterStartIndex: 16,
                finishIndex: 32,
                inventory: [],
                paths: [16,23,30,31,32],
            },
            {
                id: 2,
                characterStartIndex: 39,
                finishIndex: 37,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 16, iconUrl: 'dfhdhg.png', pickedUp: false, },
                    { id: 1, name: 'kake', indexInBoard: 23, iconUrl: 'hliah.png', pickedUp: false, }
                ],
                paths: [39,40,33,26,19,18,11,10,9,16,15,22,29,36,37],
            },
            {
                id: 3,
                characterStartIndex: 42,
                finishIndex: 48,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 16, iconUrl: 'dfhdhg.png', pickedUp: false, },
                    { id: 1, name: 'kake', indexInBoard: 23, iconUrl: 'hliah.png', pickedUp: false, }
                ],
                paths: [31, 23, 16, 17, 18, 19, 26, 32, 2, 5],
            },
        ],

        backgroundImages: ["img/tiles/grass.png"],
        pathwayImages: ["img/tiles/horizontal_path.png", "img/tiles/vertical_path.png"], //objekt eller bare vite riktig index
        playerImage: "img/rookiefront1.png", //burde være array eller objekt for å få rettning
        flagImage: "img/flag.png",
        itemImages: [
            { yellowKeyIcon: "img/yellowkey.png" },
            { yellowDoor: "img/yellowdoor.png" }
        ],
    },
}

//Backgroundbilder
//itemBilder
//Pathwaybilder

