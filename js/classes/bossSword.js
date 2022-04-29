class BossSword extends Boss {


    init(){

        this.anmDefault= 'bossSwordFloat';
        this.anmWalk = 'bossSwordFloat';
        this.anmRun = 'bossSwordFloat';
        this.anmTell = 'bossSwordTell';
        this.anmAttack = 'bossSwordAttack';
        this.attackVelocity = 200;
        this.agroRange=256;
        this.hp=20;

        //this.body.setSize(16,54);
        //this.body.setOffset(20,8);
        console.log("BOSS SWORD");
    }

    mySetScale(){

        this.setScale(2);
    }

    fireAttack(){
        if(this.firedAttack) return false;
        this.firedAttack=true;
        this.canHitPlayer = true;
        this.lungeAttack();
    }

    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {
            if(animation.key === this.anmTell) {
               this.attack();
            }else if(animation.key === this.anmAttack){
                this.firedAttack=false;
                this.canHitPlayer = false;
                this.body.acceleration.x=Phaser.Math.Between(-1,1);
                this.body.acceleration.y=Phaser.Math.Between(-1,1);
                this.walk();
            }
        }, this);
    }
}