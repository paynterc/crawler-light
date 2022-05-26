class Firefly extends Mob {
    // A harmless creature

    updateConfig(){
        this.doesMove = true;
        this.timedInteract=false;

    }

    updateConfig(){
        this.doesMove = true;
        this.timedInteract=false;
        this.play('firefly',false,Phaser.Math.Between(0,7));
    }

}