class BackpackPlugin extends Phaser.Plugins.BasePlugin {
    // Global plugin
    constructor (pluginManager)
    {
        super(pluginManager);
        this.drawScene;
        this.graphics;
        this.itemTxt;
    }


    init (opts)
    {
//        console.log('Plugin is alive');
        console.log("BackpackPlugin INIT");

        if (!opts) opts = {};
        // set properties from opts object or use defaults
        this.maxSlots = opts.maxSlots || 6;
        this.itemLib = opts.itemLib || [];// Item library. An array of item objects that could be added to inventory. [{id:'lamb',img:'lambFace',name:"lamb"},{id:'mushroom',img:'mushroom',name:"shroooom"}]
        this.slotAlpha = opts.slotAlpha || 0.8;
        this.slotColor = opts.slotColor || 0x303030;
        this.xPos = opts.xPos || 128;
        this.yPos = opts.yPos || 32;
        this.padding = opts.padding || 16;
        this.slotSz = opts.slotSz || 32;

        this.items=[];// Items in your inventory.

        this.thing = "foo";

    }

    start()
    {
        //  Here are the game-level events you can listen to.
        //  At the very least you should offer a destroy handler for when the game closes down.

        // var eventEmitter = this.game.events;

        // eventEmitter.once('destroy', this.gameDestroy, this);
        // eventEmitter.on('pause', this.gamePause, this);
        // eventEmitter.on('resume', this.gameResume, this);
        // eventEmitter.on('resize', this.gameResize, this);
        // eventEmitter.on('prestep', this.gamePreStep, this);
        // eventEmitter.on('step', this.gameStep, this);
        // eventEmitter.on('poststep', this.gamePostStep, this);
        // eventEmitter.on('prerender', this.gamePreRender, this);
        // eventEmitter.on('postrender', this.gamePostRender, this);
        console.log("BackpackPlugin START");

    }

    stop()
    {
            console.log("BackpackPlugin STOP");

    }

    printThing(inst){
        console.log(inst + "thing",this.thing);
    }

    startDrawing(scene){
        this.drawScene = scene;
        this.graphics = scene.add.graphics();
        this.itemImages = scene.add.group();
        this.itemTxt1 = this.drawScene.make.text({x: this._getGameWidth()/2,y: this._getGameHeight() - this.yPos - 48,text:"",style:{font:"16px FourBitRegular"}}).setDepth(100000).setOrigin(.5,1);
        this.itemTxt2 = this.drawScene.make.text({x: this._getGameWidth()/2,y: this._getGameHeight() - this.yPos - 24,text:"",style:{font:"12px FourBitRegular"}}).setDepth(100000).setOrigin(.5,1);
        //this._hideText();
        this._createSlots();
        this._drawInventory();
    }
    setItemLib(itemLib){
        this.itemLib = itemLib;
    }
    setItems(newItems){
        this.items = newItems.map(a => {return {...a}});
        this._drawInventory();
    }

    isFull (){
    	return this.items.length >= this.maxSlots;
    }
    hasItem(itemId){
        return this.findItemById(itemId) ? true : false;
    }
    findItemById(itemId){
    	// Searches player inventory for item
    	let item =  this.items.filter(function(item) {
    	  return item.id == itemId;
    	});
    	return item[0];
    }
    findAllItemsOfId(itemId){
    	// Searches player inventory for item
    	let items =  this.items.filter(function(item) {
    	  return item.id == itemId;
    	});
    	return items;
    }
    addItem(item){
    	//let item = {id:'lamb',img:'lambFace',name:"lamb"}
    	if(item && this.items.length<this.maxSlots){
    		this.items.push(item);
    		this._drawInventory();
    	}
    }
    addItemById(itemId){
    	//let item = {id:'lamb',img:'lambFace',name:"lamb"}
    	let item = this.findLibItemById(itemId);
    	if(item){
    		this.addItem(item);
    	}
    }
    getItems(){
        return this.items;
    }
    // Removes the first matching item
    removeItemById(itemId){
    	// let item = {id:'lamb',img:'lambFace',name:"lamb"}
    	// itemId = 'lamb'
    	var idx = this.items.findIndex(p => p.id==itemId);
    	if(idx>=0){
    		this.items.splice(idx,1);
    		this._drawInventory();
    		return true;
    	}
    	return false;
    }
    removeItemByIndex(idx){
    	// idx = 2
    	if(idx>=0){
    		this.items.splice(idx,1);
    		this._drawInventory();
    	}
    }
    findLibItemById(itemId){
        let item =  this.itemLib.filter(function(item) {
          return item.id == itemId;
        });
        return item[0];
    }
    _hideText(){
        this.itemTxt1.visible=false;
        this.itemTxt2.visible=false;
    }
    _showText(){
        this.itemTxt1.visible=true;
        this.itemTxt2.visible=true;
    }
    _createSlots(){
        if(!this.drawScene) return false;
        let gameHeight = this._getGameHeight();
        let xx = this.xPos;
        let yy = gameHeight - this.yPos;
        let padding = this.padding;
        for(let i=0;i<this.maxSlots;i++){
            this._createInnerSlot(xx-padding,yy-padding);
            xx+=this.slotSz+padding;
        }
    }
    // Creates the inner dialog window (where the text is displayed)
    _createInnerSlot(x, y) {
      if(!this.graphics) return false;
      this.graphics.fillStyle(this.slotColor, this.slotAlpha);
      this.graphics.fillRect(x, y, this.slotSz, this.slotSz);
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
        let xx = this.xPos;
        let yy = gameHeight - this.yPos;
        let padding = this.padding;
        let that = this;
        for(let i=0;i<this.items.length;i++){
            let itm = this.items[i];
            let img = this.drawScene.add.sprite(xx,yy,itm.img).setInteractive()
            .on('pointerover', function () {
                console.log('itm',itm);
                this.setScale(2);
                if(itm.anm){this.play(itm.anm)}
                that.itemTxt1.setText(itm.name);
                that.itemTxt2.setText(itm.description);
                that._showText();

            })
            .on('pointerout', function () {
               this.setScale(1);
               this.anims.stop();
               that.itemTxt1.setText("");
               that.itemTxt2.setText("");
               that._hideText();
            });
            this.itemImages.add(img);
            xx+=this.slotSz + padding;
        }
    }
    hide(){
        this.graphics.visible = false;
        this.itemImages.children.each((e)=>{
            e.visible=false;
        });

    }
    show(){
        this.graphics.visible = true;
        this.itemImages.children.each((e)=>{
            e.visible=true;
        });
    }
    refresh(){
        this._drawInventory();
    }
}