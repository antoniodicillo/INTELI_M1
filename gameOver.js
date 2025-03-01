export class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver",
      plugins: [],
    });
  }
  
   create() {
    this.add.text((this.scale.width / 2), (this.scale.height / 2), "Game Over", {
      font: "65px Arial",
      fill: "red",
    });
  }

}

