import Phaser from 'phaser';

export class Player {
  constructor(scene, x, y) {
    // Create a player sprite
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    
    // Define player size and boundaries
    this.sprite.setCollideWorldBounds(true);
  }

  update(time, delta) {
    // Any player update logic can go here
  }

  setVelocityX(value) {
    this.sprite.setVelocityX(value);
  }

  setVelocityY(value) {
    this.sprite.setVelocityY(value);
  }
}
