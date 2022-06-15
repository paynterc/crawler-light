class Shield extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'iceShield');
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.myScene = scene;
        this.myTarget = config.hasOwnProperty('target') ? config.target : null;;//The object to follow
        if(config.hasOwnProperty('anm')){
            this.play(config.anm);
        }
    		//this.body.setSize(128,128);
    		if(config.hasOwnProperty('bdyW') && config.hasOwnProperty('bdyH')){
    			this.body.setSize(config.bdyW,config.bdyH)
    		}

        this.faction = config.hasOwnProperty('faction') ? config.faction : 0;
        this.lifeSpan = config.hasOwnProperty('lifeSpan') ? config.lifeSpan : 300;
        this.orgX = config.orgX || 0;
        this.orgY = config.orgY || 0;

        this.myGroup = config.hasOwnProperty('myGroup') ? config.myGroup : scene.shields;
        this.rotateMe = config.hasOwnProperty('rotateMe') ? config.rotateMe : true;

        this.setDepth(100000);
        scene.updateGroup.add(this);


        this.init();
        this.updateConfig();

    }


    init(){

    }

    updateConfig(){
        //this.setOrigin(this.orgX,this.orgY);
        if(this.doSetRotation){
            this.rotation = this.myAngle;// angle is in radians
        }
        this.myGroup.add(this);

    }

    onDestroy(){

    }

    destroyIt(){
        this.onDestroy();
        this.destroy();
    }

    update(time,delta){

      if(this.rotateMe){
        this.angle += 3;
      }


      if( this.destroyAfterAnim && this.anims.currentAnim ){
      	if(this.anims.currentFrame.index === this.anims.getTotalFrames()){
      		this.destroy();
      	}
      }else{
      	this.lifeSpan--;
      	if(this.lifeSpan<1){
      	    this.destroyIt();
      	}
      }



    }
}
