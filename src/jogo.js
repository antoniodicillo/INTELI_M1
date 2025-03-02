// boa sorte

export class Jogo extends Phaser.Scene {
  constructor() {
    super("Jogo");
  }
  preload() {
    // Preload do background paralax
    this.load.image("background", "src/assets/Background.png");
    this.load.image("backgroundGrama", "src/assets/GramaBackground.png");
    this.load.image("bg_arvores1", "src/assets/arvores-1.png");
    this.load.image("bg_arvores2", "src/assets/arvores-2.png");
    this.load.image("bg_arvores3", "src/assets/arvores-3.png");
    this.load.image("bg_arvores4", "src/assets/arvores-4.png");
    this.load.image("bg_arvores5", "src/assets/arvores-5.png");

    this.load.image("caveiras", "src/assets/Skulls.png");

    // Preload dos outros elementos
    this.load.image("chao", "src/assets/Chao.png");
    this.load.image("terra", "src/assets/Terra.png");

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
    this.load.spritesheet("player_corrida", "src/assets/Cavaleiro_Corrida.png", {
      frameWidth: 56,
      frameHeight: 76,
    });
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

    // Carrega as animações do esqueleto
    this.load.spritesheet("esqueleto_normal", "src/assets/Esqueleto_Idle.png", {
      frameWidth: 72,
      frameHeight: 76,
    });

    this.load.spritesheet("esqueleto_hit", "src/assets/Esqueleto_Hit.png", {
      frameWidth: 90,
      frameHeight: 84,
    });

    this.load.spritesheet("esqueleto_morte", "src/assets/Esqueleto_Morte.png", {
      frameWidth: 90,
      frameHeight: 76,
    });

    this.load.spritesheet("esqueleto_andando", "src/assets/Esqueleto_Andando.png", {
      frameWidth: 90,
      frameHeight: 76,
    });

    this.load.spritesheet("esqueleto_ataque", "src/assets/Esqueleto_Ataque.png", {
      frameWidth: 145,
      frameHeight: 89,
    });

    this.load.on("complete", () => {
      this.createGame();
    });
  }

