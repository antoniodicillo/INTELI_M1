export class Jogo extends Phaser.Scene {
  constructor() {
    super("Jogo");
  }
  preload() {
    // Preload do background paralax
    this.load.image("background", "assets/Background.png");
    this.load.image("bg_arvores1", "assets/arvores-1.png");
    this.load.image("bg_arvores2", "assets/arvores-2.png");
    this.load.image("bg_arvores3", "assets/arvores-3.png");
    this.load.image("bg_arvores4", "assets/arvores-4.png");
    this.load.image("bg_arvores5", "assets/arvores-5.png");

    // Preload dos outros elementos
    this.load.image("chao", "assets/Chao.png");
    this.load.image("terra", "assets/Terra.png");

    this.load.image("arvoreBaixo", "assets/Arvore_Baixo.png");
    this.load.image("arvoreCima", "assets/Arvore_Cima.png");
    this.load.image("arvoreTransparente", "assets/Arvore_Transparente.png");
    this.load.image("galho5", "assets/Galho5.png");
    this.load.image("galho4", "assets/Galho4.png");
    this.load.image("galho2", "assets/Galho2.png");

    // Carrega as animações do personagem
    this.load.spritesheet("player_normal", "assets/Cavaleiro_Idle.png", {
      frameWidth: 50,
      frameHeight: 76,
    });
    this.load.spritesheet("player_pulo", "assets/Cavaleiro_Pulo.png", {
      frameWidth: 50,
      frameHeight: 76,
    });
    this.load.spritesheet(
      "player_puloCaindo",
      "assets/Cavaleiro_PuloCaindo.png",
      {
        frameWidth: 58,
        frameHeight: 76,
      }
    );
    this.load.spritesheet(
      "player_ataqueLeve",
      "assets/Cavaleiro_AtaqueLeve.png",
      {
        frameWidth: 132,
        frameHeight: 84,
      }
    );
    this.load.spritesheet(
      "player_ataquePesado",
      "assets/Cavaleiro_AtaquePesado.png",
      {
        frameWidth: 160,
        frameHeight: 84,
      }
    );
    this.load.spritesheet("player_corrida", "assets/Cavaleiro_Corrida.png", {
      frameWidth: 56,
      frameHeight: 76,
    });
    this.load.spritesheet(
      "player_rolamento",
      "assets/Cavaleiro_Rolamento.png",
      {
        frameWidth: 100,
        frameHeight: 80,
      }
    );

    // Carrega as animações do esqueleto
    this.load.spritesheet("esqueleto_normal", "assets/Esqueleto_Idle.png", {
      frameWidth: 72,
      frameHeight: 76,
    });

    this.load.spritesheet("esqueleto_hit", "assets/Esqueleto_Hit.png", {
      frameWidth: 90,
      frameHeight: 84,
    });

    this.load.spritesheet("esqueleto_morte", "assets/Esqueleto_Morte.png", {
      frameWidth: 90,
      frameHeight: 76,
    });

    this.load.on("complete", () => {
      this.createGame();
    });
  }

  createGame() {
    // Adicionar imagens e sprites no jogo
    this.add.image(larguraJogo / 2, alturaJogo / 2, "background");

    // new TileSprite(scene, x, y, width, height, textureKey, [frameKey])
    bg_arvores1 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores1" // name
    );
    bg_arvores2 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores2" // name
    );
    bg_arvores3 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores3" // name
    );
    bg_arvores4 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores4" // name
    );
    bg_arvores5 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores5" // name
    );

    this.physics.add.staticImage(600, alturaJogo - 320, "arvoreTransparente");
    this.physics.add.staticImage(600, alturaJogo - 384, "arvoreTransparente");

    // Adiciona sprites com colisao
    arvoreBaixo = this.physics.add.staticImage(
      600,
      alturaJogo - 160,
      "arvoreBaixo"
    );
    arvoreCima = this.physics.add.staticImage(600, -13, "arvoreCima");

    galho2_Esquerda = this.physics.add.staticImage(
      536,
      alturaJogo / 2.35,
      "galho2"
    );
    galho4_Esquerda = this.physics.add.staticImage(
      505,
      alturaJogo / 1.65,
      "galho4"
    );
    galho5_Esquerda = this.physics.add.staticImage(
      488,
      alturaJogo / 1.3,
      "galho5"
    );

    galho2_Direita = this.physics.add.staticImage(
      664,
      alturaJogo / 2.35,
      "galho2"
    );
    galho4_Direita = this.physics.add.staticImage(
      696,
      alturaJogo / 1.65,
      "galho4"
    );
    galho5_Direita = this.physics.add.staticImage(
      712,
      alturaJogo / 1.3,
      "galho5"
    );

    terra = this.physics.add.staticImage(64, alturaJogo - 48, "terra");
    chao = this.physics.add.staticImage(
      larguraJogo / 2,
      alturaJogo - 16,
      "chao"
    );

    // Adicionar fisica ao personagem
    personagem = this.physics.add.sprite(64, 0, "player_normal");
    personagem.setCollideWorldBounds(true);
    personagem.setPosition(64, alturaJogo / 1.5);

    // Adicionar fisica ao inimigo
    esqueleto = this.physics.add.sprite(36, 0, "esqueleto_normal");
    esqueleto.setCollideWorldBounds(true);
    esqueleto.setPosition(350, 410);
    esqueleto.body.pushable = false;

    // Adiciona colisão do personagem nas plataforams
    this.physics.add.collider(personagem, chao);
    this.physics.add.collider(personagem, terra);
    this.physics.add.collider(personagem, arvoreBaixo);
    this.physics.add.collider(personagem, arvoreCima);

    this.physics.add.collider(personagem, galho2_Esquerda);
    this.physics.add.collider(personagem, galho4_Esquerda);
    this.physics.add.collider(personagem, galho5_Esquerda);

    this.physics.add.collider(personagem, galho2_Direita);
    this.physics.add.collider(personagem, galho4_Direita);
    this.physics.add.collider(personagem, galho5_Direita);
    this.physics.add.collider(personagem, esqueleto);

    // Adiciona colisão do inimigo nas plataforams
    this.physics.add.collider(esqueleto, chao);
    this.physics.add.collider(esqueleto, terra);
    this.physics.add.collider(esqueleto, arvoreBaixo);
    this.physics.add.collider(esqueleto, arvoreCima);

    this.physics.add.collider(esqueleto, galho2_Esquerda);
    this.physics.add.collider(esqueleto, galho4_Esquerda);
    this.physics.add.collider(esqueleto, galho5_Esquerda);

    this.physics.add.collider(esqueleto, galho2_Direita);
    this.physics.add.collider(esqueleto, galho4_Direita);
    this.physics.add.collider(esqueleto, galho5_Direita);

    // Move os galhos da direta para direta
    galho2_Direita.setFlip(true, false);
    galho4_Direita.setFlip(true, false);
    galho5_Direita.setFlip(true, false);

    // Registrar teclas do teclado
    teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    teclaEspaco = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    teclaShift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    // Animações do personagem

    // Animação Cavaleiro Normal
    this.anims.create({
      key: "normal",
      frames: this.anims.generateFrameNumbers("player_normal", {
        start: 0,
        end: 9,
      }),
      frameRate: 3,
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

    // Animação Cavaleiro Pulando
    this.anims.create({
      key: "pulo",
      frames: this.anims.generateFrameNumbers("player_pulo", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação Cavaleiro Caindo
    this.anims.create({
      key: "caindo",
      frames: this.anims.generateFrameNumbers("player_puloCaindo", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    // Animação Cavaleiro Atacando
    this.anims.create({
      key: "ataque_Leve",
      frames: this.anims.generateFrameNumbers("player_ataqueLeve", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Segunda Animação Cavaleiro Atacando
    this.anims.create({
      key: "ataque_Pesado",
      frames: this.anims.generateFrameNumbers("player_ataquePesado", {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: 0,
    });

    // Animação Rolamento
    this.anims.create({
      key: "rolamento",
      frames: this.anims.generateFrameNumbers("player_rolamento", {
        start: 0,
        end: 11,
      }),
      frameRate: 15,
      repeat: 0,
    });

    // Animações dos inimigos

    // Idle do esqueleto
    this.anims.create({
      key: "normalEsqueleto",
      frames: this.anims.generateFrameNumbers("esqueleto_normal", {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });

    // Animação de hit do esqueleto
    this.anims.create({
      key: "hitEsqueleto",
      frames: this.anims.generateFrameNumbers("esqueleto_hit", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de hit do esqueleto
    this.anims.create({
      key: "morteEsqueleto",
      frames: this.anims.generateFrameNumbers("esqueleto_morte", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });

    // Registra as teclas do teclado
    teclado = this.input.keyboard.createCursorKeys();

    // Ve se o mouse foi clicado
    this.input.on("pointerdown", () => {
      // Apenas ataca quando jogador não estiver no ar ou se já está atacando
      if (pode_Pular === false) {
        return;
      }
      if (atacando === true) {
        return;
      }
      if (rolando === true) {
        return;
      }

      personagem.setVelocity(0);
      atacando = true;
      if (teclaShift.isDown) {
        personagem.anims.play("ataque_Pesado", false);
      } else {
        personagem.anims.play("ataque_Leve", false);
      }
    });

    // Altera a colisao do personagem dependendo de sua animação
    personagem.on("animationstart", (anim) => {
      animacaoAtual = anim.key;
      if (anim.key === "ataque_Leve") {
        personagem.setSize(132, tamanhoNormal[1]);
      } else if (anim.key === "ataque_Pesado") {
        personagem.setSize(160, tamanhoNormal[1]);
      } else {
        // reseta o tamanho da colisao para o tamanho normal
        personagem.setSize(tamanhoNormal[0], tamanhoNormal[1]);
      }
    });

    // Ve o frame da animação do personagem
    personagem.on("animationupdate", function (anim, frame) {
      // Se for um frame especifico de rolamento, deixa o jogador invencivel a dano
      if (anim.key === "rolamento") {
        if (framesRolamentoSemDano.includes(frame.frame.name)) {
          playerNaoTomaDano = true;
        } else {
          playerNaoTomaDano = false;
        }
        // Se o frame corresponder com o frame de ataque, seta a variavel dano para o dano do ataque
      } else if (anim.key === "ataque_Leve") {
        if (framesAtaqueLeveDano.includes(frame.frame.name)) {
          dano = DANO_LEVE;
        } else {
          dano = 0;
        }
      } else if (anim.key === "ataque_Pesado") {
        if (framesAtaquePesadoDano.includes(frame.frame.name)) {
          dano = DANO_PESADO;
        } else {
          dano = 0;
        }
      }
    });

    // Seta a variavel atacando para false quando a animação termina, e muda o estagio do ataque
    personagem.on("animationcomplete", (anim) => {
      if (anim.key === "ataque_Leve") {
        esqueletoPodeLevarHit = true;
        atacando = false;
        dano = 0;
      } else if (anim.key === "ataque_Pesado") {
        esqueletoPodeLevarHit = true;
        atacando = false;
        dano = 0;
      } else if (anim.key === "rolamento") {
        personagem.setVelocityX(0);
        rolando = false;
      }
    });

    // Logica para o ataque do personagem contra o esqueleto
    this.physics.add.overlap(personagem, esqueleto, () => {
      if (esqueletoPodeLevarHit === false) {
        return;
      }
      if (atacando === false) {
        return;
      }
      if (dano === 0) {
        return;
      }
      if (esqueletoVidaAtual <= 0) {
        return;
      }

      esqueletoVidaAtual -= dano;
      console.warn("Vida esqueleto: " + esqueletoVidaAtual);

      esqueletoPodeLevarHit = false;
      esqueleto.anims.play("hitEsqueleto", false);
    });

    // Logica das animações do esqueleto

    esqueleto.on("animationstart", (anim) => {
      esqueleto.setSize(tamanhoNormalEsqueleto[0], tamanhoNormalEsqueleto[1]);
    });

    esqueleto.on("animationcomplete", (anim) => {
      if (anim.key === "hitEsqueleto") {
        if (esqueletoVidaAtual <= 0) { 
          esqueleto.anims.play("morteEsqueleto", false)
          return;
        }
        esqueleto.anims.play("normalEsqueleto", true);
        // respawn e morte do esqueleto  
      } else if (anim.key === "morteEsqueleto") {
        esqueleto.setVisible(false);
        esqueleto.setActive(false);
        esqueleto.disableBody(true, true); 
        setTimeout(() => {
          esqueleto.enableBody(true, 350, 400, true, true); 
          esqueletoVidaAtual = ESQUELETO_VIDA_MAXIMA;
          esqueleto.setVisible(true);
          esqueleto.setActive(true);
          esqueleto.anims.play("normalEsqueleto", true);
        }, 3000);
      }
    });

    esqueleto.anims.play("normalEsqueleto", true);
  }

  update() {
    // Update do paralax
    bg_arvores1._tilePosition.x -= 0.025;
    bg_arvores2._tilePosition.x -= 0.075;
    bg_arvores3._tilePosition.x -= 0.1;
    bg_arvores4._tilePosition.x -= 0.125;
    bg_arvores5._tilePosition.x -= 0.15;

    // Logica do personagem
    if (atacando === false && rolando === false) {
      // Movimentação
      if (teclado.left.isDown || teclaA.isDown) {
        personagem.setVelocityX(-200);
        personagem.setFlip(true, false);
      } else if (teclado.right.isDown || teclaD.isDown) {
        personagem.setVelocityX(200);
        personagem.setFlip(false, false);
      } else {
        personagem.setVelocityX(0);
      }
      if ((teclado.up.isDown || teclaW.isDown) && pode_Pular === true) {
        personagem.setVelocityY(alturaPulo);
        pode_Pular = false;
      }

      // Rolamento
      if (teclaEspaco.isDown && pode_Pular === true && rolando === false) {
        if (teclado.left.isDown || teclaA.isDown) {
          personagem.setVelocityX(-200);
          personagem.setFlip(true, false);
        } else {
          personagem.setVelocityX(200);
          personagem.setFlip(false, false);
        }

        personagem.anims.play("rolamento", true);
        rolando = true;
        return;
      }

      // Logica da animação
      if (personagem.body.touching.down) {
        if (personagem.body.velocity.x === 0) {
          personagem.anims.play("normal", true);
        } else {
          personagem.anims.play("corrida", true);
        }
        pode_Pular = true;
      } else {
        if (personagem.body.velocity.y > 0) {
          personagem.anims.play("caindo", true);
        } else {
          personagem.anims.play("pulo", true);
        }
        pode_Pular = false;
      }
    }
  }
}

// Largura e altura do jogo
const larguraJogo = 879;
const alturaJogo = 483;

// Variaveis
var personagem;
const tamanhoNormal = [50, 76];
const tamanhoNormalEsqueleto = [72, 76];

// Frame Data

// Frames que o jogador é invencivel e não toma dano quando ele estiver rolando
const framesRolamentoSemDano = [1, 2, 3, 4, 5, 6, 7];
// Frames que os ataques podem dar dano em inimigos
const framesAtaqueLeveDano = [1, 2, 3];
const framesAtaquePesadoDano = [2, 3, 4, 5];

var esqueleto;
// Teclas wasd
let teclaA;
let teclaD;
let teclaW;
let teclaEspaco;
let teclaShift;
var teclado;

// Variaveis do background
let bg_arvores1;
let bg_arvores2;
let bg_arvores3;
let bg_arvores4;
let bg_arvores5;

// Variaveis de objetos
var chao;
var terra;

var arvoreBaixo;
var arvoreCima;
var arvoreTransparente;

var galho5_Esquerda;
var galho4_Esquerda;
var galho2_Esquerda;

var galho5_Direita;
var galho4_Direita;
var galho2_Direita;

// Variaveis do personagem
var pode_Pular = true;

var atacando = false;
var rolando = false;

let alturaPulo = -350;

let personagemVidaAtual = 100;
let personagemEnergiaAtual = 100;

const PERSONAGEM_VIDA_MAXIMA = personagemVidaAtual;
const PERSONAGEM_ENERGIA_MAXIMA = personagemEnergiaAtual;

let playerNaoTomaDano = false;

const DANO_LEVE = 10;
const DANO_PESADO = 20;
let dano = 0;

let animacaoAtual;
// Variaveis do esqueleto
let esqueletoVidaAtual = 30;

const ESQUELETO_VIDA_MAXIMA = esqueletoVidaAtual;

let esqueletoPodeLevarHit = true;
