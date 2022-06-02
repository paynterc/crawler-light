class SelectScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'SelectScene', active: false});
    }

    preload()
    {

    }

    create ()
    {
        let that = this;

        this.backpack = this.plugins.get('BackpackPlugin');


        this.titleText = this.add.text(centerX, 32, "select your hero", { fontSize: '24px', fontFamily: 'FourBitRegular' });
        this.titleText.setOrigin(0.5);

        this.startText = this.add.text(centerX, H-48, "START", { fontSize: '24px', fontFamily: 'FourBitRegular' });
        this.startText.setOrigin(0.5);

        this.startText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            setGameDefaults();
            that.backpack.items = [];
            that.scene.launch('HudScene');
            that.scene.start('GameScene');
        }).on('pointerover',function(){
              this.setTint('0x00ff00');
          }).on('pointerout',function(){
              this.setTint('0xffffff');
          });


        this.exitText = this.add.text(centerX, H-20, "go back", { fontSize: '14px', fontFamily: 'FourBitRegular' })
        .setOrigin(0.5)
        .setInteractive().on('pointerdown', function(pointer, localX, localY, event){
          that.scene.start('MenuScene');
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });

        this.anims.create(animConfigs.rogueIdle);
        this.anims.create(animConfigs.wizard1Walk);

        this.H = 0;
        this.Hy = H/2;
        this.heroImg = this.add.sprite(W/2,this.Hy + curHero.yOffset,curHero.img).setScale(4);
        this.heroImg.play(curHero.anmIdl);


        this.nextHero = this.add.image(centerX+96,centerY, "uiArrow").setScale(10).setOrigin(0.5);
        this.nextHero.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.H++;
            if(that.H >= heroes.length){
                that.H=0;
            }
            curHero = heroes[that.H];
            that.heroImg.y = that.Hy + curHero.yOffset;
            that.heroImg.play(curHero.anmIdl);
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });


        this.prevHero = this.add.image(centerX-96,centerY, "uiArrow").setScale(-10).setOrigin(0.5);
        this.prevHero.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.H--;
            if(that.H < 0){
                that.H= heroes.length -1;
            }
            curHero = heroes[that.H];
            that.heroImg.y = that.Hy + curHero.yOffset;
            that.heroImg.play(curHero.anmIdl);
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });

    }
}