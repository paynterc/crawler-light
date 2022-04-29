var upKey, leftKey, rightKey, downKey, attKey, spaceKey, activePointer, centerX, centerY, defaultVolume, animConfigs, score, lives, enemies, gridCenterX, gridCenterY, items, missions, gameEvents, tips, lvlId, mediaService;
const W = 480;
const H = 288;
const PW = W*4;//physics world width
const PH = H*4;

const MAX_SPEED = 100; // pixels/second
const DRAG = 1000; // pixels/second
const GRAVITY = 2600; // pixels/second/second
const JUMP_SPEED = -900; // pixels/second (negative y is up)
const ACCELERATION = 800; // pixels/second/second
const UNITSIZE = 32;
const WALLSIZE = UNITSIZE*2;
const WALL = 1;
const FLOOR = 0;
const OCCUPIED = 2;

// Enemy states
const STATE_EN_IDLE = 0;
const STATE_EN_MOVE = 1;
const STATE_EN_HIT = 2;
const STATE_EN_TELL = 3;
const STATE_EN_ATTACK = 4;
const STATE_EN_JUMP = 5;
const STATE_EN_DIE = 6;
const STATE_EN_INTRO = 7;

const DEPTH_BG = -1000;
const DEPTH_PORTAL = -900;

const fireInputIsActive = function() {
    return activePointer.isDown;
};

const upInputIsActive = function(){
    return upKey.isDown;
}

const downInputIsActive = function(){
    return downKey.isDown;
}

const leftInputIsActive = function(){
    return leftKey.isDown;
}

const rightInputIsActive = function(){
    return rightKey.isDown;
}

const makeGrid = function(W,H){
    // Make a grid
    let grid=[];

    for (var i=0; i<W; i++) {
        grid[i] = [];
        for (var j=0; j<H; j++) {
            grid[i][j] = WALL;
        }
    }

    return grid;
}

const g2Px = function(n){
    return n*WALLSIZE + (WALLSIZE/2)
}

// To access game: this.sys.game
var config = {
    type: Phaser.AUTO,
    width: W,
    height: H,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        global: [
            { key: 'RandomNamePlugin', plugin: RandomNamePlugin, start:true }
        ]
    },
    render: {
        pixelArt: true,
        roundPixels: false
    },
    parent: 'ph_game',
    backgroundColor: '#000000',
    scene: [BootScene,MenuScene,GameScene,SettingsScene,HudScene],
    physics: {
        default: 'arcade',
        arcade: {
            fps: 260,
            debug: false,
            width: PW,
            height: PH
        }
    },
};

var game = new Phaser.Game(config);