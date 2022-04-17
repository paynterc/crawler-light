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


    }

    create()
    {
        let that = this;
        this.cameras.main.setBackgroundColor(0x000000);
        this.addAnimations();

        this.restart=false;

        this.blocks = this.add.group();
        this.enemies = this.add.group();
        this.bullets = this.add.group();
        this.portals = this.add.group();
        this.updateGroup = this.add.group();


        this.bootScene = this.scene.get('BootScene');

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

        this.makeMaze();

        // Place the player before the portal
        let plrX=g2Px(gridCenterX);//in pixels
        let plrY=g2Px(gridCenterY);
        this.add.sprite(plrX,plrY,'forestPortalUsed');
        this.player = new Player(this,plrX,plrY+16);


        this.placeEnemies();
        this.placePortal();
        this.checkEnemies();
        this.cameras.main.startFollow(this.player);
//		this.cameras.main.setLerp(.25,.25);//Slows VERTICAL FOLLOW

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.enemies, this.blocks);
        this.physics.add.collider(this.bullets, this.blocks, function(bullet,block){bullet.destroyIt()});
        this.physics.add.collider(this.bullets, this.enemies, this.bulletHitEnemy, false,this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy,false,this);
        this.physics.add.overlap(this.player, this.portals, this.playerEnterPortal,false,this);
        this.makeEmitters();

        this.events.on('enemiesUpdated', this.checkEnemies, this);

        this.scene.launch('HudScene');

    }


    playerEnterPortal(player,portal){
        portal.onEnter();
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
        if(enemy.attackCoolTimer<=0){
            enemy.attackCoolTimer=20;
            this.emitter1.emitParticleAt(enemy.x, enemy.y, 10);

            player.applyDamage(enemy.attackDamage);
        }
    }

    bulletHitEnemy(bullet,enemy)
    {
        if(bullet.faction===0){
            enemy.applyDamage(bullet.damage);

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
            this.scene.restart();
        }

        this.player.update(time,delta);

        this.updateGroup.children.each((e)=>{
            e.update(time,delta);
        });

    }
    
    gameOver()
    {
        console.log("GAME OVER");
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
            for (var i=0; i<this.gameGrid.length; i++) {
                let col = this.gameGrid[i];
                for (var j=0; j<col.length; j++) {
                    if(this.gameGrid[i][j]===WALL){
                        let block = this.physics.add.sprite( i*WALLSIZE ,j*WALLSIZE,'hedge');
                        block.setOrigin(0);
                        block.body.setImmovable();
                        this.blocks.add(block);
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
                        this.redImpPack(g2Px(i),g2Px(j));
                        E--;
                    }
                }
            }
        }
    }


    placePortal(){

        // try to place it far from player
        let rC = Phaser.Math.Between(1,this.gameGrid.length-2);
        let rR = Phaser.Math.Between(1,this.gameGrid.length-2);
        for(let i=0;i<=100;i++){

            if(
                Math.abs(rC-gridCenterX) > 3
                && Math.abs(rR-gridCenterY) > 3
                && this.gameGrid[rC][rR]===FLOOR
            ){
                new Portal(this,g2Px(rC),g2Px(rR));
                return true;
            }
            rC = Phaser.Math.Between(1,this.gameGrid.length-2);
            rR = Phaser.Math.Between(1,this.gameGrid.length-2);
        }

        // put it anywhere
        while(
            this.gameGrid[rC][rR]!=FLOOR
        ){
            rC = Phaser.Math.Between(1,this.gameGrid.length-2);
            rR = Phaser.Math.Between(1,this.gameGrid.length-2);
        }

        new Portal(this,g2Px(rC),g2Px(rR));
        return true;


    }

    redImpPack(xx,yy){
        new RedImp(this,xx+16,yy-16);
        new RedImp(this,xx-16,yy-16);
        new RedImp(this,xx+16,yy+16);
        new RedImp(this,xx-16,yy+16);
    }

}