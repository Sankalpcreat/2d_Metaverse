import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Phaser from 'phaser';
import { RootState } from '../store';
import { updatePosition } from '../store/playerSlice';

export const Avatar: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-avatar',
      scene: {
        preload,
        create,
        update,
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
      this.load.spritesheet('player', 'assets/avatar.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create() {
      const playerSprite = this.physics.add.sprite(player.x, player.y, 'player');
      this.player = playerSprite;
      this.player.setCollideWorldBounds(true);
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

      dispatch(updatePosition({ x: this.player.x, y: this.player.y }));
    }

    return () => {
      game.destroy(true);
    };
  }, [dispatch, player.x, player.y]);

  return <div id="phaser-avatar"></div>;
};
