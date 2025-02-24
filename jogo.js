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

// Variaveis de objetos
var chao;
var terra;
var pode_Pular = true;
var atacando = false;

function preload() {
  this.load.image("background", "assets/Background.png");
  this.load.image("chao", "assets/Chao.png");
  this.load.image("terra", "assets/Terra.png");

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
  this.load.spritesheet("player_ataque", "assets/Cavaleiro_Ataque.png", {
    frameWidth: 64,''
    frameHeight: 42,
  });
}

function create() {
  // Adicionar imagens e sprites no jogo
  this.add.image(larguraJogo / 2, alturaJogo / 2, "background");

  chao = this.physics.add.staticImage(larguraJogo / 2, alturaJogo - 16, "chao");

  terra = this.physics.add.staticImage(64, alturaJogo - 48, "terra");

  // Adicionar fisica ao personagem
  personagem = this.physics.add.sprite(32, 0, "player_normal").setScale(2);
  personagem.setCollideWorldBounds(true);

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
    key: "ataque",
    frames: this.anims.generateFrameNumbers("player_ataque", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: 0,
  });

  // Adiciona colisão nas plataforams
  this.physics.add.collider(personagem, chao);
  this.physics.add.collider(personagem, terra);

  // Registra as teclas do teclado
  teclado = this.input.keyboard.createCursorKeys();

  this.input.on("pointerdown", () => {
    if(pode_Pular === false) {
      return;
    }
    if(atacando === true) {
      return;
    }

    personagem.setVelocity(0);
    atacando = true;
    personagem.anims.play("ataque", false);
  });

  personagem.on('animationcomplete', (anim) => {
    if(anim.key === 'ataque') {
      atacando = false;
    }
  }) 
}

function update() {
  if (atacando === false) {
    if (teclado.left.isDown) {
      personagem.setVelocityX(-200);
      personagem.setFlip(true, false);
    } else if (teclado.right.isDown) {
      personagem.setVelocityX(200);
      personagem.setFlip(false, false);
    } else {
      personagem.setVelocityX(0);
    }

    if (teclado.up.isDown && pode_Pular === true) {
      personagem.setVelocityY(-250);
      pode_Pular = false;
    }

    if (personagem.body.touching.down) {
      personagem.anims.play("normal", true);
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
