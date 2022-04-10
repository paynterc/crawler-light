class SettingsScene extends  Phaser.Scene{
    constructor ()
    {
        super({ key: 'SettingsScene', active: false });


    }
    preload(){
        this.load.image('button1', 'img/ring.png');
    }

    create(){
        let that = this;
        this.bootScene = this.scene.get('BootScene');
        //TODO: Maybe create a model object and store volume level there instead of referring directly to the mediaService
        let mediaService = this.bootScene.mediaService;
        this.lineMin = W/3;
        this.lineMax = W - this.lineMin;


        let audioIcon = this.add.image(this.lineMin-64,centerY,'audio');

        var graphics = this.add.graphics();
        graphics.lineStyle(5, 0xffffff, 1);
        graphics.lineBetween(this.lineMin,centerY,this.lineMax,centerY);
        let vSliderX = this.lineMin + ((that.lineMax - that.lineMin) * mediaService.curVolume);
        let button1 = this.add.sprite(vSliderX,centerY,'square');


        button1.setInteractive({ draggable: true })
        this.input.setDraggable(button1);
        this.input.dragDistanceThreshold = 4;
        let dragDirection = null;
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
            dragDirection = null;
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if(dragX >= that.lineMin && dragX <= that.lineMax){
                gameObject.x = dragX;
                let newVolume = (dragX - that.lineMin) / (that.lineMax - that.lineMin);
                that.bootScene.events.emit('volumeUpdate',newVolume);
            }
        });

        this.input.on('dragend', function (pointer, gameObject) {
            dragDirection = null;
            gameObject.clearTint();
        });


        let settingsButton = this.add.sprite(36,H-36,'equalizer').setAlpha(0.5).setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            //this.bootScene.events.emit('audioClicked');
            this.scene.resume('GameScene');
            this.scene.resume('HudScene');
            this.scene.stop();
        },this).on('pointerover',function(){
            this.setAlpha(1);
        }).on('pointerout',function(){
            this.setAlpha(0.5);
        });



    }


}