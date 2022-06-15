class Pet extends Enemy {

  init(){
    this.faction = 0;// Pets are on your side.
    
  }

  updateConfig(){
      this.myScene.pets.add(this);

      this.myBumpTimer = this.myBumpFrequency;
      this.myAttackTimer = this.myAttackFrequency;
      this.checkPlayerTimer = this.checkPlayerFrequency;
      this.attackCoolTimer = 0;// track time between hits. shouldn't hit more than once every 10 frames or so
      this.body.maxVelocity.setTo(this.maxVelocity); // x, y
      if(!this.anims.currentAnim){
          this.play(this.anmDefault);// You have to have some animation at start
      }

      this.bulletConfig = this.myConfig.bulletConfig || {img:'fireball',anm:'fireball',initSpeed:500,damage:this.attackDamage};
      this.bulletConfig.faction = this.faction;
      this.maxHp=this.hp;
      this.startMovement();
  }

}
