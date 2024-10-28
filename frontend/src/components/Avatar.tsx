import React, { useEffect } from 'react';
import Phaser from 'phaser';
// useDispatch and useSelector are used to manage player data (like the position) and update the global state via Redux.
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
// The player’s position is continuously updated in the Redux store using the updatePosition action from the playerSlice.ts.
import { updatePosition } from '../store/playerSlice';
import { Player } from '../phaser/Player';

export const Avatar: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  // Phaser is used to create the game world where the player avatar will be displayed.
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-avatar',
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
      this.load.spritesheet('player', 'assets/avatar.png', {
        frameWidth: 32,
        frameHeight: 48,
      });
    }

    function create() {
      const playerSprite = new Player(this, player.x, player.y);
      this.player = playerSprite;

      // Create player animations
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.player.sprite.play('walk');
    }

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

      // Update player position in the Redux store
      dispatch(updatePosition({ x: this.player.sprite.x, y: this.player.sprite.y }));
    }

    return () => {
      game.destroy(true); // Clean up on unmount
    };
  }, [dispatch, player.x, player.y]);

  return <div id="phaser-avatar"></div>;
};
