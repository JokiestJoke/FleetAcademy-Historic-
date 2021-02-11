const gameState = {

};


/// Test screen class 
class TestScene extends Phaser.Scene {
    constructor() {
        super({ key: "TestScene" });
    }

    preload() {
        this.load.spritesheet('admiral', 
        './assets/sprites/AdmiralSprite-Sheet.png',
        { frameWidth: 16, frameHeight: 32 }
        
        )
    }

    create() {
        // sets gameState.active 
        gameState.active = true; 
        //initiates the Admiral Sprite used for the Main Menu Screen. Syntax (X, Y, 'spriteKey')
        gameState.admiral = this.add.sprite(512, 384, 'admiral').setScale(1.5);

        // Creates the Animations for our sprite.

        //Idle Animation
        this.anims.create({
            //sets the animation key as idle
            key: 'idle',
            frames: this.anims.generateFrameNumbers(
                'admiral', 
                     {
                        start: 0,
                         end: 2
                    }),
            frameRate: 5,
            repeat: -1
        });

        // Walking Up animations 
        this.anims.create({
            key: 'upward',
            frames: this.anims.generateFrameNumbers(
                'admiral',
                {
                    start: 5,
                    end: 7
                }),
                frameRate: 5,
                repeat: -1
        });

        //Walking Right Animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(
                'admiral',
                {
                    start: 11,
                    end: 12
                }),
                frameRat: 5,
                repeat: -1
        });

        // Walking Left Animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(
                'admiral',
                {
                    start: 8,
                    end: 9
                }),
                frameRat: 5,
                repeat: -1
        });

        // Walking down animation
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers(
                'admiral',
                {
                    start: 2,
                    end: 4
                }),
                frameRat: 5,
                repeat: -1
        });



        // Seting the gameState for key presses. Later on this must be mixed with logic within the update method of this class
        gameState.cursors = this.input.keyboard.createCursorKeys();
    }


    update() {
        if (gameState.cursors.up.isDown) {
            gameState.admiral.anims.play('upward', true);    
        } else if (gameState.cursors.down.isDown) {
            gameState.admiral.anims.play('down', true);
        } else if (gameState.cursors.right.isDown) {
            gameState.admiral.anims.play('right', true);
        } else if (gameState.cursors.left.isDown) {
            gameState.admiral.anims.play('left', true);
        } else {
            gameState.admiral.anims.play('idle', true);
        }
    }









}
