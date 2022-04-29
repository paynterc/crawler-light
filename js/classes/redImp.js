class RedImp extends Enemy {


    init() {
        this.anmWalk = 'redImpWalk';
        this.anmRun = 'redImpWalk';
        this.anmTell = 'redImpTell';
        this.anmAttack = 'redImpAttack';
        this.attackVelocity = 200;
        this.agroRange=256;
        this.hp=1;

	    this.body.setSize(12,12);
		this.body.setOffset(2,18)

        //this.startMovement();
    }


}