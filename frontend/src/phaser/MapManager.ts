import Phaser from 'phaser';

export class MapManager {
  scene: Phaser.Scene;
  map: Phaser.Tilemaps.Tilemap;
  tileset: Phaser.Tilemaps.Tileset;
  groundLayer: Phaser.Tilemaps.TilemapLayer;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.map = scene.make.tilemap({ key: 'tilemap' });
    this.tileset = this.map.addTilesetImage('TX Struct', 'tiles');
    this.groundLayer = this.map.createLayer('Tile Layer 1', this.tileset);
    this.groundLayer.setCollisionByExclusion([-1]);
  }
}
