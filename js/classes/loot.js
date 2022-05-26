class Loot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'square');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.myScene = scene;
        this.myConfig = config;
        this.yMin = y;

        this.invAdd = config.invAdd || null
        this.anm = config.anm || null;
        this.pop = config.hasOwnProperty('pop') ? config.pop : 'pop';
        this.gold = config.hasOwnProperty('gold') ? config.gold : 0;

        scene.catchables.add(this);

        this.init();
        this.updateConfig();
        if(this.pop){
            this.body.setGravity(0,2000);
            this.body.setVelocity(0,-500);
            this.body.velocity.x =Phaser.Math.Between(-100, 100);
            this.body.setBounce(0.2);
            this.body.drag.setTo(10, 0); // x, y
            scene.updateGroup.add(this);
        }

    }

    updateConfig(){
        if(this.anm){
            this.play(this.anm);
        }
    }


    onPickup(player){

    }

    catchIt(player){
        this.myScene.events.emit('caughtCatchable',this);
        this.onPickup(player);
    }

    update(time,delta){
        if(this.y>this.yMin && this.pop){
            this.body.velocity.y = 0;
            this.body.setGravity(0,0);
        }
    }

    init(){
    }
}