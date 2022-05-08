class Gun extends Phaser.GameObjects.Sprite {

    // CALLOUT: New enemies need to have a config {'img':someImage}, especially if they are bigger than 32x32
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'square');
        scene.add.existing(this);

        this.myScene = scene;
        this.initSpeed=128;

        this.myDelay = 250;
        this.nextShoot = this.myDelay;
    }

        update(time,delta){

    		this.nextShoot--;
    		if(this.nextShoot<1){
    			this.nextShoot = this.myDelay;
    			this.shoot();
    		}

        }

       shoot(){

            let bullet = new Bullet(this.myScene,this.x,this.y,this.angle,{anm:'fireball',img:'fireball'});

       }

       init(){

       }

}