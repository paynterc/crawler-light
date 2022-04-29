class HudScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'HudScene', active: false});
    }

    preload()
    {
        console.log('HUD PRELOAD');
        this.load.scenePlugin({
            key: 'DialogModalPlugin',
            url: 'js/plugin/dialog_plugin.js',
            sceneKey: 'dialogModal'
        });
        this.load.scenePlugin({
            key: 'InventoryPlugin',
            url: 'js/plugin/inventory_plugin.js',
            sceneKey: 'inventory'
        });
//        this.load.scenePlugin({
//            key: 'SomeScenePlugin',
//            url: 'js/plugin/someScenePlugin.js',
//            sceneKey: 'someScenePlug'
//        });
    }

    create ()
    {
        let that = this;
        this.gameScene = this.scene.get('GameScene');
        this.addEventListeners();


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

        this.dialogModal.init({dialogSpeed:12});
        this.inventory.init({itemLib:items});

//        this.dialogModal.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);

//        this.scoreText = this.add.text(16, 8, "Score: " + score.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });
        this.enemyText = this.add.text(16, 8, "Enemies: " + enemies.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });


//        this.inventory.addItemById('heart');
//        this.inventory.addItemById('lamb');
//        this.inventory.addItemById('heart');


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

    addEventListeners(){
            this.gameScene.events.off('playerDied', this.drawLives, this);
            this.gameScene.events.off('playerTookDamage', this.drawLives, this);
            this.gameScene.events.off('gameOver', this.gameOver, this);
            this.gameScene.events.off('scoreUpdated', this.updateScore, this);
            this.gameScene.events.off('enemiesUpdated', this.updateEnemies, this);
            this.gameScene.events.off('extraLife', this.pickupLife, this);
            this.gameScene.events.off('caughtCatchable', this.caughtCatchable, this);
//            gameEvents.off('test', this.testEvent, this);


            this.gameScene.events.on('playerDied', this.drawLives, this);
            this.gameScene.events.on('playerTookDamage', this.drawLives, this);
            this.gameScene.events.on('gameOver', this.gameOver, this);
            this.gameScene.events.on('scoreUpdated', this.updateScore, this);
            this.gameScene.events.on('enemiesUpdated', this.updateEnemies, this);
            this.gameScene.events.on('extraLife', this.pickupLife, this);
            this.gameScene.events.on('caughtCatchable', this.caughtCatchable, this);
//            gameEvents.on('test', this.testEvent, this);

    }

    testEvent(num){
        console.log("HUD SCENE EVENT",num);
    }

    resumeGame(){
        this.scene.resume('GameScene');
        this.gameScene.input.keyboard.resetKeys();
    }

    showText(txt){
        this.dialogModal.setText(txt,true);
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

    updateEnemies(){
        this.enemyText.setText("Enemies: "+ enemies.toString());
    }

    pickupLife(){

    }

    drawLives(){
        this.lifeImages.clear(true,true);
        let xx = W-32;
        for(let i=0;i<lives;i++){
            let img = this.add.image(xx,(UNITSIZE/2),'heart').setScale(.5);
            this.lifeImages.add(img);
            xx -= 8;
        }
    }

    drawInventory(){

    }

    findInventoryItem(itemId){
        if(!this.inventory) return false;
        return this.inventory.findItemById(itemId);
    }

    findAllItemsOfId(itemId){
        return this.inventory.findAllItemsOfId(itemId);
    }

    removeInventoryItem(itemId){
        return this.inventory.removeItemById(itemId);
    }
    addInventoryItem(itemId){
        return this.inventory.addItemById(itemId);
    }
    caughtCatchable(catchable){
        if(!catchable.invAdd) return false;
        if(this.inventory.isFull()) return false;
        this.inventory.addItemById(catchable.invAdd);
        this.gameScene.emitter1.emitParticleAt(catchable.x, catchable.y, 10);
        catchable.destroy();
    }
}