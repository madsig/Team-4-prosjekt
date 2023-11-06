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
        hasGameEnded: false,
        runtime: {
            isPlayerOffTrack: false,
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
            { id: 2, boardId: 2, availableCommands: [0, 1, 2, 3]},
            { id: 3, boardId: 3, availableCommands: [0, 1, 2, 3]},
            { id: 4, boardId: 4, availableCommands: [0, 1, 2, 3]},
            { id: 5, boardId: 5, availableCommands: [0, 1, 2, 3]},
            { id: 6, boardId: 6, availableCommands: [0, 1, 2, 3]},
            { id: 7, boardId: 7, availableCommands: [0, 1, 2, 4]},
            { id: 8, boardId: 8, availableCommands: [0, 1, 2, 3]},
            { id: 9, boardId: 9, availableCommands: [0, 1, 2, 3, 4]},
            
        ],


        boards: [
            {
                id: 0,
                boardFace: "img/terjeMedHatt.png",
                boardTask:"Ta de første stegene mot mål..",
                overlayTitle: "Velkommen til GET Academy!",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:`Hei, Rookie! Etter 20 uker i programmet vårt vil du kunne lage spill som dette og MYE mer!<br>
                    Kun fantasien setter grenser, men uten mål og mening vil du nok ikke finne frem i jungelen av variabler, funksjoner og klasser... <br><br>
                    Ta dine første steg på stien idag, men pass på! Gresset er fullt av slanger, flått og uendelige løkker!`,
                characterStartIndex: 23,
                finishIndex: 25,
                inventory: [],
                objectives: {}, //the id, name, index, icon, and objectUsed, of a Door, terminal, etc. Same ID as corresponding item.
                paths: [23, 24, 25],
                startDirection: 1,
            },
            {
                id: 1,
                boardTask:"Naviger deg gjennom svingen",
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "Ut mot høyre..eller..venstre?",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Med litt input fra kodelærere vil reisen bli enda lettere. Med litt kunnskap om Funksjoner vil du kunne gjøre enda mer.",
                characterStartIndex: 16,
                finishIndex: 32,
                inventory: [],
                objectives: {},
                paths: [16, 23, 30, 31, 32,],
                startDirection: 2,

            },
            {
                id: 2,
                boardTask:"While(Loops), pick up.",
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "Would you kindly..",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Jeg har det litt travelt da jeg må dra til GET Academy, møt meg der!<br><br> Så lenge det ligger Loops på brettet, kan du plukke de opp?",
                characterStartIndex: 37,
                finishIndex: 18,
                inventory: [
                    { id: 0, name: 'en Loop', indexOnBoard: 24, iconUrl: 'img/loopShiny.gif', pickedUp: false, },
                ],
                objectives: {},
                
                paths: [37, 38, 31, 24, 17, 18],//[39,40,33,26,19,18,11,10,9,16,15,22,29,36,37],
                startDirection: 1,
            },
            {
                id: 3,
                boardTask:"Kan du ta med Eskil?",
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "GET Eskil",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Det var en infinite loop! De kommer overaskende på, og du ser de ikke før koden din krasjer..<br> Men blir du her lenge nok lærer du å takle dette også!<br><br> Kan du finne Eskil? Chorei'en starter om 2 minutter!",
                characterStartIndex: 8,
                finishIndex: 26,
                inventory: [
                    { id: 0, name: 'Eskil', indexOnBoard: 30, iconUrl: 'img/eskilShiny.gif', pickedUp: false, }
                ],
                objectives: {},
                //test
                paths: [8, 15, 22, 29, 30, 31, 24, 25, 26], // [8, 15, 22, 29, 30, 23, 24, 31, 32]
                startDirection: 2,
            },
            {
                id: 4,
                boardTask:"Er jeg muta?",
                boardFace: "img/eskil.png",
                overlayTitle: "The sound of silence",
                overlayFace: "img/eskil.gif",
                overlayStory:"Jeg skal ha en forelesning i Nøkkelkompetanser men jeg finner ikke Un-mute knappen?! Kan du hjelpe meg?",
                characterStartIndex: 32,
                finishIndex: 30,
                inventory: [
                    { id: 0, name: 'Un-mute knappen', indexOnBoard: 16, iconUrl: 'img/microShiny.gif', pickedUp: false, }
                ],
                objectives: {},
                //test
                paths: [32, 25, 18, 17, 16, 15, 22, 29, 30], // 32, 25,, 18, 17, 16, 15, 23, 30, 29
                startDirection: 0,
            },
            {
                id: 5,
                boardTask:"Ta med PC'n, det er forelesning kl 9!",
                boardFace: "img/eskil.png",
                overlayTitle: "Datainnsamling i praksis",
                overlayFace: "img/eskil.gif",
                overlayStory:"Har du det du trenger til skolen? En datamaskin med litt kraft kan være greit å ha!",
                characterStartIndex: 30,
                finishIndex: 18,
                inventory: [
                    { id: 0, name: 'Datamaskin', indexOnBoard: 22, iconUrl: 'img/computerShiny.gif', pickedUp: false, }
                ],
                objectives: {},
                //test
                paths: [22,29,30, 31, 32, 25, 18, 19, 20,13,6], // 30, 31, 32, 25, 18, 19, 20
                startDirection: 1,
            },
            {
                id: 6,
                boardTask:"Ta med mikrofonen",
                boardFace: "img/eskil.png",
                overlayTitle: "Yttringsfrihet under ansvar",
                overlayFace: "img/eskil.gif",
                overlayStory:"En mikrofon trenger du også, da kommunikasjon er key hos oss!<br><br> Nøkkelkompetansene vi lærer deg er superviktig for å lykkes som utvikler idag, like viktig som kodeferdigheter!",
                characterStartIndex: 20,
                finishIndex: 9,
                inventory: [
                    { id: 0, name: 'Mikrofon', indexOnBoard: 10, iconUrl: 'img/microShiny2.gif', pickedUp: false, }
                ],
                objectives: {},
                //test
                paths: [20, 27, 26, 25, 24, 17, 10, 9], // 20, 27, 26, 25, 24, 17, 10, 9
                startDirection: 2,
            },
            {
                id: 7,
                boardTask:"Bruk det du kan",
                boardFace: "img/terjeMedHatt.png",
                overlayTitle: "Snart i mål..",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Med reflektiv repetisjon utvikler du både tålmodighet og kunnskap! Dette kan du bruke for å nå dit du vil.",
                characterStartIndex: 19,
                finishIndex: 38,
                inventory: [
                    // isUsable is only a property if you use the item, instead of picking it up.
                    {id:0, name: 'terminal', indexOnBoard: 17, iconUrl: 'img/terminal.gif', pickedUp: false, isUsable: true}],
                //Bruk låser opp Mål

                objectives: {id:0, name: 'terminalen', indexOnBoard: 38, iconUrl: 'img/buildingwithlockandchain.png', isOpened: false},
                //test
                paths: [19,26,25,18,17,16,23,30,31,38],
                startDirection: 2,
            },
            {
                id: 8,
                boardTask:"Husk Nøkkelen! ",
                boardFace: "img/eskil.png",
                overlayTitle: "Nøkkelen til selvutvikling",
                overlayFace: "img/eskil.gif",
                overlayStory:"Du kommer til å bygge nye og gode vaner, gjennom Nøkkelkompetanse faget. Dette er viktig å få med seg på GET Academy!",
                characterStartIndex: 38,
                finishIndex: 10,
                inventory: [
                    { id: 0, name: 'Nøkkelen', indexOnBoard: 32, iconUrl: 'img/shinyNK.gif', pickedUp: false,}
                ],
                //Her må Flag være låst bygg.
                objectives: {id:0, name: 'Lock', indexOnBoard: 10, iconUrl: 'img/buildingwithlockandchain.png', isOpened: false},
                //test
                paths: [38,31,32,33,26,19,18,17,10,],
                startDirection: 0,
            },
            {
                id: 9,
                boardTask:"Du har allerede alt du trenger!",
                boardFace: "img/eskil.png",
                overlayTitle: "Har du motivasjon og læringsvilje, sørger vi for resten!<br><br> Ikke heng deg for mye opp i Feil",
                overlayFace: "img/terjeMedHatt.gif",
                overlayStory:"Gjør deg klar for 20 uker med prøving og feiling! Du kommer til å lære masse!",
                characterStartIndex: 11,
                finishIndex: 26,
                inventory: [
                    //Man kan ikke unngå feil, når man toucher feilene samles de opp i Inventory, eller sleper etter?
                    { id: 0, name: 'feiling', indexOnBoard: 10, iconUrl: 'img/feilingShiny.gif', pickedUp: false, },
                    { id: 1, name: 'feiling', indexOnBoard: 16, iconUrl: 'img/feilingShiny.gif', pickedUp: false, },
                    { id: 2, name: 'feiling', indexOnBoard: 23, iconUrl: 'img/feilingShiny.gif', pickedUp: false, },
                    { id: 3, name: 'feiling', indexOnBoard: 31, iconUrl: 'img/feilingShiny.gif', pickedUp: false, },
                    { id: 4, name: 'feiling', indexOnBoard: 25, iconUrl: 'img/feilingShiny.gif', pickedUp: false, },
                ],
                
                objectives: {},
                //test
                paths: [11,10,9,16,23,30,31,32,25,26],
                startDirection: 3,
            },
        ],
        gameEndOverlay: {
            overlayTitle: "Gratulerer!",
            overlayText: "Du kom i mål til slutt",
        },

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
        failQuotes:[
            "Ikke gå på gresset!",
            "Gresset er fullt av slanger og flått!",
            "Det ser ikke helt riktig ut..",
            "Å feile er å lære",
            "nja..ikke helt riktig"
        ],
        
        victoryQuotes: [
            "Gratulerer, du klarte det!",
            "Du nådde målet!",
            "Vel gjennomført!",
            "Du fikk det til!",
            "Fantastisk, du kom i mål!",
            "Bra jobba, du fullførte!",
            "Mål oppnådd, gratulerer!",
            "Du er i mål, godt jobbet!",
            "Mission accomplished!",
            "Knallbra, du nådde målet!",
            "Strålende, du kom i mål!",
            "Skikkelig bra, du er i mål!",
            "Du har nådd målet, bra jobbet!",
            "Fantastisk!",
        ]
    },

    debug: {
        //test
        pathObject: {},
    },
}
