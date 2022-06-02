class StarPortal extends Portal {

    init(){
        this.anm = 'starPortalClosed';
        this.anmOpen = 'starPortalOpen';
        this.anmOpening = 'starPortalOpening';
        this.type = "boss";
        this.goToLvl="boss4";
    }

    onEnter(){
        if(!this.open) return false;
        this.open = false;

        lvlId = this.goToLvl;
        path=[];
        this.myScene.restart=true;
    }
}