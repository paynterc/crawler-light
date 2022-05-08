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
        this.load.image('lambFace', 'img/lambFace.png');
        this.load.image('shepherd', 'img/Shepherd.png');
        this.load.image('witch', 'img/Witch.png');
        this.load.image('mushroom', 'img/mushroom.png');
        this.load.image('snailShell', 'img/snailsShell.png');
        this.load.image('invis32', 'img/invis32.png');
        this.load.image('invis64', 'img/invis64.png');
        this.load.image('laser', 'img/laser.png');
        this.load.image('heartCharm', 'img/heartCharm.png');
        this.load.image('coin', 'img/coin.gif');
        this.load.image('redBolt', 'img/lightningBolt.png');
        this.load.image('bush', 'img/bush.png');
        this.load.image('bushFall', 'img/BushFall.png');
        this.load.image('vendor', 'img/vendor.png');
        this.load.image('emblemMoon', 'img/EmblemMoon.png');
        this.load.image('emblemGem', 'img/EmblemGem.png');
        this.load.image('emblemFlame', 'img/EmblemFlame.png');

        // Spritesheets
        this.load.spritesheet('wizard1', 'img/wizard1.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyIdle', 'img/emyIdle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyHit', 'img/emyHit.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyWalk', 'img/emyWalk.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyDie', 'img/emyDie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('redImp', 'img/redImp.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('bulletIce', 'img/bulletIce.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('forestPortal', 'img/forestPortal.png',{ frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('lamb', 'img/lamb.png',{ frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('spookyGhost', 'img/ozzySpookyGhost.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('minionSword', 'img/parker_minionSword.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('mogus', 'img/duncanMogusWithFireball.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('mogusDeath', 'img/mogusDeath.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fireball', 'img/fireball.png',{ frameWidth: 7, frameHeight: 7 });
        this.load.spritesheet('snalGuy', 'img/snalGuy.png',{ frameWidth: 29, frameHeight: 24 });
        this.load.spritesheet('blueBean', 'img/blueBean.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('blueBeanFlashing', 'img/blueBeanFlashing.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('rogue', 'img/Alistair_NinjaAttack7.png',{ frameWidth: 220, frameHeight: 60 });
        this.load.spritesheet('skythBug', 'img/skythBug.png',{ frameWidth: 18, frameHeight: 18 });
        this.load.spritesheet('skythBugDying', 'img/skythBugDying.png',{ frameWidth: 18, frameHeight: 18 });
        this.load.spritesheet('bossSword', 'img/bossSword2.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bossPortal', 'img/bossPortal1.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('niceGhost', 'img/Ghost.png',{ frameWidth: 60, frameHeight: 60 });
        this.load.spritesheet('kitty', 'img/kitty.png',{ frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('giant', 'img/Giant.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('goboFire', 'img/goboFire.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('braceletOfWinds', 'img/braceletofwinds.png',{ frameWidth: 32, frameHeight: 32 });

        // Audio
        this.load.audio('theme1', 'audio/music/Mushrooms.mp3');
//         this.load.audio('incoming1', 'audio/sfx/incoming1.mp3');

//        this.load.plugin('DialogModalPlugin', 'js/plugin/dialog_plugin.js');

    }

    create ()
    {
//        this.sys.install('DialogModalPlugin');
//        console.log(this.sys.dialogModal);
//        this.plugins.start('RandomNamePlugin', 'myPluginRef1');

//        A global Events Emitter. Not used for now.
//        gameEvents = new Phaser.Events.EventEmitter();

        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2;
        defaultVolume = 0.15;

        lives = 10;
        score = 0;
        gold = parseInt(localStorage.getItem('gold')) || 0;;
        enemies = 0;
        lvlId = "forest";
        soldLamb=false;
        path=[];//keep track of the portals passed through
//        maxInventory = 6;
//        inventory = [];


        tips = [
            {shown:false,txt:"Something has put a curse on the forest and now it keeps changing. There are three villages, but the paths to them have been lost and people can't find their way home. Can you help find the villages?"},
            {shown:false,txt:"The portals won't open until you defeat all the monsters in this part of the forest."},
            {shown:false,txt:"There are people in the forest who need help. Some of them may have rewards for you."}
        ];


        // BE SURE ALL MISSION ITEMS ARE IN THE ITEMS LIST ABOVE
        missions = [
            {
                id:'lostLamb',npc:'shepherd',started:false,complete:false
                ,itemRequired:"lamb"
                ,itemGiven:"heartCharm"
                ,txtStart:"Please help me find my lost lamb. Those monsters chased it away."
                ,txtActive:"Did you find my lamb?"
                ,txtComplete:"Thank you for bringing back my lamb! Here, take this magic charm."
            },
            {
                id:'witchMushroom',npc:'witch',started:false,complete:false
                ,itemRequired:"mushroom"
                ,itemGiven:"heartCharm"
                ,txtStart:"I need one mushroom. If you bring me one I'll give you a potion.."
                ,txtActive:"I still need that mushroom."
                ,txtComplete:"Thanks for the mushroom. Here's your potion."
             },
              {
                  id:'lostShell',npc:'snalGuy',started:false,complete:false
                  ,itemRequired:"snailshell"
                  ,itemGiven:"heartCharm"
                  ,txtStart:"Hi, I have lost my other shell. Can you find it? I will give you 100 coins."
                  ,txtActive:"Did you find my shell?"
                  ,txtComplete:"Thanks! Here's your gold."
               },
             {
                 id:'buidFire',npc:'goboFire',npcName:'Gobo',started:false,complete:false
                 ,itemRequired:"starEmber"
                 ,itemGiven:"heartCharm"
                 ,txtStart:"I don't have any way to light my campfire. Can you get a fire wisp from a mogus and bring it to me."
                 ,txtActive:"I still can't light this fire."
                 ,txtComplete:"Finally! Here, take this magic charm."
                 ,anmComplete:'goboFireLit'
              }

        ];



        mediaService = new MediaService(this);
        mediaService.setMusic('theme1');

        animConfigs = {};
        animConfigs.goboFireOut = {
            key: 'goboFireLit',
            frames: this.anims.generateFrameNumbers('goboFire', { start: 0, end: 1, first: 0 }),
            frameRate: 12,
            repeat: -1
        };

        animConfigs.skythBugWalk = {
            key: 'skythBugWalk',
            frames: this.anims.generateFrameNumbers('skythBug', { start: 0, end: 1, first: 0 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.skythBugTell = {
            key: 'skythBugTell',
            frames: this.anims.generateFrameNumbers('skythBug', { start: 2, end: 2, first: 2 }),
            frameRate: 4,
            repeat: 1
        };
        animConfigs.skythBugAttack = {
            key: 'skythBugAttack',
            frames: [
                {key:'skythBug',frame:2,duration:1},
                {key:'skythBug',frame:2,duration:1},
            ],
            frameRate: 18,
            repeat: 2
        };
        animConfigs.skythBugDie = {
            key: 'skythBugDie',
            frames: this.anims.generateFrameNumbers('skythBugDying', { start: 0, end: 10, first: 0 }),
            frameRate: 12,
            repeat: 0
        };

        animConfigs.rogueRun = {
            key: 'rogueRun',
            frames: this.anims.generateFrameNumbers('rogue', { start: 0, end: 4, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.rogueAttack = {
            key: 'rogueAttack',
            frames: this.anims.generateFrameNumbers('rogue', { start: 6, end: 23, first: 6 }),
            frameRate: 12,
            repeat: 0
        };
        animConfigs.rogueIdle = {
            key: 'rogueIdle',
            frames: this.anims.generateFrameNumbers('rogue', { start: 24, end: 31, first: 24 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.blueBeanWalk = {
            key: 'blueBeanWalk',
            frames: this.anims.generateFrameNumbers('blueBean', { start: 0, end: 2, first: 0 }),
            frameRate: 7,
            repeat: -1
        };
        animConfigs.blueBeanTell = {
            key: 'blueBeanTell',
            frames: this.anims.generateFrameNumbers('blueBeanFlashing', { start: 0, end: 1, first: 0 }),
            frameRate: 12,
            repeat: 5
        };
        animConfigs.blueBeanShoot = {
            key: 'blueBeanShoot',
            frames: this.anims.generateFrameNumbers('blueBeanFlashing', { start: 0, end: 1, first: 0 }),
            frameRate: 36,
            repeat: 0
        };
        animConfigs.snalGuyWalk = {
            key: 'snalGuyWalk',
            frames: this.anims.generateFrameNumbers('snalGuy', { start: 0, end: 3, first: 0 }),
            frameRate: 5,
            repeat: -1
        };
        animConfigs.mogusWalk = {
            key: 'mogusWalk',
            frames: this.anims.generateFrameNumbers('mogus', { start: 0, end: 1, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.mogusTell = {
            key: 'mogusTell',
            frames: this.anims.generateFrameNumbers('mogus', { start: 2, end: 6, first: 2 }),
            frameRate: 12,
            repeat: 0
        };
        animConfigs.mogusAttack = {
            key: 'mogusAttack',
            frames: this.anims.generateFrameNumbers('mogus', { start: 6, end: 7, first: 6 }),
            frameRate: 18,
            repeat: 0
        };
        animConfigs.mogusDeath = {
            key: 'mogusDeath',
            frames: this.anims.generateFrameNumbers('mogusDeath', { start: 0, end: 60, first: 0 }),
            frameRate: 24,
            repeat: 0
        };
        animConfigs.fireball = {
            key: 'fireball',
            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3, first: 0 }),
            frameRate: 12,
            repeat: -1
        };


        animConfigs.minionSwordFloat = {
            key: 'minionSwordFloat',
            frames: this.anims.generateFrameNumbers('minionSword', { start: 3, end: 4, first: 3 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.minionSwordTell = {
            key: 'minionSwordTell',
            frames: this.anims.generateFrameNumbers('minionSword', { start: 3, end: 3, first: 3 }),
            frameRate: 2,
            repeat: 0
        };
        animConfigs.minionSwordAttack = {
            key: 'minionSwordAttack',
            frames: this.anims.generateFrameNumbers('minionSword', { start: 0, end: 2, first: 0 }),
            frameRate: 12,
            repeat: 2
        };

        animConfigs.bossSwordFloat = {
            key: 'bossSwordFloat',
            frames: this.anims.generateFrameNumbers('bossSword', { start: 0, end: 5, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.bossSwordTell = {
            key: 'bossSwordTell',
            frames: this.anims.generateFrameNumbers('bossSword', { start: 3, end: 6, first: 3 }),
            frameRate: 12,
            repeat: 2
        };
        animConfigs.bossSwordAttack = {
            key: 'bossSwordAttack',
            frames: this.anims.generateFrameNumbers('bossSword', { start: 15, end: 18, first: 15 }),
            frameRate: 18,
            repeat: 5
        };
        animConfigs.bossSwordLightning = {
            key: 'bossSwordLightning',
            frames: this.anims.generateFrameNumbers('bossSword', { start: 8, end: 13, first: 8 }),
            frameRate: 12,
            repeat: 15
        };


        animConfigs.spookyGhostFloat = {
            key: 'spookyGhostFloat',
            frames: this.anims.generateFrameNumbers('spookyGhost', { start: 0, end: 6, first: 0 }),
            frameRate: 2,
            repeat: -1
        };
        animConfigs.spookyGhostTell = {
            key: 'spookyGhostTell',
            frames: this.anims.generateFrameNumbers('spookyGhost', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        animConfigs.spookyGhostLunge = {
            key: 'spookyGhostLunge',
            frames: this.anims.generateFrameNumbers('spookyGhost', { start: 0, end: 1, first: 0 }),
            frameRate: 8,
            repeat: 0
        };
        animConfigs.lambRun = {
            key: 'lambRun',
            frames: this.anims.generateFrameNumbers('lamb', { start: 0, end: 2, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.lambTell = {
            key: 'lambTell',
            frames: this.anims.generateFrameNumbers('lamb', { start: 2, end: 2, first: 2 }),
            frameRate: 6,
            repeat: 0
        };
        animConfigs.lambFlee = {
            key: 'lambFlee',
            frames: this.anims.generateFrameNumbers('lamb', { start: 2, end: 2, first: 2 }),
            frameRate: 6,
            repeat: 0
        };
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



        animConfigs.portalClosedBoss = {
            key: 'portalClosedBoss',
            frames: this.anims.generateFrameNumbers('bossPortal', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: 0
        };
        animConfigs.portalOpenBoss = {
            key: 'portalOpenBoss',
            frames: this.anims.generateFrameNumbers('bossPortal', { start: 9, end: 11, first: 9 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.portalOpeningBoss = {
            key: 'portalOpeningBoss',
            frames: this.anims.generateFrameNumbers('bossPortal', { start: 1, end: 8, first: 1 }),
            frameRate: 8,
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
        animConfigs.niceGhost = {
            key: 'niceGhost',
            frames: this.anims.generateFrameNumbers('niceGhost', { start: 0, end: 14, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.kitty = {
            key: 'kitty',
            frames: this.anims.generateFrameNumbers('kitty', { start: 0, end: 2, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.giantWalk = {
            key: 'giantWalk',
            frames: this.anims.generateFrameNumbers('giant', { start: 0, end: 18, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.giantTell = {
            key: 'giantTell',
            frames: this.anims.generateFrameNumbers('giant', { start: 0, end: 0, first: 0 }),
            frameRate: 8,
            repeat: 5
        };
        animConfigs.giantAttack = {
            key: 'giantAttack',
            frames: this.anims.generateFrameNumbers('giant', { start: 0, end: 18, first: 0 }),
            frameRate: 36,
            repeat: 3
        };
        animConfigs.braceletOfWinds = {
            key: 'braceletOfWinds',
            frames: this.anims.generateFrameNumbers('braceletOfWinds', { start: 0, end: 3, first: 0 }),
            frameRate: 12,
            repeat: -1
        };

        this.scene.start('MenuScene');
    }



}