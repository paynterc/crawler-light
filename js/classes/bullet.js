class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, angle, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'fireball');
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;
        this.myAngle = angle;

        if(config.hasOwnProperty('anm')){
            this.play(config.anm);
        }
		//this.body.setSize(128,128);
		if(config.hasOwnProperty('bdyW') && config.hasOwnProperty('bdyH')){
			this.body.setSize(config.bdyW,config.bdyH)
		}
//		let gravity = config.hasOwnProperty('gravity') ? config.gravity : GRAVITY;
//		this.body.setGravityY(GRAVITY);
        this.faction = config.hasOwnProperty('faction') ? config.faction : 0;
        this.damage = config.hasOwnProperty('damage') ? config.damage : 1;
        this.allowGrav = config.hasOwnProperty('allowGrav') ? config.allowGrav : false;
        this.initSpeed = config.hasOwnProperty('initSpeed') ? config.initSpeed : 128;
        this.accelerate = config.hasOwnProperty('accelerate') ? config.accelerate : false;
        this.destroyAfterAnim = config.hasOwnProperty('destroyAfterAnim') ? config.destroyAfterAnim : false;
        this.destroyOnHit = config.hasOwnProperty('destroyOnHit') ? config.destroyOnHit : true;
        this.destroyOnHitWall = config.hasOwnProperty('destroyOnHitWall') ? config.destroyOnHitWall : true;
        this.lifeSpan = config.hasOwnProperty('lifeSpan') ? config.lifeSpan : 600;
        this.destroyOnSplat = config.hasOwnProperty('destroyOnSplat') ? config.destroyOnSplat : true;
        this.orgX = config.orgX || 0;
        this.orgY = config.orgY || 0;
        this.kb = config.kb || 0;
        this.doSetRotation = config.hasOwnProperty('doSetRotation') ? config.doSetRotation : true;


        this.myGroup = config.hasOwnProperty('myGroup') ? config.myGroup : scene.bullets;


        this.body.setAllowGravity(this.allowGrav);


        // this.rotation = angle * (Math.PI/180); // convert degrees to radians if needed

        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(angle, this.initSpeed);
        this.body.velocity = vec;

        this.hitIt=[];//keep track of entities i have hit. only hit them once.

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

    hasHit(target){
        return this.hitIt.indexOf(target) > -1;
    }

    onDestroy(){

    }

    destroyIt(){
        this.onDestroy();
        this.destroy();
    }

    update(time,delta){


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