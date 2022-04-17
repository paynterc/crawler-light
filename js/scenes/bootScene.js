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
        this.load.image('grassBg', 'img/grass.png');
        this.load.image('hedge', 'img/hedge64.png');
        this.load.image('forestPortalUsed', 'img/PortalUsed.png');

        // Spritesheets
        this.load.spritesheet('wizard1', 'img/wizard1.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyIdle', 'img/emyIdle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyHit', 'img/emyHit.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyWalk', 'img/emyWalk.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyDie', 'img/emyDie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('redImp', 'img/redImp.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('bulletIce', 'img/bulletIce.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('forestPortal', 'img/forestPortal.png',{ frameWidth: 64, frameHeight: 64 });


        // Audio
        this.load.audio('theme1', 'audio/music/Mushrooms.mp3');
//         this.load.audio('incoming1', 'audio/sfx/incoming1.mp3');


    }

    create ()
    {
        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2;
        defaultVolume = 0.15;

        lives = 10;
        score = 0;
        enemies = 0;

        this.mediaService = new MediaService(this);
        this.mediaService.setMusic('theme1');

        animConfigs = {};

        animConfigs.portalClosed = {
            key: 'portalClosed',
            frames: this.anims.generateFrameNumbers('forestPortal', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: 0
        };
        animConfigs.portalOpen = {
            key: 'portalOpen',
            frames: this.anims.generateFrameNumbers('forestPortal', { start: 1, end: 4, first: 1 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.portalUsed = {
            key: 'portalUsed',
            frames: this.anims.generateFrameNumbers('forestPortal', { start: 5, end: 5, first: 1 }),
            frameRate: 0,
            repeat: 0
        };
        animConfigs.wizard1Idle = {
            key: 'wizard1Idle',
            frames: this.anims.generateFrameNumbers('wizard1', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: -1
        };
        animConfigs.wizard1Walk = {
            key: 'wizard1Walk',
            frames: this.anims.generateFrameNumbers('wizard1', { start: 0, end: 4, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.wizard1Attack = {
            key: 'wizard1Attack',
            frames: [
                {key:'wizard1',frame:5,duration:1},
                {key:'wizard1',frame:5,duration:1},
                {key:'wizard1',frame:0,duration:1},
            ],
            frameRate: 8,
            repeat: 0
        };
        animConfigs.emyIdle = {
            key: 'emyIdle',
            frames: this.anims.generateFrameNumbers('emyIdle', { start: 0, end: 3, first: 0 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.emyHit = {
            key: 'emyHit',
            frames: this.anims.generateFrameNumbers('emyHit', { start: 0, end: 1, first: 0 }),
            frameRate: 16,
            repeat: 0
        };

        animConfigs.emyWalk = {
            key: 'emyWalk',
            frames: this.anims.generateFrameNumbers('emyWalk', { start: 0, end: 5, first: 0 }),
            frameRate: 8,
            repeat: -1
        };

        animConfigs.emyAttack = {
            key: 'emyAttack',
            frames: this.anims.generateFrameNumbers('emyIdle', { start: 0, end: 3, first: 0 }),
            frameRate: 6,
            repeat: 0
        };

        animConfigs.emyDie = {
            key: 'emyDie',
            frames: this.anims.generateFrameNumbers('emyDie', { start: 0, end: 14, first: 0 }),
            frameRate: 16,
            repeat: 0
        };

        animConfigs.redImpIdle = {
            key: 'redImpIdle',
            frames: this.anims.generateFrameNumbers('redImp', { start: 0, end: 1, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.redImpWalk = {
            key: 'redImpWalk',
            frames: this.anims.generateFrameNumbers('redImp', { start: 0, end: 4, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.redImpTell = {
            key: 'redImpTell',
            frames: [
                {key:'redImp',frame:4,duration:1},
                {key:'redImp',frame:5,duration:1},
                {key:'redImp',frame:6,duration:1},
                {key:'redImp',frame:5,duration:1},
            ],
            frameRate: 18,
            repeat: 4
        };
        animConfigs.redImpAttack = {
            key: 'redImpAttack',
            frames: [
                {key:'redImp',frame:0,duration:1},
                {key:'redImp',frame:0,duration:1},
            ],
            frameRate: 8,
            repeat: 1
        };
        animConfigs.bulletIce = {
            key: 'bulletIce',
            frames: this.anims.generateFrameNumbers('bulletIce', { start: 0, end: 2, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        this.scene.start('MenuScene');
    }



}