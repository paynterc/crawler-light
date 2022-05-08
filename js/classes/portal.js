class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'forestPortal');
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;
        this.open = false;
        this.depth = y;
        this.type = config.type || null;
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
        if(this.type=='moon'){
            this.myScene.add.image(this.x,this.y-24,'emblemMoon').setDepth(this.depth+10000);
        }else if(this.type=='gem'){
            this.myScene.add.image(this.x,this.y-24,'emblemGem').setDepth(this.depth+10000);
        }else if(this.type=='flame'){
            this.myScene.add.image(this.x,this.y-24,'emblemFlame').setDepth(this.depth+10000);
        }


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

        if(path.length>2){
            path=[];
        }
        path.push(this.type);
        this.myScene.restart=true;
    }
}