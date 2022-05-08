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

//        this.bootScene = this.scene.get('BootScene');
        this.hudScene = this.scene.get('HudScene');

    }

    create()
    {
        let that = this;
        this.cameras.main.setBackgroundColor(0x000000);
        this.addAnimations();
        this.backpack = this.plugins.get('BackpackPlugin');
        this.backpack.thing = "bar";
        this.store = this.plugins.get('StorePlugin');
        this.namePlugin = this.plugins.get('RandomNamePlugin');
        let name = this.namePlugin.getName();
        console.log('rname',name);

        this.restart=false;

        this.updatePath();// check the current path, see if we get a special level


        this.blocks = this.add.group();
        this.enemies = this.add.group();
        this.bullets = this.add.group();
        this.portals = this.add.group();
        this.catchables = this.add.group();
        this.mobs = this.add.group();
        this.npcs = this.add.group();
        this.vendors = this.add.group();
        this.updateGroup = this.add.group();
        this.graphics = this.add.graphics();

//        this.load.plugin('RandomNamePlugin', 'plugin/randomNamePlugin.js', true);

         this.bg0 = this.add.tileSprite(
             0,
             0,
             W*4,
             H*4,
             'grassBg'
         ).setOrigin(0,0).setScrollFactor(1,1).setDepth(DEPTH_BG);



        // Use PW and PH (physics width, physics height) if the physics world is bigger than the window
        // The physics world bomakeGridunds for this game are set to 4x the game size. This allows more range of movement while still leveraging "collideWorldBounds"
        // so you don't need to surround the playfield with blocks.
        this.gameGrid=[];
        this.gameGrid = makeGrid(PW/WALLSIZE,PH/WALLSIZE);
        gridCenterX = Math.floor(this.gameGrid.length/2);
        gridCenterY = Math.floor(this.gameGrid[0].length/2);


//        lvlId="boss1";
        let plrX=g2Px(gridCenterX);//in pixels
        let plrY=g2Px(gridCenterY);
        if(lvlId=="boss1"){
            plrX=g2Px(gridCenterX);//in pixels
            plrY=g2Px(gridCenterY+3)-32;
            this.makeBossRoom1();
        }else{

            this.makeMaze();
            let fp = this.add.sprite(plrX,plrY,'forestPortalUsed');
            this.gameGrid[gridCenterX][gridCenterY] = OCCUPIED;
            fp.depth = plrY;

            this.placeEnemies();
            this.placePortal('moon');
            this.placePortal('gem');
            this.placePortal('flame');
            //this.placeBossPortal();
            this.questItemPlaced=false;
            this.placeQuestItems();
            this.placeNpc();
            this.placeVendor();
            this.placeMobs();
        }

            this.player = new Player(this,plrX,plrY+16);
//        this.player = new Rogue(this,plrX,plrY+16);

        this.checkEnemies();
        this.cameras.main.startFollow(this.player);
//		this.cameras.main.setLerp(.25,.25);//Slows VERTICAL FOLLOW

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.enemies, this.blocks);
        this.physics.add.collider(this.catchables, this.blocks);
        this.physics.add.collider(this.mobs, this.blocks);
        this.physics.add.collider(this.bullets, this.blocks, function(bullet,block){ if(bullet.destroyOnHitWall) bullet.destroyIt(); });
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, false,this);
        this.physics.add.overlap(this.bullets, this.player, this.bulletHitPlayer, false,this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy,false,this);
        this.physics.add.overlap(this.player, this.catchables, this.hitCatchable,false,this);
        this.physics.add.overlap(this.player, this.npcs, this.hitNpc,false,this);
        this.physics.add.overlap(this.player, this.portals, this.playerEnterPortal,false,this);
        this.physics.add.overlap(this.player, this.vendors, this.hitVendor,false,this);
        this.makeEmitters();


        this.addEvents();
        this.applyLevelBonuses();

