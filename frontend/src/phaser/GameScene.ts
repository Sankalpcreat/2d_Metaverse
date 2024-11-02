import Phaser from "phaser";
import { Player } from './Player';
import { InteractionManager } from "./InteractionManager";

export class GameScene extends Phaser.Scene {
  player: Player;
  interactionManager!: InteractionManager;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
 
    this.load.tilemapTiledJSON('tilemap', '/ss1.json'); 


    this.load.spritesheet('player', '/player.png', { frameWidth: 32, frameHeight: 48 }); 
    this.load.image('chair', '/chair.png');      
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' });

   
    const groundLayer = map.createLayer('Tile Layer 1', map.tilesets.map(tileset => map.addTilesetImage(tileset.name)), 0, 0);
    groundLayer.setCollisionByExclusion([-1]);


    this.player = new Player(this, 100, 100);
    const chair = this.physics.add.staticImage(400, 300, 'chair');
    this.physics.add.collider(this.player.sprite, chair, this.handleChairInteraction, null, this);


    this.interactionManager = new InteractionManager(this, this.player);
  }

  handleChairInteraction() {
    console.log('Player interacted with the chair');
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.interactionManager.update();
  }
}
