class SecondScene extends Phaser.Scene {
    constructor(){
        super({ key: 'SecondScene' })
    }

    preload() {

        this.load.spritesheet('admiralSpriteOne', 
        './assets/sprites/admiralSpriteTwo80X120-Sheet.png',
        {
            frameWidth: 80,
            frameHeight: 120
        });

    }

    create() {
        gameState.PlayerSprite = this.add.sprite(400, 400, 'admiralSpriteOne');
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