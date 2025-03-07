// boa sorte

export class BossSecreto extends Phaser.Scene {
  constructor() {
    super("BossSecreto");
  }

  init() {
    // Variaveis do boss
    this.boss = {
      vidaAtual: 500,
      VIDA_MAXIMA: 500,

      podeLevarHit: true,
      podeMover: true,

      pertoParaAtaque: false,
      coolDownAtaque: false,
      bossJaTaMorto: false,
      podeSerStunado: true,

      FRAMES_ATAQUE_1: [3],
      FRAMES_ATAQUE_2: [3],
      FRAMES_ATAQUE_3: [3],
      DANO_1: 30,
      DANO_2: 35,
      DANO_3: 40,
      podeDarDano: false,
      danoAtual: 0,
      posX: 200,

      combo: 0, // 0 - Sem combo, 1 - So o primeiro ataque, 2 - Primeiro e segundo ataque, 3 - Todos os ataques

      velocidade: 250,
      tocouSom: false,
    };

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
    // Carrega as animações do boss
    // ------------------------------------------------------

    this.load.spritesheet("boss_normal", "src/assets/Boss2_Idle.png", {
      frameWidth: 100,
      frameHeight: 115,
    });

    this.load.spritesheet("boss_hit", "src/assets/Boss2_Dano.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss_morte", "src/assets/Boss2_Morte.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss_andando", "src/assets/Boss2_Correndo.png", {
      frameWidth: 105,
      frameHeight: 115,
    });

    this.load.spritesheet("boss_ataque1", "src/assets/Boss2_Ataque1.png", {
      frameWidth: 189,
      frameHeight: 140,
    });

    this.load.spritesheet("boss_ataque2", "src/assets/Boss2_Ataque2.png", {
      frameWidth: 303,
      frameHeight: 140,
    });

    this.load.spritesheet("boss_ataque3", "src/assets/Boss2_Ataque3.png", {
      frameWidth: 303,
      frameHeight: 216,
    });

    // Elementos da UI
    this.load.image("sair", "src/assets/Sair.png");
    this.load.image("sairDestaque", "src/assets/SairUnderline.png");
    this.load.image("continuar", "src/assets/Continuar.png");
    this.load.image("continuarDestaque", "src/assets/ContinuarUnderline.png");
    // Audio
    this.load.audio("dano_BossSom", "src/assets/audio/bossDano.wav");

    this.load.audio("ataque_leveSom", "src/assets/audio/ataque_leve.wav");
    this.load.audio("ataque_pesadoSom", "src/assets/audio/ataque_pesado.wav");
    this.load.audio(
      "ataque_esqueletoSom",
      "src/assets/audio/esqueleto_ataque.wav"
    );

    this.load.audio(
      "thunderClapLight",
      "src/assets/audio/thunderClapLight.wav"
    );
    this.load.audio("thunderClap", "src/assets/audio/thunderClap.wav");
    this.load.audio(
      "thunderClapHeavy",
      "src/assets/audio/thunderClapHeavy.wav"
    );
    this.load.audio("bossSoundtrack", "src/assets/audio/TemaBoss.wav");
  }

