class ShadowTwin extends Pet {

  init(){
    this.faction = 0;// Pets are on your side.

    this.anmDefault = 'rogueRun';
    this.anmIdle = 'rogueIdle';
    this.anmTell = 'shadowTwinTell';
    this.anmAttack = 'rogueAttack';
    this.anmWalk = 'rogueRun';
    this.anmRun = 'rogueRun';
    this.anmDie= 'rogueDie';
    this.attackVelocity = 100;
    this.myAttackFrequency = Phaser.Math.Between(10,20);
    this.checkPlayerFrequency=5;
    this.agroRange=1000;
    this.hp=20;
    this.attackDamage = 2;
    this.lifeSpan=10000;//milliseconds

    this.bdyW = 48;
    this.bdyH = 48;
    this.bdyX = 100;
    this.bdyY = 35;
    this.xOff = 32;

    this.body.setSize(this.bdyW,this.bdyH);
    this.body.setOffset(this.bdyX,this.bdyY);

    this.setTint('0x000000');

  }


  myPreUpdate(time,delta){
      if(this.lifeSpan>0){
        this.lifeSpan-=delta;
        if(this.lifeSpan<=0){
          this.myState = STATE_EN_DIE;
        }
      }
  }

  setTarget(){
    if(!this.attackTarget){
      let eArray = this.myScene.enemies.getChildren();
      let bArray = [];
      for (var i = 0; i < eArray.length; i++) {
          let emy = eArray[i];
          if(emy.type==='mob'){
            bArray.push(emy);
          }
      }
      this.attackTarget = this.myScene.physics.closest(this,bArray);
    }

    if(!this.attackTarget){
      this.attackTarget = this.myScene.player;
    }

  }

  destroyIt(){
      this.destroy();
  }

}
