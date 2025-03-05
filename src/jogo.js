// boa sorte

export class Jogo extends Phaser.Scene {
  constructor() {
    super("Jogo");
  }

  init() {
    this.esqueleto = {
      vidaAtual: 50,
      VIDA_MAXIMA: 50,

      podeLevarHit: true,
      podeMover: true,
      podePular: true,
      pertoParaAtaque: false,
      coolDownAtaque: false,
      esqueletoJaTaMorto: false,

      FRAMES_ATAQUE: [6, 7],
      podeDarDano: false,
      DANO: 35,
      danoAtualEsqueleto: 0,
      posX: 200,
      respawnPos: [100, 400],
      respawnTempo: 10000,

      velocidade: 150,
    };

    this.esqueleto2 = {
      vidaAtual: 50,
      VIDA_MAXIMA: 50,

      podeLevarHit: true,
      podeMover: true,
      podePular: true,
      pertoParaAtaque: false,
      coolDownAtaque: false,
      esqueletoJaTaMorto: false,

      FRAMES_ATAQUE: [6, 7],
      podeDarDano: false,
      DANO: 35,
      danoAtualEsqueleto: 0,
      posX: 200,
      respawnPos: [200, 400],
      respawnTempo: 10000,

      velocidade: 160,
    };

    // Reseta variaveis
    stunJogador = false;
    personagemVidaAtual = PERSONAGEM_VIDA_MAXIMA;
    personagemEnergiaAtual = PERSONAGEM_ENERGIA_MAXIMA;
    pode_Pular = true;
    cooldownRoll = false;
    personagemVidaAtual = 20;
    personagemEnergiaAtual = 100;
    vidaUI_Largura = personagemVidaAtual;
    energiaUI_Largura = personagemEnergiaAtual;
    personagemNaoTomaDano = false;
    dano = 0;
    personagemX = 0;
    diferencaPersonagemEsqueletoX = 0;
    cooldownHeal = false;
  }

  preload() {
    // Preload do background paralax
    this.load.image("background", "src/assets/Background.png");
    this.load.image("backgroundGrama", "src/assets/GramaBackground.png");
    this.load.image("backgroundGrama2", "src/assets/Grama.png");
    this.load.image("pilares", "src/assets/Pilares.png");
    this.load.image("bg_arvores1", "src/assets/arvores-1.png");
    this.load.image("bg_arvores2", "src/assets/arvores-2.png");
    this.load.image("bg_arvores3", "src/assets/arvores-3.png");
    this.load.image("bg_arvores4", "src/assets/arvores-4.png");
    this.load.image("bg_arvores5", "src/assets/arvores-5.png");

    this.load.image("pedra1", "src/assets/Pedra1.png");
    this.load.image("pedra2", "src/assets/Pedra2.png");

    this.load.image("caveiras", "src/assets/Skulls.png");

    // Preload dos outros elementos
    this.load.image("chao", "src/assets/Chao.png");
    this.load.image("chao2", "src/assets/Chao2.png");

    this.load.image("arvoreBaixo", "src/assets/Arvore_Baixo.png");
    this.load.image("arvoreCima", "src/assets/Arvore_Cima.png");
    this.load.image("arvoreTransparente", "src/assets/Arvore_Transparente.png");
    this.load.image("galho5", "src/assets/Galho5.png");
    this.load.image("galho4", "src/assets/Galho4.png");
    this.load.image("galho2", "src/assets/Galho2.png");

    // Carrega as animações do personagem
    this.load.spritesheet("player_normal", "src/assets/Cavaleiro_Idle.png", {
      frameWidth: 50,
      frameHeight: 76,
    });
    this.load.spritesheet("player_pulo", "src/assets/Cavaleiro_Pulo.png", {
      frameWidth: 50,
      frameHeight: 76,
    });
    this.load.spritesheet(
      "player_puloCaindo",
      "src/assets/Cavaleiro_PuloCaindo.png",
      {
        frameWidth: 58,
        frameHeight: 76,
      }
    );
    this.load.spritesheet(
      "player_ataqueLeve",
      "src/assets/Cavaleiro_AtaqueLeve.png",
      {
        frameWidth: 132,
        frameHeight: 84,
      }
    );
    this.load.spritesheet(
      "player_ataquePesado",
      "src/assets/Cavaleiro_AtaquePesado.png",
      {
        frameWidth: 198,
        frameHeight: 84,
      }
    );
    this.load.spritesheet(
      "player_corrida",
      "src/assets/Cavaleiro_Corrida.png",
      {
        frameWidth: 56,
        frameHeight: 76,
      }
    );
    this.load.spritesheet(
      "player_rolamento",
      "src/assets/Cavaleiro_Rolamento.png",
      {
        frameWidth: 100,
        frameHeight: 80,
      }
    );
    this.load.spritesheet("player_hit", "src/assets/Cavaleiro_Hit.png", {
      frameWidth: 65,
      frameHeight: 80,
    });

    this.load.spritesheet("player_morte", "src/assets/Cavaleiro_Morte.png", {
      frameWidth: 96,
      frameHeight: 80,
    });

    // Carrega as animações do esqueleto

    this.load.spritesheet("esqueleto_normal", "src/assets/Esqueleto_Idle.png", {
      frameWidth: 92,
      frameHeight: 102,
    });

    this.load.spritesheet("esqueleto_hit", "src/assets/Esqueleto_Hit.png", {
      frameWidth: 102,
      frameHeight: 109,
    });

    this.load.spritesheet("esqueleto_morte", "src/assets/Esqueleto_Morte.png", {
      frameWidth: 132,
      frameHeight: 109,
    });

    this.load.spritesheet(
      "esqueleto_andando",
      "src/assets/Esqueleto_Andando.png",
      {
        frameWidth: 92,
        frameHeight: 107,
      }
    );

    this.load.spritesheet(
      "esqueleto_ataque",
      "src/assets/Esqueleto_Ataque.png",
      {
        frameWidth: 212,
        frameHeight: 116,
      }
    );

    // Elementos da UI
    this.load.image("sair", "src/assets/Sair.png");
    this.load.image("sairDestaque", "src/assets/SairUnderline.png");
    this.load.image("continuar", "src/assets/Continuar.png");
    this.load.image("continuarDestaque", "src/assets/ContinuarUnderline.png");
  }

