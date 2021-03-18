
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

        // loading the wall sprite. As of 3/16 major bugs ....
        this.load.image('longestWallVer', './assets/sprites/wallSprite30X764.png');

        // loading test sprite.
        this.load.image('testRoom', './assets/sprites/testRoom.png')

    }

    create() {
        gameState.PlayerSprite = this.physics.add.sprite(450, 400, 'admiralSpriteOne');

        //declaring test room

        gameState.testRoom = this.physics.add.sprite(400, 800, 'testRoom');

        this.physics.add.collider(gameState.PlayerSprite, gameState.testRoom, function() {
            console.log(`collision detected player cords x: ${gameState.PlayerSprite.x} y: ${gameState.PlayerSprite.y}`);


        }, null, this);



        // must make sure that the world bounds are updated so that the sprite can walk off screen.
        // we start at 25 here so that the sprite
        this.physics.world.setBounds(25, 0, 975, 2000);

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
                x: 100,
                y: 382
            },
            {
                name: 'longVerticalWall2',
                spriteKey: 'longestWallVer',
                x: 800,
                y: 382
            },
            {
                name: 'testWall',
                spriteKey: 'longestWallVer',
                x: 512,
                y: 1000
            }
        ];
        /*
        const wallsStaticGroup = this.physics.add.staticGroup();

        const wallSpawn = arr => arr.forEach(wall => wallsStaticGroup.create(wall.x, wall.y, wall.spriteKey));
        wallSpawn(neededWalls);



        this.physics.add.collider(gameState.PlayerSprite, wallsStaticGroup, function() {
            // console.log('collision!');
            neededWalls.forEach((elem, index) => {
                // console.log(elem.x)
                if (gameState.PlayerSprite.x < elem.x && index === 2) {
                    console.log(`collison left at ${elem.name}`);
                    gameState.PlayerSprite.x -= 5;
                } else if (gameState.PlayerSprite.x > elem.x && index === 2) {
                    console.log(`collison right at ${elem.name}`);
                    gameState.PlayerSprite.x += 5;
                } else if (gameState.PlayerSprite.y < elem.y) {
                    console.log('collison from below')
                    gameState.PlayerSprite.y -= 5;
                } else {
                    console.log('error')
                }
            })
               
        }, null, this);
        */

        // Creating camera for the game.

        // this sets the world bounds to the size of the config file. players will not exit the game.
        gameState.PlayerSprite.setCollideWorldBounds(true);

        // the syntax for this is this.cameras.main.setBound(xPositionOfCamera, yPositionOfCamera, camera width, camera height);
        this.cameras.main.setBounds(0, 0, 1000, 2000);
        
        //camera follows sprite.
        this.cameras.main.startFollow(gameState.PlayerSprite, true, 0, 1);

    



    }
    
/// NEED TO FIX... NEED TO SET VELOCITY NO ADDING X
    update() {
        // creating a function for 
        const playerCursorHandler = () => {
            // Major thins i want to do to this function. 1) see if i can define it as a method and simply call the function in the update.
            // 2) a last direction array or something..... this is to handle which direction the sprite rests at AKA faces after moving
            if (gameState.cursors.right.isDown && gameState.cursors.up.isDown) {
                //handling a diagnol upward right movement.
                // console.log('Up and Right is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=false;
                gameState.PlayerSprite.body.velocity.setTo(100, -100);
            } else if (gameState.cursors.left.isDown && gameState.cursors.up.isDown) {
                 //handling a diagnol upward left movement.
                //  console.log('Up and left is down');
                 gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=true;
                 gameState.PlayerSprite.body.velocity.setTo(-100, -100);
            } else if (gameState.cursors.right.isDown && gameState.cursors.down.isDown) {
                //handling a diagnol downward right movement.
                // console.log('Down and Right is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=false;
                gameState.PlayerSprite.body.velocity.setTo(100, 100);
            } else if (gameState.cursors.left.isDown && gameState.cursors.down.isDown) {
                // handling a diagnol downward left movement
                // console.log('Down and Left is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=true;
                gameState.PlayerSprite.body.velocity.setTo(-100, 100);
            } else if (gameState.cursors.right.isDown) {
                //handling rightward movement of player
                // console.log('right is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=false;
                gameState.PlayerSprite.body.velocity.x = 100;
            } else if (gameState.cursors.left.isDown) {
                // handling leftward movement of player
                // console.log('left is down');
                gameState.PlayerSprite.anims.play('playerMoveLRD', true).flipX=true;
                gameState.PlayerSprite.body.velocity.x = -100;
            } else if (gameState.cursors.down.isDown) {
                //handling 'southward' movement
                // console.log('down is down')
                // we are going to use the idle animation to make it appear we are moving down.
                gameState.PlayerSprite.anims.play('idlePlayer', true);
                gameState.PlayerSprite.body.velocity.y = 100;
            } else if (gameState.cursors.space.isDown) {                           
                gameState.PlayerSprite.anims.play('playerTalk', true);
            } else if (gameState.cursors.up.isDown) {
                //handling purely upward movement
                // console.log('up is down');
                gameState.PlayerSprite.body.velocity.y = -100;
                gameState.PlayerSprite.anims.play('playerMoveUp', true);
            } else {
                gameState.PlayerSprite.anims.play('idlePlayer', true);
                gameState.PlayerSprite.body.velocity.setTo(0, 0);
            }

        };
        playerCursorHandler();

    }





}


//   admiralSpriteTwo-Sheet.png