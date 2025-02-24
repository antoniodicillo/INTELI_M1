const larguraJogo = 879;
const alturaJogo = 483;

const config = {
  type: Phaser.AUTO,
  width: larguraJogo,
  height: alturaJogo,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

// Variaveis
var personagem;

// Teclas wasd
let teclaA;
let teclaD;
let teclaEspaco;
let teclaShift;
var teclado;

// Variaveis de objetos
var chao;
var terra;
var arvoreBaixo;
var arvoreCima;
var arvoreTransparente;

// Variaveis do jogo
var estagioDoAtaque = 1;
var pode_Pular = true;
var atacando = false;

function preload() {
  this.load.image("background", "assets/Background.png");
  this.load.image("chao", "assets/Chao.png");
  this.load.image("terra", "assets/Terra.png");

  this.load.image("arvoreBaixo", "assets/Arvore_Baixo.png");
  this.load.image("avoreCima", "assets/Arvore_Cima.png");
  this.load.image("arvoreTransparente", "assets/Arvore_Transparente.png");

  // Carrega as animações do personagem
  this.load.spritesheet("player_normal", "assets/Cavaleiro_Idle.png", {
    frameWidth: 25,
    frameHeight: 38,
  });
  this.load.spritesheet("player_pulo", "assets/Cavaleiro_Pulo.png", {
    frameWidth: 25,
    frameHeight: 38,
  });
  this.load.spritesheet(
    "player_puloCaindo",
    "assets/Cavaleiro_PuloCaindo.png",
    {
      frameWidth: 25,
      frameHeight: 38,
    }
  );
  this.load.spritesheet(
    "player_ataqueLeve",
    "assets/Cavaleiro_AtaqueLeve.png",
    {
      frameWidth: 64,
      frameHeight: 42,
    }
  );
  this.load.spritesheet(
    "player_ataquePesado",
    "assets/Cavaleiro_AtaquePesado.png",
    {
      frameWidth: 77,
      frameHeight: 42,
    }
  );
  this.load.spritesheet("player_corrida", "assets/Cavaleiro_Corrida.png", {
    frameWidth: 28,
    frameHeight: 38,
  });
}

function create() {
  // Adicionar imagens e sprites no jogo
  this.add.image(larguraJogo / 2, alturaJogo / 2, "background");

  arvoreBaixo = this.physics.add.staticImage(
    600,
    alturaJogo - 160,
    "arvoreBaixo"
  );
  terra = this.physics.add.staticImage(64, alturaJogo - 48, "terra");
  chao = this.physics.add.staticImage(larguraJogo / 2, alturaJogo - 16, "chao");

  // Adicionar fisica ao personagem
  personagem = this.physics.add.sprite(32, 0, "player_normal").setScale(2);
  personagem.setCollideWorldBounds(true);

  // Adiciona colisão nas plataforams
  this.physics.add.collider(personagem, chao);
  this.physics.add.collider(personagem, terra);
  this.physics.add.collider(personagem, arvoreBaixo);

  // Registrar teclas do teclado
  teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  teclaEspaco = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
  teclaShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

  // Animações do personagem
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
      end: 6,
    }),
    frameRate: 5,
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

    personagem.setVelocity(0);
    atacando = true;
    if (teclaShift.isDown) {
      personagem.anims.play("ataque_Pesado", false);
    } else {
      personagem.anims.play("ataque_Leve", false);
    }
  });

  // Seta a variavel atacando para false quando a animação termina, e muda o estagio do ataque
  personagem.on("animationcomplete", (anim) => {
    if (anim.key === "ataque_Leve") {
      atacando = false;
    } else if (anim.key === "ataque_Pesado") {
      atacando = false;
    }
  });
}

function update() {
  // Movimentação do personagem
  if (atacando === false) {
    if (teclado.left.isDown || teclaA.isDown) {
      personagem.setVelocityX(-200);
      personagem.setFlip(true, false);
    } else if (teclado.right.isDown || teclaD.isDown) {
      personagem.setVelocityX(200);
      personagem.setFlip(false, false);
    } else {
      personagem.setVelocityX(0);
    }

    if ((teclado.up.isDown || teclaEspaco.isDown) && pode_Pular === true) {
      personagem.setVelocityY(-250);
      pode_Pular = false;
    }

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
