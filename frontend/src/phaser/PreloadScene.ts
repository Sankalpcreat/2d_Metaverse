import Phaser from 'phaser';
//here preload of all game map and avatar and chair and other stuff needed to synchornize with frontend
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.tilemapTiledJSON('tilemap', 'assets/ss1.json');
    this.load.image('tiles', 'assets/ss1.png');
    this.load.spritesheet('player', 'assets/avatar.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('chair', 'assets/chairSprite.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}
