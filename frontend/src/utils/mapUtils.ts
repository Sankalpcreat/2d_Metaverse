import Phaser from 'phaser';

export const loadTilemap = (scene: Phaser.Scene, key: string, tilesetImage: string) => {
  const map = scene.make.tilemap({ key });
  const tileset = map.addTilesetImage('TX Struct', tilesetImage);
  const groundLayer = map.createLayer('Tile Layer 1', tileset);

  // Set collision for the ground layer to prevent player from passing through certain tiles
  groundLayer.setCollisionByExclusion([-1]);
  return { map, groundLayer };
};

export const enableCollisions = (scene: Phaser.Scene, player: Phaser.GameObjects.Sprite, layer: Phaser.Tilemaps.TilemapLayer) => {
  scene.physics.add.collider(player, layer);
};
// loaded the tileset to be used in phaser and collision logic function defined here