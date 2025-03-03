export class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: "Menu",
      plugins: [],
    });
  }
  preload() {

  }
  create() {
     // Get the center coordinates of the screen
     const centerX = this.cameras.main.width / 2;
     const centerY = this.cameras.main.height / 2;
    this.textoPrincipal = this.add.text(centerX, centerY, 'Skibidi toilet', {
      fontSize: "14px",
      fill: "#ffffff",
    });
    console.log('hello world')
  }


}

