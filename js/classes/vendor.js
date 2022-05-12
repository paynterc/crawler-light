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

        this.myScene.showStore();
    }
}