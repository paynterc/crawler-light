(function(){

    var root = this;

    class SomeScenePlugin extends Phaser.Plugins.ScenePlugin {
    
        constructor (scene, pluginManager)
        {
            super(scene, pluginManager);
    
        }
    
        boot ()
        {
            console.log('SomeScenePlugin is booted');
        }
    
        setConfig (config={})
        {

        }
    
    
        printTestVar ()
        {
            console.log('scene var',this.scene.testVar);
        }
    
    }


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = SomeScenePlugin;
        }
        exports.SomeScenePlugin = SomeScenePlugin;
    } else if (typeof define !== 'undefined' && define.amd) {
        define('SomeScenePlugin', (function() { return root.SomeScenePlugin = SomeScenePlugin; })() );
    } else {
        root.SomeScenePlugin = SomeScenePlugin;
    }

    return SomeScenePlugin;
}).call(this);