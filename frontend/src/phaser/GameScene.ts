import Phaser from "phaser";
import { Player } from './Player';

export class GameScene extends Phaser.Scene{
    constructor(){
        super({key:'GameScene'});
    }

    create() {
        // Create the map and link to the tileset image
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ss1', 'tiles');  // Link JSON and image
    
        // Create layers from the tilemap
        const groundLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);  // Layer created from your JSON
    
        // Add the player at a starting position
        this.player = new Player(this, 100, 100);  // Assuming the player starts at x=100, y=100
    
        // Setup camera to follow the player
        this.cameras.main.startFollow(this.player.sprite);
      }
    
      update(time, delta) {
        // Update player position and interactions
        this.player.update(time, delta);
      }
    }