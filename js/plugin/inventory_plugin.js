var InventoryPlugin = function (scene) {
        // the scene that owns the plugin
        this.scene = scene;
        this.systems = scene.sys;
        if (!scene.sys.settings.isBooted) {
        scene.sys.events.once('boot', this.boot, this);
    }
};

InventoryPlugin.prototype = {

    boot: function () {
        var eventEmitter = this.systems.events;
        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);
    },
    //  Called when a Scene shuts down, it may then come back again later
    // (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function () {

    },
    destroy: function () {
        this.shutdown();
        this.scene = undefined;
        this.items=[];
    },
    test: function (){
        console.log('Inventory: ',this.items);
    },
    init: function (opts) {
      // Check to see if any optional parameters were passed
      if (!opts) opts = {};
      // set properties from opts object or use defaults
      this.maxSlots = opts.maxSlots || 6;
      this.itemLib = opts.itemLib || [];// Item library. An array of item objects that could be added to inventory. [{id:'lamb',img:'lambFace',name:"lamb"},{id:'mushroom',img:'mushroom',name:"shroooom"}]
      this.slotAlpha = opts.slotAlpha || 0.8;
      this.slotColor = opts.slotColor || 0x303030;

      this.items=[];// Item in your inventory.
      this.itemImages = this.scene.add.group();
      this.graphics = this.scene.add.graphics();
      this._createSlots();
      this.addItemById("heartCharm");

      this._drawInventory();

    },
    isFull: function (){
        return this.items.length >= this.maxSlots;
    },
    findItemById: function(itemId){
        // Searches player inventory for item
        let item =  this.items.filter(function(item) {
          return item.id == itemId;
        });
        return item[0];
    },
    findAllItemsOfId: function(itemId){
        // Searches player inventory for item
        let items =  this.items.filter(function(item) {
          return item.id == itemId;
        });
        return items;
    },
    addItem: function (item){
        //let item = {id:'lamb',img:'lambFace',name:"lamb"}
        if(item && this.items.length<this.maxSlots){
            this.items.push(item);
            this._drawInventory();
        }

    },
    addItemById: function (itemId){
        //let item = {id:'lamb',img:'lambFace',name:"lamb"}
        let item = this._findLibItemById(itemId);
        if(item){
            this.addItem(item);
        }
    },
    // Removes the first matching item
    removeItemById: function (itemId){
        // let item = {id:'lamb',img:'lambFace',name:"lamb"}
        // itemId = 'lamb'
        var idx = this.items.findIndex(p => p.id==itemId);
        if(idx>=0){
        	this.items.splice(idx,1);
        	this._drawInventory();
        	return true;
        }

        return false;
    },
    removeItemByIndex: function (idx){
        // idx = 2
        if(idx>=0){
            this.items.splice(idx,1);
        	this._drawInventory();
        }
    },
    findLibItemById: function (itemId){
        return this._findLibItemById(itemId);
    },
    _findLibItemById: function (itemId){
        let item =  this.itemLib.filter(function(item) {
          return item.id == itemId;
        });
        return item[0];
    },
    _drawInventory: function (){
          var gameHeight = this._getGameHeight();
          var gameWidth = this._getGameWidth();

        this.itemImages.clear(true,true);
        let xx = 128;
        let yy = gameHeight-32;
        let padding = 16;
        for(let i=0;i<this.items.length;i++){
            let itm = this.items[i];
            let img = this.scene.add.image(xx,yy,itm.img);
            this.itemImages.add(img);
            xx+=32 + padding;
        }
    },
    _getGameWidth: function () {
      return this.scene.sys.game.config.width;
    },
    // Gets the height of the game (based on the scene)
    _getGameHeight: function () {
      return this.scene.sys.game.config.height;
    },
    _createSlots: function(){
        let gameHeight = this._getGameHeight();
        let xx = 128;
        let yy = gameHeight-32;
        let padding = 16;
        for(let i=0;i<this.maxSlots;i++){
            this._createInnerSlot(xx-16,yy-16);
            xx+=32+padding;
        }
    },
    // Creates the inner dialog window (where the text is displayed)
    _createInnerSlot: function (x, y) {
      let slotSz = 32;
      this.graphics.fillStyle(this.slotColor, this.slotAlpha);
      this.graphics.fillRect(x, y, slotSz, slotSz);
    },

}