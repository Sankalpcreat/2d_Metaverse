import Phaser from 'phaser';
import { Player } from './Player';

// Class to handle player-object interactions 
export class InteractionManager {
  player: Player;
  interactKey!: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, player: Player) {
    this.player = player;
    this.interactKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
 // space bar ko interaction ke leye build karnege 
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      console.log('Interaction triggered');
    }
  }
}
