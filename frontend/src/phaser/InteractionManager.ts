import Phaser from 'phaser';

export class InteractionManager {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;

    // Listen for interaction keys
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      // Handle object interaction when the player presses SPACE
      console.log('Interaction triggered');
      // Implement object interaction logic here
    }
  }
}
