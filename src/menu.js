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

    this.add.image(x, y / 2, "backgroundMenu").setOrigin(0.5, 0.5);

    this.textoPrincipal = this.add
      .text(x, y / 8, "The Blighted Woods", {
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
      this.introducao();
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

  introducao() {
    this.textoCreditos.setVisible(false).setActive(false);
    this.textoControles.setVisible(false).setActive(false);
    this.textoPrincipal.setVisible(false).setActive(false);
    this.textoJogar.setVisible(false).setActive(false);


    this.time.delayedCall(500,() => {
      this.texto1 = this.add
        .text(50, 50, "", {
          fontSize: "20px",
          fill: "#ffffff",
        })
        .setOrigin(0.5, 0.5);

      this.texto2 = this.add
        .text(50, 100, "", {
          fontSize: "20px",
          fill: "#ffffff",
        })
        .setOrigin(0.5, 0.5);

      this.texto3 = this.add
        .text(50, 150, "", {
          fontSize: "20px",
          fill: "#ffffff",
        })
        .setOrigin(0.5, 0.5);

      this.texto4 = this.add
        .text(50, 200, "", {
          fontSize: "20px",
          fill: "#ffffff",
        })
        .setOrigin(0.5, 0.5);

      this.texto5 = this.add
        .text(50, 400, "", {
          fontSize: "34px",
          fill: "#ffffff",
        })
        .setOrigin(0.5, 0.5);

      this.efeitoTypewrite("Voce é um cavaleiro.", this.texto1);

      this.time.delayedCall(2500, () => {
        this.efeitoTypewrite(
          "Sua missão é capturar um desertor do seu reino.",
          this.texto2
        );
      });
      this.time.delayedCall(7000,() => {
        this.efeitoTypewrite(
          "Ele está localizado na floresta Blighted Woods.",
          this.texto3
        );
      });
      this.time.delayedCall(13000, () => {
        this.efeitoTypewrite("Boa sorte.", this.texto4);
      });
      this.time.delayedCall(16000, () => {
        this.efeitoTypewrite("Clique na tela para começar.", this.texto5);
      });

      this.input.on("pointerdown", () => {
        this.textoCreditos.off("pointerdown");
        this.textoCreditos.off("pointerout");
        this.textoCreditos.off("pointerover");

        this.textoJogar.off("pointerdown");
        this.textoJogar.off("pointerout");
        this.textoJogar.off("pointerover");

        this.textoControles.off("pointerdown");
        this.textoControles.off("pointerout");
        this.textoControles.off("pointerover");

        this.time.removeEvent(this.eventoTypewrite);
        this.eventoTypewrite.destroy();

        this.scene.start("Jogo");
        this.scene.stop("Menu");
      });
    });
  }

  efeitoTypewrite(texto, objeto) {
    const length = texto.length;
    const xAntigo = objeto.x;
    let i = 0;
    this.eventoTypewrite = this.time.addEvent({
      callback: () => {
        objeto.text += texto[i];
        objeto.x = xAntigo + objeto.width / 2;
        ++i;
      },
      repeat: length - 1,
      delay: 90,
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

    this.add.image(x, y / 2, "backgroundMenu").setOrigin(0.5, 0.5);

    this.textoPrincipal = this.add
      .text(x, y / 8, "Creditos", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.creditosTitulo1 = this.add
      .text(x, y / 3.5, "Desenvolvimento / Programação", {
        fontSize: "24px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.creditosTexto1 = this.add
      .text(x, y / 2.9, "antonio di cillo", {
        fontSize: "22px",
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
      .text(x, y / 1.75, "Tiles e Ambiente", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.creditosTexto3 = this.add
      .text(x, y / 1.65, "szadiart", {
        fontSize: "12px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.creditosTitulo4 = this.add
      .text(x * 1.65, y / 1.75, "Sprite do Esqueleto e Guerreiro", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.creditosTexto4 = this.add
      .text(x * 1.65, y / 1.65, "luizmelo", {
        fontSize: "12px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

      this.creditosTitulo5 = this.add
      .text(x, y / 1.375, "Musica do boss", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.creditosTexto5 = this.add
      .text(x, y / 1.3, "luizmelo", {
        fontSize: "12px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.textoVoltar = this.add.image(x, y / 1.05, "voltar").setInteractive();
    this.textoVoltar.on("pointerover", () => {
      this.textoVoltar.setTexture("voltarDestaque");
    });
    this.textoVoltar.on("pointerout", () => {
      this.textoVoltar.setTexture("voltar");
    });
    this.textoVoltar.on("pointerdown", () => {
      this.textoVoltar.off("pointerdown");
      this.textoVoltar.off("pointerout");
      this.textoVoltar.off("pointerover");

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

    this.tecladoControles = this.add
      .image(x, y / 2.9, "tecladoControles")
      .setScale(0.5);
    this.mouseControles = this.add
      .image(x, y / 1.25, "mouseControles")
      .setScale(0.5);

    this.textoVoltar = this.add
      .image(x / 4, y / 1.05, "voltar")
      .setInteractive();
    this.textoVoltar.on("pointerover", () => {
      this.textoVoltar.setTexture("voltarDestaque");
    });
    this.textoVoltar.on("pointerout", () => {
      this.textoVoltar.setTexture("voltar");
    });
    this.textoVoltar.on("pointerdown", () => {
      this.textoVoltar.off("pointerdown");
      this.textoVoltar.off("pointerout");
      this.textoVoltar.off("pointerover");

      this.scene.start("Menu");
      this.scene.stop("Controles");
    });
  }
}
