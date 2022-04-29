class Catchable extends Enemy {
    // A class of creature you can capture. Likely for

    updateConfig(){
        this.faction=0;
        this.myScene.catchables.add(this);
        this.myBumpTimer = this.myBumpFrequency;
        this.myAttackTimer = this.myAttackFrequency;

        this.attackCoolTimer = 0;// track time between hits. shouldn't hit more than once every 10 frames or so
        this.body.maxVelocity.setTo(this.maxVelocity); // x, y
        if(!this.anims.currentAnim){
            this.play(this.anmDefault);// You have to have some animation at start
        }
        this.startMovement();
    }

    setAttackDirection(){
        // get direction to target. run from target
        this.attackDirection = Phaser.Math.Angle.Between(this.myScene.player.x,this.myScene.player.y,this.x,this.y);
    }

    catchIt(player){
        if(this.invAdd){
            //ee.emit(eventName, parameter0, ...);
            this.myScene.events.emit('caughtCatchable',this);
        }
    }

}