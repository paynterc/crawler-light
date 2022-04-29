class Mob extends Enemy {
    // A harmless creature

    updateConfig(){
        this.faction=0;
        this.agroRange = -1;
        this.myScene.mobs.add(this);
        this.myBumpTimer = this.myBumpFrequency;
        this.myAttackTimer = this.myAttackFrequency;

        this.attackCoolTimer = 0;// track time between hits. shouldn't hit more than once every 10 frames or so
        this.body.maxVelocity.setTo(this.maxVelocity); // x, y
        if(!this.anims.currentAnim){
            this.play(this.anmDefault);// You have to have some animation at start
        }
        this.startMovement();
    }



}