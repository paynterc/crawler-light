class Enemy extends Phaser.GameObjects.Sprite {

    // CALLOUT: New enemies need to have a config {'img':someImage}, especially if they are bigger than 32x32
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        this.myScene = scene;
        this.myConfig = config;
        this.mySetScale();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.drag.setTo(DRAG);

        // Controls
        this.faction = 1;// 1 for enemies, 0 for hero
        this.walkStarted=false;
        this.myState = STATE_EN_IDLE;
        this.firedAttack = false;// only attack once per attack state
        this.attackDirection = 0;// which direction it will lunge
        this.oneHit = false;// only allow one hit per attack

        // Config Items
        this.pathReactTime = 120;
        if(config.hasOwnProperty('bdyW') && config.hasOwnProperty('bdyH')){
            this.body.setSize(config.bdyW,config.bdyH);
        }

        this.defaultAcc = config.hasOwnProperty('defaultAcc') ? config.defaultAcc : 25;
        this.maxVelocity = config.hasOwnProperty('maxVelocity') ? config.maxVelocity : 50;
        this.invAdd = config.hasOwnProperty('invAdd') ? config.invAdd : false;// add to inventory on death
        this.attackVelocity = config.hasOwnProperty('attackVelocity') ? config.attackVelocity : 500;
        this.hp = config.hasOwnProperty('hp') ? config.hp : 1;
        this.attackDamage = config.hasOwnProperty('attackDamage') ? config.attackDamage : 1;
        this.myBumpFrequency = config.hasOwnProperty('bumpFrequency') ? config.bumpFrequency : 3;
        this.myAttackFrequency = config.hasOwnProperty('attackFrequency') ? config.attackFrequency : 200;
        this.agroRange = config.hasOwnProperty('agroRange') ? config.agroRange : UNITSIZE*4;
        this.coins = config.hasOwnProperty('coins') ? config.coins : 1;
        this.anmDefault = config.hasOwnProperty('anmDefault') ? config.anmDefault : 'emyIdle';
        this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : this.anmDefault;
        this.anmWalk = config.hasOwnProperty('anmWalk') ? config.anmWalk : this.anmDefault;
        this.anmRun = config.hasOwnProperty('anmRun') ? config.anmRun : this.anmDefault;
        this.anmHit = config.hasOwnProperty('anmHit') ? config.anmHit : this.anmDefault;
        this.anmTell = config.hasOwnProperty('anmTell') ? config.anmTell : this.anmDefault;
        this.anmAttack = config.hasOwnProperty('anmAttack') ? config.anmAttack : this.anmDefault;
        this.anmDie = config.anmDie || null;
        this.attackType = config.attackType || 'lunge';
        this.bulletOffsetX = config.bulletOffsetX || 0;
        this.bulletOffsetY = config.bulletOffsetY || 0;
        this.canHitPlayer = true;

        if(config.hasOwnProperty('onDestroy')){
            this.onDestroy = config.onDestroy;
        }
        if(config.hasOwnProperty('onCorpseDestroy')){
            this.onCorpseDestroy = config.onCorpseDestroy;
        }
        scene.updateGroup.add(this);

        this.setAnimationComplete();
        this.init();
        this.updateConfig();// Init may override some config settings

    }

    getType(){
        return this.myConfig.img;
    }

    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {
            if(animation.key === this.anmTell) {
               this.attack();
            }else if(animation.key === this.anmAttack){
                this.firedAttack=false
                this.body.acceleration.x=Phaser.Math.Between(-1,1);
                this.body.acceleration.y=Phaser.Math.Between(-1,1);
                this.walk();
            }
        }, this);
    }
    updateConfig(){
        this.myScene.enemies.add(this);
        enemies++;
        this.myScene.events.emit('enemiesUpdated');

        this.myBumpTimer = this.myBumpFrequency;
        this.myAttackTimer = this.myAttackFrequency;
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

    init(){}

    update(time,delta){


        this.myPreUpdate(time,delta);
        if(this.attackCoolTimer>0) this.attackCoolTimer--;
        if(this.myBumpTimer>0) this.myBumpTimer--;
        this.depth=this.y;
        switch (this.myState) {
            case STATE_EN_IDLE:
                this.idle(time,delta);
                break;
            case STATE_EN_MOVE:
                this.walk(time,delta);
                break;
            case STATE_EN_HIT:
                this.hit(time,delta);
                break;
            case STATE_EN_TELL:
                this.tell(time,delta);
                break;
            case STATE_EN_ATTACK:
                this.attack(time,delta);
                break;
            case STATE_EN_DIE:
                this.die(time,delta);
                break;
            case STATE_EN_INTRO:
                this.intro(time,delta);
                break;
            default:
                this.idle(time,delta);
                break;
        }


        this.myPostUpdate(time,delta);
    }

    myPreUpdate(time,delta){}
    idle(time,delta){}
    hit(time,delta){}

    die(time,delta){
        this.myState=STATE_EN_DIE;
        if(this.anmDie){
            // create a corpse object that you won't collide with
            let corpse = new Corpse(this.myScene,this.x,this.y,{'scale':this.myScale});
            if(this.onCorpseDestroy){
                corpse.onDestroy = this.onCorpseDestroy;
            }
            corpse.play(this.anmDie);
        }

        this.destroyIt();
    }


    intro(time,delta){}
    myPostUpdate(time,delta){}

    destroyIt(){
        enemies--;
        gold++;
        this.myScene.events.emit('enemyDied',this.texture.key,this.x,this.y);
        this.myScene.events.emit('enemiesUpdated');

        this.onDestroy();
        this.destroy();
    }

    startMovement(){
        if(this.walkStarted===false){
            this.walkStarted=true;
            this.body.acceleration.x = this.defaultAcc;
            this.myState = STATE_EN_MOVE;
        }
    }



    walk(time,delta){
        this.myState = STATE_EN_MOVE;
        this.body.maxVelocity.setTo(this.maxVelocity); // x, y
        this.myAttackTimer --;



        let D = Phaser.Math.Distance.Between(this.x,this.y,this.myScene.player.x,this.myScene.player.y);
        if(D<=this.agroRange){
            if(this.myAttackTimer<1){
                this.myAttackTimer = this.myAttackFrequency;
                this.setAttackDirection();
                this.tell();
                return false;
            }
        }

        if(this.anmWalk && this.anims.currentAnim && this.anims.currentAnim.key != this.anmWalk){
            this.play(this.anmWalk);
        }

        if(this.myBumpTimer<1){
            this.myBumpTimer = this.myBumpFrequency;
            if(this.body.touching.right){
                this.body.acceleration.x = this.defaultAcc * -1;
            }else if(this.body.touching.left){
                this.body.acceleration.x = this.defaultAcc;
            }

            if(this.body.touching.down){
                this.body.acceleration.y = this.defaultAcc * -1;
            }else if(this.body.touching.up){
                this.body.acceleration.y = this.defaultAcc;
            }

        }

        this.flipX = this.body.velocity.x < 0;
//        if(this.body.velocity.x === 0 && this.body.velocity.y === 0){
//            this.myState = STATE_EN_IDLE;
//        }

    }

    tell(time,delta){
        this.myState = STATE_EN_TELL;
        this.body.setVelocity(0);
        this.body.acceleration.x=0;
        this.body.acceleration.y=0;
        if(this.anmTell && this.anims.currentAnim && this.anims.currentAnim.key != this.anmTell){
            this.play(this.anmTell);
        }
//        if( this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames() -1 ){
//            this.attack();
//        }
    }

    attack(time,delta){
        this.myState=STATE_EN_ATTACK;
        if(this.anmAttack && this.anims.currentAnim && this.anims.currentAnim.key != this.anmAttack){
            this.play(this.anmAttack);
        }
        this.fireAttack();
        this.flipX = this.body.velocity.x < 0;

//        if( this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames() -1 ){
//            this.firedAttack=false
//            this.walk();
//        }

    }

    setAttackDirection(){
        // get direction to target.
        this.attackDirection = Phaser.Math.Angle.Between(this.x,this.y,this.myScene.player.x,this.myScene.player.y);
    }

    fireAttack(){
        if(this.firedAttack) return false;
        this.firedAttack=true;
        if(this.attackType=='bullet'){
            this.bulletAttack();
        }else{
            this.lungeAttack();
        }
    }

    bulletAttack(){

        let dir = this.flipX ? -1 : 1;
        let xx = this.x + (this.bulletOffsetX * dir);
        let yy = this.y + this.bulletOffsetY;

        let A = Phaser.Math.Angle.Between(xx,yy,this.myScene.player.x,this.myScene.player.y);
        let bullet = new Bullet(this.myScene,xx,yy,A,this.bulletConfig);
    }

    lungeAttack(){
        // The time spent lunging is based on the attack animation time. A longer animation will allow more time accelerating

        // LUNGE TO TARGET
        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(this.attackDirection, this.attackVelocity);// 500 is the bullet speed

        this.body.maxVelocity.setTo(this.attackVelocity); // x, y
        this.body.acceleration.x=1;
        this.body.acceleration.y=1;
        this.body.velocity = vec;
    }

    applyDamage(D){
        this.hp-=D;
        if(this.hp<=0){
            this.die();
        }
        this.myScene.hitHurt.play();
    }

    applyKb(angle,speed){
        if(speed<=0) return false;
        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(angle  * (Math.PI/180), speed);
        this.body.velocity = vec;
    }

    mySetScale(){

    }

    onDestroy(){
    }

    onCorpseDestroy(){
    }

}