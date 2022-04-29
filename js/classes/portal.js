class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'forestPortal');
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;
        this.open = false;
        this.depth = y;

        this.anm = config.anm || 'portalClosed';
        this.anmOpen = config.anmOpen || 'portalOpen';
        this.anmOpening = config.anmOpening || null;

        this.goToLvl = config.goToLvl || "forest";

		this.body.setSize(32,32);
        this.myGroup = config.hasOwnProperty('myGroup') ? config.myGroup : scene.portals;

//        scene.updateGroup.add(this);

        this.init();
        this.updateConfig();
    }



    init(){

    }

    updateConfig(){
        this.myGroup.add(this);
        this.play(this.anm);
        this.setAnimationComplete();

    }

    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {
            if(animation.key === this.anmOpening) {
               this.play(this.anmOpen);
            }
        }, this);
    }

    onDestroy(){

    }

    destroyIt(){
        this.onDestroy();
        this.destroy();
    }

    update(time,delta){

    }

    openMe(){
        this.open=true;
        if(this.anmOpening){
            this.play(this.anmOpening);
        }else{
            this.play(this.anmOpen);
        }

    }

    onEnter(){
        if(!this.open) return false;
        this.open = false;

        lvlId = this.goToLvl;
        this.myScene.restart=true;
    }
}