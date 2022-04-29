class Loot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'square');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.myScene = scene;
        this.myConfig = config;

        this.invAdd = config.invAdd || null

        scene.catchables.add(this);

        this.init();


    }

    onPickup(player){

    }

    catchIt(player){
        this.myScene.events.emit('caughtCatchable',this);
        this.onPickup(player);
    }

    update(time,delta){

    }

    init(){
    }
}