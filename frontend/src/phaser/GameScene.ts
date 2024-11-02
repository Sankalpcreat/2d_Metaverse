import Phaser from "phaser";
import {Player} from './Player'
import { InteractionManager } from "./InteractionManager";

export class GameScene extends Phaser.Scene{
  player:Player;
  interactionManager!:InteractionManager;

constructor() {
  super({ key: 'GameScene' });
}

preload(){
  this.load.tilemapTiledJSON('tilemap','assets/ss1.json');
  this.load.image('tiles','assets/ss1.png');
  this.load.spritesheet('player','assets/avatar.png',{frameWidth:32,frameHeight:48});
  this.load.image('chair','assets/chairSprite.png');
}

create() {
  const map = this.make.tilemap({ key: 'tilemap' });
  const tileset = map.addTilesetImage('TX Struct', 'tiles');
  const groundLayer = map.createLayer('Tile Layer 1', tileset);
  groundLayer.setCollisionByExclusion([-1]);

  this.player = new Player(this, 100, 100);

  const chair = this.physics.add.staticImage(400, 300, 'chair');
  this.physics.add.collider(this.player.sprite, chair, this.handleChairInteraction, null, this);

  this.interactionManager = new InteractionManager(this, this.player);
}

handleChairInteraction() {
  console.log('Player interacted with the chair');
}

update(time: number, delta: number) {
  this.player.update(time, delta);
  this.interactionManager.update();
}
}