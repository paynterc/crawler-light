class Vendor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'vendor');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.myScene = scene;
        this.myConfig = config;


        this.init();

        this.myScene.vendors.add(this);
    }

    init(){

    }

    interact(){
//        if(this.interacting) return false;
//        this.interacting = true;
        let apple = items.filter(function(m) { return  m.id=="apple"; })
        this.myScene.store.setStoreItems(apple);
        this.myScene.showStore();
    }
}