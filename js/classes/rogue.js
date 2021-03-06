class Rogue extends Player {


    init() {
        this.myClass = 'rogue';
        this.anmDefault = 'rogueRun';
        this.anmIdle = 'rogueIdle';
        this.anmAttack = 'rogueAttack';
        this.anmWalk = 'rogueRun';
        this.anmRun = 'rogueRun';
        this.anmDie= 'rogueDie';

        this.attacks = 3;
        this.attackCount= 0;

        this.bdyW = 16;
        this.bdyH = 24;
        this.bdyX = 100;
		    this.bdyY = 35;
		    this.xOff = 32;

        this.maxLives = 6;
        this.maxSpells=2;

    }


    attack(time,delta){

        if(!fireInputIsActive()){
            this.myState = STATE_EN_IDLE;
            return false;
        }
        this.body.setVelocity(0);
        this.body.acceleration.x = 0;
        this.body.acceleration.y = 0;
        if(this.anims.currentAnim.key != this.anmAttack){
            this.attackCount=0;
            this.play(this.anmAttack);
        }
        if(this.anims.currentFrame){

            if(this.anims.currentFrame.index===2 && this.attackCount===0){
                this.attackCount++;
                this.attack2();
            }

            if(this.anims.currentFrame.index===6 && this.attackCount===1){
                this.attackCount++;
                this.attack3();
            }

            if(this.anims.currentFrame.index===13 && this.attackCount===2){
                this.attackCount++;
                this.attack4();
            }
        }

    }

    attack1(){

    }

    attack2(){
            let dir = this.flipX ? -1 : 1;
            let xOff=32;
//            let pointer = this.myScene.input.activePointer;
//            let A = Phaser.Math.Angle.Between(this.x,this.y,pointer.worldX,pointer.worldY);

            let A = this.flipX ? 180 : 0;
             A *= (Math.PI/180);// convert to radians
            let config = {faction:0,img:'invis32',initSpeed:50,lifeSpan:5,damage:2 + this.bonusDamage,destroyOnHitWall:false}
            this.fireBullet(A,config);
            //let bullet = new Bullet(this.myScene,this.x + (xOff*dir),this.y+16,A,config);
            this.myScene.swordSound.play();
    }

    attack3(){
            let dir = this.flipX ? -1 : 1;
            let xOff=32;
//            let pointer = this.myScene.input.activePointer;
//            let A = Phaser.Math.Angle.Between(this.x,this.y,pointer.worldX,pointer.worldY);
            let A = this.flipX ? 180 : 0;
             A *= (Math.PI/180);
            let config = {faction:0,img:'invis64',initSpeed:50,lifeSpan:10,destroyOnHit:false,damage:2 + this.bonusDamage,destroyOnHitWall:false}
            this.fireBullet(A,config);

            //let bullet = new Bullet(this.myScene,this.x + (xOff*dir),this.y,A,config);
            this.myScene.swordSound.play();
    }

    attack4(){
        let dir = this.flipX ? -1 : 1;
        let xOff=32;
//        let pointer = this.myScene.input.activePointer;
//        let A = Phaser.Math.Angle.Between(this.x,this.y,pointer.worldX,pointer.worldY);
            let A = this.flipX ? 180 : 0;
            A *= (Math.PI/180);
            let config = {faction:0,img:'invis64',initSpeed:50,lifeSpan:5,damage:3 + this.bonusDamage,destroyOnHitWall:false}
            this.fireBullet(A,config);
            this.myScene.swordSound.play();

            //let bullet = new Bullet(this.myScene,this.x + (xOff*dir),this.y,A,config);
    }

}