  create() {
    // Carrega os sons
    const ataque_leveSom = this.sound.add("ataque_leveSom");
    const ataque_PesadoSom = this.sound.add("ataque_pesadoSom");
    dano_BossSom = this.sound.add("dano_BossSom");
    dano_BossSom.setVolume(0.5);

    thunderClapLight = this.sound.add("thunderClapLight");
    thunderClap = this.sound.add("thunderClap");
    thunderClapHeavy = this.sound.add("thunderClapHeavy");

    boss_Musica = this.sound.add("bossSoundtrack");
    boss_Musica.play();
    boss_Musica.setLoop(true);
    boss_Musica.setVolume(0.5);

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
    // Animações do boss
    // ------------------------------------------------------

    // Idle do boss
    this.anims.create({
      key: "normalBoss",
      frames: this.anims.generateFrameNumbers("boss_normal", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação de hit do boss
    this.anims.create({
      key: "hitBoss",
      frames: this.anims.generateFrameNumbers("boss_hit", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de hit do boss
    this.anims.create({
      key: "morteBoss",
      frames: this.anims.generateFrameNumbers("boss_morte", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: 0,
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

    // Animação de ataque do boss
    this.anims.create({
      key: "ataqueBoss1",
      frames: this.anims.generateFrameNumbers("boss_ataque1", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de ataque do boss
    this.anims.create({
      key: "ataqueBoss2",
      frames: this.anims.generateFrameNumbers("boss_ataque2", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Animação de ataque do boss
    this.anims.create({
      key: "ataqueBoss3",
      frames: this.anims.generateFrameNumbers("boss_ataque3", {
        start: 0,
        end: 3,
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
        this.boss.podeLevarHit = true;
        stunJogador = false;
        personagemTocouSom = false;
        dano = 0;
      } else if (anim.key === "ataque_Pesado") {
        this.boss.podeLevarHit = true;
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

    // Logica para o overlap do personagem contra o boss
    this.physics.add.overlap(personagem, boss, () => {
      this.overlapBossPlayer(personagem, boss, this.boss);
    });

    // Logica das animações do boss

    // Animação do primeiro boss
    boss.on("animationstart", (anim) => {
      this.bossAnimacaoComecada(boss, anim);
    });

    // Verifica o frame da animação do boss
    boss.on("animationupdate", (anim, frame) => {
      this.bossAnimacaoUpdate(boss, this.boss, anim, frame);
    });

    boss.on("animationcomplete", (anim) => {
      this.bossAnimacaoTerminada(this.boss, boss, anim);
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

    // Bara de vida do boss

    this.larguraVidaBoss = this.boss.vidaAtual;

    this.bossVidaBgUI = this.add.graphics();
    this.bossVidaBgUI.fillStyle(0x000000, 1);
    this.bossVidaBgUI.fillRect(325, 100, this.larguraVidaBoss + 25, 15);

    this.bossVidaUI = this.add.graphics();
    this.bossVidaUI.fillStyle(0xba1f11, 1);
    this.bossVidaUI.fillRect(325, 100, this.larguraVidaBoss, 15);

    this.bossVidaName = this.add.text(
      325,
      80,
      "Garrick, Lâmina do Céu Partido",
      {
        fontSize: "14px",
        fill: "#ffffff",
      }
    );
    this.bossVidaText = this.add.text(
      this.larguraVidaBoss + 325,
      100,
      this.boss.vidaAtual,
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
    this.bossVidaText.setScrollFactor(0);
    this.bossVidaBgUI.setScrollFactor(0);
    this.bossVidaUI.setScrollFactor(0);
    this.bossVidaName.setScrollFactor(0);

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

            this.time.delayedCall(1000, () => {
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
        if (!boss.body.touching.up) {
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
    this.boss.posX = boss.body.position.x;

    this.updateLogicBoss(this.boss, boss);
  }
  updateVidaBoss() {
    this.bossVidaUI.clear();
    this.bossVidaUI.fillStyle(0xba1f11, 1);
    this.bossVidaUI.fillRect(325, 100, this.boss.vidaAtual, 15);
    this.bossVidaText.setText(this.boss.vidaAtual);
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

  overlapBossPlayer(personagem, oBossVar, oBoss) {
    if (oBoss.podeLevarHit === false) {
      return;
    }
    if (stunJogador === false && oBoss.podeDarDano === false) {
      return;
    }
    if (dano === 0) {
      // Logica para ver se foi o boss que deu o hit no jogador
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
      oBoss.bossJaTaMorto = true;
      return;
    }

    // Verifica se o boss vai tocar a animacao de hit ou nao
    if (oBoss.podeSerStunado === true || oBoss.vidaAtual <= 0) {
      oBoss.vidaAtual -= dano * 2;

      oBossVar.setVelocityX(0);
      oBossVar.setVelocityY(200);

      oBoss.podeMover = false;
      oBoss.podeLevarHit = false;

      dano_BossSom.play();
      oBossVar.anims.play("hitBoss", false);
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
  // Funções boss

  updateLogicBoss(oBoss, oBossVar) {
    // Variavel da diferenca do x entre o boss e o personagem
    diferencaPersonagemBossX = personagemX - oBoss.posX;
    // Verifica se o personagem está no alcance do ataque do boss
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

    if (oBoss.podeMover === true && oBoss.bossJaTaMorto === false) {
      // Se o boss estiver muito perto do personagem significa que ele pode atacar

      // Move o boss para o jogador
      if (diferencaPersonagemBossX > 50) {
        oBossVar.setFlip(false, false);
        oBossVar.setVelocityX(oBoss.velocidade);
        oBossVar.anims.play("andarBoss", true);
      } else if (diferencaPersonagemBossX < -50) {
        oBossVar.setFlip(true, false);
        oBossVar.setVelocityX(-oBoss.velocidade);
      }

      // Se o esquleto estar movendo, tocar animacao
      if (oBossVar.body.touching.down) {
        if (oBossVar.body.velocity.x !== 0) {
          oBossVar.anims.play("andarBoss", true);
        }
      }
    }
  }

  bossAnimacaoUpdate(oBossVar, oBoss, anim, frame) {
    if (anim.key === "ataqueBoss1") {
      // Verifica se o frame é um frame de ataque
      if (oBoss.FRAMES_ATAQUE_1.includes(frame.frame.name)) {
        if (oBoss.tocouSom === false) {
          oBoss.tocouSom = true;
          thunderClapLight.play();
        }
        oBoss.danoAtual = oBoss.DANO_1;
      } else {
        oBoss.danoAtual = 0;
      }

      return;
    } else if (anim.key === "ataqueBoss2") {
      if (oBoss.tocouSom === false) {
        oBoss.tocouSom = true;
        thunderClap.play();
      }
      // Verifica se o frame é um frame de ataque
      if (oBoss.FRAMES_ATAQUE_2.includes(frame.frame.name)) {
        oBoss.danoAtual = oBoss.DANO_2;
      } else {
        oBoss.danoAtual = 0;
      }

      return;
    } else if (anim.key === "ataqueBoss3") {
      if (oBoss.tocouSom === false) {
        oBoss.tocouSom = true;
        thunderClapHeavy.play();
      }
      // Verifica se o frame é um frame de ataque
      if (oBoss.FRAMES_ATAQUE_3.includes(frame.frame.name)) {
        oBoss.danoAtual = oBoss.DANO_3;
      } else {
        oBoss.danoAtual = 0;
      }

      return;
    }

    oBossVar.setSize(tamanhoNormalBoss[0], tamanhoNormalBoss[1]);
  }

  bossAnimacaoComecada(oBossVar, anim) {
    if (anim.key === "ataqueBoss1") {
      oBossVar.setSize(200,200);
      oBossVar.setOffset(0, 0);
      return;
    } else if (anim.key === "ataqueBoss2") {
      oBossVar.setSize(200,200);
      oBossVar.setOffset(0, 0);
      return;
    }
    if (anim.key === "ataqueBoss3") {
      oBossVar.setSize(200,150);
      oBossVar.setOffset(0, 150);
    
      return;
    }
    oBossVar.setSize(tamanhoNormalBoss[0], tamanhoNormalBoss[1]);
  }

  bossAnimacaoTerminada(oBoss, oBossVar, anim) {
    // Ve se o boss levou hit
    if (anim.key === "hitBoss") {
      // Ve se o esqueleto morreu
      if (oBoss.vidaAtual <= 0) {
        oBoss.bossJaTaMorto = true;
        oBossVar.anims.play("morteBoss", false);
        return;
      }

      oBoss.podeDarDano = false;
      oBoss.danoAtual = 0;

      oBoss.tocouSom = false;
      oBoss.podeMover = true;
      oBossVar.anims.play("normalBoss", true);
      // respawn e morte do boss se o boss tocar a animacao de morte
    } else if (anim.key === "morteBoss") {
      // Respawn aqui em baixo
      this.killBoss(oBoss, oBossVar);
    } else if (
      anim.key === "ataqueBoss3" ||
      anim.key === "ataqueBoss2" ||
      anim.key === "ataqueBoss1"
    ) {
      if (oBoss.bossJaTaMorto === true || oBoss.vidaAtual <= 0) {
        oBoss.bossJaTaMorto = true;
        oBossVar.anims.play("morteBoss", false);
        return;
      }

      oBoss.tocouSom = false;
      if (anim.key === "ataqueBoss1" && oBoss.combo >= 2) {
        this.time.delayedCall(50, () => {
          oBoss.podeDarDano = true;
          oBossVar.anims.play("ataqueBoss2", true);
        });
        return;
      } else if (anim.key === "ataqueBoss2" && oBoss.combo >= 3) {
        this.time.delayedCall(50, () => {
          oBoss.podeDarDano = true;
          oBossVar.anims.play("ataqueBoss3", true);
        });
        return;
      }

      oBoss.podeSerStunado = true;

      this.time.delayedCall(50, () => {
        oBoss.podeDarDano = false;
        oBoss.danoAtual = 0;

        oBoss.podeMover = true;
        oBossVar.anims.play("normalBoss", true);
        this.time.delayedCall(700, () => {
          oBoss.coolDownAtaque = false;
        });
      });
    }
  }

  // Mata o boss
  killBoss(oBoss, oBossVar) {
    oBoss.podeMover = false;
    oBossVar.setActive(false);

    caveiras += 20;
    localStorage.setItem("Caveiras", caveiras);
    caveirasImagem.setVisible(true);
    caveirasTexto.setText("(x" + caveiras + ")");

    // Começa a funcao quando o boss é derrotado
    this.bossDerotado();
  }

  // O boss tem combo aleatorio, ou seja ele pode atacar 1, 2 ou 3 vezes
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

    oBoss.combo = 3

    // Ele também não pode ser interrompido no seu ataque
    oBoss.podeSerStunado = false;

    oBossVar.anims.play("ataqueBoss1", false);
    oBossVar.setVelocityX(0);
    oBoss.podeMover = false;

    oBoss.coolDownAtaque = true;
    oBoss.podeDarDano = true;
  }

  gameOver() {
    // "Desativa o boss"
    boss.anims.play("normalBoss", true);
    boss_Musica.stop();

    boss.setVelocityX(0);
    boss.setVelocityX(0);

    this.boss.podeLevarHit = false;

    this.boss.podeMover = false;
    this.boss.coolDownAtaque = true;

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
      this.scene.stop("Boss");
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

  // Funcao quando o boss é derrotado
  bossDerotado() {
    boss_Musica.stop();
    this.time.delayedCall(500, () => {
      const x = this.cameras.main.width;
      const y = this.cameras.main.height;

      this.bossVidaBgUI.setVisible(false);
      this.bossVidaUI.setVisible(false);
      this.bossVidaName.setVisible(false);
      this.bossVidaText.setVisible(false);

      this.backgroundBossDerotado = this.add.graphics();
      this.backgroundBossDerotado.fillStyle(0x000000, 0);
      this.backgroundBossDerotado.fillRect(0, y / 3, x, y / 4);

      this.textoBossDerotado = this.add
        .text(x / 2, y / 2.2, "INIMIGO FORTE DERROTADO", {
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
        this.textoEndGame.setText("Você o derrotou.");

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
          this.scene.stop("Boss");
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

    boss.off("animationcomplete");
    boss.off("animationstart");
    boss.off("animationupdate");
  }
}

// Largura e altura do jogo
const larguraJogo = 2000;
const alturaJogo = 600;

// Variaveis
let personagem;
let boss;

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

let thunderClapLight;
let thunderClap;
let thunderClapHeavy;

let dano_BossSom;
let boss_Musica;
