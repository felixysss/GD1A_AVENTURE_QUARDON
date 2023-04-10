import {sceneHub} from './hub.js';

export class sceneClasse1 extends Phaser.Scene
{
    constructor(){
        super('sceneClasse1');
        
    }
    
    cursors;
    player;

    preload(){
        this.load.image('classe1','assets/classe_1.png');
        this.load.image('tuile', 'assets/tuiles.png');
        this.load.image('icon', 'assets/icon.png')
        this.load.image('hp','assets/pomme.png')
        this.load.image('coin','assets/coin.png')
        this.load.image('caseVide','assets/item_vide.png');
        this.load.image('tuile5', 'assets/tuiles_5.png');
        this.load.tilemapTiledJSON('carte5', 'assets/map_5.json');
        this.load.spritesheet('player','assets/eden.png',
            { frameWidth: 32, frameHeight: 32 });
    }
    create(){
        this.add.image(200,320,'classe1');
        this.icon=this.add.image(280,180, 'icon').setScrollFactor(0);
        this.hp1=this.add.image(340,165, 'hp').setScrollFactor(0);
        this.hp2=this.add.image(375,165, 'hp').setScrollFactor(0);
        this.hp3=this.add.image(410,165, 'hp').setScrollFactor(0);
        this.coin=this.add.image(340,200, 'coin').setScrollFactor(0);
        this.caseVide1=this.add.image(580,180,'caseVide').setScrollFactor(0);
        this.caseVide2=this.add.image(630,180,'caseVide').setScrollFactor(0);
        this.caseVide3=this.add.image(680,180,'caseVide').setScrollFactor(0);
        this.player = this.physics.add.sprite(10, 200, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // caméra lol
        this.physics.world.setBounds(0,0,400,640);
        this.cameras.main.setBounds(0,0,400,640);
        this.cameras.main.zoom= 2;
        this.cameras.main.startFollow(this.player);

        //c'est tiled
        const carteDuNiveau = this.add.tilemap('carte5');

        const tileset = carteDuNiveau.addTilesetImage(
            'tuiles_de_jeu',
            'tuile5'
        );

        const collision = carteDuNiveau.createLayer(
            'collision',
            tileset
        );

        collision.setCollisionByProperty({estSolide: true});
        this.physics.add.collider(this.player, collision)


        const tp = carteDuNiveau.createLayer(
            'tp',
            tileset
        );

        tp.setCollisionByExclusion(-1, true);
        this.physics.add.collider(tp, this.player, this.changeScene, null, this);


        //tp.setCollisionByExclusion(-1, true);
        //this.physics.add.collider(this, player, tp, this.changeScene, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier 
        // crée tes animations

        this.anims.create({
            // la key c'est l'identifiant, tu la nomme comme tu veux
            key: 'left', 
            // ici le premier argument c'est le nom que t'as mis quand t'importe la spritesheet
            // le deuxième argument c'est pour dire a quel frame l'anim commence et end (ça commence a zero)
            frames: this.anims.generateFrameNumbers('player', {start:0,end:3}),
            frameRate: 5,
            // le repeat en -1 c'est pour dire que ça loop (je crois)
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start:4,end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player', {start:11,end:13}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'face',
            frames: this.anims.generateFrameNumbers('player', {start:8,end:10}),
            frameRate: 5,
            repeat: -1
        });
        // pour les "anim" à une frame tu peux indiquer une frame unique
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'player', frame: 8 } ], // ici
            frameRate: 1,
            repeat: 0
        });

        // load l'anim pour éviter d'avoir un carré noir quand tu lance le jeu
        this.player.anims.play('idle', true);

        //clé_carré= this.physics.add.group({
        // key: 'clé_carré', 
        // setXY: { x: 12, y: 0, stepX: 70 }
        //});
        // stars.children.iterate(function (child) {
        // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        //}); //chaque étoile va rebondir un peu différemment
        //this.physics.add.collider(stars, platforms);
                        //et collisionne avec les plateformes
        //this.physics.add.overlap(player, stars, collectStar, null, this);
        //le contact perso/étoile ne génère pas de collision (overlap)
        //mais en revanche cela déclenche une fonction collectStar

            
    }

    update(){
        //---keyboard---
        this.player.setVelocity(0);
        //c'est le perso qui bouge
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);  
        
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);

        }
        
        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
            this.player.anims.play('back', true);
    
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);
            this.player.anims.play('face', true);
        
        }
        
        if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown)
        this.player.anims.play('idle', true);
                        
    }
    changeScene(player, trigger){
        this.scene.start('sceneHub');
    }

}

