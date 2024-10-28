import Phaser from 'phaser';

export class Player {
  sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true); // Ensure the player stays within the game bounds
  }

  // Update the player's X velocity
  setVelocityX(value: number) {
    this.sprite.setVelocityX(value);
  }

  // Update the player's Y velocity
  setVelocityY(value: number) {
    this.sprite.setVelocityY(value);
  }
}
