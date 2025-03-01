export class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: "Menu",
      plugins: [],
    });
  }
  preload() {
    this.load.image("background", "../assets/Background.png");
  }
  
  create() {
    this.textoPrincipal = this.add.text(0, 20, 400, {
      fontSize: "14px",
      fill: "#ffffff",
    });
    console.log('hello world')

    
  }
}

