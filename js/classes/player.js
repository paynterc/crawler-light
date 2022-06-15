class Player extends Phaser.GameObjects.Sprite {

    // CALLOUT: New enemies need to have a config {'img':someImage}, especially if they are bigger than 32x32
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'wizard1');

        this.myScene = scene;
        this.myConfig = config;
        this.mySetScale();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.myClass = config.plrClass || 'wizard';

        this.anmDefault = 'wizard1Idle';
        this.anmIdle = 'wizard1Idle';
        this.anmAttack = 'wizard1Attack';
        this.anmWalk = 'wizard1Walk';
        this.anmRun= 'wizard1Walk';
        this.anmDie= null;
        this.bdyW = 16;
        this.bdyH = 32;
        this.bdyX = 6;
    		this.bdyY = 0;
    		this.xOff = 0;

        this.myState = STATE_EN_IDLE;
        this.faction = 0;
        this.myAttackFrequency = 25;
        this.maxVelocity = MAX_SPEED;
        this.maxLives = 5;
        this.bonusDamage = 0;
        this.maxSpells=7;
        this.shadowFormDuration = 3000;//try to do this with miliseconds and delta
        this.shadowTimer=0;
        this.canBeDamaged=true;

        //{id:'iceShield',method:'makeIceShield',icon:'iceShieldIcon',cooldown:600,timer:0},
        this.spells = [];
        spellMap["makeIceShield"] = this.makeIceShield;
        spellMap["makeFireStorm"] = this.makeFireStorm;
        spellMap["makeShadowForm"] = this.makeShadowForm;

        this.init();
        this.updateConfig();
        this.setAnimationComplete();


    }

    setAnimationComplete(){
        this.on('animationcomplete', function(animation, frame) {
            if(animation.key === this.anmAttack){
                this.myState=STATE_EN_IDLE;
            }
        }, this);
    }

    updateConfig(){
        this.myAttackTimer = 0;
        this.lives = this.maxLives;
        this.body.maxVelocity.setTo(this.maxVelocity); // x, y
        this.body.drag.setTo(DRAG,DRAG);
	    this.body.setSize(this.bdyW,this.bdyH);
        this.body.setOffset(this.bdyX,this.bdyY);
        this.play(this.anmDefault);

    }

    mySetScale(){

    }

    init() {
        // Override this
    }

    update(time,delta){

        this.myPreUpdate(time,delta);
        if(this.myAttackTimer>0) this.myAttackTimer--;
        curSpells.forEach((spell, i) => {
          if (spell.timer>0) {
            spell.timer--;
          }
        });

        if(this.shadowTimer>0){
          this.shadowTimer-=delta;
          if(this.shadowTimer<=0){
              this.shadowTimer=0;
              this.stopShadowForm();
          }
        }


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
            case STATE_EN_ATTACK:
                this.attack(time,delta);
                break;
            case STATE_EN_DIE:
                this.die(time,delta);
                break;
            case STATE_EN_DEAD:
                this.dead();
                break;
            default:
                this.idle(time,delta);
                break;
        }



        this.myPostUpdate(time,delta);
    }

    idle(time,delta){
        this.checkInput();
        if(this.anims.currentAnim && this.anims.currentAnim.key != this.anmIdle){
            this.play(this.anmIdle);
        }
    }

    walk(time,delta){
        this.checkInput();
        if(this.anims.currentAnim && this.anims.currentAnim.key != this.anmWalk){
            this.play(this.anmWalk);
        }
    }

    attack(time,delta){
        this.body.setVelocity(0);
        this.body.acceleration.x = 0;
        this.body.acceleration.y = 0;
        if(this.anims.currentAnim.key != this.anmAttack){
            this.play(this.anmAttack);
        }
    }



    checkInput(){
        if (fireInputIsActive()) {
            if(this.myAttackTimer<=0){
                this.attack1();
                this.myState=STATE_EN_ATTACK;
            }
        }else{

            if (leftInputIsActive()) {
                // If the LEFT key is down, set the player velocity to move left
                this.body.acceleration.x = -ACCELERATION;
                this.flipX=true;
            } else if (rightInputIsActive()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.body.acceleration.x = ACCELERATION;
                this.flipX=false;
            }else{
                this.body.acceleration.x = 0;
            }

            if (upInputIsActive()) {
                this.body.acceleration.y = -ACCELERATION;
            } else if (downInputIsActive()) {
                this.body.acceleration.y = ACCELERATION;

            }else {
                this.body.acceleration.y = 0;
            }

            if(Phaser.Input.Keyboard.JustDown(key1)) this.attackSpecial(0);
            if(Phaser.Input.Keyboard.JustDown(key2)) this.attackSpecial(1);
            if(Phaser.Input.Keyboard.JustDown(key3)) this.attackSpecial(2);
            if(Phaser.Input.Keyboard.JustDown(key4)) this.attackSpecial(3);
            if(Phaser.Input.Keyboard.JustDown(key5)) this.attackSpecial(4);
            if(Phaser.Input.Keyboard.JustDown(key6)) this.attackSpecial(5);
            if(Phaser.Input.Keyboard.JustDown(key7)) this.attackSpecial(6);


            if(this.body.velocity.x != 0 || this.body.velocity.y != 0){
                this.myState=STATE_EN_MOVE;
            }else{
                this.myState=STATE_EN_IDLE;
            }

        }

    }

    attack1(){
        if(this.myAttackTimer>0) return false;
        this.myAttackTimer = this.myAttackFrequency;
        let config = {faction:0,img:'bulletIce',anm:'bulletIce',initSpeed:500,damage:1 + this.bonusDamage}
        let pointer = this.myScene.input.activePointer;
        let A = Phaser.Math.Angle.Between(this.x,this.y,pointer.worldX,pointer.worldY);
        this.fireBullet(A,config);
    }

    fireBullet(angle,config){

        let dir = this.flipX ? -1 : 1;

        let bullet = new Bullet(this.myScene,this.x + (this.xOff*dir),this.y,angle,config);

        if(this.myScene.backpack.hasItem("braceletOfWinds")){
            bullet.kb += 100;
        }

    }

    attackSpecial(idx){
      let spell = curSpells[idx];
      if(!spell) return false;
      if (spell.timer<=0) {
        spell.timer=spell.cooldown;
        execFn(spell.method, this);
      }
    }

    makeIceShield(){
      let shield = new Shield(this.myScene,this.x,this.y,{anm:'iceShield'});
    }
    makeFireStorm(){
        //instantiate firestorm
      let fire = new Firestorm(this.myScene,this.x,this.y);
    }
    makeShadowForm(){
        //instantiate firestorm
      // this.shadowTimer=this.shadowFormDuration;
      // this.canBeDamaged=false;
      // this.setTint('0x000000');
      new ShadowTwin(this.myScene,this.x+8,this.y);
      new ShadowTwin(this.myScene,this.x-8,this.y);

    }
    stopShadowForm(){
      this.canBeDamaged=true;
      this.setTint('0xffffff');
    }


    myPreUpdate(time,delta){

    }

    myPostUpdate(time,delta){

    }

    applyDamage(D){
        if(!D) return false
        if(this.myState === STATE_EN_DEAD) return false;
        if(!this.canBeDamaged) return false;
        lives-=D;
        this.myScene.events.emit('playerTookDamage');
        this.myScene.hitHurtPlr.play();

        if(lives<=0){
            lives=0;
            this.die();
        }
    }

    die(){
        this.myState = STATE_EN_DEAD;
        if(this.anmDie){
            // create a corpse object that you won't collide with
            let corpse = new Corpse(this.myScene,this.x,this.y);
            if(this.onCorpseDestroy){
                corpse.onDestroy = this.onCorpseDestroy;
            }
            corpse.play(this.anmDie);
        }else{
            this.onCorpseDestroy();
        }
        this.visible = false;
    }

    onCorpseDestroy(){
        this.myScene.events.emit('playerDied');
    }

    dead(){

    }
}
