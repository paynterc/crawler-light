class GameScene extends Phaser.Scene {
    constructor()
    {
        super({key: 'GameScene', active: false});
        this.GAMEOVER = false;

    }
    
    preload()
    {
        let that = this;
        if(spaceKey) spaceKey.destroy();
        if(upKey) upKey.destroy();
        if(downKey) downKey.destroy();
        if(leftKey) leftKey.destroy();
        if(rightKey) rightKey.destroy();

        spaceKey = this.input.keyboard.addKey('space');  // Get key object
        activePointer = this.input.activePointer;
        upKey = this.input.keyboard.addKey('w');  // Get key object
        downKey = this.input.keyboard.addKey('s');  // Get key object
        leftKey = this.input.keyboard.addKey('a');  // Get key object
        rightKey = this.input.keyboard.addKey('d');  // Get key object

        this.hudScene = this.scene.get('HudScene');
        this.bootScene = this.scene.get('BootScene');

    }

    create()
    {
        let that = this;
        enemies = 0;


        this.cameras.main.setBackgroundColor(0x000000);
        this.lights=false;
        this.addAnimations();
        this.backpack = this.plugins.get('BackpackPlugin');
        this.backpack.thing = "bar";
        this.store = this.plugins.get('StorePlugin');

        this.namePlugin = this.plugins.get('RandomNamePlugin');
        let name = this.namePlugin.getName();
        mediaService.setMusic('theme1');
        this.hudScene.hideHealthbar();


        this.restart=false;

        this.updatePath();// check the current path, see if we get a special level

        this.blocks = this.add.group();
        this.enemies = this.add.group();
        this.bullets = this.add.group();
        this.portals = this.add.group();
        this.starPortals = this.add.group();
        this.catchables = this.add.group();
        this.mobs = this.add.group();
        this.npcs = this.add.group();
        this.vendors = this.add.group();
        this.updateGroup = this.add.group();
        this.graphics = this.add.graphics();

//        this.load.plugin('RandomNamePlugin', 'plugin/randomNamePlugin.js', true);
         let bgImg = lvlId==="moonLvl" ? "grassBgDark" : "grassBg";
         this.bg0 = this.add.tileSprite(
             0,
             0,
             W*4,
             H*4,
             bgImg
         ).setOrigin(0,0).setScrollFactor(1,1).setDepth(DEPTH_BG);



        // Use PW and PH (physics width, physics height) if the physics world is bigger than the window
        // The physics world bomakeGridunds for this game are set to 4x the game size. This allows more range of movement while still leveraging "collideWorldBounds"
        // so you don't need to surround the playfield with blocks.
        this.gameGrid=[];
        this.gameGrid = makeGrid(PW/WALLSIZE,PH/WALLSIZE);
        gridCenterX = Math.floor(this.gameGrid.length/2);
        gridCenterY = Math.floor(this.gameGrid[0].length/2);


        let plrX=g2Px(gridCenterX);//in pixels
        let plrY=g2Px(gridCenterY);


        this.quipText = this.add.text(plrX,plrY, "", { fontSize: '8px', fontFamily: 'FourBitRegular' }).setDepth(10000000).setAlpha(0);
        if(lvlId=="boss1"){

            plrX=g2Px(gridCenterX);//in pixels
            plrY=g2Px(gridCenterY+3)-32;
            this.makeBossRoom1();
            let bp = new BossPortal(this,plrX,plrY);
            this.gameGrid[gridCenterX][gridCenterY] = PORTAL4;
            bp.goToLvl="town1";

        }else if(lvlId=="boss2"){
          plrX=g2Px(gridCenterX);//in pixels
          plrY=g2Px(gridCenterY+3)-32;
          this.makeBossRoom2();
          let bp = new BossPortal(this,plrX,plrY);
          this.gameGrid[gridCenterX][gridCenterY] = PORTAL4;
          bp.goToLvl="town2";

        }else if(lvlId=="boss3"){

            plrX=g2Px(gridCenterX);//in pixels
            plrY=g2Px(gridCenterY+3)-32;
            this.makeBossRoom3();
            let bp = new BossPortal(this,plrX,plrY);
            this.gameGrid[gridCenterX][gridCenterY] = PORTAL4;
            bp.goToLvl="town3";

        }else if(lvlId=="boss4"){

           plrX=g2Px(gridCenterX);//in pixels
           plrY=g2Px(gridCenterY+3)-32;
           this.makeBossRoom4();
           let bp = new BossPortal(this,plrX,plrY);
           this.gameGrid[gridCenterX][gridCenterY] = PORTAL4;
           bp.goToLvl="town2";

         }else if(lvlId=="town1"){
            // towns[0], missionId:'bossSword', e.goToLvl = "boss1";
            let townData = towns[0];
            this.makeTown(townData);
        }else if(lvlId=="town2"){
            let townData = towns[1];
            this.makeTown(townData);
        }else if(lvlId=="town3"){
            let townData = towns[2];
            this.makeTown(townData);
        }else{

            this.makeMaze();
            let fp = this.add.sprite(plrX,plrY,'forestPortalUsed');
            this.gameGrid[gridCenterX][gridCenterY] = OCCUPIED;
            fp.depth = plrY;

            this.placePortal('moon');
            this.placePortal('gem');
            this.placePortal('flame');

            if(lvlId=="moonLvl"){

                let BPG = this.findSpotOnGrid();
                let bp = new BossPortal(this,g2Px(BPG[0]),g2Px(BPG[1]),{img:'starPortal',myGroup:this.starPortals});
                this.gameGrid[BPG[0]][BPG[1]] = PORTAL4;

                bp.anm = 'starPortalClosed';
                bp.anmOpen = 'starPortalOpen';
                bp.anmOpening = 'starPortalOpening';
                bp.type = "boss";
                bp.goToLvl="boss4";
                bp.play('starPortalClosed');
            }

            this.questItemPlaced=false;
            this.placeQuestItems();
            this.placeNpc();
            this.placeVendor();
            this.placeMobs();
            this.placeEnemies();
            this.placeTraps();
        }


        // Instantiate Hero
        if(curHero.name==='Wizard'){
            this.player = new Player(this,plrX,plrY+16);

        }else{
            this.player = new Rogue(this,plrX,plrY+16);

        }
        maxLives = this.player.maxLives;
        this.applyLevelBonuses();
        lives = lives>maxLives ? maxLives : lives;



        this.checkEnemies();
        this.cameras.main.startFollow(this.player);
//		this.cameras.main.setLerp(.25,.25);//Slows VERTICAL FOLLOW

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.enemies, this.blocks);
        this.physics.add.collider(this.npcs, this.blocks);
        this.physics.add.collider(this.catchables, this.blocks);
        this.physics.add.collider(this.mobs, this.blocks);
        this.physics.add.overlap(this.bullets, this.blocks, function(bullet,block){ if(bullet.destroyOnHitWall) bullet.destroyIt(); });
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, false,this);
        this.physics.add.overlap(this.bullets, this.player, this.bulletHitPlayer, false,this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy,false,this);
        this.physics.add.overlap(this.player, this.catchables, this.hitCatchable,false,this);
        this.physics.add.overlap(this.player, this.npcs, this.hitNpc,false,this);
        this.physics.add.overlap(this.player, this.portals, this.playerEnterPortal,false,this);
        this.physics.add.overlap(this.player, this.starPortals, this.playerTouchStarPortal,false,this);
        this.physics.add.overlap(this.player, this.vendors, this.hitVendor,false,this);
        this.makeEmitters();


        this.shadowTexture = this.textures.createCanvas('theShadow', W, H);
        this.lightSprite = this.add.image(0, 0, 'theShadow');
        this.lightSprite.blendMode = Phaser.BlendModes.MULTIPLY;


        this.addEvents();
        this.addSounds();

