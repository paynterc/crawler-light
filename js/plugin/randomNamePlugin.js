class RandomNamePlugin extends Phaser.Plugins.BasePlugin {
    // Global plugin
    constructor (pluginManager)
    {
        super(pluginManager);

        this.syllables1 = [ 'fro', 'tir', 'nag', 'bli', 'mon', 'zip' ];
        this.syllables2 = [ 'fay', 'shi', 'zag', 'blarg', 'rash', 'izen' ];
        this.inc = 1;
        this.current = this.syllables1;
    }


    init ()
    {
//        console.log('Plugin is alive');
    }

    start()
    {
        //  Here are the game-level events you can listen to.
        //  At the very least you should offer a destroy handler for when the game closes down.

         var eventEmitter = this.game.events;

         eventEmitter.once('destroy', this.gameDestroy, this);
        // eventEmitter.on('pause', this.gamePause, this);
        // eventEmitter.on('resume', this.gameResume, this);
        // eventEmitter.on('resize', this.gameResize, this);
        // eventEmitter.on('prestep', this.gamePreStep, this);
        // eventEmitter.on('step', this.gameStep, this);
        // eventEmitter.on('poststep', this.gamePostStep, this);
        // eventEmitter.on('prerender', this.gamePreRender, this);
        // eventEmitter.on('postrender', this.gamePostRender, this);
//        console.log("RANDOM NAME START");
    }

    gameDestroy()
    {

    }

    stop()
    {
//            console.log("RANDOM NAME STOP");

    }


    getInc ()
    {
        this.inc++;
    }

    changeSet ()
    {
        this.current = this.syllables2;
    }

    getName ()
    {
        let name = '';

        for (let i = 0; i < Phaser.Math.Between(2, 4); i++)
        {
            name = name.concat(Phaser.Utils.Array.GetRandom(this.current));
        }

        return Phaser.Utils.String.UppercaseFirst(name);
    }

}