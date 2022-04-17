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
        this.titleText = this.add.text(centerX, centerY, "CRAWLER", { fontSize: '48px', fontFamily: 'FourBitRegular' });
        this.titleText.setOrigin(0.5);

        this.startText = this.add.text(centerX, centerY+64, "START", { fontSize: '24px', fontFamily: 'FourBitRegular' });
        this.startText.setOrigin(0.5);

        this.startText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.scene.start('GameScene');
        });
    }
}