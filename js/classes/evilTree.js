class EvilTree extends Enemy {


    init() {
        this.anmDefault = 'evilTreeIdle';
        this.anmIdle = 'evilTreeIdle';
        this.anmWalk = 'evilTreeWalk';
        this.anmRun = 'evilTreeWalk';
        this.anmHit = 'evilTreeIdle';
        this.anmTell = 'evilTreeTell';
        this.anmAttack = 'evilTreeAttack';
        this.anmDie = 'evilTreeDie';

        this.attackVelocity = 200;
        this.agroRange=90;
        this.hp=30;
        this.attackDamage = 4;
        this.myAttackFrequency=200;
	    this.body.setSize(60,60);
		this.body.setOffset(30,60);

        //this.startMovement();
        this.play(this.anmIdle);

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

    idle(time,delta){
        let D = Phaser.Math.Distance.Between(this.x,this.y,this.myScene.player.x,this.myScene.player.y);
        if(D<=this.agroRange){
            if(this.walkStarted===false){
                this.walkStarted=true;
                this.body.acceleration.x = this.defaultAcc;
                this.myState = STATE_EN_MOVE;
            }
        }

    }

    startMovement(){

    }

}