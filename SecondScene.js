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

        //initialize button inputs
        gameState.cursors = this.input.keyboard.createCursorKeys();



    }

    update() {
        // creating a function for 
        const playerCursorHandler = () => {
            if (gameState.cursors.up.isDown) {
                console.log('up is down');
            } else if (gameState.cursors.right.isDown){
                console.log('right is down');
            } else if (gameState.cursors.left.isDown) {
                console.log('left is down');
            } else if (gameState.cursors.down.isDown) {
                console.log('down is down')
            }  else if (gameState.cursors.space.isDown) { 
                gameState.PlayerSprite.anims.play('playerTalk', true);

            } else {
                gameState.PlayerSprite.anims.play('idlePlayer', true);
            }

        };
        playerCursorHandler();
    }



}


//   admiralSpriteTwo-Sheet.png