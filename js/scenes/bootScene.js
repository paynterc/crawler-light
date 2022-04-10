class BootScene extends Phaser.Scene{
    constructor ()
    {
        super('BootScene');
        this.mediaService=undefined;
    }

    preload()
    {
        // Images
        this.load.image('ring', 'img/ring.png');
        this.load.image('square', 'img/ui/whiteSquare32x.png');
        this.load.image('audio', 'img/ui/Audio34x.png');
        this.load.image('equalizer', 'img/ui/Equalizer34x.png');
        this.load.image('heart', 'img/heart.png');

        // Spritesheets
        this.load.spritesheet('emyIdle', 'img/emyIdle.png',{ frameWidth: 32, frameHeight: 32 });

        // Audio
        this.load.audio('theme1', 'audio/music/Mushrooms.mp3');
//         this.load.audio('incoming1', 'audio/sfx/incoming1.mp3');


    }

    create ()
    {
        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2;
        defaultVolume = 0.15;

        lives = 3;
        score = 0;

        this.mediaService = new MediaService(this);
        this.mediaService.setMusic('theme1');

        animConfigs = {};
        animConfigs.emyIdle = {
            key: 'emyIdle',
            frames: this.anims.generateFrameNumbers('emyIdle', { start: 0, end: 3, first: 0 }),
            frameRate: 8,
            repeat: -1
        };

        this.scene.start('MenuScene');
    }



}