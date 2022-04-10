class MediaService {

    constructor(myScene) {
        this.myScene = myScene;
        this.music = undefined;
        this.curVolume = defaultVolume;
        myScene.events.on('audioClicked', this.toggleMusic, this);
        myScene.events.on('volumeUpdate', this.setMusicVolume, this);
    }

    setMusic(musicKey){
        if(this.music){
            this.music.stop();
        }
        this.music = this.myScene.sound.add(musicKey, {
            mute: false,
            volume: defaultVolume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.music.play();
    }

    toggleMusic(){
        if(this.music.volume > 0){
            this.music.setVolume(0)
        }else{
            this.music.setVolume(this.curVolume);
        }
    }

    setMusicVolume(v){
        this.curVolume=v;
        this.music.setVolume(v);
    }

}