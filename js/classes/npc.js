class Npc extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        this.myScene = scene;
        this.myConfig = config;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.drag.setTo(DRAG);
        this.faction = 0;// 1 for enemies, 0 for hero
        this.interacting = false;

        this.anmDefault = config.hasOwnProperty('anmDefault') ? config.anmDefault : 'emyIdle';
        this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : this.anmDefault;
        this.missionId = config.missionId || false;
        this.mission = null;

        this.myScene.npcs.add(this);

        this.init();
        this.updateConfig();// Init may override some config settings

    }

    init(){}
    updateConfig(){
        let mId = this.missionId;

        let mFiltered =  missions.filter(function(m) {
          return m.id == mId;
        });

        this.mission = mFiltered[0];

    }

    interact(){
        if(this.interacting) return false;
        this.interacting = true;
        // if not has mission

        if(this.mission){

            if(!this.mission.started){
                this.myScene.showText(this.mission.txtStart);
                this.mission.started=true;
            }else if(!this.mission.complete){
                // check inventory for required item.
                let item = this.myScene.findInventoryItem(this.mission.itemRequired);
                if(item){
                    this.myScene.removeInventoryItem(this.mission.itemRequired);
                    this.myScene.addInventoryItem(this.mission.itemGiven);
                    this.mission.complete=true;
                    this.myScene.showText(this.mission.txtComplete);
                }else{
                    this.myScene.showText(this.mission.txtActive);
                }
            }
        }

    }
}