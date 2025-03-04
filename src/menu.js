export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("backgroundMenu", "src/assets/BackgroundMenu.png");

    this.load.image("jogar", "src/assets/Jogar.png");
    this.load.image("jogarDestaque", "src/assets/JogarUnderline.png");

    this.load.image("creditos", "src/assets/Creditos.png");
    this.load.image("creditosDestaque", "src/assets/CreditosUnderline.png");

    this.load.image("controles", "src/assets/Controles.png");
    this.load.image("controlesDestaque", "src/assets/ControlesUnderline.png");
  }

  create() {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height;

    this.add.image(x, y /2, "backgroundMenu").setOrigin(0.5,0.5);

    this.textoPrincipal = this.add
      .text(x, y / 8, "The Blighted Forest", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.textoJogar = this.add.image(x, y / 2, "jogar").setInteractive();
    this.textoJogar.on("pointerover", () => {
      this.textoJogar.setTexture("jogarDestaque");
    });
    this.textoJogar.on("pointerout", () => {
      this.textoJogar.setTexture("jogar");
    });
    this.textoJogar.on("pointerdown", () => {
      this.scene.start("Jogo");
      this.scene.stop("Menu");
    });

    this.textoControles = this.add
      .image(x, y / 1.75, "controles")
      .setInteractive();
    this.textoControles.on("pointerover", () => {
      this.textoControles.setTexture("controlesDestaque");
    });
    this.textoControles.on("pointerout", () => {
      this.textoControles.setTexture("controles");
    });
    this.textoControles.on("pointerdown", () => {
      this.scene.start("Controles");
      this.scene.stop("Menu");
    });

    this.textoCreditos = this.add
    .image(x, y / 1.55, "creditos")
    .setInteractive();
  this.textoCreditos.on("pointerover", () => {
    this.textoCreditos.setTexture("creditosDestaque");
  });
  this.textoCreditos.on("pointerout", () => {
    this.textoCreditos.setTexture("creditos");
  });
  this.textoCreditos.on("pointerdown", () => {
    this.scene.start("Creditos");
    this.scene.stop("Menu");
  });
  }
}

export class Creditos extends Phaser.Scene {
  constructor() {
    super("Creditos");
  }

  preload() {
    this.load.image("backgroundMenu", "src/assets/BackgroundMenu.png");

    this.load.image("voltar", "src/assets/Voltar.png");
    this.load.image("voltarDestaque", "src/assets/VoltarUnderline.png");
  }

  create() {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height;

    this.add.image(x, y /2, "backgroundMenu").setOrigin(0.5,0.5);

    this.textoPrincipal = this.add
      .text(x, y / 8, "Creditos", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);


  

      this.creditosTitulo1 = this.add
      .text(x, y / 3.5, "Desenvolvimento / Programação", {
        fontSize: "18px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
      this.creditosTexto1 = this.add
      .text(x, y / 3, "antonio di cillo", {
        fontSize: "14px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

      this.creditosTitulo2 = this.add
      .text(x / 3, y / 1.75, "Sprite do cavaleiro", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
      this.creditosTexto2 = this.add
      .text(x / 3, y / 1.65, "aamatniekss", {
        fontSize: "12px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

      this.creditosTitulo3 = this.add
      .text(x , y / 1.75, "Tiles e Ambiente", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
      this.creditosTexto3 = this.add
      .text(x , y / 1.65, "szadiart", {
        fontSize: "12px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

      this.creditosTitulo4 = this.add
      .text(x * 1.65 , y / 1.75, "Esqueleto e Guerreiro", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
      this.creditosTexto4 = this.add
      .text(x * 1.65 , y / 1.65, "luizmelo", {
        fontSize: "12px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.textoVoltar = this.add.image(x, y / 1.15, "voltar").setInteractive();
    this.textoVoltar.on("pointerover", () => {
      this.textoVoltar.setTexture("voltarDestaque");
    });
    this.textoVoltar.on("pointerout", () => {
      this.textoVoltar.setTexture("voltar");
    });
    this.textoVoltar.on("pointerdown", () => {
      this.scene.start("Menu");
      this.scene.stop("Creditos");
    });

  }
}

export class Controles extends Phaser.Scene {
  constructor() {
    super("Controles");
  }

  preload() {
    this.load.image("backgroundMenu", "src/assets/BackgroundMenu.png");

    this.load.image("voltar", "src/assets/Voltar.png");
    this.load.image("voltarDestaque", "src/assets/VoltarUnderline.png");

    this.load.image("tecladoControles", "src/assets/TecladoControles.png");
    this.load.image("mouseControles", "src/assets/MouseControles.png");
  }
  create() {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height;

    this.tecladoControles = this.add.image(x, y / 2.9, "tecladoControles").setScale(0.5)
    this.mouseControles = this.add.image(x, y / 1.25, "mouseControles").setScale(0.5)

    this.textoVoltar = this.add.image(x / 4, y / 1.05, "voltar").setInteractive();
    this.textoVoltar.on("pointerover", () => {
      this.textoVoltar.setTexture("voltarDestaque");
    });
    this.textoVoltar.on("pointerout", () => {
      this.textoVoltar.setTexture("voltar");
    });
    this.textoVoltar.on("pointerdown", () => {
      this.scene.start("Menu");
      this.scene.stop("Controles");
    });

  }
}