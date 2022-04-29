class Corpse extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        this.myScene = scene;
        this.myConfig = config;
        this.mySetScale();

        scene.add.existing(this);
        this.setDepth(1000);

        if(config.hasOwnProperty('onDestroy')){
            this.onDestroy = config.onDestroy;
        }

        this.on('animationcomplete', function(animation, frame) {
            this.onDestroy();
            this.destroy();
        }, this);
	}


    mySetScale(){
            this.setScale(this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1);
            this.myScale = this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1;
    }



	onDestroy(){

	}

}