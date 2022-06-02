class MenuScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'MenuScene', active: false});
    }

    preload()
    {

    }

    create ()
    {
        let that = this;
                this.anims.create(animConfigs.firefly);

        this.titleText = this.add.text(centerX, centerY, "Weird Woods", { fontSize: '48px', fontFamily: 'FourBitRegular' });
        this.titleText.setOrigin(0.5);

        let startX = savedGameExists ? 94 : centerX;

        this.startText = this.add.text(startX, centerY+64, "New Game", { fontSize: '18px', fontFamily: 'FourBitRegular' })
        .setOrigin(0.5)
        .setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.scene.start('SelectScene');
        });

        if(savedGameExists){
           this.continueText = this.add.text(W-startX, centerY+64, "Continue", { fontSize: '18px', fontFamily: 'FourBitRegular' })
           .setOrigin(0.5)
           .setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                that.scene.launch('HudScene');
                that.scene.start('GameScene');
            });
        }

        for(var i=0;i<40;i++){
            let ss = this.add.sprite(Phaser.Math.Between(64,W-64),Phaser.Math.Between(64,H-64),'firefly');
            ss.play('firefly',false,Phaser.Math.Between(0,7));
        }

    }
}