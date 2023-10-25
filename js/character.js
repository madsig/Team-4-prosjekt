 //document.addEventListener('DOMContentLoaded', function(){
window.addEventListener('load', function() {
    getCanvas();
});
function getCanvas() {
    const canvas = document.getElementById('canvasRookie'); // tegnes opp i viewet
    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width = 64;
    const CANVAS_HEIGHT = canvas.height = 64;

    const playerImage = new Image();
    playerImage.src = './img/allRookie.png';
    const spriteWidth = 64;
    const spriteHeight = 64;
    let playerState = 'walkRight';
    // const dropDown = document.getElementById('animations'); 
    //  model.game.commands.addEventListener('change', function (e) { // knyttes til commands
    //  //   playerState = e.target.value; //Vi endrer denne for å endre animasjon. 
    // })

    let gameFrame = 0;
    const staggerFrames = 14;
    const spriteAnimations = [];
    const animationStates = [
        {
            name: 'walkRight',
            frames: 6,
        },
        {
            name: 'walkLeft',
            frames: 6,
        },
        {
            name: 'idle',
            frames: 7,
        },
        {
            name: 'walkDown',
            frames: 7,
        },
        {
            name: 'walkUp',
            frames: 7,
        },
        {
            name: 'pickUp',
            frames: 7,
        }
    ];
    animationStates.forEach((state, index) => {
        let frames = {
            loc: [],
        }
        for (let j = 0; j < state.frames; j++) {
            let positionX = j * spriteWidth;
            let positionY = index * spriteHeight;
            frames.loc.push({ x: positionX, y: positionY });
        }
        spriteAnimations[state.name] = frames;
    });
   // console.log(spriteAnimations);

    function animate() {
        ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
        let frameX = spriteWidth * position;
        let frameY = spriteAnimations[playerState].loc[position].y;
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

        ctx.drawImage(playerImage, frameX, frameY, spriteHeight, spriteWidth, 0, 0, spriteWidth, spriteHeight);

        gameFrame++;
        requestAnimationFrame(animate);


    };
    animate();

};
