import Phaser from 'phaser';

export class TilemapLoader {
  loadTilemap(scene: Phaser.Scene) {
    const map = scene.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('TX Struct', 'tiles');
    const groundLayer = map.createLayer('Tile Layer 1', tileset);
    groundLayer.setCollisionByExclusion([-1]);
  }
}
