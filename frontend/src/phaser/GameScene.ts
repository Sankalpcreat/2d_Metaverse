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
    // Load the tilemap JSON
    this.load.tilemapTiledJSON('tilemap', '/ss1.json');

    // Load ALL required tileset images based on your tilemap JSON
    this.load.image('TX Tileset Grass', '/Texture/TX Tileset Grass.png');
    this.load.image('TX Struct', '/Texture/TX Struct.png');
    this.load.image('TX Tileset Wall', '/Texture/TX Tileset Wall.png');
    this.load.image('TX Tileset Stone Ground', '/Texture/TX Tileset Stone Ground.png');
    this.load.image('TX Props', '/Texture/TX Props.png');

    // Other assets
    this.load.spritesheet('player', '/player.png', { 
      frameWidth: 32, 
      frameHeight: 48 
    });
    this.load.image('chair', '/chair.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' });

    // Add each tileset individually
    const grassTileset = map.addTilesetImage('TX Tileset Grass', 'TX Tileset Grass');
    const structTileset = map.addTilesetImage('TX Struct', 'TX Struct');
    const wallTileset = map.addTilesetImage('TX Tileset Wall', 'TX Tileset Wall');
    const stoneTileset = map.addTilesetImage('TX Tileset Stone Ground', 'TX Tileset Stone Ground');
    const propsTileset = map.addTilesetImage('TX Props', 'TX Props');

    // Create layer with all tilesets as an array
    const groundLayer = map.createLayer('Tile Layer 1', 
      [grassTileset, structTileset, wallTileset, stoneTileset, propsTileset], 
      0, 
      0
    );

    if (groundLayer) {
      groundLayer.setCollisionByExclusion([-1]);
    }

    // Rest of your code
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