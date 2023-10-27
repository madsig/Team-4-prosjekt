let model = {
    app: {
        //kasnkje i css fil
        theme: 'light',
        gameTitle: "Rookie and the GET wizard",
        isTesting: true,
        showOverlay: true,

        //Trenger man dette i modellen?
        colorPallete: {
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
            player: {
                index: 0, //The index of board.paths[]
                direction: 1, //0 north, 1 east, 2 south, 3 west.
                inventory: null,
                marginTop: 1,
                marginLeft: 0,
            },
            board: {
                backgroundImagesCache: [],
                //får kopi av board på start av level
            },

            program: {
                currentCommandIndex: 1,
                //kommandoene som ikke har kjørt enda er null
                //setter inn kommandoene som ligger i lista til levels og endrer bare her
                commands: [],
                isRunning: false,
            },

        },
        //
        commands: [
            { id: 0, name: 'Gå fram', jsName: 'moveForward()', },  // eval
            { id: 1, name: 'Snu ↻', jsName: 'turn(Left)', },
            { id: 2, name: 'Snu ↺', jsName: 'turn(Right)', },
            { id: 3, name: 'Plukk opp', jsName: 'pickUpItem()', },
            { id: 4, name: 'Bruk', jsName: 'useItem()', },

        ],


        levels: [
            { id: 0, boardId: 0, availableCommands: [0,] },
            { id: 1, boardId: 1, availableCommands: [0, 1, 2] },
            { id: 2, boardId: 2, availableCommands: [0, 1, 2, 3, 4] },
            { id: 3, boardId: 3, availableCommands: [0, 1, 2, 3, 4] },
        ],


        boards: [
            {
                id: 0,
                boardTask:"Ta de første stegene..",
                characterStartIndex: 23,
                finishIndex: 25,
                inventory: [],
                objectives: [], //the id, name, index, icon, and objectUsed, of a Door, terminal, etc. Same ID as corresponding item.
                paths: [23, 24, 25],
                startDirection: 1,
            },
            {
                id: 1,
                boardTask:"Ut mot høyre",
                characterStartIndex: 16,
                finishIndex: 32,
                inventory: [],
                objectives: [],
                paths: [16, 23, 30, 31, 32,],
                startDirection: 2,

            },
            {
                id: 2,
                boardTask:"Plukk opp *something*",
                characterStartIndex: 39,
                finishIndex: 37,
                inventory: [
                    { id: 0, name: 'kake', indexOnBoard: 10, iconUrl: 'img/cake.png', pickedUp: false, },
                    { id: 1, name: 'iskrem', indexOnBoard: 15, iconUrl: 'img/ice_cream.png', pickedUp: false, },
                    { id: 2, name: 'kake2', indexOnBoard: 19, iconUrl: 'img/cake.png', pickedUp: false, },
                ],
                objectives: [
                    {id:0, name: 'kake dør', indexOnBoard: 14, iconUrl: 'img/cakeDoor.png', isOpened: false},
                ],
                paths: [37, 36, 29, 22, 15, 16, 9, 10, 11, 18, 19, 26, 33, 40, 39],//[39,40,33,26,19,18,11,10,9,16,15,22,29,36,37],
                startDirection: 1,
            },
            {
                id: 3,
                boardTask:"???",
                characterStartIndex: 0,
                finishIndex: 48,
                inventory: [],
                //test
                paths: [2,1,0,7,14,15,16,9,8, 18,17,23,24,25,31,30, 32,33,34,40,47],
                startDirection: 1,
            },
        ],

        directions: ['north','east','south', 'west'],

        backgroundImages: [
            "img/tiles/grass.png", "img/tiles/grass_2.png",
            "img/tiles/grass_3.png", "img/tiles/grass_4.png", 
            "img/tiles/grass.png", "img/tiles/grass_2.png",
            "img/tiles/grass_3.png", "img/tiles/grass_4.png", 
            "img/tiles/field-of-roses.png", "img/tiles/Field_Of_Daisy.png",
            "img/tiles/Field_Of_Colours2.png", "img/tiles/Field_Of_Orchid2.png",
            //"img/tiles/Field_Of_Colours.png", "img/tiles/Field_Of_Orchid.png", 
        ],
        pathwayImages: {
            'vertical': "img/tiles/horizontal_path.png",
            'horizontal': "img/tiles/vertical_path.png",

            'turnSE': "img/tiles/turn_1.png",
            'turnSW': "img/tiles/turn_2.png",
            'turnNW': "img/tiles/turn_3.png",
            'turnNE': "img/tiles/turn_4.png",

            'endN': "img/tiles/north_end.png",
            'endS': "img/tiles/south_end.png",
            'endE': "img/tiles/right_end.png",
            'endW': "img/tiles/left_end.png",
        },
        inventoryImage: "img/borderImg.png",
        playerImage: "img/rookiefront1.png", //burde være array eller objekt for å få rettning, kommer ann på canvas
        flagImage: "img/flag.png",
        itemImages: [
            { yellowKeyIcon: "img/yellowkey.png" },
            { yellowDoor: "img/yellowdoor.png" },
        ],
    },

    debug: {
        //test
        pathObject: {},
    },
}
