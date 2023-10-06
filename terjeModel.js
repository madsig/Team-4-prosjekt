let model = {
    app: {
        theme: 'light',
    },

    game: {
        runtime: {
            robot: {
                index: 0,
                direction: 'north',
                inventory: null,
            },
            board: {
                size: 4,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 7 },
                ],
            },
        },
        commands: [
            { id: 0, name: 'Gå', jsName: 'moveForward()', minimumLevelId: 1 },  // eval
            { id: 1, name: 'Snu venstre', jsName: 'turnLeft()' },  // eval
        ],
        program: {
            currentCommandIndex: 1,
            commands: [
                { commandId: 0, isSuccess: true },
                { commandId: 1, isSuccess: false },
                { commandId: 0 },
            ],
        },

        levels: [
            { id: 0, boardId: 0 },
            { id: 1, boardId: 0 },
            { id: 2, boardId: 1 },
        ],

        boards: [
            {
                id: 0,
                size: 4,
                robotStartIndex: 7,
                finishIndex: 9,
                inventory: [
                    { id: 0, name: 'kake', indexInBoard: 7, iconUrl: 'dfhdhg.png' },
                ],
                disabledCellIds: [7, 5, 3],
            }
        ],
    }
};
