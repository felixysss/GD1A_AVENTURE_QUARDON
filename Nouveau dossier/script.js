import {sceneRue} from "./assets/scripts/rue.js";
import {sceneCroisement} from "./assets/scripts/croisement.js";
import {sceneEcole} from "./assets/scripts/ecole.js";
import {sceneCover} from "./assets/scripts/cover.js"
import { sceneHub } from "./assets/scripts/hub.js";
import { sceneClasse1 } from "./assets/scripts/classe_1.js";

var config = 
{
    type: Phaser.AUTO,
        scale:{
            mode: Phaser.Scale.FIT,
            width: 960, 
            height: 540
    },
        
    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 0 },
            debug: true
        }
    },
    
    scene: [sceneCover, sceneRue, sceneCroisement, sceneEcole, sceneHub, sceneClasse1,],
    pixelArt: true,


};
new Phaser.Game(config);