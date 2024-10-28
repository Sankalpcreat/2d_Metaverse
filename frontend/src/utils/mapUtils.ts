import Phaser from 'phaser';

export const loadTilemap = (scene: Phaser.Scene, key: string, tilesetName: string, imageKey: string) => {
  const map = scene.make.tilemap({ key });
  const tileset = map.addTilesetImage(tilesetName, imageKey);
  const groundLayer = map.createLayer('Tile Layer 1', tileset);
  groundLayer.setCollisionByExclusion([-1]);
  return groundLayer;
};


export const setupCollisions = (scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, object: Phaser.Physics.Arcade.StaticGroup) => {
  scene.physics.add.collider(player, object, () => {
    console.log('Collision detected with object');
  });
};