//         touching or interacting
        this.overlapping = false;
        this.overlapCount=0;

        this.events.emit('newLevel');

    }

    updatePath(){
        let pathString = path.join();
        if(pathString=="flame,flame,moon"){
            lvlId="boss1";
        }else{
            lvlId="forest";
        }
    }


    addEvents(){

        this.events.once('shutdown', this.shutDownListener,this);
        this.events.on('enemiesUpdated', this.checkEnemies, this);
        this.events.on('enemyDied', this.enemyDied, this);
//        gameEvents.on('test', this.testEvent, this);

    }

    shutDownListener(){
        this.events.off('enemiesUpdated', this.checkEnemies);
        this.events.off('enemyDied', this.enemyDied);
        localStorage.setItem('gold',gold);
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
        let heartCharms = this.backpack.findAllItemsOfId("heartCharm");
        if(heartCharms){
            lives += heartCharms.length;
            if(lives>30) lives = 30;
            this.events.emit('playerTookDamage');
        }
    }

    sceneRestart(){
        this.scene.restart();
    }

    gotoLevel(lvl){
        lvlId=lvl;
        this.restart=true;
    }

    gameRestart(){

    }

    testEvent(num){
        console.log("GAME SCENE EVENT",num);
    }

    playerEnterPortal(player,portal){
        if(portal.open){
                this.overlapping = true;
                if(this.overlapCount>=350){
                    this.graphics.clear();
                    portal.onEnter();
                }
        }


    }

    enemyDied(enemyKey,xx,yy){

            if(enemyKey=='mogus'){
                new Loot(this,xx,yy,{invAdd:'starEmber',img:'fireball',anm:'fireball'});


                let goboMission = missions.filter(function(m) { return m.complete === false && m.started===true && m.id=="buidFire"; });
                if(goboMission.length>0){

                    let odds = 3;
                    if(Phaser.Math.Between(1,odds)===odds){
                        new Loot(this,xx,yy,{invAdd:'starEmber',img:'fireball',anm:'fireball'});
                    }
                }
            }

            this.checkEnemies();
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
            enemy.attackCoolTimer=20;
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
        npc.interact();
    }

    hitVendor(player,npc)
    {
        if(npc.interacting) return false;
        this.overlapping = true;
        if(this.overlapCount>=350){
            npc.interact();
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
        }else{
            this.overlapCount=0;
            this.graphics.visible=false;
        }

        this.player.update(time,delta);

        this.updateGroup.children.each((e)=>{
            e.update(time,delta);
        });

        this.overlapping=false;

    }
    
    gameOver()
    {
        this.GAMEOVER = true;
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
            this.events.emit('bossArrives',"BOSS SWORD");
            this.events.emit('bossHealthUpdate',1);

            this.makeRoom(posX,posY,7,7);
            let boss = new BossSword(this,g2Px(posX),g2Px(posY),{img:'bossSword',});
            this.buildRoom();
    }

    buildRoom(){
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


        for (var i=0; i<this.gameGrid.length; i++) {
            let col = this.gameGrid[i];
            for (var j=0; j<col.length; j++) {
                if(this.gameGrid[i][j]===WALL){
                    let rA = Phaser.Math.Between(0,359);
                    let img = this.add.image(i*WALLSIZE,j*WALLSIZE,'bushFall').setDepth(10000+(j*WALLSIZE)).setAngle(rA);
//                    let img = this.add.image(i*WALLSIZE,j*WALLSIZE,'bush').setDepth(10000+(j*WALLSIZE)).setAngle(rA);

                }
            }
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

    placeEnemies(){
        // up to 3 groups of enemies.
        //let gc = this.findSpotOnGrid(false);
        //new Giant(this, g2Px(gc[0]), g2Px(gc[1]), {img:'giant'});

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

                        let odds2=6;
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
                        }else{
                            this.skythBugPack( g2Px(i),g2Px(j) );
                        }

                        E--;
                    }
                }
            }
        }
    }


    placeNpc(){

        let incompletMissions  =   missions.filter(function(m) { return m.complete === false; });
        if (incompletMissions.length < 1)  return false;
        let odds = 2;
        let theMission = null;
        if(Phaser.Math.Between(1,odds)===odds){

            theMission = incompletMissions[Phaser.Math.Between(0,incompletMissions.length-1)];
            let RC = this.findSpotOnGrid();
            new Npc(this,g2Px(RC[0]),g2Px(RC[1]),{ img:theMission.npc,missionId:theMission.id,anmComplete:theMission.anmComplete });

        }

        // Don't place the "tips" snal if there is already a snal mission active.
        let snalMissions = missions.filter(function(m) { return m.complete === false && m.started===true && m.npc=="snalGuy"; });
        if( (theMission==null || theMission.npc != 'snalGuy') && snalMissions.length<1){
                let snalLoc = this.findSpotOnGrid();
                let snal = new Snal(this,g2Px(snalLoc[0]),g2Px(snalLoc[1]),{img:'snalGuy'});
        }


    }

    placeMobs(){
        let num = Phaser.Math.Between(0,2);
        let mobs = ['niceGhost','kitty'];

        for(var i=0;i<=num;i++){
            let RC = this.findSpotOnGrid(false);
            let rndMob = mobs[Phaser.Math.Between(0,mobs.length-1)];
            new Mob(this, g2Px(RC[0]), g2Px(RC[1]), {anmDefault:rndMob,defaultAcc:5,maxVelocity:8} );
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
        this.gameGrid[RC[0]][RC[1]] = OCCUPIED;
        return true;


    }

    placeVendor(){
        let odds = 3;
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
        new BossPortal(this,g2Px(RC[0]),g2Px(RC[1]));
        this.gameGrid[RC[0]][RC[1]] = OCCUPIED;
        return true;
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


        drawTimer(){
            this.graphics.clear();
            this.graphics.depth=1000000;
            this.graphics.fillStyle(0xffffff, .65);
            this.graphics.slice(this.player.x, this.player.y-32, 16, Phaser.Math.DegToRad(Phaser.Math.DegToRad(1)), Phaser.Math.DegToRad(this.overlapCount), true);
            this.graphics.fillPath();
        }
}