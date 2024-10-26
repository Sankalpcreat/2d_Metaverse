import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { useDispatch } from 'react-redux';
import { updatePosition } from '../store/playerSlice';

const Map: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      
      this.load.tilemapTiledJSON('tilemap', 'assets/ss1.json');
      this.load.image('tiles', 'assets/ss1.png');
    }

    function create(this: Phaser.Scene) {
    
      const map = this.make.tilemap({ key: 'tilemap' });
      const tileset = map.addTilesetImage('TX Struct', 'tiles');
      map.createLayer('Tile Layer 1', tileset, 0, 0);

      const player = this.physics.add.sprite(100, 100, 'avatar');
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(player);
    }

    function update(this: Phaser.Scene) {
    
      const cursors = this.input.keyboard.createCursorKeys();
      const player = this.physics.world.bounds;
      if (cursors.left.isDown) {
        dispatch(updatePosition({ x: player.x - 10, y: player.y }));
      }
      if (cursors.right.isDown) {
        dispatch(updatePosition({ x: player.x + 10, y: player.y }));
      }
     
    }

    return () => {
      game.destroy(true);
    };
  }, [dispatch]);

  return <div id="phaser-game"></div>;
};

export default Map;