  create() {
    cooldownRoll = false;
    stunJogador = false;

    // Adicionar imagens e sprites no jogo
    this.add.image(larguraJogo / 2, alturaJogo / 2, "background");

    this.bg_arvores1 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores1" // name
    );
    this.bg_arvores2 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores2" // name
    );
    this.bg_arvores3 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores3" // name
    );
    this.bg_arvores4 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores4" // name
    );
    this.bg_arvores5 = this.add.tileSprite(
      larguraJogo / 2, // x
      alturaJogo / 2, // y
      0, // width
      0, // height
      "bg_arvores5" // name
    );

    this.arvoreTransparente1 = this.physics.add.staticImage(
      larguraJogo + 600,
      alturaJogo - 320,
      "arvoreTransparente"
    );
    this.arvoreTransparente2 = this.physics.add.staticImage(
      larguraJogo + 600,
      alturaJogo - 384,
      "arvoreTransparente"
    );

    this.add.image(larguraJogo / 2, alturaJogo / 1.2, "backgroundGrama");

    // Adiciona sprites com colisao
    arvoreBaixo = this.physics.add.staticImage(
      900,
      alturaJogo / 1.45,
      "arvoreBaixo"
    );
    arvoreCima = this.physics.add.staticImage(900, 60, "arvoreCima");

    galho2_Esquerda = this.physics.add.staticImage(
      836,
      alturaJogo / 1.9,
      "galho2"
    );
    galho4_Esquerda = this.physics.add.staticImage(
      805,
      alturaJogo / 1.5,
      "galho4"
    );
    galho5_Esquerda = this.physics.add.staticImage(
      788,
      alturaJogo / 1.25,
      "galho5"
    );

    galho2_Direita = this.physics.add.staticImage(
      964,
      alturaJogo / 1.9,
      "galho2"
    );
    galho4_Direita = this.physics.add.staticImage(
      996,
      alturaJogo / 1.5,
      "galho4"
    );
    galho5_Direita = this.physics.add.staticImage(
      1012,
      alturaJogo / 1.25,
      "galho5"
    );

    this.pilares = this.add.image(
      larguraJogo / 1.223,
      alturaJogo / 2,
      "pilares"
    );

    this.add.image(larguraJogo / 1.853, alturaJogo / 1.3, "pedra2");

    chao = this.physics.add.staticImage(
      larguraJogo / 3.9,
      alturaJogo - 60,
      "chao"
    );

    chao.setSize(0, 10);
    chao.setPosition(larguraJogo / 3.9, alturaJogo - 65);

    this.chao2 = this.physics.add.staticImage(
      larguraJogo / 1.325,
      alturaJogo - 60,
      "chao2"
    );

    this.chao2.setSize(0, 10);
    this.chao2.setPosition(larguraJogo / 1.325, alturaJogo - 65);

    // Adicionar fisica ao personagem
    personagem = this.physics.add.sprite(64, 0, "player_normal");
    personagem.setCollideWorldBounds(true);
    personagem.setPosition(personagemSpawn[0], personagemSpawn[1]);
    personagem.body.pushable = false;

    // Adicionar fisica ao inimigo
    esqueleto = this.physics.add.sprite(64, 0, "esqueleto_normal");
    esqueleto.setCollideWorldBounds(true);
    esqueleto.setPosition(400, 300);
    esqueleto.body.pushable = false;

    esqueleto2 = this.physics.add.sprite(64, 0, "esqueleto_normal");
    esqueleto2.setCollideWorldBounds(true);
    esqueleto2.setPosition(1400, 300);
    esqueleto2.body.pushable = false;

    this.add.image(larguraJogo / 1.8, alturaJogo / 1.3, "pedra1");

    // Adiciona colisão do personagem nas plataforams
    this.physics.add.collider(personagem, chao);
    this.physics.add.collider(personagem, this.chao2);
    this.physics.add.collider(personagem, terra);
    this.physics.add.collider(personagem, arvoreBaixo);
    this.physics.add.collider(personagem, arvoreCima);

    this.physics.add.collider(personagem, galho2_Esquerda);
    this.physics.add.collider(personagem, galho4_Esquerda);
    this.physics.add.collider(personagem, galho5_Esquerda);

    this.physics.add.collider(personagem, galho2_Direita);
    this.physics.add.collider(personagem, galho4_Direita);
    this.physics.add.collider(personagem, galho5_Direita);

    // Adiciona colisão aos inimigos
    this.physics.add.collider(esqueleto, chao);
    this.physics.add.collider(esqueleto, this.chao2);
    this.physics.add.collider(esqueleto, terra);
    this.physics.add.collider(esqueleto, arvoreBaixo);
    this.physics.add.collider(esqueleto, arvoreCima);

    this.physics.add.collider(esqueleto, galho2_Esquerda);
    this.physics.add.collider(esqueleto, galho4_Esquerda);
    this.physics.add.collider(esqueleto, galho5_Esquerda);

    this.physics.add.collider(esqueleto, galho2_Direita);
    this.physics.add.collider(esqueleto, galho4_Direita);
    this.physics.add.collider(esqueleto, galho5_Direita);

    this.physics.add.collider(esqueleto2, chao);
    this.physics.add.collider(esqueleto2, this.chao2);
    this.physics.add.collider(esqueleto2, terra);
    this.physics.add.collider(esqueleto2, arvoreBaixo);
    this.physics.add.collider(esqueleto2, arvoreCima);

    this.physics.add.collider(esqueleto2, galho2_Esquerda);
    this.physics.add.collider(esqueleto2, galho4_Esquerda);
    this.physics.add.collider(esqueleto2, galho5_Esquerda);

    this.physics.add.collider(esqueleto2, galho2_Direita);
    this.physics.add.collider(esqueleto2, galho4_Direita);
    this.physics.add.collider(esqueleto2, galho5_Direita);

    // Move os galhos da direta para direta
    galho2_Direita.setFlip(true, false);
    galho4_Direita.setFlip(true, false);
    galho5_Direita.setFlip(true, false);

    // Parede invisivel para avancar de nivel
    this.paredeBoss = this.physics.add.staticImage(larguraJogo - 5, 300, null);
    this.paredeBoss.setSize(10, 600); // Set the size of the wall
    this.paredeBoss.setAlpha(0); // Make the wall invisible

    // Registrar teclas do teclado
    teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    teclaR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    teclaEspaco = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    teclaShift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

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
    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("player_hit", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "morte",
      frames: this.anims.generateFrameNumbers("player_morte", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // ------------------------------------------------------
    // Animações do esqueleto
    // ------------------------------------------------------

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

    // Animação de andar do esqueleto
    this.anims.create({
      key: "andarEsqueleto",
      frames: this.anims.generateFrameNumbers("esqueleto_andando", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Animação de ataque do esqueleto
    this.anims.create({
      key: "ataqueEsqueleto",
      frames: this.anims.generateFrameNumbers("esqueleto_ataque", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Registra as teclas do teclado
    teclado = this.input.keyboard.createCursorKeys();

    // Ve se o mouse foi clicado
    this.input.on("pointerdown", () => {
      this.ataquePlayer();
    });

    // Altera a colisao do personagem dependendo de sua animação
    personagem.on("animationstart", (anim) => {
      if (anim.key === "ataque_Leve") {
        personagemEnergiaAtual -= ENERGIA_ATAQUE_LEVE;
        this.updateUi("energia");

        personagem.setSize(132, tamanhoNormal[1]);
      } else if (anim.key === "ataque_Pesado") {
        personagemEnergiaAtual -= ENERGIA_ATAQUE_PESADO;
        this.updateUi("energia");

        personagem.setSize(160, tamanhoNormal[1]);
      } else {
        if (anim.key === "hit") {
          personagemNaoTomaDano = true;
        } else if (anim.key === "rolamento") {
          personagemEnergiaAtual -= ENERGIA_ROLAMENTO;
          this.updateUi("energia");
        }
        // reseta o tamanho da colisao para o tamanho normal
        personagem.setSize(tamanhoNormal[0], tamanhoNormal[1]);
      }
    });

    // Ve o frame da animação do personagem
    personagem.on("animationupdate", function (anim, frame) {
      // Se for um frame especifico de rolamento, deixa o jogador invencivel a dano
      if (anim.key === "rolamento") {
        if (framesRolamentoSemDano.includes(frame.frame.name)) {
          personagemNaoTomaDano = true;
        } else {
          personagemNaoTomaDano = false;
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

    // Seta a variavel stunJogador para false quando a animação termina, e muda o estagio do ataque
    personagem.on("animationcomplete", (anim) => {
      if (anim.key === "ataque_Leve") {
        this.esqueleto.podeLevarHit = true;
        this.esqueleto2.podeLevarHit = true;
        stunJogador = false;
        dano = 0;
      } else if (anim.key === "ataque_Pesado") {
        this.esqueleto.podeLevarHit = true;
        this.esqueleto2.podeLevarHit = true;
        stunJogador = false;
        dano = 0;
      } else if (anim.key === "rolamento") {
        personagem.setVelocityX(0);
        cooldownRoll = false;
      } else if (anim.key === "hit") {
        personagemNaoTomaDano = false;
        stunJogador = false;
        cooldownRoll = false;
      }
    });

    // Logica para o overlap do personagem contra o esqueleto
    this.physics.add.overlap(personagem, esqueleto, () => {
      this.overlapEsqueletoPlayer(personagem, esqueleto, this.esqueleto);
    });

    this.physics.add.overlap(personagem, esqueleto2, () => {
      this.overlapEsqueletoPlayer(personagem, esqueleto2, this.esqueleto2);
    });

    this.physics.add.overlap(personagem, this.paredeBoss, () => {
      this.scene.start("Boss");
      this.scene.stop("Jogo");
    });

    // Logica das animações do esqueleto

    // Animação do primeiro esqueleto
    esqueleto.on("animationstart", (anim) => {
      this.esqueletoAnimacaoComecada(esqueleto, anim);
    });

    // Verifica o frame da animação do esqueleto
    esqueleto.on("animationupdate", (anim, frame) => {
      this.esqueletoAnimacaoUpdate(esqueleto, this.esqueleto, anim, frame);
    });

    esqueleto.on("animationcomplete", (anim) => {
      this.esqueletoAnimacaoTerminada(this.esqueleto, esqueleto, anim);
    });

    // Verifica o frame da animação do segundo esqueleto
    esqueleto2.on("animationstart", (anim) => {
      this.esqueletoAnimacaoComecada(esqueleto2, anim);
    });

    esqueleto2.on("animationupdate", (anim, frame) => {
      this.esqueletoAnimacaoUpdate(esqueleto2, this.esqueleto2, anim, frame);
    });

    esqueleto2.on("animationcomplete", (anim) => {
      this.esqueletoAnimacaoTerminada(this.esqueleto2, esqueleto2, anim);
    });

    // Parte da GUI

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

    this.backgroundUI.setScrollFactor(0);
    caveirasImagem.setScrollFactor(0);
    caveirasTexto.setScrollFactor(0);
    this.vidaBgUI.setScrollFactor(0);
    this.vidaUI.setScrollFactor(0);
    this.vidaTexto.setScrollFactor(0);
    this.energiaBgUI.setScrollFactor(0);
    this.energiaUI.setScrollFactor(0);
    this.energiaTexto.setScrollFactor(0);

    this.energiaRegenerando = false;
  }

  update() {
    // god mode
    // personagemNaoTomaDano = true;

    // Logica do personagem
    if (stunJogador === false && cooldownRoll === false) {
      // Movimentação
      if (teclado.left.isDown || teclaA.isDown) {
        personagem.setVelocityX(-200);
        personagem.setFlip(true, false);

        // Update do paralax para direita
        this.bg_arvores1._tilePosition.x += 0.005;
        this.bg_arvores2._tilePosition.x += 0.015;
        this.bg_arvores3._tilePosition.x += 0.025;
        this.bg_arvores4._tilePosition.x += 0.03;
        this.bg_arvores5._tilePosition.x += 0.035;
      } else if (teclado.right.isDown || teclaD.isDown) {
        personagem.setVelocityX(200);
        personagem.setFlip(false, false);

        // Update do paralax para esquerda
        this.bg_arvores1._tilePosition.x -= 0.005;
        this.bg_arvores2._tilePosition.x -= 0.015;
        this.bg_arvores3._tilePosition.x -= 0.025;
        this.bg_arvores4._tilePosition.x -= 0.03;
        this.bg_arvores5._tilePosition.x -= 0.035;
      } else {
        personagem.setVelocityX(0);
      }
      // Pulo
      if ((teclado.up.isDown || teclaW.isDown) && pode_Pular === true) {
        personagem.setVelocityY(alturaPulo);
        pode_Pular = false;
      }

      // Rolamento
      if (
        teclaEspaco.isDown &&
        pode_Pular === true &&
        cooldownRoll === false &&
        personagemEnergiaAtual >= ENERGIA_ROLAMENTO
      ) {
        {
          // Ve se o rolamento é para direita ou esquerda (sem input é direita)
          if (teclado.left.isDown || teclaA.isDown) {
            personagem.setVelocityX(-200);
            personagem.setFlip(true, false);
          } else {
            personagem.setVelocityX(200);
            personagem.setFlip(false, false);
          }
          personagem.anims.play("rolamento", true);
          cooldownRoll = true;
          return;
        }
      }

      // Regeneração de vida
      if (personagemVidaAtual < PERSONAGEM_VIDA_MAXIMA) {
        if (teclaR.isDown) {
          if (caveiras > 0 && cooldownHeal === false) {
            cooldownHeal = true;

            setTimeout(() => {
              cooldownHeal = false;
            }, 1000);

            caveiras--;
            localStorage.setItem("Caveiras", caveiras);
            personagemVidaAtual += 50;
            personagemVidaAtual = Math.min(
              personagemVidaAtual,
              PERSONAGEM_VIDA_MAXIMA
            );
            this.updateUi("vida");
            caveirasTexto.setText("(x" + caveiras + ")");
          }
        }
      }

      // Logica da animação
      if (personagem.body.touching.down) {
        // Se o personagem estar parado
        if (personagem.body.velocity.x === 0) {
          personagem.anims.play("normal", true);
        } else {
          personagem.anims.play("corrida", true);
        }
        pode_Pular = true;
        // Se o personagem estiver movendo
      } else {
        if (personagem.body.velocity.y > 0) {
          personagem.anims.play("caindo", true);
        } else {
          personagem.anims.play("pulo", true);
        }
        pode_Pular = false;
      }
    }
    personagemX = personagem.body.position.x;
    this.esqueleto.posX = esqueleto.body.position.x;
    this.esqueleto2.posX = esqueleto2.body.position.x;

    this.updateLogicEsqueleto(this.esqueleto, esqueleto);
    this.updateLogicEsqueleto(this.esqueleto2, esqueleto2);
  }

  // Função para atualizar a UI de vida ou stamina
  updateUi(params) {
    if (params === "vida") {
      this.updateDaUi(
        personagemVidaAtual,
        vidaUI_Largura,
        this.vidaUI,
        this.vidaTexto,
        0xba1f11,
        20
      );
    } else if (params === "energia") {
      this.updateDaUi(
        personagemEnergiaAtual,
        energiaUI_Largura,
        this.energiaUI,
        this.energiaTexto,
        0x75bd28,
        40
      );

      this.energiaRegenerando = false;

      // Logica para a regeneracao de energia
      setTimeout(() => {
        if (this.energiaRegenerando === false) {
          this.energiaRegenerando = true;
          const energiaInterval = setInterval(() => {
            if (
              personagemEnergiaAtual < PERSONAGEM_ENERGIA_MAXIMA &&
              this.energiaRegenerando === true
            ) {
              this.energiaRegenerando = true;
              personagemEnergiaAtual += 1;
              this.updateDaUi(
                personagemEnergiaAtual,
                energiaUI_Largura,
                this.energiaUI,
                this.energiaTexto,
                0x75bd28,
                40
              );
            } else {
              this.energiaRegenerando = false;
              clearInterval(energiaInterval);
            }
          }, 30);
        }
      }, 500);
    }
  }

  // Funcao da funcao de update ui para
  updateDaUi(valorUI, larguraUI, UI, textoUI, cor, posicao) {
    textoUI.setText(valorUI);

    // destruir a otimização
    while (valorUI < larguraUI) {
      larguraUI--;
      UI.clear();
      UI.fillStyle(cor, 1);
      UI.fillRect(0, posicao, larguraUI, 15);
    }

    while (valorUI > larguraUI) {
      larguraUI++;
      UI.clear();
      UI.fillStyle(cor, 1);
      UI.fillRect(0, posicao, larguraUI, 15);
    }

    if (valorUI === larguraUI) {
      UI.clear();
      UI.fillStyle(cor, 1);
      UI.fillRect(0, posicao, larguraUI, 15);
      return;
    }
  }

  ataquePlayer() {
    // Apenas ataca quando jogador não estiver no ar ou se já está stunJogador
    if (pode_Pular === false) {
      return;
    }
    if (stunJogador === true) {
      return;
    }
    if (cooldownRoll === true) {
      return;
    }

    if (teclaShift.isDown) {
      if (personagemEnergiaAtual < ENERGIA_ATAQUE_PESADO) {
        this.naoTenhoEnergiaUi();
        return;
      }
      personagem.setVelocity(0);
      stunJogador = true;

      personagem.anims.play("ataque_Pesado", false);
    } else if (personagemEnergiaAtual >= ENERGIA_ATAQUE_LEVE) {
      if (personagemEnergiaAtual < ENERGIA_ATAQUE_LEVE) {
        this.naoTenhoEnergiaUi();
        return;
      }

      personagem.setVelocity(0);
      stunJogador = true;

      personagem.anims.play("ataque_Leve", false);
    }
  }

  overlapEsqueletoPlayer(personagem, oEsqueletoVar, oEsqueleto) {
    if (oEsqueleto.podeLevarHit === false) {
      return;
    }
    if (stunJogador === false && oEsqueleto.podeDarDano === false) {
      return;
    }
    if (dano === 0) {
      // Logica para ver se foi o esqueleto que deu o hit no jogador
      if (
        oEsqueleto.danoAtualEsqueleto > 0 &&
        oEsqueleto.podeDarDano === true
      ) {
        if (personagemNaoTomaDano === true) {
          return;
        }
        personagemVidaAtual -= oEsqueleto.danoAtualEsqueleto;
        personagemVidaAtual = Math.max(0, personagemVidaAtual);

        oEsqueleto.podeDarDano = false;

        if (personagemVidaAtual == 0) {
          personagem.anims.play("morte", false);
          personagem.podeLevarHit = false;
          personagemNaoTomaDano = true;
          personagem.podeMover = false;
          stunJogador = true;
          personagem.setVelocityX(0);
          personagem.setVelocityY(200);
          setTimeout(() => {
            this.gameOver();
          }, 800);
          return;
        }

        this.updateUi("vida");

        personagem.setVelocity(0);

        stunJogador = true;
        personagem.anims.play("hit", true);
      }
      return;
    }
    if (oEsqueleto.vidaAtual <= 0) {
      oEsqueleto.esqueletoJaTaMorto = true;
      return;
    }

    oEsqueleto.vidaAtual -= dano;

    oEsqueletoVar.setVelocityX(0);
    oEsqueletoVar.setVelocityY(200);

    oEsqueleto.podeLevarHit = false;
    oEsqueleto.podeMover = false;

    oEsqueletoVar.anims.play("hitEsqueleto", false);

    // Para o frame para dar a sensação de hit
    this.scene.pause();
    if (dano < 15) {
      setTimeout(() => {
        this.scene.resume();
      }, 30);
    } else {
      setTimeout(() => {
        this.scene.resume();
      }, 60);
    }
  }

  // ----------------------------------------------
  // Funções esqueleto

  updateLogicEsqueleto(oEsqueleto, oEsqueletoVar) {
    // Variavel da diferenca do x entre o esqueleto e o personagem
    diferencaPersonagemEsqueletoX = personagemX - oEsqueleto.posX;
    // Verifica se o personagem está no alcance do ataque do esqueleto
    if (diferencaPersonagemEsqueletoX > 0) {
      if (diferencaPersonagemEsqueletoX <= 100) {
        oEsqueleto.pertoParaAtaque = true;
        this.ataqueEsqueleto(oEsqueleto, oEsqueletoVar);
      } else {
        oEsqueleto.pertoParaAtaque = false;
      }
    } else {
      if (diferencaPersonagemEsqueletoX >= -100) {
        this.ataqueEsqueleto(oEsqueleto, oEsqueletoVar);
        oEsqueleto.pertoParaAtaque = true;
      } else {
        oEsqueleto.pertoParaAtaque = false;
      }
    }

    if (
      oEsqueleto.podeMover === true &&
      oEsqueleto.esqueletoJaTaMorto === false
    ) {
      // Se o esqueleto estiver muito perto do personagem significa que ele pode atacar

      // Move o esqueleto para o jogador
      if (diferencaPersonagemEsqueletoX > 50) {
        oEsqueletoVar.setFlip(false, false);
        oEsqueletoVar.setVelocityX(oEsqueleto.velocidade);
        oEsqueletoVar.anims.play("andarEsqueleto", true);
      } else if (diferencaPersonagemEsqueletoX < -50) {
        oEsqueletoVar.setFlip(true, false);
        oEsqueletoVar.setVelocityX(-oEsqueleto.velocidade);
      }

      // Se o esquleto estar movendo, tocar animacao
      if (oEsqueletoVar.body.touching.down) {
        if (oEsqueletoVar.body.velocity.x !== 0) {
          oEsqueletoVar.anims.play("andarEsqueleto", true);
        }
      }

      // Logica para ver se o esqueleto pode pular ou nao
      if (oEsqueletoVar.body.touching.down) {
        oEsqueleto.podePular = true;
      } else {
        oEsqueleto.podePular = false;
      }

      // Se o esqueleto tocar em uma parede, ele chama a funcao de pulo para verificar se ele pode pular
      if (
        oEsqueletoVar.body.touching.left ||
        oEsqueletoVar.body.touching.right
      ) {
        this.puloEsqueleto(oEsqueleto, oEsqueletoVar);
      }
    }
  }

  esqueletoAnimacaoUpdate(oEsqueletoVar, oEsqueleto, anim, frame) {
    if (anim.key === "ataqueEsqueleto") {
      // Verifica se o frame é um frame de ataque
      if (oEsqueleto.FRAMES_ATAQUE.includes(frame.frame.name)) {
        oEsqueleto.danoAtualEsqueleto = oEsqueleto.DANO;
      } else {
        oEsqueleto.danoAtualEsqueleto = 0;
      }

      return;
    }
    oEsqueletoVar.setSize(tamanhoNormalEsqueleto[0], tamanhoNormalEsqueleto[1]);
  }

  esqueletoAnimacaoComecada(oEsqueletoVar, anim) {
    // Ve se o esqueleto comecou o ataque
    if (anim.key === "ataqueEsqueleto") {
      oEsqueletoVar.setSize(212, tamanhoNormalEsqueleto[1]);
      return;
    }
    oEsqueletoVar.setSize(tamanhoNormalEsqueleto[0], tamanhoNormalEsqueleto[1]);
  }

  esqueletoAnimacaoTerminada(oEsqueleto, oEsqueletoVar, anim) {
    // Ve se o esqueleto levou hit
    if (anim.key === "hitEsqueleto") {
      // Ve se o esqueleto morreu
      if (oEsqueleto.vidaAtual <= 0) {
        oEsqueleto.esqueletoJaTaMorto = true;
        oEsqueletoVar.anims.play("morteEsqueleto", false);
        return;
      }

      oEsqueleto.coolDownAtaque = false;
      oEsqueleto.podeDarDano = false;
      oEsqueleto.danoAtualEsqueleto = 0;

      oEsqueleto.podeMover = true;
      oEsqueleto.podePular = true;
      oEsqueletoVar.anims.play("normalEsqueleto", true);
      // respawn e morte do esqueleto se o esqueleto tocar a animacao de morte
    } else if (anim.key === "morteEsqueleto") {
      // Respawn aqui em baixo
      this.killEsqueleto(oEsqueleto, oEsqueletoVar);
      setTimeout(() => {
        this.respawnEsqueleto(oEsqueleto, oEsqueletoVar);
      }, oEsqueleto.respawnTempo);
    } else if (anim.key === "ataqueEsqueleto") {
      if (oEsqueleto.esqueletoJaTaMorto === true) {
        this.killEsqueleto(oEsqueleto, oEsqueletoVar);
        setTimeout(() => {
          this.respawnEsqueleto(oEsqueleto, oEsqueletoVar);
        }, oEsqueleto.respawnTempo);
        return;
      }

      oEsqueleto.podeDarDano = false;
      oEsqueleto.danoAtualEsqueleto = 0;

      oEsqueleto.podeMover = true;
      oEsqueleto.podePular = true;
      oEsqueletoVar.anims.play("normalEsqueleto", true);
      setTimeout(() => {
        oEsqueleto.coolDownAtaque = false;
      }, 2000);
    }
  }

  killEsqueleto(oEsqueleto, oEsqueletoVar) {
    oEsqueleto.podeMover = false;
    oEsqueletoVar.setVisible(false);
    oEsqueletoVar.setActive(false);
    oEsqueletoVar.disableBody(true, true);

    caveiras++;
    localStorage.setItem("Caveiras", caveiras);
    caveirasImagem.setVisible(true);
    caveirasTexto.setText("(x" + caveiras + ")");
  }

  respawnEsqueleto(oEsqueleto, oEsqueletoVar) {
    oEsqueletoVar.enableBody(
      true,
      oEsqueleto.respawnPos[0],
      oEsqueleto.respawnPos[1],
      true,
      true
    );
    oEsqueletoVar.setVisible(true);
    oEsqueletoVar.setActive(true);
    oEsqueletoVar.anims.play("normalEsqueleto", true);

    oEsqueleto.vidaAtual = oEsqueleto.VIDA_MAXIMA;
    oEsqueleto.podeMover = true;
    oEsqueleto.esqueletoJaTaMorto = false;
    oEsqueleto.coolDownAtaque = false;
  }

  // Logica para ver se o esqueleto deveria pular ou nao
  puloEsqueleto(oEsqueleto, oEsqueletoVar) {
    if (oEsqueleto.podePular === false) {
      return;
    }
    if (oEsqueleto.pertoParaAtaque === true) {
      return;
    }

    // bem que phaser podia ter pathfinding...

    oEsqueletoVar.setVelocityY(alturaPulo);
    oEsqueleto.podePular = false;
  }

  ataqueEsqueleto(oEsqueleto, oEsqueletoVar) {
    if (oEsqueleto.coolDownAtaque === true) {
      return;
    }
    if (oEsqueleto.vidaAtual <= 0) {
      return;
    }
    if (oEsqueleto.podeLevarHit === false) {
      return;
    }

    oEsqueletoVar.anims.play("ataqueEsqueleto", false);
    oEsqueletoVar.setVelocityX(0);
    oEsqueleto.podeMover = false;
    oEsqueleto.podePular = false;

    oEsqueleto.coolDownAtaque = true;
    oEsqueleto.podeDarDano = true;
  }

  gameOver() {
    // "Desativa os esqueletos"
    esqueleto.anims.play("normalEsqueleto", true);
    esqueleto2.anims.play("normalEsqueleto", true);

    esqueleto.setVelocityX(0);
    esqueleto2.setVelocityX(0);

    this.esqueleto.podeLevarHit = false;

    this.esqueleto.podeMover = false;
    this.esqueleto2.podeMover = false;
    this.esqueleto.coolDownAtaque = true;
    this.esqueleto2.coolDownAtaque = true;

    // Define quanto tempo demora para a tween
    this.tempoTween = 800;

    // Parte da GUI do game over

    // Background da UI
    const x = this.cameras.main.width;
    const y = this.cameras.main.height;

    this.backgroundGameOver = this.add.graphics();
    this.backgroundGameOver.fillStyle(0x000000, 0.5);
    this.backgroundGameOver.fillRect(0, 0, x, y);

    this.barraGameOver1 = this.add.graphics();
    this.barraGameOver1.fillStyle(0x000000, 0.8);
    this.barraGameOver1.fillRect(0, y - 50, x, 50);

    this.barraGameOver2 = this.add.graphics();
    this.barraGameOver2.fillStyle(0x000000, 0.8);
    this.barraGameOver2.fillRect(0, 0, x, 25);

    // Textos da UI
    this.mainTexto = this.add
      .text(x - 850, y / 2, "", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.textoContinuar = this.add
      .image(x / 1.35, y - 50, "continuar")

    // Interação com os botões
    this.textoContinuar.on("pointerover", () => {
      this.textoContinuar.setTexture("continuarDestaque");
    });
    this.textoContinuar.on("pointerout", () => {
      this.textoContinuar.setTexture("continuar");
    });
    this.textoContinuar.on("pointerdown", () => {
      // reseta o jogo para como ele era
      personagemNaoTomaDano = false;
      stunJogador = false;
      cooldownRoll = false;

      this.textoContinuar.off("pointerdown");
      this.textoSair.off("pointerdown");

      this.input.off("pointerdown");

      personagem.off("animationcomplete");
      personagem.off("animationstart");
      personagem.off("animationupdate");

      esqueleto.off("animationcomplete");
      esqueleto.off("animationstart");
      esqueleto.off("animationupdate");

      esqueleto2.off("animationcomplete");
      esqueleto2.off("animationstart");
      esqueleto2.off("animationupdate");

      this.scene.restart();
    });

    this.textoSair = this.add.image(x / 1.1, y - 50, "sair")
    this.textoSair.on("pointerover", () => {
      this.textoSair.setTexture("sairDestaque");
    });
    this.textoSair.on("pointerout", () => {
      this.textoSair.setTexture("sair");
    });
    this.textoSair.on("pointerdown", () => {
      this.scene.start("Menu");
      this.scene.stop("Jogo");
    });

    this.textoSair.setVisible(false);
    this.textoContinuar.setVisible(false);

    // Tweens
    // Add tweens to expand the bars
    this.tweens.add({
      targets: { height: 50 },
      height: 100,
      duration: this.tempoTween,
      ease: "Power1",
      onUpdate: (tween) => {
        const height = tween.getValue();
        this.barraGameOver1.clear();
        this.barraGameOver1.fillStyle(0x000000, 0.8);
        this.barraGameOver1.fillRect(0, y - height, x, height);
      },
    });

    this.tweens.add({
      targets: { height: 25 },
      height: 50,
      duration: this.tempoTween,
      ease: "Power1",
      onUpdate: (tween) => {
        const height = tween.getValue();
        this.barraGameOver2.clear();
        this.barraGameOver2.fillStyle(0x000000, 0.8);
        this.barraGameOver2.fillRect(0, 0, x, height);
      },
    });

    // Esconder a UI original
    this.backgroundUI.setVisible(false);
    caveirasImagem.setVisible(false);
    caveirasTexto.setVisible(false);
    this.vidaBgUI.setVisible(false);
    this.vidaUI.setVisible(false);
    this.vidaTexto.setVisible(false);
    this.energiaBgUI.setVisible(false);
    this.energiaUI.setVisible(false);
    this.energiaTexto.setVisible(false);

    this.backgroundGameOver.setScrollFactor(0);
    this.barraGameOver1.setScrollFactor(0);
    this.barraGameOver2.setScrollFactor(0);
    this.textoContinuar.setScrollFactor(0);
    this.textoSair.setScrollFactor(0);
    this.mainTexto.setScrollFactor(0);

    
    setTimeout(() => {
      this.efeitoTypewrite("O cavaleiro está morto", this.mainTexto);
      this.textoSair.setVisible(true);
      this.textoContinuar.setVisible(true);
      this.textoSair.setInteractive();
      this.textoContinuar.setInteractive();
    }, this.tempoTween)
  }

  efeitoTypewrite(texto, objeto) {
    const length = texto.length;
    const xAntigo = objeto.x;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        objeto.text += texto[i];
        objeto.x = xAntigo + objeto.width / 2;
        ++i;
      },
      repeat: length - 1,
      delay: 100
    });
  }
}

// Largura e altura do jogo
const larguraJogo = 3000;
const alturaJogo = 600;

// Variaveis
let personagem;
let esqueleto;
let esqueleto2;

const tamanhoNormal = [50, 76];
const tamanhoNormalEsqueleto = [92, 107];

// Frame Data

// Frames que o jogador é invencivel e não toma dano quando ele estiver cooldownRoll
const framesRolamentoSemDano = [2, 3, 4, 5, 6, 7, 8, 9];
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

let stunJogador = false;

let cooldownRoll = false;

let alturaPulo = -350;

let personagemVidaAtual = 100;
let personagemEnergiaAtual = 100;

const PERSONAGEM_VIDA_MAXIMA = personagemVidaAtual;
const PERSONAGEM_ENERGIA_MAXIMA = personagemEnergiaAtual;

let vidaUI_Largura = personagemVidaAtual;
let energiaUI_Largura = personagemEnergiaAtual;

let personagemNaoTomaDano = false;

const DANO_LEVE = 10;
const DANO_PESADO = 25;

const ENERGIA_ATAQUE_LEVE = 20;
const ENERGIA_ATAQUE_PESADO = 35;
const ENERGIA_ROLAMENTO = 15;

let dano = 0;

let personagemX;

const personagemSpawn = [20, 500];

let diferencaPersonagemEsqueletoX = 0;

let caveiras = Number(localStorage.getItem("Caveiras"));

let cooldownHeal = false;
