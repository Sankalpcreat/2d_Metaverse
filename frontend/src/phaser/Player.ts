// src/phaser/Player.ts

import Phaser from 'phaser';

export class Player {
  sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
  }

  update(time: number, delta: number) {
   //yaha par  avartar ke velolity and direcrtly with key board check karenge
  }

  setVelocityX(value: number) {
    this.sprite.setVelocityX(value);
  }

  setVelocityY(value: number) {
    this.sprite.setVelocityY(value);
  }
}
