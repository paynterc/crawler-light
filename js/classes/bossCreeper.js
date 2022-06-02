class BossCreeper extends Boss {


    init(){
        this.body.setSize(18,48)
        this.body.setOffset(19,0);
        this.anmDefault= 'bossCreeperWalk';
        this.anmWalk = 'bossCreeperWalk';
        this.anmRun = 'bossCreeperWalk';
        this.anmTell = 'bossCreeperTell';
        this.anmDie = "bossCreeperDie";
        this.anmAttack = 'bossCreeperAttack';
        this.anmAttack2 = 'bossCreeperAttack';
        this.anmIntro = 'bossCreeperIntro';
        this.attackVelocity = 300;
        this.agroRange=256;
        this.hp=100;
        this.bulletDelay = 10;
        this.bulletTimer = this.bulletDelay;
        this.myScale=2;

        this.startX=this.x;
        this.startY=this.y;

        this.attackPhase = 1;
        //this.gun = new Gun(this.myScene,this.x,this.y);
        //this.body.setSize(16,54);
        //this.body.setOffset(20,8);
        this.A = 0;//bullet angle

    }

    mySetScale(){

        this.setScale(2);
    }

    startMovement(){
        this.play(this.anmIntro);
    }

    startMovement2(){
        if(this.walkStarted===false){
            this.walkStarted=true;
            this.body.acceleration.x = this.defaultAcc;
            this.myState = STATE_EN_MOVE;
        }
    }

    onDestroy(){
        new Loot(this.myScene,this.x,this.y,{invAdd:'braceletOfWinds',img:'braceletOfWinds',anm:'braceletOfWinds',pop:true});
        this.myScene.events.emit('bossDied',"BOSS CREEP");
    }

    attack(time,delta){
        this.myState=STATE_EN_ATTACK;


        if(this.attackPhase===4){
            this.canHitPlayer = false;
            if(this.anmAttack2){
                this.play(this.anmAttack2,true);// true means ignore if playing
                this.x=this.startX;this.y=this.startY;
                this.body.setSize(18,48)
//                this.body.setOffset(19,0);
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
                    this.body.setSize(48,48)
//                    this.body.setOffset(0,0);
                }
                this.fireAttack();

        }


    }

    fireAttack(){
        if(this.firedAttack) return false;
        this.firedAttack=true;
        this.canHitPlayer = true;
        this.lungeAttack();
    }

    bulletAttack(){

        let xx = this.x;
        let yy = this.y;

        let A1 = this.A * (Math.PI/180);
        let A2 = (this.A+90) * (Math.PI/180);
        let A3 = (this.A+180) * (Math.PI/180);
        let A4 = (this.A+270) * (Math.PI/180);

        let bullet1 = new Bullet(this.myScene,xx,yy,A1,{faction:1,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
        let bullet2 = new Bullet(this.myScene,xx,yy,A2,{faction:1,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
        let bullet3 = new Bullet(this.myScene,xx,yy,A3,{faction:1,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
        let bullet4 = new Bullet(this.myScene,xx,yy,A4,{faction:1,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});

        this.A +=6;
    }



    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {

            if(animation.key === this.anmIntro){
                this.startMovement2();
            }else if(animation.key === this.anmTell) {
               this.attack();
            }else if(animation.key === this.anmAttack || animation.key === this.anmAttack2){

                this.firedAttack=false;
                this.canHitPlayer = 1;
                this.A = 0;
                this.bulletTimer = this.bulletDelay;

                this.attackPhase ++;
                if(this.attackPhase > 4){
                    this.attackPhase=1;
                    this.body.setSize(18,48);
                    this.body.acceleration.x=Phaser.Math.Between(-1,1);
                    this.body.acceleration.y=Phaser.Math.Between(-1,1);
                    this.walk();
                }else{
                    this.setAttackDirection();
                    this.tell();
                }


            }
        }, this);
    }
}