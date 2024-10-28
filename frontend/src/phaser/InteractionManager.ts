import Phaser from 'phaser';

export class InteractionManager {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;

    // Set up the interaction key (SPACE)
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    // If the interaction key is pressed, handle the interaction
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      // Implement your interaction logic here
      console.log('Interaction triggered');
      // Example: Implement logic to interact with a nearby object
    }
  }
}