  createGame() {
    // Adicionar imagens e sprites no jogo
    this.add.image(larguraJogo / 2, alturaJogo / 2, "background");
    // new TileSprite(scene, x, y, width, height, textureKey, [frameKey])
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


    // Parte da GUI

    // Background da UI
    this.backgroundUI = this.add.graphics();
    this.backgroundUI.fillStyle(0x000000, 1);
    this.backgroundUI.fillRect(0, 70, 90, 45);

    // UI das caveiras coletadas
    caveirasImagem = this.add.image(30, 90, "caveiras").setScale(0.25);
    caveirasTexto = this.add.text(50, 90, "(x0)", {
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

    
    chao = this.physics.add.staticImage(
      larguraJogo / 2,
      alturaJogo - 50,
      "chao"
    );
    chao.setSize(0, 10);
    chao.setPosition(larguraJogo / 2, alturaJogo - 65);

    

    // Adicionar fisica ao personagem
    personagem = this.physics.add.sprite(64, 0, "player_normal");
    personagem.setCollideWorldBounds(true);
    personagem.setPosition(personagemSpawn[0], personagemSpawn[1]);
    personagem.body.pushable = false;

    // Adicionar fisica ao inimigo
    esqueleto = this.physics.add.sprite(36, 0, "esqueleto_normal");
    esqueleto.setCollideWorldBounds(true);
    esqueleto.setPosition(1200, 410);
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
      animacaoAtual = anim.key;
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
        esqueletoPodeLevarHit = true;
        stunJogador = false;
        dano = 0;
      } else if (anim.key === "ataque_Pesado") {
        esqueletoPodeLevarHit = true;
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

    // Logica para o ataque do personagem contra o esqueleto
    this.physics.add.overlap(personagem, esqueleto, () => {
      if (esqueletoPodeLevarHit === false) {
        return;
      }
      if (stunJogador === false && esqueletoPodeDarDano === false) {
        return;
      }
      if (dano === 0) {
        if (esqueletoDano > 0) {
          if (personagemNaoTomaDano === true) {
            console.log("i-frame");
            return;
          }
          personagemVidaAtual -= esqueletoDano;
          personagemVidaAtual = Math.max(0, personagemVidaAtual);

          console.warn("Vida jogador: " + personagemVidaAtual);

          esqueletoPodeDarDano = false;

          if (personagemVidaAtual == 0) {
            this.scene.start("GameOver");
          }

          this.updateUi("vida");

          personagem.setVelocity(0);

          stunJogador = true;
          personagem.anims.play("hit", true);
        }
        return;
      }
      if (esqueletoVidaAtual <= 0) {
        esqueletoJaTaMorto = true;
        return;
      }

      esqueletoVidaAtual -= dano;

      esqueleto.setVelocityX(0);
      esqueleto.setVelocityY(200);

      esqueletoPodeLevarHit = false;
      esqueletoPodeMover = false;

      esqueleto.anims.play("hitEsqueleto", false);
    });

    // Logica das animações do esqueleto

    esqueleto.on("animationstart", (anim) => {
      // Ve se o esqueleto comecou o ataque
      if (anim.key === "ataqueEsqueleto") {
        esqueleto.setSize(145, tamanhoNormalEsqueleto[1]);
        return;
      }
      esqueleto.setSize(tamanhoNormalEsqueleto[0], tamanhoNormalEsqueleto[1]);
    });

    // Verifica o frame da animação do esqueleto
    esqueleto.on("animationupdate", (anim, frame) => {
      if (anim.key === "ataqueEsqueleto") {
        esqueleto.setSize(145, tamanhoNormalEsqueleto[1]);

        // Verifica se o frame é um frame de ataque
        if (framesEsqueletoAtaque.includes(frame.frame.name)) {
          esqueletoDano = DANO_DO_ESQUELETO;
        } else {
          esqueletoDano = 0;
        }

        return;
      }
      esqueleto.setSize(tamanhoNormalEsqueleto[0], tamanhoNormalEsqueleto[1]);
    });

    esqueleto.on("animationcomplete", (anim) => {
      // Ve se o esqueleto levou hit
      if (anim.key === "hitEsqueleto") {
        // Ve se o esqueleto morreu
        if (esqueletoVidaAtual <= 0) {
          esqueletoJaTaMorto = true;
          esqueleto.anims.play("morteEsqueleto", false);
          return;
        }
        coolDownAtaqueEsqueleto = false;

        esqueletoPodeMover = true;
        esqueletoPodePular = true;
        esqueleto.anims.play("normalEsqueleto", true);
        // respawn e morte do esqueleto se o esqueleto tocar a animacao de morte
      } else if (anim.key === "morteEsqueleto") {
        // Respawn aqui em baixo
        this.killEsqueleto();
        setTimeout(() => {
          this.respawnEsqueleto();
        }, 3000);
      } else if (anim.key === "ataqueEsqueleto") {
        if (esqueletoJaTaMorto === true) {
          this.killEsqueleto();
          setTimeout(() => {
            this.respawnEsqueleto();
          }, 3000);
          return;
        }

        esqueletoPodeDarDano = false;
        esqueletoDano = 0;
        esqueletoPodeMover = true;
        esqueletoPodePular = true;
        esqueleto.anims.play("normalEsqueleto", true);
        setTimeout(() => {
          coolDownAtaqueEsqueleto = false;
        }, 2000);
      }
    });

    esqueleto.anims.play("normalEsqueleto", true);
  }

  update() {
    // god mode
    personagemNaoTomaDano = true;

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
      if (teclaEspaco.isDown && pode_Pular === true && cooldownRoll === false && personagemEnergiaAtual >= ENERGIA_ROLAMENTO) {
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

      // Regeneração de vida
      if (personagemVidaAtual < PERSONAGEM_VIDA_MAXIMA) {
        if (teclaR.isDown) {
          if (caveiras > 0 || cooldownHeal === false) {
            cooldownHeal = true;

            setTimeout(() => {
              cooldownHeal = false;
            }, 1000);

            caveiras--;
            personagemVidaAtual += 10;
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
    esqueletoX = esqueleto.body.position.x;

    // Variavel da diferenca do x entre o esqueleto e o personagem
    diferencaPersonagemEsqueletoX = personagemX - esqueletoX;
    // Verifica se o personagem está no alcance do ataque do esqueleto
    if (diferencaPersonagemEsqueletoX > 0) {
      if (diferencaPersonagemEsqueletoX <= 75) {
        esqueletoPertoParaAtaque = true;
        this.ataqueEsqueleto();
      } else {
        esqueletoPertoParaAtaque = false;
      }
    } else {
      if (diferencaPersonagemEsqueletoX >= -75) {
        this.ataqueEsqueleto();
        esqueletoPertoParaAtaque = true;
      } else {
        esqueletoPertoParaAtaque = false;
      }
    }

    if (esqueletoPodeMover === true && esqueletoJaTaMorto === false) {
      // Se o esqueleto estiver muito perto do personagem significa que ele pode atacar

      // Move o esqueleto para o jogador
      if (diferencaPersonagemEsqueletoX > 50) {
        esqueleto.setFlip(false, false);
        esqueleto.setVelocityX(100);
        esqueleto.anims.play("andarEsqueleto", true);
      } else if (diferencaPersonagemEsqueletoX < -50) {
        esqueleto.setFlip(true, false);
        esqueleto.setVelocityX(-100);
      }

      // Se o esquleto estar movendo, tocar animacao
      if (esqueleto.body.touching.down) {
        if (esqueleto.body.velocity.x !== 0) {
          esqueleto.anims.play("andarEsqueleto", true);
        }
      }

      // Logica para ver se o esqueleto pode pular ou nao
      if (esqueleto.body.touching.down) {
        esqueletoPodePular = true;
      } else {
        esqueletoPodePular = false;
      }

      // Se o esqueleto tocar em uma parede, ele chama a funcao de pulo para verificar se ele pode pular
      if (esqueleto.body.touching.left || esqueleto.body.touching.right) {
        this.puloEsqueleto();
      }
    }
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

      console.log(personagemEnergiaAtual);
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
          }, 50);
        }
      }, 2000);
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
      if(personagemEnergiaAtual < ENERGIA_ATAQUE_PESADO) {
        return
      }
      personagem.setVelocity(0);
      stunJogador = true;

      personagem.anims.play("ataque_Pesado", false);
    } else if(personagemEnergiaAtual >= ENERGIA_ATAQUE_LEVE) {
      if(personagemEnergiaAtual < ENERGIA_ATAQUE_LEVE) {
        return
      }

      personagem.setVelocity(0);
      stunJogador = true;

      personagem.anims.play("ataque_Leve", false);
    }
  }

