class Giant extends Enemy {


    init() {
        this.anmDefault = 'giantWalk';
        this.anmIdle = 'giantWalk';
        this.anmWalk = 'giantWalk';
        this.anmRun = 'giantWalk';
        this.anmHit = 'giantWalk';
        this.anmTell = 'giantTell';
        this.anmAttack = 'giantAttack';
        this.anmDie = 'giantTell';

        this.attackVelocity = 100;
        this.agroRange=90;
        this.hp=50;
        this.attackDamage = 4;

	    this.body.setSize(60,60);
//		this.setOffset(30,60)

        //this.startMovement();
    }

    myPostUpdate(time,delta){
        this.depth=10000+this.y;

    }

    applyDamage(D){
        this.hp-=D;
        if(this.hp<=0){
            this.die();
        }
        if(this.myState === STATE_EN_IDLE || this.myState === STATE_EN_MOVE){
                this.setAttackDirection();
                this.tell();
        }

    }

    onDestroy(){
      let rareDropOdds = 5;
      let rareItems = ["scrollIceShield","scrollFireStorm"];
      if(Phaser.Math.Between(1,rareDropOdds)===rareDropOdds){
        let lootIdx = rareItems[Phaser.Math.Between(0,rareItems.length-1)]
        new Loot(this,this.x,this.y,{invAdd:lootIdx,img:lootIdx,pop:true});
      }
    }

}
