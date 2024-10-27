export class InputManager {
  constructor(scene, player) {
    this.cursors = scene.input.keyboard.createCursorKeys();  // Use arrow keys for movement
    this.player = player;
  }

  update() {
    const speed = 150;  // Define movement speed

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);  // Stop movement when no key is pressed
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    } else {
      this.player.setVelocityY(0);
    }
  }
}
