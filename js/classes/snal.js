class Snal extends Npc {

    init(tipObj){
        // A harmless creature
        this.anmDefault = 'snalGuyWalk';
        this.anmIdle = 'snalGuyWalk';
        this.anmWalk = 'snalGuyWalk';
        this.defaultAcc = 5;
        this.maxVelocity = 5;
        this.doesMove = true;
        this.tipObj=tipObj;
    }


    interact(){

        if(this.tip){
            this.tipObj.shown = true;
            this.myScene.showText(this.tip);
        }

    }

}