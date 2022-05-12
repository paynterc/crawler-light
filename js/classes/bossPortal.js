class BossPortal extends Portal {

    init(){
        this.anm = 'portalClosedBoss';
        this.anmOpen = 'portalOpenBoss';
        this.anmOpening = 'portalOpeningBoss';
        this.type = "boss";
        this.goToLvl = "boss1";
    }

    onEnter(){
        if(!this.open) return false;
        this.open = false;

        lvlId = this.goToLvl;
        path=[];
        this.myScene.restart=true;
    }
}