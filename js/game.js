var upKey, leftKey, rightKey, downKey, attKey, spaceKey, activePointer, centerX, centerY, defaultVolume, animConfigs, score, gold, lives, enemies, gridCenterX, gridCenterY, missions, gameEvents, tips, lvlId, mediaService, soldLamb, path
,towns, maxLives, curHero, savedGameExists;
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
const HOUSE_1 = 3;
const PORTAL1 = 4;
const PORTAL2 = 5;
const PORTAL3 = 6;
const PORTAL4 = 7;
const LIGHT_RADIUS = 75;
// Enemy states
const STATE_EN_IDLE = 0;
const STATE_EN_MOVE = 1;
const STATE_EN_HIT = 2;
const STATE_EN_TELL = 3;
const STATE_EN_ATTACK = 4;
const STATE_EN_JUMP = 5;
const STATE_EN_DIE = 6;
const STATE_EN_INTRO = 7;
const STATE_EN_DEAD = 8;

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
    return n*WALLSIZE;
    //+ (WALLSIZE/2)
}

const townsData = [
       {id:1,name:"Emberbow",grid:undefined,state:0,bossLvl:"boss1",missionId:"bossGiant"},
       {id:2,name:"Winterstone",grid:undefined,state:0,bossLvl:"boss2",missionId:"bossSword"},
       {id:3,name:"Nightholme",grid:undefined,state:0,bossLvl:"boss3",missionId:"bossCreeper"},
   ]


const tipsData =[
      {shown:false,txt:"Something has put a curse on the forest and now it keeps changing. There are three villages, but the paths to them have been lost and people can't find their way home. Can you help find the villages?"},
      {shown:false,txt:"The portals won't open until you defeat all the monsters in this part of the forest."},
      {shown:false,txt:"The people in the first village always lit two fires before the new moon."}
  ];

const items = [
{id:'lamb',img:'lambFace',name:"lamb",price:5},
{id:'heartCharm',img:'heartCharm',name:"Heart Charm",price:50,description:"Gives one health on entering a new level."},
{id:'braceletOfWinds',img:'braceletOfWinds',name:"Bracelet of Winds",price:50,description:"Adds knockback to attacks.",anm:'braceletOfWinds'},
{id:'fireBracelet',img:'fireBracelet',name:"Bracelet of Fire",price:50,description:"Plus 2 Damage.",bonusDamage:2},
{id:'mushroom',img:'mushroom',name:"mushroom",price:5},
{id:'snailshell',img:'snailShell',name:"snail shell",price:5},
{id:'starEmber',img:'fireball',name:"Fire Wisp",price:15},
{id:'potionV',img:'potionV',name:"Potion of Vigor",price:50,description:"Increases maximum health by one.",anm:"potionVanm"},
{id:'apple',img:'apple',name:"Apple",price:10,description:"Grants 1 health at start of new level. Consumed on use."},
{id:'starKey',img:'starKey',name:"Star Key",price:0,description:"What door does this open?"},
];

// BE SURE ALL MISSION ITEMS ARE IN THE ITEMS LIST ABOVE
const missionsData = [
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

const heroes  = [
   {img:'rogue',name:"Rogue",anmIdl:'rogueIdle',anmRun:'rogueRun',yOffset:-48},
   {img:'wizard',name:"Wizard",anmIdl:'wizard1Walk',anmRun:'wizard1Walk',yOffset:0},
];
curHero = heroes[0];


const setGameDefaults =function() {
    gold = 0;
    lives=50;
    soldLamb=false,
    path=[];
}

const saveGame = function(gameData){
    localStorage.setItem('crawlerData',JSON.stringify(gameData));
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
            { key: 'RandomNamePlugin', plugin: RandomNamePlugin, start:true },
            { key: 'BackpackPlugin', plugin: BackpackPlugin, start:true, data:{maxSlots:6,itemLib:items} },
            { key: 'StorePlugin', plugin: StorePlugin, start:false,data:{yPos:160} },
        ]
    },
    render: {
        pixelArt: true,
        roundPixels: false
    },
    parent: 'ph_game',
    backgroundColor: '#000000',
    scene: [BootScene,MenuScene,SelectScene,GameScene,SettingsScene,HudScene],
    physics: {
        default: 'arcade',
        arcade: {
            fps: 50,
            debug: false,
            width: PW,
            height: PH
        }
    },
};

var game = new Phaser.Game(config);