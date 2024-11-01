import Phaser from 'phaser';

export const isNearObject = (player: Phaser.GameObjects.Sprite, object: Phaser.GameObjects.Sprite, distance: number = 50) => {
  const dx = player.x - object.x;
  const dy = player.y - object.y;
  return Math.sqrt(dx * dx + dy * dy) <= distance;
};

export const handleObjectInteraction = (objectKey: string) => {
  if (objectKey === 'chair') {
    console.log('Player sits on the chair');
  } else {
    console.log(`Player interacts with ${objectKey}`);
  }
};
