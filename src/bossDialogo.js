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
    stunJogador = false;
    personagemVidaAtual = PERSONAGEM_VIDA_MAXIMA;
    personagemEnergiaAtual = PERSONAGEM_ENERGIA_MAXIMA;
    pode_Pular = true;
    cooldownRoll = false;
    vidaUI_Largura = personagemVidaAtual;
    energiaUI_Largura = personagemEnergiaAtual;
    personagemNaoTomaDano = false;
    dano = 0;
    personagemX = 0;
    cooldownHeal = false;
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
    caveirasImagem = this.add.image(30, 90, "caveiras").setScale(0.25);
    caveirasTexto = this.add.text(50, 90, "(x" + caveiras + ")", {
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
    const x = this.cameras.main.width / 3;
    const y = this.cameras.main.height / 2;

    // Primeiro dialogo
    this.bgDialogo = this.add.graphics();
    this.bgDialogo.fillStyle(0x000000, 1);
    this.bgDialogo.fillRect(x - 50, y, 600, 100);

    this.bgImagem = this.add.graphics();
    this.bgImagem.fillStyle(0x000000, 1);
    this.bgImagem.fillRect(x - 100, y, 100, 100);

    this.fotoDialogo = this.add.image(x - 50, y + 50, "fotoBoss")

    this.personagemFalandoTexto = this.add.text(x,y + 5 , "Garrick", {
      fontSize: "16px",
      fill: "#ffffff",
    });

    this.dialogo = this.add.text(x,y + 50 , "", {
      fontSize: "16px",
      fill: "#ffffff",
    });

    this.efeitoTypewrite(
      "Você não deveria ter vindo até aqui, cavaleiro!",
      this.dialogo)

    // Segundo dialogo
    setTimeout(() => {
      this.fotoDialogo = this.add.image(x - 50, y + 50, "fotoCavaleiro")
      this.personagemFalandoTexto.setText("O Cavaleiro");
  
      this.dialogo.setText("");
  
      this.efeitoTypewrite(
        "Se é burro?",
        this.dialogo)
  
    }, 3500);
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

const tamanhoNormal = [50, 76];
const tamanhoNormalBoss = [84, 92];

// Frame Data

// Frames que o jogador é invencivel e não toma dano quando ele estiver cooldownRoll
const framesRolamentoSemDano = [1, 2, 3, 4, 5, 6, 7, 8];
// Frames que os ataques podem dar dano em inimigos
const framesAtaqueLeveDano = [2, 3];
const framesAtaquePesadoDano = [2, 3];

// Teclas wasd
let teclaA;
let teclaD;
let teclaW;
let teclaEspaco;
let teclaShift;
let teclaR;
var teclado;

// Variaveis da GUI
let caveirasImagem;
let caveirasTexto;

// Variaveis de objetos
var chao;
var terra;

// Variaveis do personagem
var pode_Pular = true;

var stunJogador = false;

let cooldownRoll = false;

let alturaPulo = -350;

let personagemVidaAtual = 100;
let personagemEnergiaAtual = 100;

const PERSONAGEM_VIDA_MAXIMA = personagemVidaAtual;
const PERSONAGEM_ENERGIA_MAXIMA = personagemEnergiaAtual;

let vidaUI_Largura = PERSONAGEM_VIDA_MAXIMA;
let energiaUI_Largura = PERSONAGEM_ENERGIA_MAXIMA;

let personagemNaoTomaDano = false;

const DANO_LEVE = 10;
const DANO_PESADO = 30;

const ENERGIA_ATAQUE_LEVE = 20;
const ENERGIA_ATAQUE_PESADO = 35;
const ENERGIA_ROLAMENTO = 15;

let dano = 0;

let personagemX;

const personagemSpawn = [20, 500];

let diferencaPersonagemBossX = 0;

let caveiras = Number(localStorage.getItem("Caveiras"));

let cooldownHeal = false;
