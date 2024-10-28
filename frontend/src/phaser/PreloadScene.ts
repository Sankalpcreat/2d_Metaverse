import Phaser from 'phaser';

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
