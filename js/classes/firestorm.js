class Firestorm extends Gun {
    // A harmless creature

    init(){
      this.A = 0;
      this.shots=15;
      this.myDelay = 5;
      this.setVisible(false);
      this.shoot();
    }

    shoot(){

      let xx = this.x;
      let yy = this.y;

      let A1 = this.A * (Math.PI/180);
      let A2 = (this.A+90) * (Math.PI/180);
      let A3 = (this.A+180) * (Math.PI/180);
      let A4 = (this.A+270) * (Math.PI/180);

      let bullet1 = new Bullet(this.myScene,xx,yy,A1,{faction:0,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
      let bullet2 = new Bullet(this.myScene,xx,yy,A2,{faction:0,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
      let bullet3 = new Bullet(this.myScene,xx,yy,A3,{faction:0,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
      let bullet4 = new Bullet(this.myScene,xx,yy,A4,{faction:0,initSpeed:300,img:'darkEnergy',anm:'darkEnergy'});
      this.A +=6;
      this.shots--;
      if(this.shots<1) this.destroy();
    }


}
