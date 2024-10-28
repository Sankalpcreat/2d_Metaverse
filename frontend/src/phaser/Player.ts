import Phaser from 'phaser';

// Class representing the player character
export class Player {
  sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
  }

  update(time: number, delta: number) {}

   // Method to set the player's horizontal velocity
  setVelocityX(value: number) {
    this.sprite.setVelocityX(value);
  }
 // Method to set the player's vertical velocity
  setVelocityY(value: number) {
    this.sprite.setVelocityY(value);
  }
}
