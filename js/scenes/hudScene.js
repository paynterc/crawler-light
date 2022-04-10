class HudScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'HudScene', active: false});


    }

    preload()
    {

    }

    create ()
    {
        let that = this;
        this.gameScene = this.scene.get('GameScene');
        this.gameScene.events.on('playerDied', this.drawLives, this);
        this.gameScene.events.on('gameOver', this.gameOver, this);
        this.gameScene.events.on('scoreUpdated', this.updateScore, this);
        this.gameScene.events.on('extraLife', this.pickupLife, this);

        this.lifeImages = this.add.group();
        this.drawLives();
        this.drawInventory();

        this.gameOverText = this.add.text(centerX, centerY, "GAME OVER", { fontSize: '64px', fontFamily: 'FourBitRegular' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        this.restartText = this.add.text(centerX, centerY+64, "PLAY AGAIN", { fontSize: '32px', fontFamily: 'FourBitRegular' });
        this.restartText.setOrigin(0.5);
        this.restartText.setVisible(false);
        this.restartText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.gameScene.gameRestart();
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });


        this.scoreText = this.add.text(16, 8, "Score: " + score.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });


        // Put this last
        let settingsButton = this.add.sprite(36,H-36,'equalizer').setAlpha(0.5).setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            //this.bootScene.events.emit('audioClicked');
            this.scene.launch('SettingsScene');
            this.gameScene.scene.pause();
            this.scene.pause();
        },this).on('pointerover',function(){
            this.setAlpha(1);
        }).on('pointerout',function(){
            this.setAlpha(0.5);
        });


    }



    update(time,delta){


    }



    gameOver(){

        this.gameOverText.setVisible(true);
        this.gameOverText.setDepth(1);
        this.restartTimer = this.time.addEvent({ delay: 1000, callback: this.showRestartText, callbackScope: this, loop: false });

    }

    showRestartText(){
        this.restartTimer.remove();
        this.restartText.setVisible(true);
        this.restartText.setDepth(1);

    }

    updateScore(){

    }

    pickupLife(){

    }

    drawLives(){
        this.lifeImages.clear(true,true);
        let xx = W-32;
        for(let i=0;i<lives;i++){
            let img = this.add.image(xx,(UNITSIZE/2),'heart').setScale(.5);
            this.lifeImages.add(img);
            xx -= 32;
        }
    }

    drawInventory(){

    }


}