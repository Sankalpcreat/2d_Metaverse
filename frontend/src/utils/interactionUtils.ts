import Phaser from 'phaser';

export const checkProximity = (player: Phaser.Physics.Arcade.Sprite, object: Phaser.Physics.Arcade.Sprite, range: number): boolean => {
  const distance = Phaser.Math.Distance.Between(player.x, player.y, object.x, object.y);
  return distance < range;
};

// Trigger specific actions based on proximity
export const triggerInteraction = (player: Phaser.Physics.Arcade.Sprite, object: Phaser.Physics.Arcade.Sprite) => {
  if (object.texture.key === 'chair') {
    console.log('Player is sitting on the chair');
  }
};