//         touching or interacting
        this.overlapping = null;
        this.overlapCount=0;


        this.saveGameState();
        this.events.emit('newLevel');

    }

    addSounds(){
        this.hitHurt = this.sound.add('hitHurt',{volume:.25});
        this.hitHurtPlr = this.sound.add('hitHurtPlr',{volume:.25});
        this.swordSound = this.sound.add('sword',{volume:.25});

    }

    updatePath(){
        if(lvlId) return false;// we already have a lvlid
        let pathString = path.join();
        if(pathString=="flame,flame,moon"){
            lvlId="town1";
        }else if(pathString=="gem,moon,gem"){
            lvlId="town2";
        }else if(pathString=="flame,gem,flame"){
            lvlId="town3";
        }else if(pathString=="moon,moon,moon"){
            lvlId="moonLvl";
        }else{
            lvlId="forest";
        }
    }

    saveGameState(){
        //tips, missions, gold, inventory, lives, towns, soldLamb, path
        let myData = {
            curHero:curHero,
            gold:gold,
            tips:tips,
            missions:missions,
            inventory:this.backpack.items,
            lives:lives,
            towns:towns,
            soldLamb:soldLamb,
            path:path,
        }

        localStorage.setItem('crawlerData',JSON.stringify(myData));

    }



    gameRestart(){
        enemies = 0;
        lvlId = null;
        this.bootScene.loadSavedGame();
        this.restart = true;
    }


    addEvents(){

        this.events.once('shutdown', this.shutDownListener,this);
        this.events.on('enemiesUpdated', this.checkEnemies, this);
        this.events.on('enemyDied', this.enemyDied, this);
        this.events.on('bossDied', this.bossDied, this);
//        gameEvents.on('test', this.testEvent, this);

    }

    shutDownListener(){
        this.events.off('enemiesUpdated', this.checkEnemies);
        this.events.off('enemyDied', this.enemyDied);
        this.events.off('bossDied', this.bossDied);
        //this.saveGameState();
//        gameEvents.off('test', this.testEvent);
    }

    findInventoryItem(itemId){
        return this.backpack.findItemById(itemId);
    }
    removeInventoryItem(itemId){
        return this.backpack.removeItemById(itemId);
    }
    addInventoryItem(itemId){
        return this.backpack.addItemById(itemId);
    }

    applyLevelBonuses(){
        let potionsV = this.backpack.findAllItemsOfId("potionV");
        if(potionsV){
            maxLives+=potionsV.length;
        }

        let heartCharms = this.backpack.findAllItemsOfId("heartCharm");
        if(heartCharms){
            lives += heartCharms.length;
            if(lives>maxLives) lives = maxLives;
        }


        this.player.bonusDamage = 0;
        let items = this.backpack.getItems();
        var i = items.length
        while (i--) {
            let theItem = items[i];
            this.player.bonusDamage += theItem.bonusDamage || 0;
            if(theItem.id==='apple' && lives<maxLives){
                lives ++;
                this.backpack.removeItemByIndex(i);
            }
        }

    }

    sceneRestart(){
        this.scene.restart();
    }

    gotoLevel(lvl){
        lvlId=lvl;
        this.restart=true;
    }


    testEvent(num){
        console.log("GAME SCENE EVENT",num);
    }

    playerEnterPortal(player,portal){
        if(portal.open){
                if(!this.overlapping){
                    this.overlapping=portal;
                }else if(this.overlapping===portal){
                    if(this.overlapCount>=350){
                        this.graphics.clear();
                        portal.onEnter();
                    }
                }
        }

    }

    playerTouchStarPortal(player,portal){
            if(this.backpack.hasItem('starKey')){
                if(!this.overlapping){
                    this.overlapping=portal;
                    portal.play(portal.anmOpen);
                    portal.open=true;
                }else if(this.overlapping===portal){
                    if(this.overlapCount>=350){
                        this.graphics.clear();
                        portal.onEnter();
                    }
                }
            }

    }

    enemyDied(enemyKey,xx,yy){

            if(enemyKey=='mogus'){
                let goboMission = missions.filter(function(m) { return m.complete === false && m.started===true && m.id=="buidFire"; });
                if(goboMission.length>0){
                    let odds = 3;
                    if(Phaser.Math.Between(1,odds)===odds){
                        new Loot(this,xx,yy,{invAdd:'starEmber',img:'fireball',anm:'fireball',pop:true});
                    }
                }
            }
            let goldOdds=3;
            if(Phaser.Math.Between(1,goldOdds)===goldOdds){
                let goldAmt =  Phaser.Math.Between(1,5);
                for(let g=0;g<goldAmt;g++){
                    new Loot(this,xx,yy,{img:'coinSpin',anm:'coinSpin',pop:true,gold:1});
                }
            }
            this.checkEnemies();
    }

    bossDied(bossName){

        let bossMission;
        if(bossName=="BOSS SWORD"){
            bossMission = missions.filter(function(m) { return  m.id=="bossSword"; });
            if(bossMission.length>0){
                bossMission[0].started=true;
                bossMission[0].complete=true;
            }
            towns[1].state=1;
            this.checkStarKey();
        }else if(bossName=="FIRE GIANT"){
            bossMission = missions.filter(function(m) { return  m.id=="bossGiant"; });
            if(bossMission.length>0){
                bossMission[0].started=true;
                bossMission[0].complete=true;
            }
            towns[0].state=1;
            this.checkStarKey();
        }else if(bossName=="BOSS CREEP"){
             bossMission = missions.filter(function(m) { return  m.id=="bossCreep"; });
             if(bossMission.length>0){
                 bossMission[0].started=true;
                 bossMission[0].complete=true;
             }
             towns[2].state=1;
             this.checkStarKey();
         }else if(bossName=="BAD WIZARD"){
             this.endScene();
         }




    }

    endScene(){
                    this.placeTownies('gobo');
                    this.placeTownies('sword');
                    this.placeTownies('human');
        this.events.emit('playerWinsGame',this);

    }

    checkStarKey(){
         if(towns[0].state===1 && towns[1].state===1 && towns[2].state===1){
            // star key
            new Loot(this,this.player.x,this.player.y,{invAdd:'starKey',img:'starKey',pop:true});
         }
    }

    checkEnemies(){
        if(enemies<1){
            this.portals.children.each((e)=>{
                e.openMe();
            });
        }
    }

    makeEmitters(){
            let particles = this.add.particles('square');
            this.emitter1 = particles.createEmitter(
            {
            x:W/2,
            y:H/2,
            angle: { min: 135, max: 360 },
            speed: 500,
            gravityY: 150,
            lifespan: 500,
            quantity: 4,
            scale: { min: 0.05, max: .15 },
            tint: ['0xff3700','0xff7700','0xffb700','0xffffff']
            }
            );
            this.emitter1.stop();
            //this.emitter3.emitParticleAt(this.x, this.y, 10);
    }

    hitEnemy(player,enemy)
    {
        if(!enemy.canHitPlayer){ return false }
        if(enemy.attackCoolTimer<=0){
            enemy.attackCoolTimer=30;
            this.emitter1.emitParticleAt(enemy.x, enemy.y, 10);
            player.applyDamage(enemy.attackDamage);
        }

    }

    hitCatchable(player,catchable)
    {
        catchable.catchIt(player);
    }

    hitNpc(player,npc)
    {
        if(npc.timedInteract){
            if(!this.overlapping){
                this.overlapping=npc;
            }else if(this.overlapping===npc){
                if(this.overlapCount>=350){
                    this.overlapCount=0;
                    npc.interact();
                }
            }
        }else{
            npc.interact();
        }

    }

    hitVendor(player,npc)
    {
        if(!this.overlapping){
            this.overlapping=npc;
        }else if(this.overlapping===npc){
            if(this.overlapCount>=350){
                this.overlapCount=0;
                npc.interact();
            }
        }
    }

    showText(txt){
        this.scene.pause();
        this.hudScene.showText(txt);
    }

    showStore(){
        if(!this.store) return false;
        this.scene.pause();
        this.backpack.hide();
        this.events.emit('storeOpen');
//        this.sys.game.events.emit('testGameEvent');
        this.store.open(this.backpack.items,gold);

    }

    bulletHitEnemy(bullet,enemy)
    {
        //emitter.emit('test', 200);
        if(bullet.faction===0 && !bullet.hasHit(enemy)){
            enemy.applyKb(bullet.angle,bullet.kb);
            enemy.applyDamage(bullet.damage);

            this.emitter1.emitParticleAt(bullet.x, bullet.y, 10);
            if(bullet.destroyOnHit){
                bullet.destroyIt();
            }else{
                bullet.hitIt.push(enemy);
            }
        }

    }

    bulletHitPlayer(bullet,player)
    {
        if(bullet.faction===1){
            player.applyDamage(bullet.damage);

            this.emitter1.emitParticleAt(bullet.x, bullet.y, 10);

            bullet.destroyIt();
        }

    }


    addAnimations()
    {
        let that = this;
        Object.values(animConfigs).forEach(val => {
          that.anims.create(val);
        });
    }

    update(time,delta)
    {

        if(this.restart){
            this.sceneRestart();
        }

        if(this.overlapping){
            this.overlapCount+=3;
            this.graphics.visible=true;
            this.drawTimer();
            if(this.overlapCount>356){
                this.overlapCount=0;
                this.overlapping=null;
            }
        }else{
            this.overlapCount=0;
            this.graphics.visible=false;
        }

        this.player.update(time,delta);

        this.updateGroup.children.each((e)=>{
            e.update(time,delta);
        });

//        this.overlapping=false;
        if(this.quipText.alpha>0) this.quipText.alpha -= .015;

        this.updateTexture();
    }

    setQuipText(xx,yy,txt){
        if(this.quipText.alpha>0) return false;
        this.quipText.x = xx;
        this.quipText.y = yy;
        this.quipText.setText(txt).setAlpha(1);
    }
    
    gameOver()
    {
        this.GAMEOVER = true;
    }

    makeTown(townData){

        let that = this;
        let theData = townData;
        let townMission =  missions.filter(function(m) { return  m.id==theData.missionId; });
        let theMission = townMission.length>0 ? townMission[0] : null;
        if(townData.grid){

            this.gameGrid = townData.grid;
            this.buildRoom();
            if(townData.state===0){
                let RC = this.findSpotOnGrid();

                if(theMission){
                    new Npc(this,g2Px(RC[0]),g2Px(RC[1]),{ img:theMission.npc,missionId:theMission.id,anmComplete:theMission.anmComplete });
                }
                this.placeEnemies();
            }else{

                if(townData.id === 1){
                    this.placeTownies('gobo');
                }else if(townData.id ===2 ){
                    this.placeTownies('sword');
                }else if(townData.id ===3 ){
                    this.placeTownies('human');
                }

                this.placeNpc();
                this.placeVendor();
            }

            this.portals.children.each((e)=>{
                if(e.type=='boss'){
                    if(townData.state===0){
                        e.goToLvl = townData.bossLvl;
                    }else{
                        that.add.image(e.x,e.y,'bossPortal');
                        e.destroy();
                    }
                }
            });


        }else{

            this.makeMaze();
            this.gameGrid[gridCenterX][gridCenterY] = OCCUPIED;
            this.placeHouses();
            this.placePortal('moon');
            this.placePortal('gem');
            this.placePortal('flame');
            let bp = this.placeBossPortal();

            bp.goToLvl = townData.bossLvl;

            let RC = this.findSpotOnGrid();

            if(theMission){
                new Npc(this,g2Px(RC[0]),g2Px(RC[1]),{ img:theMission.npc,missionId:theMission.id,anmComplete:theMission.anmComplete });
            }
            this.placeEnemies();

            townData.grid = this.gameGrid;
        }

    }

    makeMaze()
    {
        let posX = gridCenterX;
        let posY = gridCenterY;

        this.gameGrid[posX][posY]=FLOOR;

        //block out the goal area
        this.makeRoom(posX,posY,3,3);

        for(let i=0; i<132; i++){
            let mv = Phaser.Math.Between(0, 3);
            switch (mv) {
                case 0:
                    //up
                    posY -= posY > 1 ? 1 : 0;
                    break;
                case 1:
                    //down
                    posY += posY < this.gameGrid[0].length - 2 ? 1 : 0;
                    break;
                case 2:
                    //right
                    posX += posX < this.gameGrid.length - 2 ? 1 : 0;
                    break;
                case 3:
                    //left
                    posX -= posX > 1 ? 1 : 0;
                    break;
                default:
                    break;
            }
            this.gameGrid[posX][posY]=FLOOR;
        }

        this.buildRoom();
    }

    makeBossRoom1(){
            let posX = gridCenterX;
            let posY = gridCenterY;
            this.events.emit('bossArrives',"FIRE GIANT");
            this.events.emit('bossHealthUpdate',1);

            this.makeRoom(posX,posY,7,7);
            let boss = new BossFireGiant(this,g2Px(posX),g2Px(posY),{img:'fireGiant'});
            this.buildRoom();
            mediaService.setMusic('boss1Theme');

    }
    makeBossRoom2(){
            let posX = gridCenterX;
            let posY = gridCenterY;
            this.events.emit('bossArrives',"BOSS SWORD");
            this.events.emit('bossHealthUpdate',1);

            this.makeRoom(posX,posY,7,7);
            let boss = new BossSword(this,g2Px(posX),g2Px(posY),{img:'bossSword',});
            this.buildRoom();
            mediaService.setMusic('boss1Theme');

    }
    makeBossRoom3(){
            let posX = gridCenterX;
            let posY = gridCenterY;
            this.events.emit('bossArrives',"BOSS CREEP");
            this.events.emit('bossHealthUpdate',1);

            this.makeRoom(posX,posY,7,7);
            let boss = new BossCreeper(this,g2Px(posX),g2Px(posY+1),{img:'creeper',});
            this.buildRoom();
            mediaService.setMusic('boss1Theme');

    }
    makeBossRoom4(){
            let posX = gridCenterX;
            let posY = gridCenterY;
            this.events.emit('bossArrives',"BAD WIZARD");
            this.events.emit('bossHealthUpdate',1);

            this.makeRoom(posX,posY,7,7);
            let boss = new BossWizard(this,g2Px(posX),g2Px(posY),{img:'badWizard',});
            this.buildRoom();
            mediaService.setMusic('boss1Theme');

    }

    buildRoom(config={}){
        for (var i=0; i<this.gameGrid.length; i++) {
            let col = this.gameGrid[i];
            for (var j=0; j<col.length; j++) {
                if(this.gameGrid[i][j]===WALL){
                    let block = this.physics.add.sprite( i*WALLSIZE ,j*WALLSIZE,'hedge');

                    block.body.setImmovable();
                    block.visible=false;
                    this.blocks.add(block);

                }
            }
        }

        let bushImg = lvlId==="moonLvl" ? "bushNight" : "bush";
        for (var i=0; i<this.gameGrid.length; i++) {
            let col = this.gameGrid[i];
            for (var j=0; j<col.length; j++) {
                if(this.gameGrid[i][j]===WALL){
                    let rA = Phaser.Math.Between(0,359);
                    let img = this.add.image(i*WALLSIZE,j*WALLSIZE,bushImg).setDepth(10000+(j*WALLSIZE)).setAngle(rA);

                }else if(this.gameGrid[i][j]===HOUSE_1){
                        new House(this,i*WALLSIZE,j*WALLSIZE);
                }else if(this.gameGrid[i][j]===PORTAL1){
                        new Portal(this,i*WALLSIZE,j*WALLSIZE,{type:'moon'});
                }else if(this.gameGrid[i][j]===PORTAL2){
                        new Portal(this,i*WALLSIZE,j*WALLSIZE,{type:'gem'});
                }else if(this.gameGrid[i][j]===PORTAL3){
                        new Portal(this,i*WALLSIZE,j*WALLSIZE,{type:'flame'});
                }else if(this.gameGrid[i][j]===PORTAL4){
                        new BossPortal(this,i*WALLSIZE,j*WALLSIZE);
                }
}
        }
    }

    placeHouses(){
        for(var i=0;i<8;i++){
            let RC = this.findSpotOnGrid();
            new House(this,g2Px(RC[0]),g2Px(RC[1]));
            this.gameGrid[RC[0]][RC[1]] = HOUSE_1;
        }
    }


     // By 'room' we mean a rectangular area in the maze, not the entire world map.
     makeRoom(r,c,w,h)
     {
        // r and c are grid coordinats, row and column. They mark the center of the room which should always have an odd width and height
        let tr = this.restrictToGrid( r - Math.floor(h/2) );
        let lc = this.restrictToGrid( c - Math.floor(w/2) );
        let br = this.restrictToGrid( r + Math.floor(h/2) );// bottom row
        let rc = this.restrictToGrid( c + Math.floor(w/2) );// right column
        for(var row = tr; row <= br; row ++) {
            for(var col = lc; col <= rc; col++){
                this.gameGrid[row][col]=FLOOR;
            }
        }
    }

    restrictToGrid(n){
        return Math.min(Math.max(n,1),this.gameGrid.length-1);
    }

    placeTraps(){
        let C = Phaser.Math.Between(0,6);
        for(var i=0;i<C;i++){
            let RC = this.findSpotOnGrid();
            this.makeChompPatch(g2Px(RC[0]),g2Px(RC[1]));
            this.gameGrid[RC[0]][RC[1]] = OCCUPIED;
        }
    }

    placeEnemies(){
        // up to 3 groups of enemies.


        let E=3;

        for (var i=0; i<this.gameGrid.length; i++) {
            let col = this.gameGrid[i];
            for (var j=0; j<col.length; j++) {
                if(this.gameGrid[i][j]===FLOOR
                && Math.abs(i-gridCenterX) > 2
                && Math.abs(j-gridCenterX) > 2
                ){
                    // center of the tile
                    let odds = 10;
                    if(Phaser.Math.Between(1,odds)===odds && E>0){

                        let odds2=8;
                        let roll = Phaser.Math.Between(1,odds2);
                        if(roll===1)
                        {
                            this.redImpPack(g2Px(i),g2Px(j));
                        }else if(roll===2){
                            this.spookyGhostPack( g2Px(i),g2Px(j) );
                        }else if(roll===3){
                             this.makeMogus( g2Px(i),g2Px(j) );
                        }else if(roll===4){
                             this.makeLaserSlime( g2Px(i),g2Px(j) );
                        }else if(roll === 5){
                            this.minionSwordPack( g2Px(i),g2Px(j) );
                        }else if(roll === 6){
                            this.skythBugPack( g2Px(i),g2Px(j) );
                        }else if(roll === 7){
                            this.makeSkeleton(g2Px(i),g2Px(j));
                        }else{
                            this.makeHog(g2Px(i),g2Px(j));
                            this.makeHog(g2Px(i)+16,g2Px(j)-16);
                        }

                        E--;
                    }

                }
            }
        }

        let gc;
        if(path.length===3){
            let odds = 5;
            if(Phaser.Math.Between(1,odds)===odds){
                let giantOdds=2;
                let giantRoll = Phaser.Math.Between(1,giantOdds);
                gc = this.findSpotOnGrid(false);
                if(giantRoll===1){
                    new EvilTree(this, g2Px(gc[0]), g2Px(gc[1]), {img:'evilTree'});
                }else{
//                    new EvilTree(this, g2Px(gc[0]), g2Px(gc[1]), {img:'evilTree'});
                    new Giant(this, g2Px(gc[0]), g2Px(gc[1]), {img:'giant'});

                }

            }


        }
//                        gc = this.findSpotOnGrid(false);
//                        this.makeChompPatch(g2Px(gc[0]), g2Px(gc[1]));
//                    new Giant(this, g2Px(gc[0]), g2Px(gc[1]), {img:'giant'});
//                    new ChompPlant(this, g2Px(gc[0]), g2Px(gc[1]), {img:'chompPlant'});
    }

    placeTownies(type){
        for(var i=0;i<7;i++){
            let RC = this.findSpotOnGrid();
            let rndMob;

            let quips = ["Thank you!","Our hero!","Nice job!"];
            let quip = quips[Phaser.Math.Between(0,quips.length-1)];
            if(type=='gobo'){
                rndMob = 'goboVillagerWalk';
            }else if(type=='sword'){
                rndMob = 'villagerSword';
            }else if(type=='human'){
                 let anms = ['peasant1Walk','peasant2Walk'];
                 rndMob = anms[Phaser.Math.Between(0,1)];
             }


            new Mob(this, g2Px(RC[0]), g2Px(RC[1]), {anmDefault:rndMob,defaultAcc:5,maxVelocity:8,quip:quip} );
        }


    }

    placeNpc(){

        let incompletMissions  =   missions.filter(function(m) { return m.complete === false && m.isRandom; });
        if (incompletMissions.length < 1)  return false;
        let odds = 2;
        let theMission = null;
        if(Phaser.Math.Between(1,odds)===odds){

            theMission = incompletMissions[Phaser.Math.Between(0,incompletMissions.length-1)];
            let RC = this.findSpotOnGrid();
            new Npc(this,g2Px(RC[0]),g2Px(RC[1]),{ img:theMission.npc,missionId:theMission.id,anmComplete:theMission.anmComplete });
            this.gameGrid[RC[0]][RC[1]] = OCCUPIED;
        }

        // Don't place the "tips" snal if there is already a snal mission active.
        let snalMissions = missions.filter(function(m) { return m.complete === false && m.started===true && m.npc=="snalGuy"; });
        if( (theMission==null || theMission.npc != 'snalGuy') && snalMissions.length<1){
                let tipsF =  tips.filter(function(tip) {
                  return tip.shown === false;
                });
                let theTip = tipsF[0];
                if(theTip){
                    let snalLoc = this.findSpotOnGrid();
                    let snal = new Snal(this,g2Px(snalLoc[0]),g2Px(snalLoc[1]),{img:'snalGuy',tip:theTip.txt});
                    snal.init(theTip);
                }

        }


    }

    placeMobs(){
        let num = Phaser.Math.Between(0,2);
        let mobs = ['niceGhost','kitty','wormbCrawl','firefly'];

        let RC;
        for(var i=0;i<=num;i++){
            RC = this.findSpotOnGrid(false);
            let rndMob = mobs[Phaser.Math.Between(0,mobs.length-1)];
            let quip='';
            if(rndMob==='kitty') quip = 'Purr';
//            if(rndMob==='niceGhost') quip = 'Boo';
            if(rndMob==='firefly'){

                for(var i=0;i<3;i++){
                        let mob = new Mob(this, g2Px(RC[0]) + Phaser.Math.Between(0,8)-16, g2Px(RC[1]) + Phaser.Math.Between(0,8)-16, {anmDefault:'firefly',defaultAcc:.5,maxVelocity:1} );
                        mob.play('firefly',false,Phaser.Math.Between(0,7));
                }

            }else{
                new Mob(this, g2Px(RC[0]), g2Px(RC[1]), {anmDefault:rndMob,defaultAcc:5,maxVelocity:8,quip:quip} );
            }
        }
    }

    placeQuestItems(){

        for(var i=0;i<missions.length;i++){
            let m=missions[i];
            if( m.started && !m.complete ){

                if( this.backpack.hasItem(m.itemRequired) ) continue;
                // chance for mission item to appear.
                let odds = 2;
                if(Phaser.Math.Between(1,odds)===odds){

                    // put it anywhere
                    let RC = this.findSpotOnGrid();
                    if(m.itemRequired=='lamb'){
                        new Catchable(this,g2Px(RC[0]),g2Px(RC[1]),{invAdd:'lamb',img:'lamb',anmDefault:'lambRun',anmTell:'lambTell',anmAttack:'lambFlee',attackFrequency:20});
                    }else if(m.itemRequired=='mushroom'){
                        new Loot(this,g2Px(RC[0]),g2Px(RC[1]),{invAdd:'mushroom',img:'mushroom'});
                    }else if(m.itemRequired=='snailshell'){
                        new Loot(this,g2Px(RC[0]),g2Px(RC[1]),{invAdd:'snailshell',img:'snailShell'});
                    }
                    this.questItemPlaced=true;
                    //return true;
                }

            }
        }

    }



    findSpotOnGrid(safePlayer=true){
            let rC = Phaser.Math.Between(1,this.gameGrid.length-2);
            let rR = Phaser.Math.Between(1,this.gameGrid.length-2);
            if(safePlayer){
                for(let i=0;i<=100;i++){
                  if(
                        Math.abs(rC-gridCenterX) > 3
                        && Math.abs(rR-gridCenterY) > 3
                        && this.gameGrid[rC][rR]===FLOOR
                    ){
                        return [rC,rR];
                    }
                    rC = Phaser.Math.Between(1,this.gameGrid.length-2);
                    rR = Phaser.Math.Between(1,this.gameGrid.length-2);

                }
            }

            // put it anywhere
            while(
                this.gameGrid[rC][rR]!=FLOOR
            ){
                rC = Phaser.Math.Between(1,this.gameGrid.length-2);
                rR = Phaser.Math.Between(1,this.gameGrid.length-2);
            }
            return [rC,rR];
    }



    placePortal(type){

        // try to place it far from player

        let RC = this.findSpotOnGrid();
        let P = new Portal(this,g2Px(RC[0]),g2Px(RC[1]),{type:type});
        let gridKey = OCCUPIED;
        if(type=='moon'){
            gridKey = PORTAL1;
        }else if(type=='gem'){
            gridKey = PORTAL2;
        }else if(type=='flame'){
            gridKey = PORTAL3;
        }

        this.gameGrid[RC[0]][RC[1]] = gridKey;
        return true;


    }

    placeVendor(){
        let odds = 3;
        let RC = this.findSpotOnGrid();
        new Vendor(this,g2Px(RC[0]),g2Px(RC[1]));
        this.gameGrid[RC[0]][RC[1]] = OCCUPIED;
                let apple = items.filter(function(m) { return  m.id=="apple"; })
                this.store.setStoreItems(apple);

        return true;



        if(this.backpack.isFull() || Phaser.Math.Between(0,odds)===odds){
                let RC = this.findSpotOnGrid();
                new Vendor(this,g2Px(RC[0]),g2Px(RC[1]));
                this.gameGrid[RC[0]][RC[1]] = OCCUPIED;
                return true;
        }
        return false;
    }

    placeBossPortal(){

        let RC = this.findSpotOnGrid();
        let bp = new BossPortal(this,g2Px(RC[0]),g2Px(RC[1]));
        this.gameGrid[RC[0]][RC[1]] = PORTAL4;
        return bp;
    }

    redImpPack(xx,yy){
        new RedImp(this,xx+16,yy-16);
        new RedImp(this,xx-16,yy-16);
        new RedImp(this,xx+16,yy+16);
        new RedImp(this,xx-16,yy+16);
    }

    spookyGhostPack(xx,yy){
        this.makeGhost(xx,yy-16);
        this.makeGhost(xx-16,yy+16);
        this.makeGhost(xx+16,yy+16);
    }

    minionSwordPack(xx,yy){
        this.makeMinionSword(xx+16,yy);
        this.makeMinionSword(xx-16,yy);
    }

    skythBugPack(xx,yy){
        let num = Phaser.Math.Between(1,6);
        for(let i=0;i<=num;i++){
            let xo = Phaser.Math.Between(0,16) - 24;
            let yo = Phaser.Math.Between(0,16) - 24;
            this.makeSkythBug(xx+xo,yy+yo);
        }

    }


    makeGhost(xx,yy){
        let mConfig = {
            img:'spookyGhost',
            anmDefault:'spookyGhostFloat',
            anmTell:'spookyGhostTell',
            anmAttack:'spookyGhostLunge',
            attackVelocity:200,
            agroRange:200,
            bdyW:16,
            bdyH:16,
            hp:5
        }
        new Enemy(this,xx,yy,mConfig);
    }

    makeMinionSword(xx,yy){
        let mConfig = {
            img:'minionSword',
            anmDefault:'minionSwordFloat',
            anmTell:'minionSwordTell',
            anmAttack:'minionSwordAttack',
            attackVelocity:280,
            agroRange:250,
            bdyW:16,
            bdyH:20,
            hp:4
        }
        new Enemy(this,xx,yy,mConfig);
    }

    makeSkythBug(xx,yy){
        let mConfig = {
            img:'skythBug',
            anmDefault:'skythBugWalk',
            anmTell:'skythBugTell',
            anmAttack:'skythBugAttack',
            anmDie:'skythBugDie',
            attackVelocity:250,
            agroRange:225,
            bdyW:16,
            bdyH:20,
            hp:1,
            maxVelocity: 25
        }
        new Enemy(this,xx,yy,mConfig);
    }

    makeMogus(xx,yy){
        let mConfig = {
            img:'mogus',
            anmDefault:'mogusWalk',
            anmTell:'mogusTell',
            anmAttack:'mogusAttack',
            anmDie: 'mogusDeath',
            attackDamage:2,
            attackType:'bullet',
            attackVelocity:280,
            agroRange:200,
            bulletOffsetX:7,
            bulletOffsetY:0,
            bdyW:16,
            bdyH:32,
            hp:4,
            attackFrequency:180
        }
        new Enemy(this,xx,yy,mConfig);
    }

    makeSkeleton(xx,yy){
            let mConfig = {
                img:'skeleton',
                anmDefault:'skeletonWalk',
                anmTell:'skeletonTell',
                anmAttack:'skeletonAttack',
                anmDie: 'skeletonDie',
                attackDamage:2,
                attackVelocity:260,
                agroRange:200,
                bdyW:24,
                bdyH:32,
                hp:10,
                attackFrequency:180
            }
        new Enemy(this,xx,yy,mConfig);

    }

    makeHog(xx,yy){
                let mConfig = {
                    img:'hog',
                    anmDefault:'hogWalk',
                    anmTell:'hogTell',
                    anmAttack:'hogAttack',
                    anmDie: 'hogTell',
                    attackDamage:2,
                    attackVelocity:260,
                    agroRange:200,
                    hp:6,
                    attackFrequency:90
                }
            new Enemy(this,xx,yy,mConfig);

        }


        makeLaserSlime(xx,yy){
            let mConfig = {
                img:'blueBean',
                anmDefault:'blueBeanWalk',
                anmTell:'blueBeanTell',
                anmAttack:'blueBeanShoot',
                attackDamage:2,
                attackType:'bullet',
                attackVelocity:200,
                agroRange:150,
                bulletOffsetX:0,
                bulletOffsetY:0,
                hp:3,
                bdyW:16,
                bdyH:16,
                attackFrequency:200,
                bulletConfig:{img:'laser',initSpeed:300,orX:0,orY:.5,bdyW:8,bdyH:8}
            }
            new Enemy(this,xx,yy,mConfig);
        }

        makeChompPatch(xx,yy){
            let xOff=16;
            let yOff=24;
            new ChompPlant(this,xx,yy,{img:'chompPlant'});
        }

        drawTimer(){
            this.graphics.clear();
            this.graphics.depth=1000000;
            this.graphics.fillStyle(0xffffff, .65);
            this.graphics.slice(this.player.x, this.player.y-32, 16, Phaser.Math.DegToRad(Phaser.Math.DegToRad(1)), Phaser.Math.DegToRad(this.overlapCount), true);
            this.graphics.fillPath();
        }
        updateTexture ()
            {

                if(!this.lights) return false;

                this.shadowTexture.destroy();
                this.lightSprite.destroy();
                // This function updates the shadow texture (this.shadowTexture).
                // First, it fills the entire texture with a dark shadow color.
                // Then it draws a white circle centered on the pointer position.
                // Because the texture is drawn to the screen using the MULTIPLY
                // blend mode, the dark areas of the texture make all of the colors
                // underneath it darker, while the white area is unaffected.
                this.shadowTexture = this.textures.createCanvas('theShadow', W, H);
                this.lightSprite = this.add.image(0, 0, 'theShadow');
                this.lightSprite.blendMode = Phaser.BlendModes.MULTIPLY;

                this.lightSprite.x=this.player.x;
                this.lightSprite.y=this.player.y;
                this.lightSprite.depth = 100000;



                // Draw shadow
                //this.shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';
                this.shadowTexture.context.fillStyle = '0x000000';
                this.shadowTexture.context.fillRect(0,0, W, H);

                // Draw circle of light with a soft edge
                var gradient = this.shadowTexture.context.createRadialGradient(
                    W/2, H/2, LIGHT_RADIUS * 0.75,
                    W/2, H/2, LIGHT_RADIUS);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

                this.shadowTexture.context.beginPath();
                this.shadowTexture.context.fillStyle = gradient;
                this.shadowTexture.context.arc(W/2, H/2, LIGHT_RADIUS, 0, Math.PI * 2);
                this.shadowTexture.context.fill();



                // This just tells the engine it should update the texture cache
                //this.shadowTexture.dirty = true;
                this.shadowTexture.refresh();


            }
}