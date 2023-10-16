// let model = {
//     app: {
//         theme: 'light',
//     },

//     game: {
//         player: {
//            index: 0,
//            direction: 'north',
//            heldItems: [],
//         },

//         program: {
//             programList: [0,1,0,],
//             isCorrect: [],//false om man går inn i en vegg.
            

//         },

//         levels: [
//             {
//                 id: 0,
//                 size: 4,
//                 board: 0, //index oppsett 
//                 commands: ['moveForward()'],
//             },
//             {
//                 id: 1,
//                 size: 4,
//                 board: 0, //index oppsett 
//                 commands: ['moveForward()'],
//             },
//             {
//                 id: 2,
//                 size: 5,
//                 board: 1, //index oppsett 
//                 commands: ['moveForward()', 'rotateRight()', 'rotateLeft()'],
                
//             }
//         ],

//         boards: [
//             {
//                 backgroundImages: [],
//                 foregroundItems: {
//                     startIndex: 2,
//                     goalIndex: 12,
//                     yellowKey: 0,
//                     yellowDoor: 10,
//                     someItem1: null,
//                     someItem1DropOffPoint: null,
//                 },
//                 optimalPath: [], //Vi setter denne selv.
//                 //
//                 walkablePath: [] //Indexene man kan gå på. Om man er utenfor disse, så blir program.
                
//             },
//         ],
//     }
// }