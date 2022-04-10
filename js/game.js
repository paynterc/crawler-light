var upKey, leftKey, rightKey, downKey, attKey, spaceKey, activePointer, centerX, centerY, defaultVolume, animConfigs, score, lives;
const W = 960;
const H = 544;

const MAX_SPEED = 200; // pixels/second
const DRAG = 1000; // pixels/second
const GRAVITY = 2600; // pixels/second/second
const JUMP_SPEED = -900; // pixels/second (negative y is up)
const ACCELERATION = 800; // pixels/second/second
const UNITSIZE = 32;

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



// To access game: this.sys.game
var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 544,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
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
        }
    },
};

var game = new Phaser.Game(config);