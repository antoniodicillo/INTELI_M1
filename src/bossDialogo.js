// boa sorte

export class BossDialogo extends Phaser.Scene {
  constructor() {
    super("BossDialogo");
  }

  init() {
    this.boss = {
      vidaAtual: 500,
      VIDA_MAXIMA: 500,

      podeLevarHit: true,
      podeMover: true,
      podePular: true,
      pertoParaAtaque: false,
      coolDownAtaque: false,
      bossJaTaMorto: false,
      podeSerStunado: true,

      FRAMES_ATAQUE_1: [4, 5],
      FRAMES_ATAQUE_2: [3, 4],
      FRAMES_ATAQUE_3: [5, 6],
      DANO_1: 35,
      DANO_2: 40,
      DANO_3: 65,
      podeDarDano: false,
      danoAtual: 0,
      posX: 200,

      combo: 0, // 0 - Sem combo, 1 - So o primeiro ataque, 2 - Primeiro e segundo ataque, 3 - Todos os ataques

      velocidade: 250,
    };
    // Reseta variaveis
    personagemVidaAtual = PERSONAGEM_VIDA_MAXIMA;
    personagemEnergiaAtual = PERSONAGEM_ENERGIA_MAXIMA;
    vidaUI_Largura = personagemVidaAtual;
    energiaUI_Largura = personagemEnergiaAtual;
  }

  preload() {
    // Preload do background paralax
    this.load.image("background", "src/assets/Background.png");
    this.load.image("backgroundGrama", "src/assets/GramaBackground.png");
    this.load.image("pilaresBoss", "src/assets/PilaresBoss.png");
    this.load.image("muralha", "src/assets/Muralha.png");

    this.load.image("caveiras", "src/assets/Skulls.png");

    // Preload dos outros elementos
    this.load.image("chaoBoss", "src/assets/ChaoBoss.png");

    // Carrega as animações do personagem
    this.load.spritesheet("player_normal", "src/assets/Cavaleiro_Idle.png", {
      frameWidth: 50,
      frameHeight: 76,
    });

    this.load.spritesheet(
      "player_corrida",
      "src/assets/Cavaleiro_Corrida.png",
      {
        frameWidth: 56,
        frameHeight: 76,
      }
    );

    // ------------------------------------------------------
    // Carrega as animações do boss
    // ------------------------------------------------------

    this.load.spritesheet("boss_normal", "src/assets/Boss_Idle.png", {
      frameWidth: 84,
      frameHeight: 92,
    });

    this.load.spritesheet("boss_andando", "src/assets/Boss_Correr.png", {
      frameWidth: 118,
      frameHeight: 92,
    });

    // Elementos da UI
    this.load.image("fotoCavaleiro", "src/assets/Foto_Cavaleiro.png");
    this.load.image("fotoBoss", "src/assets/Foto_Boss.png");
  }

