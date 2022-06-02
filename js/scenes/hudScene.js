class HudScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'HudScene', active: false});
    }

    preload()
    {
        this.load.scenePlugin({
            key: 'DialogModalPlugin',
            url: 'js/plugin/dialog_plugin.js',
            sceneKey: 'dialogModal'
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
        this.backpack = this.plugins.get('BackpackPlugin');
        this.backpack.startDrawing(this);
//        this.backpack.addItemById("braceletOfWinds");

        this.store = this.plugins.get('StorePlugin');
        this.store.startDrawing(this);


        this.addEventListeners();

        this.lifeImages = this.add.group();
        this.drawLives();

        this.pathImages = this.add.group();
        this.drawPath();

        this.gameOverText = this.add.text(centerX, centerY-64, "GAME OVER", { fontSize: '64px', fontFamily: 'FourBitRegular' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        this.restartText = this.add.text(W-32, H-32, "RESTART", { fontSize: '8px', fontFamily: 'FourBitRegular' });
        this.restartText.setOrigin(0.5);
        this.restartText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.gameScene.newGame();
            that.refreshAll();
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });

        this.dialogModal.init({dialogSpeed:12,padding:64});
//        this.dialogModal.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);


        this.enemyText = this.add.text(16, 8, "Enemies: " + enemies.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });
        this.goldText = this.add.text(16, 32, "Gold: " + gold.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });


        let healthX = W/2 - 96;
        let healthY = 12;
        this.healthBack = this.add.image(healthX-4, healthY-2,'square').setDepth(100000).setScale(6.25, .5).setOrigin(0,0).setTint('0x000000');
        this.healthBar = this.add.image(healthX, healthY,'square').setDepth(100001).setScale(6, .35).setOrigin(0,0).setTint('0xff0000');
//        this.healthHeart = this.add.image(healthX -15, healthY-6,'heart').setDepth(100002).setScale(.75).setAngle(90);
        this.bossText = this.add.text(W/2, 8, "Boss", { fontSize: '16px', fontFamily: 'FourBitRegular' }).setDepth(100010).setOrigin(.5);
        this.hideHealthbar();
//        this.showHealthbar();

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

            this.events.once('shutdown', this.shutDownListener,this);

            this.gameScene.events.on('playerDied', this.drawLives, this);
            this.gameScene.events.on('playerTookDamage', this.drawLives, this);
            this.gameScene.events.on('gameOver', this.gameOver, this);
            this.gameScene.events.on('scoreUpdated', this.updateScore, this);
            this.gameScene.events.on('enemiesUpdated', this.updateEnemies, this);
            this.gameScene.events.on('extraLife', this.pickupLife, this);
            this.gameScene.events.on('caughtCatchable', this.caughtCatchable, this);
            this.gameScene.events.on('storeOpen', this.setStoreUi, this);
            this.gameScene.events.on('bossArrives', this.showHealthbar, this);
            this.gameScene.events.on('bossDied', this.hideHealthbar, this);
            this.gameScene.events.on('bossHealthUpdate', this.updateHealthbar, this);
            this.gameScene.events.on('newLevel', this.refreshAll, this);
            this.gameScene.events.on('playerWinsGame', this.winGame, this);



// Two ways to handle game level events
//            this.sys.game.events.on('testGameEvent', this.testGameEventFunc, this);
//            gameEvents.on('test', this.testEvent, this);
// this.sys.game.events.emit('testGameEvent');

    }

    shutDownListener(){
            this.gameScene.events.off('playerDied', this.drawLives);
            this.gameScene.events.off('playerTookDamage', this.drawLives);
            this.gameScene.events.off('gameOver', this.gameOver);
            this.gameScene.events.off('scoreUpdated', this.updateScore);
            this.gameScene.events.off('enemiesUpdated', this.updateEnemies);
            this.gameScene.events.off('extraLife', this.pickupLife, this);
            this.gameScene.events.off('caughtCatchable', this.caughtCatchable);
            this.gameScene.events.off('storeOpen', this.setStoreUi);
            this.gameScene.events.off('bossArrives', this.showHealthbar);
            this.gameScene.events.off('bossDied', this.hideHealthbar);
            this.gameScene.events.off('bossHealthUpdate', this.updateHealthbar);
            this.gameScene.events.off('newLevel', this.refreshAll);
            this.gameScene.events.off('playerWinsGame', this.winGame);

    }

    winGame(){
        this.gameOverText.setText("YOU WIN!!!!").setVisible(true);
    }

    hideHealthbar(){
        if(!this.healthBack){
            return false;
        }
        this.healthBack.visible=false;
        this.healthBar.visible=false;
        this.bossText.visible=false;

        this.enemyText.visible=true;
        this.goldText.visible=true;
    }
    showHealthbar(bossName){

        this.healthBack.visible=true;
        this.healthBar.visible=true;
        this.healthBar.setScale(6, .35);
        this.bossText.setText(bossName);
        this.bossText.visible=true;

        this.enemyText.visible=false;
        this.goldText.visible=false;

    }
    updateHealthbar(pct){
        //        this.healthBar.setScale(6 * (hp/100), .5);

        this.healthBar.setScale(6 * pct, .35);
    }

    setStoreUi(){
        this.goldText.setVisible(false);
        this.enemyText.setVisible(false);
    }

    testEvent(num){
        console.log("HUD SCENE EVENT",num);
    }

    testGameEventFunc(num){
        console.log("TEST GAME EVENT",num);
    }

    resumeGame(){
        this.scene.resume('GameScene');
        this.gameScene.input.keyboard.resetKeys();
    }

    hideStore(){
        this.backpack.show();
        this.goldText.setVisible(true);
        this.enemyText.setVisible(true);
        this.resumeGame();
    }
    confirmStore(rtnItems,rtnGold,rtnStoreItems){

        gold = rtnGold;
        this.backpack.setItems(rtnItems);
        this.backpack.show();

        var lambIndx = rtnStoreItems.findIndex(p => p.id=='lamb');
        if(lambIndx>=0){
            soldLamb=true;
        }

        this.goldText.setVisible(true);
        this.enemyText.setVisible(true);

        this.resumeGame();
        this.updateEnemies();
        this.refreshAll();

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
        this.refreshAll();
    }

    updateEnemies(){
        this.enemyText.setText("Enemies: "+ enemies.toString());
    }

    updateGold(){
        this.goldText.setText("Gold: "+ gold.toString());
    }

    pickupLife(){

    }

    drawLives(){
        this.lifeImages.clear(true,true);
        let xx = W-32;
        for(let i=0;i<maxLives;i++){
            let img = this.add.image(xx,(UNITSIZE/2),'heart').setScale(.5).setTint('0x000000');
            this.lifeImages.add(img);
            xx -= 8;
        }
        xx = W-32;
        for(let i=0;i<lives;i++){
            let img = this.add.image(xx,(UNITSIZE/2),'heart').setScale(.5);
            this.lifeImages.add(img);
            xx -= 8;
        }
    }

   drawPath(){

        this.pathImages.clear(true,true);
        let xx = W/2 - 32;
        let imgIndx = undefined;
        for(let i=0;i<path.length;i++){

            if(path[i] == 'moon'){
                imgIndx = 'emblemMoon';
            }else if(path[i] == 'gem'){
                imgIndx = 'emblemGem';
            }else if(path[i] == 'flame'){
                imgIndx = 'emblemFlame';
            }else{
                continue;
            }
            let img = this.add.image(xx,(UNITSIZE/2),imgIndx).setScale(1).setDepth(100000);
            this.pathImages.add(img);
            xx += 32;
        }
    }

    caughtCatchable(catchable){
        if(catchable.invAdd){
            if(this.backpack.isFull()) return false;
            this.backpack.addItemById(catchable.invAdd);
        }else if(catchable.gold){
            gold+=catchable.gold;
            this.updateGold();
        }
        this.gameScene.emitter1.emitParticleAt(catchable.x, catchable.y, 10);

        catchable.destroy();
    }

    refreshAll()
    {
        this.updateGold();
        this.drawLives();
        this.drawPath();
        this.backpack.refresh();
    }
}