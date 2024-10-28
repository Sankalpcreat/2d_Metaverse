import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const ObjectInteractions: React.FC = () => {
    // Get the player's position from the Redux store
  const player = useSelector((state: RootState) => state.player);


  // The useEffect hook ensures the Phaser game is initialized when the component is first rendered
  
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-interactions',
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
    // loads the assets required for the game
    function preload() {
      this.load.image('chair', 'assets/chairSprite.png');
    }
          // Create function: initializes the player and the interactive chair in the game
    function create() {
      const playerSprite = this.physics.add.sprite(player.x, player.y, 'player');
      const chair = this.physics.add.staticImage(400, 300, 'chair');
      this.physics.add.collider(playerSprite, chair, () => {
        console.log('Player interacting with chair');
      });
    }

    function update() {}

    return () => {
      game.destroy(true);
    };
  }, [player.x, player.y]);

  return <div id="phaser-interactions"></div>;
};
