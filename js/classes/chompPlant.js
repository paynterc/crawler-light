class ChompPlant extends Enemy {


    init() {
        this.anmDefault = 'chompPlantIdle';
        this.anmIdle = 'chompPlantIdle';
        this.anmWalk = 'chompPlantIdle';
        this.anmRun = 'chompPlantIdle';
        this.anmHit = 'chompPlantIdle';
        this.anmTell = 'chompPlantTell';
        this.anmAttack = 'chompPlantAttack';
        this.anmDie = 'chompPlantIdle';
        this.type = 'trap';//mob or trap

        this.attackVelocity = 0;
        this.maxVelocity=0;
        this.defaultAcc=0;
        this.agroRange=16;
        this.hp=10;
        this.attackDamage = 1;
        this.canHitPlayer=false;
        this.myState=STATE_EN_IDLE;

    }


    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {
            if(animation.key === this.anmTell) {
                this.canHitPlayer=true;
               this.attack();
            }else if(animation.key === this.anmAttack){
                this.firedAttack=false
                this.canHitPlayer=false;
                this.myState=STATE_EN_IDLE;
            }
        }, this);
    }

    startMovement(){

    }

    idle(time,delta){

        this.myState=STATE_EN_IDLE;
        if(this.anmIdle && this.anims.currentAnim && this.anims.currentAnim.key != this.anmIdle){
            this.play(this.anmIdle);
        }
        let D = Phaser.Math.Distance.Between(this.x,this.y,this.myScene.player.x,this.myScene.player.y);
        if(D<=this.agroRange){
                this.tell();
                return false;
        }
    }

    updateConfig(){
        this.myScene.enemies.add(this);
        this.attackCoolTimer=0;
        if(!this.anims.currentAnim){
            this.play(this.anmIdle);// You have to have some animation at start
        }

        this.maxHp=this.hp;
    }

    lungeAttack(){

    }

    die(time,delta){
        this.destroy();
    }

}
