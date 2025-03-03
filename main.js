import { Jogo } from "./src/jogo.js";
import { GameOver } from "./src/gameOver.js";
import { Menu } from "./src/menu.js";
import { Boss } from "./src/boss.js";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
      plugins: [],
    });
  }

  create() {
    this.scene.start("Jogo");
  }
}

const larguraJogo = 1000;
const alturaJogo = 550;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  width: larguraJogo,
  height: alturaJogo,
  pixelArt: true,
  roundPixels: false,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true,
    },
  },

  scene: [BootScene, Jogo, GameOver, Menu, Boss]
};

const game = new Phaser.Game(config);
