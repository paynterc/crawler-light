class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'forestPortal');
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;
        this.open = false;
        this.depth = DEPTH_PORTAL;

        this.anm = config.hasOwnProperty('anm') ? config.anm : 'portalClosed';
        this.anmOpen = config.hasOwnProperty('anmOpen') ? config.anm : 'portalOpen';
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
        this.play(this.anmOpen);
    }

    onEnter(){
        if(!this.open) return false;
        this.myScene.restart=true;
    }
}