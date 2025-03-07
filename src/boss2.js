// boa sorte

export class BossSecreto extends Phaser.Scene {
  constructor() {
    super("BossSecreto");
  }

  init() {
    // Variaveis do boss22
    this.boss2 = {
      vidaAtual: 400,
      VIDA_MAXIMA: 400,

      podeLevarHit: true,
      podeMover: true,

      pertoParaAtaque: false,
      coolDownAtaque: false,
      boss2JaTaMorto: false,
      podeSerStunado: true,

      FRAMES_ATAQUE_1: [2],
      FRAMES_ATAQUE_2: [2],
      FRAMES_ATAQUE_3: [2],
      DANO_1: 25,
      DANO_2: 30,
      DANO_3: 40,
      DANO_RAPIDO: 75,
      podeDarDano: false,
      danoAtual: 0,
      posX: 200,

      combo: 0, // 0 - Aqui o combo é o numero de vezes que o boss2 atacou, se ele for 3 ele muda de modo
      modo: 0, // 0 - Normal 1 - Evasivo (da um counter) 2 - Ataque rapido

      vaiTentarCounter: true,
      velocidade: 300,
      tocouSom: false,
    };

    this.boss2.modo = 1;

    // Reseta variaveis globais
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

    // ------------------------------------------------------
    // Carrega as animações do boss2
    // ------------------------------------------------------

    this.load.spritesheet("boss2_normal", "src/assets/Boss2_Idle.png", {
      frameWidth: 100,
      frameHeight: 115,
    });

    this.load.spritesheet("boss2_hit", "src/assets/Boss2_Dano.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss2_morte", "src/assets/Boss2_Morte.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss2_andando", "src/assets/Boss2_Correndo.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss2_ataque1", "src/assets/Boss2_Ataque1.png", {
      frameWidth: 189,
      frameHeight: 140,
    });

    this.load.spritesheet("boss2_ataque2", "src/assets/Boss2_Ataque2.png", {
      frameWidth: 303,
      frameHeight: 140,
    });

    this.load.spritesheet("boss2_ataque3", "src/assets/Boss2_Ataque3.png", {
      frameWidth: 303,
      frameHeight: 216,
    });

    this.load.spritesheet("boss2_pulo", "src/assets/Boss2_Pulo.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss2_caindo", "src/assets/Boss2_Fall.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    // Elementos da UI
    this.load.image("sair", "src/assets/Sair.png");
    this.load.image("sairDestaque", "src/assets/SairUnderline.png");
    this.load.image("continuar", "src/assets/Continuar.png");
    this.load.image("continuarDestaque", "src/assets/ContinuarUnderline.png");
    // Audio

    this.load.audio("ataque_leveSom", "src/assets/audio/ataque_leve.wav");
    this.load.audio("ataque_pesadoSom", "src/assets/audio/ataque_pesado.wav");
  }

  create() {
    // Carrega os sons
    const ataque_leveSom = this.sound.add("ataque_leveSom");
    const ataque_PesadoSom = this.sound.add("ataque_pesadoSom");

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
    boss2 = this.physics.add.sprite(64, 0, "boss2_normal");
    boss2.setCollideWorldBounds(true);
    boss2.setPosition(1500, 535);
    boss2.setOrigin(0.5, 1);

    boss2.body.pushable = false;

    // Adiciona colisão do personagem nas plataforams
    this.physics.add.collider(personagem, chao);
    this.physics.add.collider(personagem, this.chao2);
    this.physics.add.collider(personagem, terra);

    // Adiciona colisão aos inimigos
    this.physics.add.collider(boss2, chao);
    this.physics.add.collider(boss2, this.chao2);
    this.physics.add.collider(boss2, terra);

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
    // Animações do boss2
    // ------------------------------------------------------

    // Idle do boss2
    this.anims.create({
      key: "normalBoss2",
      frames: this.anims.generateFrameNumbers("boss2_normal", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação de hit do boss2
    this.anims.create({
      key: "hitBoss2",
      frames: this.anims.generateFrameNumbers("boss2_hit", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de hit do boss2
    this.anims.create({
      key: "morteBoss2",
      frames: this.anims.generateFrameNumbers("boss2_morte", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: 0,
    });

    // Animação de andar do boss2
    this.anims.create({
      key: "andarBoss2",
      frames: this.anims.generateFrameNumbers("boss2_andando", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Animação de ataque do boss2
    this.anims.create({
      key: "ataqueBoss2_1",
      frames: this.anims.generateFrameNumbers("boss2_ataque1", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de ataque do boss2
    this.anims.create({
      key: "ataqueBoss2_2",
      frames: this.anims.generateFrameNumbers("boss2_ataque2", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de ataque do boss2
    this.anims.create({
      key: "ataqueBoss2_3",
      frames: this.anims.generateFrameNumbers("boss2_ataque3", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de ataque do boss2
    this.anims.create({
      key: "boss2Pulo",
      frames: this.anims.generateFrameNumbers("boss2_pulo", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: 0,
    });

    // Animação de ataque do boss2
    this.anims.create({
      key: "boss2Caindo",
      frames: this.anims.generateFrameNumbers("boss2_caindo", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: 0,
    });

    // Ataque rapido do boss2

    // Animação de ataque do boss2
    this.anims.create({
      key: "ataqueBoss2R",
      frames: this.anims.generateFrameNumbers("boss2_ataque2", {
        start: 0,
        end: 3,
      }),
      frameRate: 20,
      repeat: 0,
    });

    // Animação de ataque do boss2
    this.anims.create({
      key: "ataqueBoss3R",
      frames: this.anims.generateFrameNumbers("boss2_ataque3", {
        start: 0,
        end: 3,
      }),
      frameRate: 20,
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
          if (personagemTocouSom === false) {
            personagemTocouSom = true;
            ataque_leveSom.play();
          }
          dano = DANO_LEVE;
        } else {
          dano = 0;
        }
      } else if (anim.key === "ataque_Pesado") {
        if (framesAtaquePesadoDano.includes(frame.frame.name)) {
          if (personagemTocouSom === false) {
            personagemTocouSom = true;
            ataque_PesadoSom.play();
          }
          dano = DANO_PESADO;
        } else {
          dano = 0;
        }
      }
    });

    // Seta a variavel stunJogador para false quando a animação termina, e muda o estagio do ataque
    personagem.on("animationcomplete", (anim) => {
      if (anim.key === "ataque_Leve") {
        this.boss2.podeLevarHit = true;
        stunJogador = false;
        personagemTocouSom = false;
        dano = 0;
      } else if (anim.key === "ataque_Pesado") {
        this.boss2.podeLevarHit = true;
        stunJogador = false;
        personagemTocouSom = false;
        dano = 0;
      } else if (anim.key === "rolamento") {
        personagem.setVelocityX(0);
        cooldownRoll = false;
      } else if (anim.key === "hit") {
        personagemNaoTomaDano = false;
        personagemTocouSom = false;
        stunJogador = false;
        cooldownRoll = false;
      }
    });

    // Logica para o overlap do personagem contra o boss2
    this.physics.add.overlap(personagem, boss2, () => {
      this.overlapBossPlayer(personagem, boss2, this.boss2);
    });

    // Logica das animações do boss2

    // Animação do primeiro boss2
    boss2.on("animationstart", (anim) => {
      this.boss2AnimacaoComecada(boss2, anim);
    });

    // Verifica o frame da animação do boss2
    boss2.on("animationupdate", (anim, frame) => {
      this.boss2AnimacaoUpdate(boss2, this.boss2, anim, frame);
    });

    boss2.on("animationcomplete", (anim) => {
      this.boss2AnimacaoTerminada(this.boss2, boss2, anim);
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

    // Bara de vida do boss2

    this.larguraVidaBoss = this.boss2.vidaAtual;

    this.boss2VidaBgUI = this.add.graphics();
    this.boss2VidaBgUI.fillStyle(0x000000, 1);
    this.boss2VidaBgUI.fillRect(325, 100, this.larguraVidaBoss + 25, 15);

    this.boss2VidaUI = this.add.graphics();
    this.boss2VidaUI.fillStyle(0xba1f11, 1);
    this.boss2VidaUI.fillRect(325, 100, this.larguraVidaBoss, 15);

    this.boss2VidaName = this.add.text(325, 80, "Old Oak King", {
      fontSize: "14px",
      fill: "#ffffff",
    });
    this.boss2VidaText = this.add.text(
      this.larguraVidaBoss + 325,
      100,
      this.boss2.vidaAtual,
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
    this.boss2VidaText.setScrollFactor(0);
    this.boss2VidaBgUI.setScrollFactor(0);
    this.boss2VidaUI.setScrollFactor(0);
    this.boss2VidaName.setScrollFactor(0);

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
      } else if (teclado.right.isDown || teclaD.isDown) {
        personagem.setVelocityX(200);
        personagem.setFlip(false, false);

        // Update do paralax para esquerda
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

            this.time.delayedCall(2500, () => {
              cooldownHeal = false;
            });

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
        if (!boss2.body.touching.up) {
          pode_Pular = true;
        }

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
    this.boss2.posX = boss2.body.position.x;

    this.updateLogicBoss(this.boss2, boss2);
  }
  updateVidaBoss() {
    this.boss2VidaUI.clear();
    this.boss2VidaUI.fillStyle(0xba1f11, 1);
    this.boss2VidaUI.fillRect(325, 100, this.boss2.vidaAtual, 15);
    this.boss2VidaText.setText(this.boss2.vidaAtual);
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
      this.time.delayedCall(1200, () => {
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
      });
    }
  }

  // Funcao da funcao de update ui para
  updateDaUi(valorUI, larguraUI, UI, textoUI, cor, posicao) {
    textoUI.setText(valorUI);

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
        return;
      }
      personagem.setVelocity(0);
      stunJogador = true;

      personagem.anims.play("ataque_Pesado", false);
    } else if (personagemEnergiaAtual >= ENERGIA_ATAQUE_LEVE) {
      if (personagemEnergiaAtual < ENERGIA_ATAQUE_LEVE) {
        return;
      }

      personagem.setVelocity(0);
      stunJogador = true;

      personagem.anims.play("ataque_Leve", false);
    }
  }

  oCounterDoBoss(oBoss, oBossVar) {
    let velocidadeAntiga = oBoss.velocidade

    oBossVar.anims.play("boss2Pulo", false);

    oBossVar.setVelocityY(-200);
    if(oBossVar.flipX === true) {
      oBossVar.setVelocityX(-400);
    } else {
      oBossVar.setVelocityX(400);
    }
    
    oBoss.velocidade = 600;

    this.time.delayedCall(500, () => {
      const groundCheck = () => {
        if (oBossVar.body.touching.down && oBoss.coolDownAtaque === false) {
          this.events.off("update", groundCheck);
  
          oBossVar.setVelocityX(0);
          oBoss.podeMover = true;
          oBoss.podeLevarHit = true;
          oBoss.modo = 2;
        }
      };
      this.time.delayedCall(1000, () => {
        oBoss.velocidade = velocidadeAntiga;
      });
      // Evento para verificar se o boss2 tocou no chao
      this.events.on("update", groundCheck);
    })
    
  }

  overlapBossPlayer(personagem, oBossVar, oBoss) {
    if (oBoss.podeLevarHit === false) {
      return;
    }
    if (stunJogador === false && oBoss.podeDarDano === false) {
      return;
    }
    if (dano === 0) {
      // Logica para ver se foi o boss2 que deu o hit no jogador
      if (oBoss.danoAtual > 0 && oBoss.podeDarDano === true) {
        if (personagemNaoTomaDano === true) {
          return;
        }
        personagemVidaAtual -= oBoss.danoAtual;
        personagemVidaAtual = Math.max(0, personagemVidaAtual);

        oBoss.podeDarDano = false;

        this.updateUi("vida");

        if (personagemVidaAtual == 0) {
          personagem.anims.play("morte", false);
          personagem.podeLevarHit = false;
          personagemNaoTomaDano = true;
          personagem.podeMover = false;
          stunJogador = true;
          personagem.setVelocityX(0);
          personagem.setVelocityY(200);
          this.time.delayedCall(1200, () => {
            this.gameOver();
          });
          return;
        }

        personagem.setVelocity(0);

        stunJogador = true;
        personagem.anims.play("hit", true);
      }
      return;
    }
    if (oBoss.vidaAtual <= 0) {
      oBoss.boss2JaTaMorto = true;
      return;
    }

    if (oBoss.vaiTentarCounter === true && oBossVar.flipX !== personagem.flipX) {
      oBoss.vaiTentarCounter = false;
      oBoss.podeLevarHit = false;
      this.oCounterDoBoss(oBoss, oBossVar);
      return;
    }

    // Verifica se o boss2 vai tocar a animacao de hit ou nao
    if (oBoss.podeSerStunado === true || oBoss.vidaAtual <= 0) {
      oBoss.vidaAtual -= dano * 1.5;

      oBossVar.setVelocityX(0);
      oBossVar.setVelocityY(200);

      oBoss.podeMover = false;
      oBoss.podeLevarHit = false;

      oBossVar.anims.play("hitBoss2", false);
    } else {
      oBoss.vidaAtual -= dano;

      oBoss.podeLevarHit = false;
      this.time.delayedCall(500, () => {
        oBoss.podeLevarHit = true;
      });
    }

    if (oBoss.vidaAtual <= 0) {
      oBoss.vidaAtual = 0;
    }

    this.updateVidaBoss();

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
  // Funções boss2

  updateLogicBoss(oBoss, oBossVar) {
    // Variavel da diferenca do x entre o boss2 e o personagem
    diferencaPersonagemBossX = personagemX - oBoss.posX;
    // Verifica se o personagem está no alcance do ataque do boss2
    if (diferencaPersonagemBossX > 0) {
      if (diferencaPersonagemBossX <= 80) {
        oBoss.pertoParaAtaque = true;
        this.ataqueBoss(oBoss, oBossVar);
      } else {
        oBoss.pertoParaAtaque = false;
      }
    } else {
      if (diferencaPersonagemBossX >= -80) {
        this.ataqueBoss(oBoss, oBossVar);
        oBoss.pertoParaAtaque = true;
      } else {
        oBoss.pertoParaAtaque = false;
      }
    }

    if (oBoss.podeMover === true && oBoss.boss2JaTaMorto === false) {
      // Se o boss2 estiver muito perto do personagem significa que ele pode atacar

      // Move o boss2 para o jogador
      if (diferencaPersonagemBossX > 50) {
        oBossVar.setFlip(false, false);
        oBossVar.setVelocityX(oBoss.velocidade);
        oBossVar.anims.play("andarBoss2", true);
      } else if (diferencaPersonagemBossX < -50) {
        oBossVar.setFlip(true, false);
        oBossVar.setVelocityX(-oBoss.velocidade);
      }

      // Se o esquleto estar movendo, tocar animacao
      if (oBossVar.body.touching.down) {
        if (oBossVar.body.velocity.x !== 0) {
          oBossVar.anims.play("andarBoss2", true);
        }
      }
    }
  }

  boss2AnimacaoUpdate(oBossVar, oBoss, anim, frame) {
    if (anim.key === "ataqueBoss2_1") {
      // Verifica se o frame é um frame de ataque
      if (oBoss.FRAMES_ATAQUE_1.includes(frame.frame.name)) {
        oBoss.danoAtual = oBoss.DANO_1;
      } else {
        oBoss.danoAtual = 0;
      }

      return;
    } else if (anim.key === "ataqueBoss2_2") {
      // Verifica se o frame é um frame de ataque
      if (oBoss.FRAMES_ATAQUE_2.includes(frame.frame.name)) {
        oBoss.danoAtual = oBoss.DANO_2;
      } else {
        oBoss.danoAtual = 0;
      }

      return;
    } else if (anim.key === "ataqueBoss2_3") {
      // Verifica se o frame é um frame de ataque
      if (oBoss.FRAMES_ATAQUE_3.includes(frame.frame.name)) {
        oBoss.danoAtual = oBoss.DANO_3;
      } else {
        oBoss.danoAtual = 0;
      }
      return;
    } else if (anim.key === "ataqueBoss2R" || anim.key === "ataqueBoss3R") {
      if (oBoss.FRAMES_ATAQUE_3.includes(frame.frame.name)) {
        oBoss.danoAtual = oBoss.DANO_RAPIDO;
      } else {
        oBoss.danoAtual = 0;
      }

      return;
    }

    oBossVar.setSize(tamanhoNormalBoss[0], tamanhoNormalBoss[1]);
  }

  boss2AnimacaoComecada(oBossVar, anim) {
    if (anim.key === "ataqueBoss2_1") {
      oBossVar.setSize(180, 200);
      oBossVar.setOffset(0, 0);
      return;
    } else if (anim.key === "ataqueBoss2_2" || anim.key === "ataqueBoss2R") {
      oBossVar.setSize(250, 200);
      if (oBossVar.flipX === false) {
        oBossVar.setOffset(0, 0);
      } else {
        oBossVar.setOffset(50, 0);
      }
      return;
      rr;
    }
    if (anim.key === "ataqueBoss2_3" || anim.key === "ataqueBoss3R") {
      oBossVar.setSize(150, 250);
      if (oBossVar.flipX === false) {
        oBossVar.setOffset(150, 40);
      } else {
        oBossVar.setOffset(10, 40);
      }
      return;
    }
    oBossVar.setSize(tamanhoNormalBoss[0], tamanhoNormalBoss[1]);
    oBossVar.setOffset(0, 0);
  }

  boss2AnimacaoTerminada(oBoss, oBossVar, anim) {
    // Ve se o boss2 levou hit
    if (anim.key === "hitBoss2") {
      // Ve se o esqueleto morreu
      if (oBoss.vidaAtual <= 0) {
        oBoss.boss2JaTaMorto = true;
        oBossVar.anims.play("morteBoss2", false);
        return;
      }

      oBoss.podeDarDano = false;
      oBoss.danoAtual = 0;

      oBoss.tocouSom = false;
      oBoss.podeMover = true;
      oBossVar.anims.play("normalBoss2", true);
      // respawn e morte do boss2 se o boss2 tocar a animacao de morte
    } else if (anim.key === "morteBoss2") {
      // Respawn aqui em baixo
      this.killBoss(oBoss, oBossVar);
    } else if (
      anim.key === "ataqueBoss2_3" ||
      anim.key === "ataqueBoss2_2" ||
      anim.key === "ataqueBoss2_1" ||
      anim.key === "ataqueBoss2R" ||
      anim.key === "ataqueBoss3R"
    ) {
      if (oBoss.boss2JaTaMorto === true || oBoss.vidaAtual <= 0) {
        oBoss.boss2JaTaMorto = true;
        oBossVar.anims.play("morteBoss2", false);
        return;
      }

      // Ver se o boss2 vai dar o ataque rapido ou normal
      if (anim.key === "ataqueBoss2_1") {
        if (oBoss.modo === 2) {
          this.time.delayedCall(500, () => {
            oBoss.podeDarDano = true;
            oBossVar.anims.play("ataqueBoss2R", true);
          });
        } else {
          this.time.delayedCall(100, () => {
            oBoss.podeDarDano = true;
            oBossVar.anims.play("ataqueBoss2_2", true);
          });
        }
        return;
      } else if (anim.key === "ataqueBoss2_2") {
        this.time.delayedCall(100, () => {
          oBoss.podeDarDano = true;
          oBossVar.anims.play("ataqueBoss2_3", true);
        });
        return;
      } else if (anim.key === "ataqueBoss2R") {
        oBoss.podeDarDano = true;
        oBossVar.anims.play("ataqueBoss3R", true);
        return;
      }

      // Avança a contagem do modo do boss2. Se a contagem for maior que 3, ele muda de modo
      oBoss.combo++;
      console.log(oBoss.combo)
      if(oBoss.combo >= 3) {
        oBoss.combo = 0;
        let modoAntigo = this.boss2.modo;
        do {
          this.boss2.modo = Math.floor(Math.random() * 3);
        } while (this.boss2.modo === modoAntigo);

        console.log(this.boss2.modo);

        this.boss2.vaiTentarCounter = false;
      }

      oBoss.podeSerStunado = true;

      this.time.delayedCall(50, () => {
        oBoss.podeDarDano = false;
        oBoss.danoAtual = 0;

        oBoss.podeMover = true;
        oBossVar.anims.play("normalBoss2", true);
        this.time.delayedCall(700, () => {
          oBoss.coolDownAtaque = false;
        });
      });
    }
  }

  // Mata o boss2
  killBoss(oBoss, oBossVar) {
    oBoss.podeMover = false;
    oBossVar.setActive(false);

    caveiras += 100;
    localStorage.setItem("Caveiras", caveiras);
    caveirasImagem.setVisible(true);
    caveirasTexto.setText("(x" + caveiras + ")");

    // Começa a funcao quando o boss2 é derrotado
    this.boss2Derotado();
  }

 
  ataqueBoss(oBoss, oBossVar) {
    if (oBoss.coolDownAtaque === true) {
      return;
    }
    if (oBoss.vidaAtual <= 0) {
      return;
    }
    if (oBoss.podeMover === false) {
      return;
    }

    if (oBoss.modo === 1 && oBoss.podeDarDano === false) {
      oBoss.podeMover = false;
      oBoss.vaiTentarCounter = true;
      oBossVar.setVelocityX(0);
      oBossVar.anims.play("normalBoss2", true);
      
      // Se o player nao atacar o boss2, entao ele sai da fase de counter
      this.time.delayedCall(2500, () => {
        if(this.boss2.vaiTentarCounter === true && this.boss2.modo !== 2) {
          this.boss2.vaiTentarCounter = false;
          this.boss2.podeMover = true;
          oBoss.modo = 0;
        }
      });
      return;
    }

    // Ele também não pode ser interrompido no seu ataque
    oBoss.podeSerStunado = false;

    oBossVar.anims.play("ataqueBoss2_1", false);
    oBossVar.setVelocityX(0);
    oBoss.podeMover = false;

    oBoss.coolDownAtaque = true;
    oBoss.podeDarDano = true;
  }

  gameOver() {
    // "Desativa o boss2"
    boss2.anims.play("normalBoss2", true);

    boss2.setVelocityX(0);
    boss2.setVelocityX(0);

    this.boss2.podeLevarHit = false;

    this.boss2.podeMover = false;
    this.boss2.coolDownAtaque = true;

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

    this.textoContinuar = this.add.image(x / 1.35, y - 50, "continuar");

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

      // Remove os listeners nos botoes
      this.textoContinuar.off("pointerdown");
      this.textoSair.off("pointerdown");

      this.input.off("pointerdown");

      this.resetGame();

      this.scene.restart();
    });

    this.textoSair = this.add.image(x / 1.1, y - 50, "sair");
    this.textoSair.on("pointerover", () => {
      this.textoSair.setTexture("sairDestaque");
    });
    this.textoSair.on("pointerout", () => {
      this.textoSair.setTexture("sair");
    });
    this.textoSair.on("pointerdown", () => {
      this.scene.start("Menu");
      this.scene.stop("BossSecreto");
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

    this.time.delayedCall(this.tempoTween, () => {
      this.efeitoTypewrite("O cavaleiro está morto", this.mainTexto);
      this.textoSair.setVisible(true);
      this.textoContinuar.setVisible(true);
      this.textoSair.setInteractive();
      this.textoContinuar.setInteractive();
    });
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
      delay: 100,
    });
  }

  // Funcao quando o boss2 é derrotado
  boss2Derotado() {
    this.time.delayedCall(500, () => {
      const x = this.cameras.main.width;
      const y = this.cameras.main.height;

      this.boss2VidaBgUI.setVisible(false);
      this.boss2VidaUI.setVisible(false);
      this.boss2VidaName.setVisible(false);
      this.boss2VidaText.setVisible(false);

      this.backgroundBossDerotado = this.add.graphics();
      this.backgroundBossDerotado.fillStyle(0x000000, 0);
      this.backgroundBossDerotado.fillRect(0, y / 3, x, y / 4);

      this.textoBossDerotado = this.add
        .text(x / 2, y / 2.2, "REI DERROTADO", {
          fontSize: "40px",
          fill: "#ffffff",
        })
        .setOrigin(0.5, 0.5);

      this.textoBossDerotado.alpha = 0;

      // Tween da transparencia do texto
      this.tweens.add({
        targets: this.textoBossDerotado,
        alpha: { from: 0, to: 1 },
        duration: 3000,
        ease: "Linear",
      });

      // Tween da transparencia do background
      this.tweens.add({
        targets: { alpha: 0 },
        alpha: 0.75,
        duration: 3000,
        ease: "Linear",
        onUpdate: (tween) => {
          const alpha = tween.getValue();
          this.backgroundBossDerotado.clear();
          this.backgroundBossDerotado.fillStyle(0x000000, alpha);
          this.backgroundBossDerotado.fillRect(0, y / 3, x, y / 4);
        },
      });

      // Tween do tamanho do texto
      this.tweens.add({
        targets: { size: 36 },
        size: 48,
        duration: 3000,
        ease: "Linear",
        onUpdate: (tween) => {
          const size = tween.getValue();
          this.textoBossDerotado.setStyle({ fontSize: `${size}px` });
        },
      });

      this.textoBossDerotado.setScrollFactor(0);
      this.backgroundBossDerotado.setScrollFactor(0);

      this.time.delayedCall(3000, () => {
        // Tween da transparencia do background
        this.tweens.add({
          targets: { alpha: 0.75 },
          alpha: 0,
          duration: 1000,
          ease: "Power1",
          onUpdate: (tween) => {
            const alpha = tween.getValue();
            this.backgroundBossDerotado.clear();
            this.backgroundBossDerotado.fillStyle(0x000000, alpha);
            this.backgroundBossDerotado.fillRect(0, y / 3, x, y / 4);
          },
        });

        // Tween da transparencia do texto
        this.tweens.add({
          targets: this.textoBossDerotado,
          alpha: { from: 1, to: 0 },
          duration: 1000,
          ease: "Linear",
        });

        this.gameEnd();
      });
    });
  }

  gameEnd() {
    this.time.delayedCall(3000, () => {
      // Faz o jogador ficar parado no game end
      stunJogador = true;

      // Adiciona os elementos do game end
      const x = this.cameras.main.width;
      const y = this.cameras.main.height;

      this.backgroundEndGame = this.add.graphics();
      this.backgroundEndGame.fillStyle(0x000000, 1);
      this.backgroundEndGame.fillRect(0, 0, x, y);

      // Tween da transparencia do background
      this.tweens.add({
        targets: { alpha: 0 },
        alpha: 1,
        duration: 1000,
        ease: "Power1",
        onUpdate: (tween) => {
          const alpha = tween.getValue();
          this.backgroundEndGame.clear();
          this.backgroundEndGame.fillStyle(0x000000, alpha);
          this.backgroundEndGame.fillRect(0, 0, x, y);
        },
      });

      this.textoEndGame = this.add
        .text(x / 2, y / 2, "", {
          fontSize: "38px",
        })
        .setOrigin(0.5, 0.5);
      this.textoEndGame.alpha = 0;

      this.textoEndGame.setScrollFactor(0);
      this.backgroundEndGame.setScrollFactor(0);

      // Primeiro texto aparece
      this.time.delayedCall(1000, () => {
        this.textoEndGame.setText("O rei está morto");

        // Tween da transparencia do texto de endgame
        this.tweens.add({
          targets: this.textoEndGame,
          alpha: { from: 0, to: 1 },
          duration: 3000,
          ease: "Linear",
        });
      });

      // Primeiro texto some
      this.time.delayedCall(4000, () => {
        // Tween da transparencia do texto de endgame
        this.tweens.add({
          targets: this.textoEndGame,
          alpha: { from: 1, to: 0 },
          duration: 3000,
          ease: "Linear",
        });

        // Manda para os creditos
        this.time.delayedCall(3000, () => {
          this.resetGame();
          this.scene.start("Creditos");
          this.scene.stop("BossSecreto");
        });
      });
    });
  }

  resetGame() {
    // reseta o jogo para como ele era
    personagemNaoTomaDano = false;
    stunJogador = false;
    cooldownRoll = false;

    // Remove os listeners nos botoes

    personagem.off("animationcomplete");
    personagem.off("animationstart");
    personagem.off("animationupdate");

    boss2.off("animationcomplete");
    boss2.off("animationstart");
    boss2.off("animationupdate");
  }
}

// Largura e altura do jogo
const larguraJogo = 2000;
const alturaJogo = 600;

// Variaveis
let personagem;
let boss2;

const tamanhoNormal = [50, 76];
const tamanhoNormalBoss = [105, 115];

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

const personagemSpawn = [177, 500];

let diferencaPersonagemBossX = 0;

let caveiras = Number(localStorage.getItem("Caveiras"));

let cooldownHeal = false;
let personagemTocouSom = false;
