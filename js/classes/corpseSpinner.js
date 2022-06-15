class CorpseSpinner extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        this.myScene = scene;
        this.myConfig = config;
        this.mySetScale();
        this.lifespan=1000;

        scene.add.existing(this);
        this.setDepth(1000);

        if(config.hasOwnProperty('onDestroy')){
            this.onDestroy = config.onDestroy;
        }

        scene.updateGroup.add(this);
	}

  update(time,delta){
    this.angle+=25;
    this.lifespan-=delta;
    if(this.lifespan<0){
      this.onDestroy();
      this.destroy();
    }
  }

  mySetScale(){
          this.setScale(this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1);
          this.myScale = this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1;
  }



	onDestroy(){

	}

}
