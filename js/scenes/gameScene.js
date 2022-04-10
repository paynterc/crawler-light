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

        //If world is bigger than the window
        this.worldWidth = this.physics.world.bounds.width;
        this.worldHeight = this.physics.world.bounds.height;
        this.bootScene = this.scene.get('BootScene');

        let button1 = this.add.sprite(centerX,centerY,'ring');

        this.player = this.physics.add.sprite(centerX,centerY,'emyIdle');
        this.player.play('emyIdle');
        this.player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED); // x, y
        this.player.body.drag.setTo(DRAG,DRAG);
        this.cameras.main.startFollow(this.player);
//		this.cameras.main.setLerp(.25,.25);//Slows VERTICAL FOLLOW

        this.scene.launch('HudScene');

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
        if (leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.acceleration.x = -ACCELERATION;
            this.player.flipX=true;
        } else if (rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.acceleration.x = ACCELERATION;
            this.player.flipX=false;
        }else{
            this.player.body.acceleration.x = 0;
        }

        if (upInputIsActive()) {
            this.player.body.acceleration.y = -ACCELERATION;
        } else if (downInputIsActive()) {
            this.player.body.acceleration.y = ACCELERATION;

        }else {
            this.player.body.acceleration.y = 0;
        }
    }
    
    gameOver(){
        console.log("GAME OVER");
        this.GAMEOVER = true;
    }
}