  create() {
    // Adicionar imagens e sprites no jogo
    this.add.image(larguraJogo / 2, alturaJogo / 2, "background");

    this.add.image(larguraJogo / 2, alturaJogo / 1.2, "backgroundGrama");

    this.muralha = this.add.image(larguraJogo / 1.8, alturaJogo / 2, "muralha");
    this.pilares = this.add.image(
      larguraJogo / 2,
      alturaJogo / 2,
      "pilaresBoss"
    );

    chao = this.physics.add.staticImage(
      larguraJogo / 2,
      alturaJogo - 60,
      "chaoBoss"
    );

    chao.setSize(0, 10);
    chao.setPosition(larguraJogo / 2, alturaJogo - 65);

    // Adicionar fisica ao personagem
    personagem = this.physics.add.sprite(64, 0, "player_normal");
    personagem.setCollideWorldBounds(true);
    personagem.setPosition(personagemSpawn[0], personagemSpawn[1]);
    personagem.body.pushable = false;

    // Adicionar fisica ao inimigo
    boss = this.physics.add.sprite(64, 0, "boss_normal");
    boss.setCollideWorldBounds(true);
    boss.setPosition(950, 535);
    boss.setOrigin(0.5, 1);

    boss.body.pushable = false;

    // Adiciona colisão do personagem nas plataforams
    this.physics.add.collider(personagem, chao);
    this.physics.add.collider(personagem, this.chao2);
    this.physics.add.collider(personagem, terra);

    // Adiciona colisão aos inimigos
    this.physics.add.collider(boss, chao);
    this.physics.add.collider(boss, this.chao2);
    this.physics.add.collider(boss, terra);

    // Fazer a camera seguir o jogador e aumentar o tamanho do jogo
    this.physics.world.setBounds(0, 0, larguraJogo, alturaJogo); // Adjust the size as needed

    this.cameras.main.setBounds(0, 0, larguraJogo, alturaJogo / 2); // Adjust the size as needed

    this.cameras.main.startFollow(personagem);

    // ------------------------------------------------------
    // Animações do personagem
    // ------------------------------------------------------

    // Animação Cavaleiro Normal
    this.anims.create({
      key: "normal",
      frames: this.anims.generateFrameNumbers("player_normal", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação Cavaleiro Correndo
    this.anims.create({
      key: "corrida",
      frames: this.anims.generateFrameNumbers("player_corrida", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // ------------------------------------------------------
    // Animações do boss
    // ------------------------------------------------------

    // Idle do boss
    this.anims.create({
      key: "normalBoss",
      frames: this.anims.generateFrameNumbers("boss_normal", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação de andar do boss
    this.anims.create({
      key: "andarBoss",
      frames: this.anims.generateFrameNumbers("boss_andando", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Background da UI
    this.backgroundUI = this.add.graphics();
    this.backgroundUI.fillStyle(0x000000, 1);
    this.backgroundUI.fillRect(0, 70, 90, 45);

    // UI das caveiras coletadas
    this.caveirasImagem = this.add.image(30, 90, "caveiras").setScale(0.25);
    this.caveirasTexto = this.add.text(50, 90, "(x" + caveiras + ")", {
      fontSize: "14px",
      fill: "#ffffff",
    });

    // UI da energia do personagem

    this.vidaBgUI = this.add.graphics();
    this.vidaBgUI.fillStyle(0x000000, 1);
    this.vidaBgUI.fillRect(0, 20, vidaUI_Largura + 25, 15);

    this.vidaUI = this.add.graphics();
    this.vidaUI.fillStyle(0xba1f11, 1);
    this.vidaUI.fillRect(0, 20, vidaUI_Largura, 15);

    this.vidaTexto = this.add.text(vidaUI_Largura, 20, vidaUI_Largura, {
      fontSize: "14px",
      fill: "#ffffff",
    });

    // UI da energia do personagem

    this.energiaBgUI = this.add.graphics();
    this.energiaBgUI.fillStyle(0x000000, 1);
    this.energiaBgUI.fillRect(0, 40, energiaUI_Largura + 25, 15);

    this.energiaUI = this.add.graphics();
    this.energiaUI.fillStyle(0x75bd28, 1);
    this.energiaUI.fillRect(0, 40, energiaUI_Largura, 15);

    this.energiaTexto = this.add.text(
      energiaUI_Largura,
      40,
      energiaUI_Largura,
      {
        fontSize: "14px",
        fill: "#ffffff",
      }
    );

    personagem.anims.play("normal", true);
    boss.anims.play("normalBoss", true);
    this.comecarCeninha() 
  }

  comecarCeninha() {
    this.passos = 0;
    this.quantidadeDePassos = 150;
    this.passosBoss = 0;
    this.quantidadeDePassosBoss = 200;

    const personagemAndar = setInterval(() => {
      if (
        this.passos < this.quantidadeDePassos
      ) {
        this.passos++;
        personagem.x += 1;
        personagem.anims.play("corrida", true);
      } else {
        clearInterval(personagemAndar);
        personagem.anims.play("normal", true);
        setTimeout(() => {
          this.bossVirada()
        }, 500)
      }},10)
    
  }

  bossVirada() {
    boss.setFlip(true,false)
    setTimeout(() => {
      this.comecarDialogo();
    }, 500)
  }

  comecarDialogo() {
    const x = this.cameras.main.width / 3;
    const y = this.cameras.main.height / 2;

    // Primeiro dialogo
    this.bgDialogo = this.add.graphics();
    this.bgDialogo.fillStyle(0x000000, 1);
    this.bgDialogo.fillRect(x - 50, y, 600, 100);

    this.bgImagem = this.add.graphics();
    this.bgImagem.fillStyle(0x000000, 1);
    this.bgImagem.fillRect(x - 100, y, 100, 100);

    this.fotoDialogo = this.add.image(x - 50, y + 50, "fotoBoss");

    this.personagemFalandoTexto = this.add.text(x, y + 5, "Garrick", {
      fontSize: "16px",
      fill: "#ffffff",
    });

    this.dialogo = this.add.text(x, y + 40, "", {
      fontSize: "16px",
      fill: "#ffffff",
      wordWrap: { width: 500, useAdvancedWrap: true },
    });

    this.efeitoTypewrite(
      "Ah, Cavaleiro de  Midland. Eu sabia que não demoraria para mandarem outro cão  atrás de mim. ",
      this.dialogo
    );

    // Segundo dialogo
    setTimeout(() => {
      this.fotoDialogo = this.add.image(x - 50, y + 50, "fotoCavaleiro");
      this.personagemFalandoTexto.setText("O Cavaleiro");

      this.dialogo.setText("");

      this.efeitoTypewrite(
        "Prefiro ser um cão a um covarde que traiu seu próprio juramento!",
        this.dialogo
      );
    }, 6000);
    // Terceiro dialogo
    setTimeout(() => {
      this.fotoDialogo = this.add.image(x - 50, y + 50, "fotoBoss");
      this.personagemFalandoTexto.setText("Garrick");

      this.dialogo.setText("");

      this.efeitoTypewrite(
        "Fui eu quem foi traído, cavaleiro. Midland não é o reino  que  te venderam. ",
        this.dialogo
      );
    }, 10000);
    // Quarto dialogo
    setTimeout(() => {
      this.fotoDialogo = this.add.image(x - 50, y + 50, "fotoBoss");
      this.personagemFalandoTexto.setText("Garrick");

      this.dialogo.setText("");

      this.efeitoTypewrite(
        "Mas não importa. Mesmo que você quisesse fugir agora... Não deixarei outro capacho de Midland respirar.",
        this.dialogo
      );
    }, 15000);
    // Start game
    setTimeout(() => {
      this.scene.start("Boss");
      this.scene.stop("BossDialogo");
    }, 21000);
  }

  efeitoTypewrite(texto, objeto) {
    const length = texto.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        objeto.text += texto[i];
        ++i;
      },
      repeat: length - 1,
      delay: 50,
    });
  }
}

// Largura e altura do jogo
const larguraJogo = 2000;
const alturaJogo = 600;

// Variaveis
let personagem;
let boss;

// Variaveis de objetos
var chao;
var terra;

let personagemVidaAtual = 100;
let personagemEnergiaAtual = 100;

const PERSONAGEM_VIDA_MAXIMA = personagemVidaAtual;
const PERSONAGEM_ENERGIA_MAXIMA = personagemEnergiaAtual;

let vidaUI_Largura = PERSONAGEM_VIDA_MAXIMA;
let energiaUI_Largura = PERSONAGEM_ENERGIA_MAXIMA;

const personagemSpawn = [20, 500];

let caveiras = Number(localStorage.getItem("Caveiras"));
