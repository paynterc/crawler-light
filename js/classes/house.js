class House extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'square');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.myScene = scene;
        this.myConfig = config;

        this.invAdd = config.invAdd || null
        this.anm = config.anm || null;


        this.init();
        this.updateConfig();


    }

    updateConfig(){
        if(this.anm){
            this.play(this.anm);
        }
    }


    update(time,delta){

    }

    init(){
    }
}