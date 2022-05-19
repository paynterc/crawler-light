class BossFireGiant extends Boss {


    init(){
        this.body.setSize(96,96)
        this.body.setOffset(48,90);
        this.anmDefault= 'fireGiantWalk';
        this.anmWalk = 'fireGiantWalk';
        this.anmRun = 'fireGiantWalk';
        this.anmTell = 'fireGiantTell';
        this.anmAttack = 'fireGiantAttack1';
        this.anmAttack2 = 'fireGiantAttack2';
        this.attackVelocity = 200;
        this.agroRange=256;
        this.hp=100;
        this.bulletDelay = 30;
        this.bulletTimer = this.bulletDelay;

        this.startX=this.x;
        this.startY=this.y;

        this.attackPhase = 1;
        //this.gun = new Gun(this.myScene,this.x,this.y);
        //this.body.setSize(16,54);
        //this.body.setOffset(20,8);
        this.A = 0;//bullet angle
    }

    mySetScale(){

        //this.setScale(2);
    }

    onDestroy(){
        this.myScene.events.emit('bossDied',"FIRE GIANT");
    }

    attack(time,delta){
        this.myState=STATE_EN_ATTACK;


        if(this.attackPhase===2){
            this.canHitPlayer = false;
            if(this.anmAttack2 && this.anims.currentAnim && this.anims.currentAnim.key != this.anmAttack2){
                this.play(this.anmAttack2);
                //this.x=this.startX;this.y=this.startY;

            }

            // bullet attack
            if(this.bulletTimer>0){
                this.bulletTimer--;
            }else{
                this.bulletAttack();
                this.bulletTimer=this.bulletDelay;
            }

        }else{
                this.canHitPlayer = 1;
                if(this.anmAttack && this.anims.currentAnim && this.anims.currentAnim.key != this.anmAttack){
                    this.play(this.anmAttack);

                }
                this.fireAttack();

        }


    }

    myPostUpdate(time,delta){
        this.depth=10000+this.y;

    }

    fireAttack(){
        if(this.firedAttack) return false;
        this.firedAttack=true;
        this.canHitPlayer = true;
        this.lungeAttack();
    }

    bulletAttack(){

        let xx = this.x-4;
        let yy = this.y-32;

        let A1 = Phaser.Math.Angle.Between(xx,yy,this.myScene.player.x,this.myScene.player.y);

        let bullet1 = new Bullet(this.myScene,xx,yy,A1,{faction:1,initSpeed:180,img:'flamingRock',anm:'flamingRock',doSetRotation:false,bdyW:48,bdyH:48,destroyOnHitWall:false,lifeSpan:300});

        this.A +=6;
    }



    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {
            if(animation.key === this.anmTell) {
               this.attack();
            }else if(animation.key === this.anmAttack || animation.key === this.anmAttack2){
                this.firedAttack=false;
                this.canHitPlayer = 1;
                this.A = 0;
                this.bulletTimer = this.bulletDelay;
                this.body.acceleration.x=Phaser.Math.Between(-1,1);
                this.body.acceleration.y=Phaser.Math.Between(-1,1);
                if(animation.key === this.anmAttack){
                    this.attackPhase=2;
                }else{
                    this.attackPhase=1;
                }

                this.walk();
            }
        }, this);
    }
}