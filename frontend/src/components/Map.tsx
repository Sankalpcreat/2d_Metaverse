import React, { useEffect } from 'react';
import Phaser from 'phaser';
// PreloadScene to load assets like tilesets and the GameScene
import { PreloadScene } from '../phaser/PreloadScene';

import { GameScene } from '../phaser/GameScene';

export const Map: React.FC = () => {
  // This sets up the game world with dimensions, physics, and scenes.

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      scene: [PreloadScene, GameScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    new Phaser.Game(config); // Initialize the Phaser game instance

    return () => {
      Phaser.Game.destroy(true); // Cleanup after finished
    };
  }, []);

  return <div id="phaser-game" style={{ width: '800px', height: '600px' }} />;
};
