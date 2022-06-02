class Mob extends Npc {
    // A harmless creature

    updateConfig(){
        this.doesMove = true;
        this.timedInteract=false;
        this.myBumpTimer = this.myBumpFrequency;
    }



}