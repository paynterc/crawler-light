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
        this.walkStarted = false;


        this.anmDefault = config.anmDefault || null;
        this.anmWalk = config.anmWalk || this.anmDefault;
        this.anmIdle = config.anmIdle || this.anmDefault;
        this.anmComplete = config.anmComplete || null;
        this.doesMove = config.doesMove || false;
        this.defaultAcc = config.defaultAcc || 10;
        this.maxVelocity = config.maxVelocity || 15;
        this.timedInteract = config.timedInteract || true;
        this.myBumpFrequency = config.hasOwnProperty('bumpFrequency') ? config.bumpFrequency : 10;

        this.missionId = config.missionId || false;
        this.tip = config.tip || null;
        this.quip = config.quip || null;
        this.mission = null;

        scene.npcs.add(this);
        scene.updateGroup.add(this);

        this.init();
        this.updateConfig();// Init may override some config settings
        if(this.anmIdle){
            this.play(this.anmIdle);
        }
        if(this.doesMove){
            this.startMovement();
        }

    }

    init(){}

    updateConfig(){
        let mId = this.missionId;
        let mFiltered =  missions.filter(function(m) {
          return m.id == mId;
        });
        this.mission = mFiltered[0];

        this.myBumpTimer = this.myBumpFrequency;

    }

    myPreUpdate(time,delta){
    }

    update(time,delta){


        this.myPreUpdate(time,delta);
        if(this.myBumpTimer>0) this.myBumpTimer--;
//        if(this.interactCoolTimer>0) this.interactCoolTimer--;
//        this.interacting = this.interactCoolTimer>0;
        this.depth=this.y;
        switch (this.myState) {
            case STATE_EN_IDLE:
                this.idle(time,delta);
                break;
            case STATE_EN_MOVE:
                this.walk(time,delta);
                break;
            default:
                this.idle(time,delta);
                break;
        }


        this.myPostUpdate(time,delta);
    }

    myPostUpdate(time,delta)
    {
    }

    startMovement(){
        if(this.walkStarted===false){
            this.walkStarted=true;
            this.body.acceleration.x = this.defaultAcc;
            this.myState = STATE_EN_MOVE;
        }
    }

    walk(time,delta){
        this.body.maxVelocity.setTo(this.maxVelocity); // x, y

        if(this.anmWalk && this.anims.currentAnim && this.anims.currentAnim.key != this.anmWalk){
            this.play(this.anmWalk);
        }

        if(this.myBumpTimer<1){
            this.myBumpTimer = this.myBumpFrequency;
            if(this.body.touching.right){
                this.body.acceleration.x = this.defaultAcc * -1;
            }else if(this.body.touching.left){
                this.body.acceleration.x = this.defaultAcc;
            }

            if(this.body.touching.down){
                this.body.acceleration.y = this.defaultAcc * -1;
            }else if(this.body.touching.up){
                this.body.acceleration.y = this.defaultAcc;
            }
        }


        this.flipX = this.body.velocity.x < 0;

    }

    idle(){

    }


    interact(){
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
                    if(this.mission.itemGiven){
                        this.myScene.addInventoryItem(this.mission.itemGiven);
                    }
                    if(this.mission.goldGiven){
                        gold += this.mission.goldGiven;
                    }

                    this.mission.complete=true;
                    if(this.anmComplete){this.play(this.anmComplete)}
                    this.myScene.showText(this.mission.txtComplete);

                    this.myScene.events.emit('scoreUpdated',this);


                }else{
                    if(this.mission.id=='lostLamb' && soldLamb){
                        this.myScene.showText("I heard you sold my lamb. I'm not happy about that.");
                    }else{
                        this.myScene.showText(this.mission.txtActive);
                    }
                }
            }
        }else if(this.tip){
            this.myScene.showText(this.tip);
        }else if(this.quip){
            this.myScene.setQuipText(this.x,this.y-16,this.quip);
        }

    }
}