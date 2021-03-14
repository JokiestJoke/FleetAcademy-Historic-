class SecondScene extends Phaser.Scene {
    constructor(){
        super({ key: 'SecondScene' })
    }

    preload() {

        // player sprite sheet
        this.load.spritesheet('admiralSpriteOne', 
        './assets/sprites/admiralSpriteTwo80X120-Sheet.png',
        {
            frameWidth: 80,
            frameHeight: 120
        });

        // loading the wall sprite
        this.load.image('longestWallVer', './assets/sprites/wallSprite30X764.png');

    }

    create() {
        gameState.PlayerSprite = this.physics.add.sprite(450, 400, 'admiralSpriteOne');
        //trying to get all the animations to fit nicely into a single function.
        this.anims.create({
            key: 'idlePlayer',
            frames: this.anims.generateFrameNumbers(
                'admiralSpriteOne',
                {
                    start: 0,
                    end: 8
                }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'playerTalk',
            frames: this.anims.generateFrameNumbers(
                'admiralSpriteOne',
                {
                    start: 9,
                    end: 19
                }),
            frameRate: 6,
            repeat: -1
        }); 

        this.anims.create({
            key: 'playerMoveLRD',
            frames: this.anims.generateFrameNumbers(
                'admiralSpriteOne',
                {
                    start: 20,
                    end: 24
                }),
                frameRate: 6,
                repeat: -1       
        });

        this.anims.create({
            key: 'playerMoveUp',
            frames: this.anims.generateFrameNumbers(
                'admiralSpriteOne',
                {
                    start: 28,
                    end: 36

                }),
                frameRate: 6,
                repeat: -1
        })

        //initialize button inputs
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // below is code for building static walls. Tho due to a misunderstanding of code. currently not working. we can use the code to spawn sprites but the physics doesnt matter since we are simply setting world bounds.

        let neededWalls = [ 
            {
                name: 'longVerticalWall1',
                spriteKey: 'longestWallVer',
                x: 13,
                y: 382
            },
            {
                name: 'longVerticalWall2',
                spriteKey: 'longestWallVer',
                x: 1011,
                y: 382
            }
        ];

        const wallsStaticGroup = this.physics.add.staticGroup();

        // wallsStaticGroup.create(13, 382, 'longestWallVer')
        // wallsStaticGroup.create(1011, 382, 'longestWallVer')



        const wallSpawn = arr => arr.forEach(wall => wallsStaticGroup.create(wall.x, wall.y, wall.spriteKey));

        wallSpawn(neededWalls);

        this.physics.add.collider(gameState.PlayerSprite, wallsStaticGroup);

        // Creating camera for the game.

        // this sets the world bounds to the size of the config file. players will not exit the game.
        gameState.PlayerSprite.setCollideWorldBounds(true);

        // the syntax for this is this.cameras.main.setBound(xPositionOfCamera, yPositionOfCamera, camera width, camera height);
        this.cameras.main.setBounds(0, 0, 1000, 2000);
        // must make sure that the world bounds are updated so that the sprite can walk off screen.
        // we start at 25 here so that the sprite
        this.physics.world.setBounds(25, 0, 975, 2000);
        //camera follows sprite.
        this.cameras.main.startFollow(gameState.PlayerSprite, true, 0, 1);




    }
    

    update() {
        // creating a function for 
        const playerCursorHandler = () => {
            // Major thins i want to do to this function. 1) see if i can define it as a method and simply call the function in the update.
            // 2) a last direction array or something..... this is to handle which direction the sprite rests at AKA faces after moving
            if (gameState.cursors.right.isDown && gameState.cursors.up.isDown) {
                //handling a diagnol upward right movement.
                console.log('Up and Right is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=false;
                gameState.PlayerSprite.x += 2;
                gameState.PlayerSprite.y -= 2
            } else if (gameState.cursors.left.isDown && gameState.cursors.up.isDown) {
                 //handling a diagnol upward left movement.
                 console.log('Up and left is down');
                 gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=true;
                 gameState.PlayerSprite.x -= 2;
                 gameState.PlayerSprite.y -= 2
            } else if (gameState.cursors.right.isDown && gameState.cursors.down.isDown) {
                //handling a diagnol downward right movement.
                console.log('Down and Right is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=false;
                gameState.PlayerSprite.x += 2;
                gameState.PlayerSprite.y += 2
            } else if (gameState.cursors.left.isDown && gameState.cursors.down.isDown) {
                // handling a diagnol downward left movement
                console.log('Down and Left is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=true;
                gameState.PlayerSprite.x -= 2;
                gameState.PlayerSprite.y += 2;
            } else if (gameState.cursors.right.isDown) {
                //handling rightward movement of player
                // console.log('right is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=false;
                gameState.PlayerSprite.x += 2;
            } else if (gameState.cursors.left.isDown) {
                // handling leftward movement of player
                // console.log('left is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=true;
                gameState.PlayerSprite.x -= 2;
            } else if (gameState.cursors.down.isDown) {
                //handling 'southward' movement
                // console.log('down is down')
                gameState.PlayerSprite.y += 2;
                // we are going to use the idle animation to make it appear we are moving down.
                gameState.PlayerSprite.anims.play('idlePlayer', true);
            } else if (gameState.cursors.space.isDown) {                           
                gameState.PlayerSprite.anims.play('playerTalk', true);
            } else if (gameState.cursors.up.isDown) {
                //handling purely upward movement
                // console.log('up is down');
                gameState.PlayerSprite.y -= 2;
                gameState.PlayerSprite.anims.play('playerMoveUp', true);
            } else {
                gameState.PlayerSprite.anims.play('idlePlayer', true);
            }

        };
        playerCursorHandler();
    }



}


//   admiralSpriteTwo-Sheet.png