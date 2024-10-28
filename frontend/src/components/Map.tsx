import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from '../phaser/GameScene';

export const Map: React.FC = () => {
  useEffect(() => {
    // Phaser configuration object that defines how the game will run
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-map',
      scene: [GameScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);
      //clean up the for avoiding memory leakes
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-map"></div>;
};
