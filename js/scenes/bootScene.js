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
        this.load.image('heart', 'img/Heart.png');
        this.load.image('grassBg', 'img/grass.png');
        this.load.image('grassBgDark', 'img/grassDark.png');
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
        this.load.image('bushNight', 'img/bushNight.png');
        this.load.image('vendor', 'img/vendor.png');
        this.load.image('emblemMoon', 'img/EmblemMoon.png');
        this.load.image('emblemGem', 'img/EmblemGem.png');
        this.load.image('emblemFlame', 'img/EmblemFlame.png');
        this.load.image('fireBracelet', 'img/firebracelet.png');
        this.load.image('apple', 'img/apple.png');
        this.load.image('uiArrow', 'img/ui/uiArrow.png');
        this.load.image('starKey', 'img/starKey.png');

        // Spritesheets
        this.load.spritesheet('wizard1', 'img/wizard1.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyIdle', 'img/emyIdle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyHit', 'img/emyHit.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyWalk', 'img/emyWalk.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyDie', 'img/emyDie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('redImp', 'img/redImp.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('bulletIce', 'img/bulletIce.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('forestPortal', 'img/ForestPortal.png',{ frameWidth: 64, frameHeight: 64 });

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
        this.load.spritesheet('hut1', 'img/village/hut1.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('skeleton', 'img/Skeleton.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('wormb', 'img/wormb.png',{ frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet('gobovillager', 'img/village/gobovillager.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('evilTree', 'img/evilTree.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('chompPlant', 'img/chompPlant.png',{ frameWidth: 18, frameHeight: 20 });
        this.load.spritesheet('fireGiant', 'img/FireGiant2.png',{ frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('flamingRock', 'img/flameingrock.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('villagerSword', 'img/villagerSword.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('potionV', 'img/potion.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('firefly', 'img/Fly.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('coinSpin', 'img/CoinSpin.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('hog', 'img/hog.png',{ frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('darkEnergy', 'img/darkEnergy.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('badWizard', 'img/badWizard.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('creeper', 'img/thePreservedCreeper.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('creeperDie', 'img/thePreservedCreeperDeath.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('peasant1', 'img/peasant1.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('peasant2', 'img/peasant2.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('starPortal', 'img/starPortal.png',{ frameWidth: 64, frameHeight: 64 });

        // Audio
        this.load.audio('theme1', 'audio/music/Togetherwearestronger.mp3');
        this.load.audio('boss1Theme', 'audio/music/TheMomentofTruth.mp3');
        this.load.audio('hitHurt', 'audio/sfx/Hit_Hurt7.mp3');
        this.load.audio('hitHurtPlr', 'audio/sfx/Hit_Hurtplr.mp3');
        this.load.audio('sword', 'audio/sfx/sword.mp3');
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

        this.backpack = this.plugins.get('BackpackPlugin');


        enemies = 0;
        lvlId = null;

        let saveDataRaw = localStorage.getItem('crawlerData');
        let saveData = JSON.parse(saveDataRaw) || {};
        this.backpack.items = saveData.inventory || [];
        savedGameExists = saveData.lives > 0;
        curHero = saveData.curHero || heroes[0];
        lives = saveData.lives || 10;
        gold = saveData.gold || 0;
        soldLamb = saveData.soldLamb || false;
        path = saveData.path || [];//keep track of the portals passed through

        townsData = [
               {id:1,name:"Emberbow",grid:undefined,state:0,bossLvl:"boss1",missionId:"bossGiant"},
               {id:2,name:"Winterstone",grid:undefined,state:0,bossLvl:"boss2",missionId:"bossSword"},
               {id:3,name:"Nightholme",grid:undefined,state:0,bossLvl:"boss3",missionId:"bossCreeper"},
           ]

        towns = saveData.towns || townsData;

        tipsData =[
              {shown:false,txt:"Something has put a curse on the forest and now it keeps changing. There are three villages, but the paths to them have been lost and people can't find their way home. Can you help find the villages?"},
              {shown:false,txt:"The portals won't open until you defeat all the monsters in this part of the forest."},
              {shown:false,txt:"The people in the first village always lit two fires before the new moon."}
          ];

        tips = saveData.tips || tipsData;


        // BE SURE ALL MISSION ITEMS ARE IN THE ITEMS LIST ABOVE
        missionsData = [
            {
                id:'lostLamb',npc:'shepherd',started:false,complete:false
                ,itemRequired:"lamb"
                ,itemGiven:"heartCharm"
                ,txtStart:"Please help me find my lost lamb. Those monsters chased it away."
                ,txtActive:"Did you find my lamb?"
                ,txtComplete:"Thank you for bringing back my lamb! Here, take this magic charm."
                ,isRandom:true
            },
            {
                id:'witchMushroom',npc:'witch',started:false,complete:false
                ,itemRequired:"mushroom"
                ,itemGiven:"potionV"
                ,txtStart:"I need one mushroom. If you bring me one I'll give you a potion.."
                ,txtActive:"I still need that mushroom."
                ,txtComplete:"Thanks for the mushroom. Here's your potion."
                ,isRandom:true
             },
              {
                  id:'lostShell',npc:'snalGuy',started:false,complete:false
                  ,itemRequired:"snailshell"
                  ,goldGiven:100
                  ,txtStart:"Hi, I have lost my other shell. Can you find it? I will give you 100 coins."
                  ,txtActive:"Did you find my shell?"
                  ,txtComplete:"Thanks! Here's your gold."
                  ,isRandom:true
               },
             {
                 id:'buidFire',npc:'goboFire',npcName:'Gobo',started:false,complete:false
                 ,itemRequired:"starEmber"
                 ,itemGiven:"heartCharm"
                 ,txtStart:"I don't have any way to light my campfire. Can you get a fire wisp from a mogus and bring it to me."
                 ,txtActive:"I still can't light this fire."
                 ,txtComplete:"Finally! Here, take this magic charm."
                 ,anmComplete:'goboFireLit'
                 ,isRandom:true
              },
                {
                 id:'bossSword',npc:'villagerSword',npcName:'Sword Villager',started:false,complete:false
                 ,itemRequired:"starEmber"
                 ,itemGiven:"heartCharm"
                 ,txtStart:"A horrible enchanted sword has chased everyone from the village. If you defeat it they might come back."
                 ,txtActive:"Did you defeat the giant sword? It's through that stone portal."
                 ,txtComplete:"Thank you!"
                 ,isRandom:false
              },
               {
                id:'bossGiant',npc:'gobovillager',npcName:'Gobo Villager',started:false,complete:false
                ,itemRequired:"starEmber"
                ,itemGiven:"heartCharm"
                ,txtStart:"A fire giant has chased everyone away. Maybe you can defeat him. He's through the stone portal."
                ,txtActive:"Did you defeat the giant? It's through that stone portal."
                ,txtComplete:"Thank you!"
                ,isRandom:false
             },
             {
              id:'bossCreeper',npc:'snalGuy',npcName:'Snal',started:false,complete:false
              ,itemRequired:"starEmber"
              ,itemGiven:"heartCharm"
              ,txtStart:"Some creepy monster has chased everyone away. Maybe you can defeat him. He's through the stone portal."
              ,txtActive:"Did you defeat the creepy monster? It's through that stone portal."
              ,txtComplete:"Thank you!"
              ,isRandom:false
           }
        ];
        missions = saveData.missions || missionsData;

        mediaService = new MediaService(this);
        mediaService.setMusic('theme1');

        animConfigs = {};
        animConfigs.potionVanm = {
            key: 'potionVanm',
            frames: this.anims.generateFrameNumbers('potionV', { start: 0, end: 2, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.villagerSword = {
            key: 'villagerSword',
            frames: this.anims.generateFrameNumbers('villagerSword', { start: 0, end: 3, first: 0 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.flamingRock = {
            key: 'flamingRock',
            frames: this.anims.generateFrameNumbers('flamingRock', { start: 0, end: 2, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.fireGiantWalk = {
            key: 'fireGiantWalk',
            frames: this.anims.generateFrameNumbers('fireGiant', { start: 0, end: 18, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.fireGiantTell = {
            key: 'fireGiantTell',
            frames: this.anims.generateFrameNumbers('fireGiant', { start: 0, end: 0, first: 0 }),
            frameRate: 8,
            repeat: 5
        };
        animConfigs.fireGiantAttack1 = {
            key: 'fireGiantAttack1',
            frames: this.anims.generateFrameNumbers('fireGiant', { start: 0, end: 18, first: 0 }),
            frameRate: 36,
            repeat: 3
        };
        animConfigs.fireGiantAttack2 = {
            key: 'fireGiantAttack2',
            frames: this.anims.generateFrameNumbers('fireGiant', { start: 19, end: 22, first: 19 }),
            frameRate: 12,
            repeat: 9
        };
        animConfigs.fireGiantDie = {
            key: 'fireGiantDie',
            frames: this.anims.generateFrameNumbers('fireGiant', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 1
        };


        animConfigs.chompPlantIdle = {
            key: 'chompPlantIdle',
            frames: this.anims.generateFrameNumbers('chompPlant', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: -1
        };
        animConfigs.chompPlantTell = {
            key: 'chompPlantTell',
            frames: [
                {key:'chompPlant',frame:0,duration:300},
            ],
            repeat: 0
        };
        animConfigs.chompPlantAttack = {
            key: 'chompPlantAttack',
            frames: this.anims.generateFrameNumbers('chompPlant', { start: 1, end: 2, first: 1 }),
            frameRate: 28,
            repeat: 20
        };
        animConfigs.chompPlantDie = {
            key: 'chompPlantDie',
            frames: this.anims.generateFrameNumbers('chompPlant', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 1
        };

        animConfigs.evilTreeIdle = {
            key: 'evilTreeIdle',
            frames: this.anims.generateFrameNumbers('evilTree', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: 0
        };

        animConfigs.evilTreeWalk = {
            key: 'evilTreeWalk',
            frames: this.anims.generateFrameNumbers('evilTree', { start: 1, end: 2, first: 1 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.evilTreeTell = {
            key: 'evilTreeTell',
            frames: [
                {key:'evilTree',frame:2,duration:200},
            ],
            repeat: 0
        };
        animConfigs.evilTreeAttack = {
            key: 'evilTreeAttack',
            frames: [
                {key:'evilTree',frame:3,duration:500},
                {key:'evilTree',frame:4,duration:2},
            ],
            repeat: 0
        };
        animConfigs.evilTreeDie = {
            key: 'evilTreeDie',
            frames: this.anims.generateFrameNumbers('evilTree', { start: 5, end: 12, first: 5 }),
            frameRate: 6,
            repeat: 0
        };

        animConfigs.goboVillagerIdle = {
            key: 'goboVillagerIdle',
            frames: this.anims.generateFrameNumbers('gobovillager', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: 0
        };
        animConfigs.goboVillagerWalk = {
            key: 'goboVillagerWalk',
            frames: this.anims.generateFrameNumbers('gobovillager', { start: 1, end: 2, first: 0 }),
            frameRate: 3,
            repeat: -1
        };

        animConfigs.wormbCrawl = {
            key: 'wormbCrawl',
            frames: this.anims.generateFrameNumbers('wormb', { start: 0, end: 1, first: 0 }),
            frameRate: 3,
            repeat: -1
        };

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

        animConfigs.skeletonWalk = {
            key: 'skeletonWalk',
            frames: this.anims.generateFrameNumbers('skeleton', { start: 1, end: 3, first: 1 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.skeletonTell = {
            key: 'skeletonTell',
            frames: this.anims.generateFrameNumbers('skeleton', { start: 0, end: 0, first: 0 }),
            frameRate: 2,
            repeat: 0
        };
        animConfigs.skeletonAttack = {
            key: 'skeletonAttack',
            frames: [
                {key:'skeleton',frame:4,duration:1},
                {key:'skeleton',frame:5,duration:300},
            ],
            repeat: 0
        };
        animConfigs.skeletonDie = {
            key: 'skeletonDie',
            frames: [
                {key:'skeleton',frame:6,duration:1},
                {key:'skeleton',frame:7,duration:11},
            ],
            frameRate: 6,
            repeat: 0
        };
        animConfigs.firefly = {
            key: 'firefly',
            frames: this.anims.generateFrameNumbers('firefly', { start: 0, end: 7, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.coinSpin = {
            key: 'coinSpin',
            frames: this.anims.generateFrameNumbers('coinSpin', { start: 0, end: 4, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.hogWalk = {
            key: 'hogWalk',
            frames: this.anims.generateFrameNumbers('hog', { start: 0, end: 1, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.hogAttack = {
            key: 'hogAttack',
            frames: this.anims.generateFrameNumbers('hog', { start: 0, end: 1, first: 0 }),
            frameRate: 18,
            repeat: 5
        };
        animConfigs.hogTell = {
            key: 'hogTell',
            frames: this.anims.generateFrameNumbers('hog', { start: 0, end: 0, first: 0 }),
            frameRate: 2,
            repeat: 0
        };
        animConfigs.darkEnergy = {
            key: 'darkEnergy',
            frames: this.anims.generateFrameNumbers('darkEnergy', { start: 0, end: 3, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.badWizardWalk = {
            key: 'badWizardWalk',
            frames: this.anims.generateFrameNumbers('badWizard', { start: 0, end: 1, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.badWizardTell = {
            key: 'badWizardTell',
            frames: [
                {key:'badWizard',frame:0,duration:300},
                {key:'badWizard',frame:1,duration:300},
                {key:'badWizard',frame:2,duration:300},
                {key:'badWizard',frame:3,duration:300},
                {key:'badWizard',frame:4,duration:1},
                {key:'badWizard',frame:5,duration:1},
            ],
            repeat: 0
        };
        animConfigs.badWizardAttack = {
            key: 'badWizardAttack',
            frames: this.anims.generateFrameNumbers('badWizard', { start: 1, end: 2, first: 0 }),
            frameRate: 12,
            repeat: 30
        };

        animConfigs.bossCreeperWalk = {
            key: 'bossCreeperWalk',
            frames: this.anims.generateFrameNumbers('creeper', { start: 3, end: 5, first: 3 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.bossCreeperTell = {
            key: 'bossCreeperTell',
            frames: this.anims.generateFrameNumbers('creeper', { start: 5, end: 6, first: 5 }),
            frameRate: 12,
            repeat: 6
        };
        animConfigs.bossCreeperAttack = {
            key: 'bossCreeperAttack',
            frames: this.anims.generateFrameNumbers('creeper', { start: 4, end: 5, first: 4 }),
            frameRate: 12,
            repeat: 5
        };
        animConfigs.bossCreeperDie = {
            key: 'bossCreeperDie',
            frames: [
                {key:'creeperDie',frame:0,duration:10},
                {key:'creeperDie',frame:1,duration:10},
                {key:'creeperDie',frame:0,duration:10},
                {key:'creeperDie',frame:1,duration:10},
                {key:'creeperDie',frame:0,duration:10},
                {key:'creeperDie',frame:1,duration:10},
                {key:'creeperDie',frame:0,duration:10},
                {key:'creeperDie',frame:1,duration:10},
                {key:'creeperDie',frame:2,duration:10},
                {key:'creeperDie',frame:3,duration:10},
            ],
            repeat: 0
        };
        animConfigs.bossCreeperIntro = {
            key: 'bossCreeperIntro',
            frames: this.anims.generateFrameNumbers('creeper', { start: 0, end: 3, first: 0 }),
            frameRate: 2,
            repeat: 0
        };

        animConfigs.peasant1Walk = {
            key: 'peasant1Walk',
            frames: this.anims.generateFrameNumbers('peasant1', { start: 0, end: 3, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.peasant2Walk = {
            key: 'peasant2Walk',
            frames: this.anims.generateFrameNumbers('peasant2', { start: 0, end: 3, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.starPortalOpening = {
            key: 'starPortalOpening',
            frames: this.anims.generateFrameNumbers('starPortal', { start: 1, end: 4, first: 1 }),
            frameRate: 8,
            repeat: 0
        };
        animConfigs.starPortalOpen = {
            key: 'starPortalOpen',
            frames: this.anims.generateFrameNumbers('starPortal', { start: 5, end: 7, first: 5 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.starPortalClosed = {
            key: 'starPortalClosed',
            frames: this.anims.generateFrameNumbers('starPortal', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: 0
        };
        this.scene.start('MenuScene');
    }



}