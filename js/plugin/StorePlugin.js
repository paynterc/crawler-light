class StorePlugin extends Phaser.Plugins.BasePlugin {
    // Global plugin
    constructor (pluginManager)
    {
        super(pluginManager);

        this.drawScene;
        this.graphics;
        this.storeItems = [];
        this.playerItems = [];
        this.maxPlayerItems = 0;
        this.maxStoreItems = 6;
        this.closeBtn;
        this.confirmBtn;
        this.playerGold=0;
        this.goldText;
        this.emitter1;
    }


    init (opts)
    {
        this.itemLib = opts.itemLib || [];// Item library. An array of item objects that could be added to inventory. [{id:'lamb',img:'lambFace',name:"lamb"},{id:'mushroom',img:'mushroom',name:"shroooom",buy:10,sell:10}]
        this.slotAlpha = opts.slotAlpha || 0.8;
        this.slotColor = opts.slotColor || 0x303030;
        this.xPos = opts.xPos || 128;
        this.yPos = opts.yPos || 128;
        this.padding = opts.padding || 16;
        this.slotSz = opts.slotSz || 32;
        this.windowAlpha = opts.windowAlpha || 1;
        this.windowColor = opts.windowColor || 0x360f0f;
        this.windowFrameColor = opts.windowFrameColor || 0xff5959;
        this.scale=2;

    }

    start()
    {
        //  Here are the game-level events you can listen to.
        //  At the very least you should offer a destroy handler for when the game closes down.

         this.eventEmitter = this.game.events;

         this.eventEmitter.once('destroy', this.gameDestroy, this);
        // eventEmitter.on('pause', this.gamePause, this);
        // eventEmitter.on('resume', this.gameResume, this);
        // eventEmitter.on('resize', this.gameResize, this);
        // eventEmitter.on('prestep', this.gamePreStep, this);
        // eventEmitter.on('step', this.gameStep, this);
        // eventEmitter.on('poststep', this.gamePostStep, this);
        // eventEmitter.on('prerender', this.gamePreRender, this);
        // eventEmitter.on('postrender', this.gamePostRender, this);
        console.log("Store Plugin START");
    }

    gameDestroy()
    {
        this.drawScene=undefined;
        this.emitter1=undefined;
        this.graphics=undefined;
    }

    stop()
    {
        console.log("Store Plugin STOP");

    }


    startDrawing(scene){
        this.drawScene = scene;
        this.graphics = scene.add.graphics();
        this.itemImages = scene.add.group();
        this.storeItemImages = scene.add.group();
        this.storeTexts = scene.add.group();

        this._createInnerWindow();
        this._createOuterWindow();
        this._drawCloseButton();
        this._drawConfirmButton();
        this._drawText();

        this.makeEmitters();
        this._hide();
    }

    makeEmitters(){
            let particles = this.drawScene.add.particles('coin');
            this.emitter1 = particles.createEmitter(
            {
            x:0,
            y:0,
            angle: { min: 0, max: 360 },
            speed: 500,
            gravityY: 0,
            lifespan: 300,
            quantity: 4,
            scale: { min: 0.05, max: 1 },
            tint: ['0xff3700','0xff7700','0xffb700','0xffffff']
            }
            );
            this.emitter1.stop();
            //this.emitter3.emitParticleAt(this.x, this.y, 10);
    }

    open(playerItems,playerGold){
        this._setPlayerItems(playerItems);
        this.playerGold=playerGold;
        this.storeItems=this.storeItemsReal.map(a => {return {...a}});
        this._setGoldText();
        this._drawInventory();
        this._show();
//                    this.eventEmitter.emit('testGameEvent');

    }

    _close(){
        this.itemImages.clear(true,true);
        this.storeItemImages.clear(true,true);
        this.storeItems=[];
        this.playerGold=0;
        this._hide();
    }

    setStoreItems(items){
        console.log('add store items',items);
        this.storeItems=[];
        this.storeItems=items.map(a => {return {...a}});
        this.storeItemsReal=items.map(a => {return {...a}});
        console.log('storeItems',this.storeItems);
    }
    _setPlayerItems(items){
        // make a clone so we aren't referencing the original array.
        //clonedArray = nodesArray.map(a => {return {...a}})
        this.playerItems=items.map(a => {return {...a}});
        this.maxPlayerItems=6;
    }
    addItemToStore(item){
        //let item = {id:'lamb',img:'lambFace',name:"lamb"}
        this.storeItems.push(item);
        this._drawInventory();
    }
    addItemToPlayer(item){
        //let item = {id:'lamb',img:'lambFace',name:"lamb"}
        this.playerItems.push(item);
        this._drawInventory();
    }
    sellItemById(itemId){
    	var idx = this.playerItems.findIndex(p => p.id==itemId);

    	if(idx>=0){
    	    var item = this.playerItems[idx];
    	    this.addItemToStore(item);
    		this.playerItems.splice(idx,1);
    		this.playerGold += item.price;
    		this._setGoldText();
    		this._drawInventory();
    		return true;
    	}
    	return false;
    }

    buyItemById(itemId){

        if(this.playerItems.length>=this.maxPlayerItems){
            //TODO: fail sound
            return false;
        }
        var idx = this.storeItems.findIndex(p => p.id==itemId);
    	if(idx>=0){
    	    var item = this.storeItems[idx];
            if(this.playerGold<item.price){
                //TODO: fail sound
                return false;
            }
    	    this.addItemToPlayer(item);
    		this.storeItems.splice(idx,1);
    		this.playerGold -= item.price;
    		this._setGoldText();
    		this._drawInventory();
    		return true;
    	}
    	return false;
    }
    findPlayerItemById(itemId){
        // Searches player inventory for item
        let item =  this.playerItems.filter(function(item) {
          return item.id == itemId;
        });
        return item[0];
    }

    _setGoldText(){
        this.goldText.setText("Gold: " + this.playerGold.toString());
    }
    _cancel() {
        this._close();
        this.drawScene.hideStore();
    }
    _confirm(){

        let rtnItems = this.playerItems.map(a => {return {...a}});
        let rtnStoreItems = this.storeItems.map(a => {return {...a}});
        let rtnGold = this.playerGold;
        this.storeItemsReal = this.storeItems.map(a => {return {...a}});
        this._close();
        if(this.drawScene){
            this.drawScene.confirmStore(rtnItems,rtnGold,rtnStoreItems);
        }
    }

    _hide(){

        if(this.closeBtn) this.closeBtn.visible=false;
        if(this.confirmBtn) this.confirmBtn.visible=false;
        this.storeTexts.children.each((e)=>{
            e.visible=false;
        });
        if(this.graphics){
            this.graphics.visible = false;
        }
    }
    _show(){
        if(this.closeBtn) this.closeBtn.visible=true;
        if(this.confirmBtn) this.confirmBtn.visible=true;
        this.storeTexts.children.each((e)=>{
            e.visible=true;
        });
        this.graphics.visible = true;
    }
    _getGameWidth() {
      return this.drawScene.sys.game.config.width;
    }
    // Gets the height of the game (based on the scene)
    _getGameHeight() {
      return this.drawScene.sys.game.config.height;
    }
    _drawInventory(){

        if(!this.drawScene) return false;

        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();

        this.itemImages.clear(true,true);
        this.storeItemImages.clear(true,true);
        let xx = this.xPos;
        let yy = this.yPos;
        let padding = this.padding;
        let that = this;
        for(let i=0;i<this.playerItems.length;i++){
            let itm = this.playerItems[i];
            let img = this.drawScene.add.image(xx,yy,itm.img).setScale(this.scale);
            img.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                if(that.sellItemById(itm.id)){
                    that.emitter1.emitParticleAt(pointer.x, pointer.y, itm.price);
                }
            });
            this.itemImages.add(img);
            xx+=this.slotSz + padding;
        }
        xx = this.xPos;
        yy = this.yPos-64;
        for(let i=0;i<this.storeItems.length;i++){
            let itm = this.storeItems[i];
            let img = this.drawScene.add.image(xx,yy,itm.img).setScale(2);
            img.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                if(that.buyItemById(itm.id)){
                    that.emitter1.emitParticleAt(pointer.x, pointer.y, itm.price);
                }
            });
            this.storeItemImages.add(img);
            xx+=this.slotSz + padding;
        }
    }

    _drawText(){

        let sellText = this.drawScene.make.text({x:16,y:this.yPos,text:"sell",style:{font:"16px FourBitRegular"}});
        let buyText = this.drawScene.make.text({x:16,y:this.yPos-64,text:"buy",style:{font:"16px FourBitRegular"}});
        this.goldText = this.drawScene.make.text({x:16,y:32,text:"gold:" + this.playerGold.toString(),style:{font:"16px FourBitRegular"}});


        this.storeTexts.add(sellText);
        this.storeTexts.add(buyText);
        this.storeTexts.add(this.goldText);

    }

    _drawCloseButton(){
        var self = this;
        this.closeBtn = this.drawScene.make.text({
            x: this._getGameWidth()/2 - 128,
            y: this._getGameHeight()-64,
            text: 'Nevermind',
            style: {
              font: '16px FourBitRegular',
            }
        });
        this.closeBtn.setInteractive();
        this.closeBtn.on('pointerover', function () {
            this.setTint(0x00FF00);
        });
        this.closeBtn.on('pointerout', function () {
            this.clearTint();
        });
        this.closeBtn.on('pointerdown', function () {
            self._cancel();
        });
    }

    _drawConfirmButton(){
        var self = this;
        this.confirmBtn = this.drawScene.make.text({
            x: this._getGameWidth()/2 + 64,
            y: this._getGameHeight()-64,
            text: 'Deal!',
            style: {
              font: '16px FourBitRegular',
            }
        });
        this.confirmBtn.setInteractive();
        this.confirmBtn.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        this.confirmBtn.on('pointerout', function () {
            this.clearTint();
        });
        this.confirmBtn.on('pointerdown', function () {
            self._confirm();
        });
    }

    _createInnerWindow() {
      this.graphics.fillStyle(this.windowColor, this.windowAlpha);
      this.graphics.fillRect(32, 32, this._getGameWidth()-64, this._getGameHeight()-64);
    }
    _createOuterWindow() {
      this.graphics.lineStyle(12, this.windowFrameColor, 1);
      this.graphics.strokeRect(32, 32, this._getGameWidth()-64, this._getGameHeight()-64);
    }
}