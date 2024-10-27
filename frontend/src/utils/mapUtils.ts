import Phaser from "phaser";

// Loads a tilemap JSON file and the corresponding tileset image, allowing the tilemap to be rendered in the game.
export const loadTilemap = (scene: Phaser.Scene, mapKey: string, tilesetImageKey: string) => {
    const map = scene.make.tilemap({ key: mapKey });
    const tileset = map.addTilesetImage(tilesetImageKey, tilesetImageKey);
    return { map, tileset };
  };


// Creates different layers in the game world (e.g., ground, objects) from the loaded tilemap. These layers are essential for separating different elements in the game, like the ground or interactive objects.
export const createMapLayers = (map: Phaser.Tilemaps.Tilemap, tileset: Phaser.Tilemaps.Tileset, layers: string[]) => {
    const createdLayers: Phaser.Tilemaps.TilemapLayer[] = [];
    
    layers.forEach(layerName => {
      const layer = map.createLayer(layerName, tileset, 0, 0);
      createdLayers.push(layer);
    });
    
    return createdLayers;
  };



// Enables collision detection between the player and specific layers or objects in the game. This is crucial for ensuring the player can't walk through walls, or interact correctly with objects like chairs or doors.
  export const setupCollisions = (layer: Phaser.Tilemaps.TilemapLayer, objectsLayer?: Phaser.Tilemaps.ObjectLayer) => {
    if (layer) {
      layer.setCollisionByProperty({ collides: true });
    }
    if (objectsLayer) {
      objectsLayer.objects.forEach(object => {
        const objSprite = layer.scene.physics.add.sprite(object.x, object.y, object.name);
        objSprite.setCollideWorldBounds(true);  
      });
    }
  };

  