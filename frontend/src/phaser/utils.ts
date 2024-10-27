import Phaser from 'phaser';

export const loadTilemap = (scene: Phaser.Scene, mapKey: string, tilesetKey: string) => {
  const map = scene.make.tilemap({ key: mapKey });
  const tileset = map.addTilesetImage(tilesetKey);
  const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);  // Adjust the layer as needed
  return layer;
};
