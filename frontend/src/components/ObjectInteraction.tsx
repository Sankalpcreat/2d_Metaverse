import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { InteractionManager } from '../phaser/InteractionManager';

export const ObjectInteractions: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-interactions',
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // Load assets (e.g., player sprite and objects like chairs)
      this.load.spritesheet('player', 'assets/avatar.png', {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.image('chair', 'assets/chairSprite.png');
    }

    function create() {
      // Create player sprite
      const playerSprite = this.physics.add.sprite(player.x, player.y, 'player');
      this.player = playerSprite;
      this.player.setCollideWorldBounds(true); // Prevent player from leaving the game area

      // Create object (chair)
      const chair = this.physics.add.staticImage(400, 300, 'chair');
      
      // Add collision detection between player and chair
      this.physics.add.collider(this.player, chair, handleInteraction, null, this);

      // Initialize interaction manager to handle player-object interactions
      this.interactionManager = new InteractionManager(this, this.player);

      // Set up player animations
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.player.play('walk'); 
    }
    // The handleInteraction function gets triggered when the player collides with an object
    function handleInteraction(player, object) {
      console.log('Player is interacting with object:', object.texture.key);
      if (object.texture.key === 'chair') {
        console.log('Player sits on the chair');
      }
    }
    // The player moves based on keyboard input (arrow keys) by adjusting the player’s velocity (setVelocityX, setVelocityY).
    function update() {
      const cursors = this.input.keyboard.createCursorKeys();
      const velocity = 160;

      
      if (cursors.left.isDown) {
        this.player.setVelocityX(-velocity);
      } else if (cursors.right.isDown) {
        this.player.setVelocityX(velocity);
      } else {
        this.player.setVelocityX(0);
      }

      if (cursors.up.isDown) {
        this.player.setVelocityY(-velocity);
      } else if (cursors.down.isDown) {
        this.player.setVelocityY(velocity);
      } else {
        this.player.setVelocityY(0);
      }

      // Handle object interaction when player presses SPACE
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
        this.interactionManager.update();
      }
    }

    return () => {
      game.destroy(true); // Cleanup Phaser 
    };
  }, [dispatch, player.x, player.y]);

  return <div id="phaser-interactions"></div>;
};
