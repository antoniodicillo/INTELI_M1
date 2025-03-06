import { Jogo } from "./src/jogo.js";
import { GameOver } from "./src/gameOver.js";
import { Menu, Creditos, Controles } from "./src/menu.js";
import { Boss } from "./src/boss.js";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
      plugins: [],
    });
  }

  create() {
    if(!localStorage.getItem("Caveiras")) {
      localStorage.setItem('Caveiras',0)
    }   

    this.scene.start("Boss");
    this.scene.stop("boot");
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

  scene: [BootScene, Menu, Creditos, Controles,  Jogo, GameOver, Boss]
};


const game = new Phaser.Game(config);