  killEsqueleto() {
    esqueletoPodeMover = false;
    esqueleto.setVisible(false);
    esqueleto.setActive(false);
    esqueleto.disableBody(true, true);
    caveiras++;
    caveirasImagem.setVisible(true);
    caveirasTexto.setText("(x" + caveiras + ")");
  }

  respawnEsqueleto() {
    esqueleto.enableBody(true, 100, 400, true, true);
    esqueletoVidaAtual = ESQUELETO_VIDA_MAXIMA;
    esqueleto.setVisible(true);
    esqueleto.setActive(true);
    esqueleto.anims.play("normalEsqueleto", true);
    esqueletoPodeMover = true;
    esqueletoJaTaMorto = false;
    coolDownAtaqueEsqueleto = false;
  }

  // Logica para ver se o esqueleto deveria pular ou nao
  puloEsqueleto() {
    if (esqueletoPodePular === false) {
      return;
    }
    if (esqueletoPertoParaAtaque === true) {
      return;
    }

    // bem que phaser podia ter pathfinding...

    esqueleto.setVelocityY(alturaPulo);
    esqueletoPodePular = false;
  }

  ataqueEsqueleto() {
    if (coolDownAtaqueEsqueleto === true) {
      return;
    }
    if (esqueletoVidaAtual <= 0) {
      return;
    }

    esqueleto.anims.play("ataqueEsqueleto", false);
    esqueleto.setVelocityX(0);
    esqueletoPodeMover = false;
    esqueletoPodePular = false;
    coolDownAtaqueEsqueleto = true;

    esqueletoPodeDarDano = true;
  }
}

// Largura e altura do jogo
const larguraJogo = 4000;
const alturaJogo = 600;

// Variaveis
var personagem;
const tamanhoNormal = [50, 76];
const tamanhoNormalEsqueleto = [72, 76];

// Frame Data

// Frames que o jogador é invencivel e não toma dano quando ele estiver cooldownRoll
const framesRolamentoSemDano = [2, 3, 4, 5, 6, 7, 8];
// Frames que os ataques podem dar dano em inimigos
const framesAtaqueLeveDano = [2, 3];
const framesAtaquePesadoDano = [2, 3];

var esqueleto;
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
const DANO_PESADO = 25;

const ENERGIA_ATAQUE_LEVE = 20;
const ENERGIA_ATAQUE_PESADO = 35;
const ENERGIA_ROLAMENTO = 15;

let dano = 0;

let animacaoAtual;
let personagemX;

const personagemSpawn = [200, alturaJogo / 1.5];

let diferencaPersonagemEsqueletoX = 0;
let caveiras = 0;

let cooldownHeal = false;

let energiaAntiga = personagemEnergiaAtual;
// Variaveis do esqueleto
let esqueletoVidaAtual = 30;

const ESQUELETO_VIDA_MAXIMA = esqueletoVidaAtual;

let esqueletoPodeLevarHit = true;
let esqueletoPodeMover = true;
let esqueletoPodePular = true;
let esqueletoPertoParaAtaque = false;
let coolDownAtaqueEsqueleto = false;

let esqueletoJaTaMorto = false; // você já está morto, esqueleto
let esqueletoX;

// Frames que o ataque do esqueleto pode dar dano no jogador
const framesEsqueletoAtaque = [6, 7];
let esqueletoPodeDarDano = false;

let esqueletoDano = 0;
const DANO_DO_ESQUELETO = 35;
// Variaveis demoniod



// TODO deixar o esqueleto em um model para eu conseguir adicionar varios esqueletos
// TODO fazer o menu