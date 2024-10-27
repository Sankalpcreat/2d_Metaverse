import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene{
    constructor(){
        super({key:'PreloadScene'});
    }
    preload(){
        // Load the tilemap JSON and the tileset image
        this.load.tilemapTiledJSON('map', 'assets/ss1.json');

        this.load.image('tiles', 'assets/ss1.png');
        
 // You can load other assets, plyaer avatar
        this.load.spritesheet('player','assets/avatar.png',{frameWidth:32,frameHeight:32})
    }
    create() {
        // Once assets are loaded, start the game scene
        this.scene.start('GameScene');
    }
}