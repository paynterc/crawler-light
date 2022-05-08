class Boss extends Enemy {

    applyDamage(D){
        this.hp-=D;
        this.hp=this.hp<0?0:this.hp;
        this.myScene.events.emit('bossHealthUpdate',this.hp/this.maxHp);
        if(this.hp<=0){
            this.die();
        }
    }
}