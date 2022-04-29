class BossPortal extends Portal {

    init(){
        this.anm = 'portalClosedBoss';
        this.anmOpen = 'portalOpenBoss';
        this.anmOpening = 'portalOpeningBoss';

        this.goToLvl = "boss1";
    }

    onEnter(){
        if(!this.open) return false;
        this.open = false;

        lvlId = this.goToLvl;
        this.myScene.restart=true;
    }
}