class SpiderQueen extends Enemy {


    init() {
        let that = this;
        this.anmDefault = 'spiderQueenWalk';
        this.anmIdle = 'spiderQueenWalk';
        this.anmWalk = 'spiderQueenWalk';
        this.anmRun = 'spiderQueenWalk';
        this.anmHit = 'spiderQueenAttack';
        this.anmTell = 'spiderQueenTell';
        this.anmAttack = 'spiderQueenAttack';
        this.anmDie = null;

        this.attackVelocity = 200;
        this.agroRange=90;
        this.hp=80;
        this.attackDamage = 4;
        this.myAttackFrequency=200;
        this.body.setSize(60,60);
        // this.body.setOffset(30,60);

        this.attackType='bullet';

        //this.startMovement();

        this.mConfig = {
              img:'spiderling',
              anmDefault:'spiderlingWalk',
              anmTell:'spiderlingTell',
              anmAttack:'spiderlingAttack',
              anmDie:null,
              attackVelocity:250,
              agroRange:225,
              hp:2
          }

        this.onEggDestroy = function(){
          let spiderling = new Enemy(that.myScene,this.x,this.y,that.mConfig);
        }
        this.eggConfig = {img:'spiderEgg',onDestroy:this.onEggDestroy,faction:1}

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
                if(this.myAttackTimer<1){
                    this.myAttackTimer = this.myAttackFrequency;
                    this.setAttackDirection();
                    this.tell();
                }
        }

    }

    fireAttack(){
        if(this.firedAttack) return false;
        this.firedAttack=true;
        if(this.attackType=='bullet'){
            this.bulletAttack();
            this.attackType='eggs';

        }else if(this.attackType=='eggs'){
            this.spiderAttack();
            this.attackType='lunge';

        }else{
            this.lungeAttack();
            this.attackType='bullet';
        }
    }

    bulletAttack(){

        let dir = this.flipX ? -1 : 1;
        let xx = this.x + (this.bulletOffsetX * dir);
        let yy = this.y + this.bulletOffsetY;
        let bulletConfig = {img:'spiderAcidShot',faction:1}
        for(let i=0;i<360;i+=20){
          let bullet = new Bullet(this.myScene,this.x,this.y,i,bulletConfig);
        }
    }

    spiderAttack(){
      if(enemies > 15) return false;
      for(let i=0;i<360;i+=60){
        let egg = new Bullet(this.myScene,this.x,this.y,i,this.eggConfig);
      }

    }

    onDestroy(){
      let rareDropOdds = 5;
      let rareItems = ["scrollIceShield","scrollFireStorm"];
      if(Phaser.Math.Between(1,rareDropOdds)===rareDropOdds){
        let lootIdx = rareItems[Phaser.Math.Between(0,rareItems.length-1)]
        Loot(this,this.x,this.y,{invAdd:lootIdx,img:lootIdx,pop:true});
      }
    }

}
