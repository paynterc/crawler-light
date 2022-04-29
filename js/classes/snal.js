class Snal extends Mob {

    init(){
        // A harmless creature
        this.anmDefault = 'snalGuyWalk';
        this.anmWalk = 'snalGuyWalk';
        this.defaultAcc = 5;
        this.maxVelocity = 5;
        this.myScene.npcs.add(this);
    }


    interact(){

        if(this.interacting) return false;
        this.interacting = true;
        // if not has mission

        let tipsF =  tips.filter(function(tip) {
          return tip.shown === false;
        });
        let theTip = tipsF[0];

        if(theTip){
            this.myScene.showText(theTip.txt);
            theTip.shown=true;
        }

    }

}