import { Jogo } from "./jogo.js";
import { GameOver } from "./gameOver.js";

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

const larguraJogo = 879;
const alturaJogo = 483;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  width: larguraJogo,
  height: alturaJogo,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true,
    },
  },

  scene: [BootScene, Jogo, GameOver]
};

const game = new Phaser.Game(config);
