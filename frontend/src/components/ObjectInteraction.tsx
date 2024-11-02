import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { InteractionManager } from '../phaser/InteractionManager';

export const ObjectInteractions: React.FC = () => {
  const player = useSelector((state: RootState) => state.player);

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

    function preload() {
      this.load.image('chair', 'assets/chairSprite.png');
    }

    function create() {
      const playerSprite = this.physics.add.sprite(player.x, player.y, 'player');
      const chair = this.physics.add.staticImage(400, 300, 'chair');
      this.physics.add.collider(playerSprite, chair, () => {
        console.log('Player interacting with chair');
      });

      this.interactionManager = new InteractionManager(this, playerSprite);
    }

    function update() {
      this.interactionManager.update();
    }

    return () => {
      game.destroy(true);
    };
  }, [player.x, player.y]);

  return <div id="phaser-interactions"></div>;
};
