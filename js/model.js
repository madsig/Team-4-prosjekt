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
            currentLevel: 0,
            currentLevelStatus: null, //false= level failed, true= level complete, null= not yet attempted.
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
            { id: 4, boardId: 4, availableCommands: [0, 1, 2, 3, 4] },
            { id: 5, boardId: 5, availableCommands: [0, 1, 2, 3, 4] },
            { id: 6, boardId: 6, availableCommands: [0, 1, 2, 3, 4] },
            { id: 7, boardId: 7, availableCommands: [0, 1, 2, 3, 4] },
            { id: 8, boardId: 8, availableCommands: [0, 1, 2, 3, 4] },
            { id: 9, boardId: 9, availableCommands: [0, 1, 2, 3, 4] },
            
        ],


        boards: [
            {
                id: 0,
                boardFace: "img/terjeMedHatt.png",
                boardTask:"Ta de første stegene mot mål..",
                overlayTitle: "Velkommen til GET Academy!",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:`Hei, Rookie! Etter 20 uker i programmet vårt vil du kunne lage dette spillet og MYE mer!<br>
                    Kun fantasien setter grenser, men uten mål og mening vil du nok ikke finne frem... Ta dine første steg idag!`,
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
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "Det SVINGER seg..",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Med litt input fra kodelærere vil reisen bli enda lettere.",
                characterStartIndex: 16,
                finishIndex: 32,
                inventory: [],
                objectives: [],
                paths: [16, 23, 30, 31, 32,],
                startDirection: 2,

            },
            {
                id: 2,
                boardTask:"En runde med Loops",
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "Would you kindly..",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Jeg har det litt travelt, må dra til GetAcademy, møt meg der! Plukk opp loopen der er du snill.",
                characterStartIndex: 37,
                finishIndex: 18,
                inventory: [
                    { id: 0, name: 'loop', indexOnBoard: 24, iconUrl: 'img/infiniteloop.png', pickedUp: false, },
                ],
                objectives: [
                    {id:0, name: 'kake dør', indexOnBoard: 14, iconUrl: 'img/cakeDoor.png', isOpened: false},
                ],
                paths: [37, 38, 31, 24, 17, 18],//[39,40,33,26,19,18,11,10,9,16,15,22,29,36,37],
                startDirection: 1,
            },
            {
                id: 3,
                boardTask:"???",
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"En infinite loop!! Da går det galt. Jeg må avgårde! Kan du finne Eskil? Morgenmøte starter om 2 minutter!",
                characterStartIndex: 8,
                finishIndex: 32,
                inventory: [
                    { id: 0, name: 'eskil', indexOnBoard: 23, iconUrl: 'img/eskil.png', pickedUp: false, }
                ],
                //test
                paths: [8, 15, 22, 29, 30, 23, 24, 31, 32], // [8, 15, 22, 29, 30, 23, 24, 31, 32]
                startDirection: 2,
            },
            {
                id: 4,
                boardTask:"???",
                boardFace: "img/eskil.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/eskil.gif",
                overlayStory:"Jeg finner ikke unMute knappen?! Kan du hjelpe meg?",
                characterStartIndex: 32,
                finishIndex: 30,
                inventory: [
                    { id: 0, name: 'unMute', indexOnBoard: 16, iconUrl: 'img/microphonemuted.png', pickedUp: false, }
                ],
                //test
                paths: [32, 25, 18, 17, 16, 15, 22, 29, 30], // 32, 25,, 18, 17, 16, 15, 23, 30, 29
                startDirection: 0,
            },
            {
                id: 5,
                boardTask:"???",
                boardFace: "img/eskil.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/eskil.gif",
                overlayStory:"Har du det du trenger til skolen? En datamaskin med litt kraft kan være greit å ha!",
                characterStartIndex: 30,
                finishIndex: 20,
                inventory: [
                    { id: 0, name: 'maskin', indexOnBoard: 31, iconUrl: 'img/computer.png', pickedUp: false, }
                ],
                //test
                paths: [30, 31, 32, 25, 18, 19, 20], // 30, 31, 32, 25, 18, 19, 20
                startDirection: 1,
            },
            {
                id: 6,
                boardTask:"???",
                boardFace: "img/eskil.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/eskil.gif",
                overlayStory:"En mikrofon trenger du også! Kommunikasjon er key hos oss!",
                characterStartIndex: 20,
                finishIndex: 9,
                inventory: [
                    { id: 0, name: 'mikrofon', indexOnBoard: 10, iconUrl: 'img/microphone.png', pickedUp: false, }
                ],
                //test
                paths: [20, 27, 26, 25, 24, 17, 10, 9], // 20, 27, 26, 25, 24, 17, 10, 9
                startDirection: 2,
            },
            {
                id: 7,
                boardTask:"???",
                boardFace: "img/eskil.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/eskil.gif",
                overlayStory:"Jeg finner ikke unMute knappen?! Kan du hjelpe meg?",
                characterStartIndex: 0,
                finishIndex: 48,
                inventory: [],
                //test
                paths: [2,1,0,7,14,15,16,9,8, 18,17,23,24,25,31,30, 32,33,34,40,47],
                startDirection: 1,
            },
            {
                id: 8,
                boardTask:"???",
                boardFace: "img/eskil.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/eskil.png",
                overlayStory:"Jeg finner ikke unMute knappen?! Kan du hjelpe meg?",
                characterStartIndex: 0,
                finishIndex: 48,
                inventory: [],
                //test
                paths: [2,1,0,7,14,15,16,9,8, 18,17,23,24,25,31,30, 32,33,34,40,47],
                startDirection: 1,
            },
            {
                id: 9,
                boardTask:"???",
                boardFace: "img/eskil.png",
                overlayTitle: "Hyper-Loop",
                overlayFace: "img/eskil.png",
                overlayStory:"Jeg finner ikke unMute knappen?! Kan du hjelpe meg?",
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
            "img/tiles/field-of-roses.png", "img/tiles/Field_of_Daisy.png",
            "img/tiles/Field_Of_Colours2.png", "img/tiles/field_of_Orchid2.png",
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
        flagImage: "img/building.png",
        itemImages: [
            { yellowKeyIcon: "img/yellowkey.png" },
            { yellowDoor: "img/yellowdoor.png" },
        ],
        
        victoryQuotes: [
            "Gratulerer, du klarte det!",
            "Du nådde målet!",
            "Vel gjennomført!",
            "Du fikk det til!",
            "Fantastisk, du kom i mål!",
            "Bra jobba, du fullførte det!",
            "Mål oppnådd, gratulerer!",
            "Du er i mål, godt jobbet!",
            "Mission accomplished!",
            "Knallbra, du nådde målet!",
            "Strålende, du kom i mål!",
            "Skikkelig bra, du er i mål!",
            "Du har nådd målet, bra jobbet!",
            "Fantastisk!",
            "Nice! Du nådde endelig målet!",
            "Gjennomført det med stil",
            "Du er i mål, og det er strålende!",
            "Du gjorde det! Målet er oppnådd!",
            "Du er en vinner! Målet er nådd!",
            "Gratulerer, du har nådd toppen!",
        ]
    },

    debug: {
        //test
        pathObject: {},
    },
}
