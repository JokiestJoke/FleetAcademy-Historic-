// Game Menu Scene 

// initiate gameState
const gameStateMenu = { 

};

class StartScene extends Phaser.Scene{
    constructor(){
        super({ key: 'StartScene' })
    }
    
// preload method. load all assets here before calling an instance with create.
    preload(){
        // preloads the main menu sprite
        this.load.spritesheet('startSprite',
        './assets/sprites/AdmiralMainMenuSpriteSheet.png',
        {
            frameWidth: 512,
            frameHeight: 384
        });

        // preload the sprites that will be used as the buttons

        // loads new Game Button
        this.load.image('newGameButton', './assets/sprites/newGameButton.png');

        //loads story Button
        this.load.image('storyButton', './assets/sprites/storyButton.png');

        //loads load game Button
        this.load.image('loadGameButton', './assets/sprites/loadGameButton.png');

        // loads credits button
        this.load.image('creditsButton', './assets/sprites/creditsButton.png');
    }
//create all instances here
    create(){
        //Sets the gamestate to active.
        gameStateMenu.active = true;

        //initiates the start sprite used for the Main Menu Screen. Syntax (X, Y, 'spriteKey')
        gameStateMenu.startSprite = this.add.sprite(210, 580, 'startSprite');

        
        //creates a buttons array

        gameStateMenu.buttons = [
            'newGameButton',
            'loadGameButton',
            'storyButton',
            'creditsButton'
        ];

        

        ///creating buttons
        ///create a function that will create the buttons.
        ///a function expression allows for cleaner code.
        const buttonGen = () => {
            let xCord = 150;
            for (let i = 0; i < gameStateMenu.buttons.length; i++){
                let button = this.add.image(xCord, 250, `${gameStateMenu.buttons[i]}`).setScale(1.2);
                xCord += 250;
                /// Lets review how to set the as .setInteractive. I beleive it will have to be done in this loop as to make sure
                /// that each button is set to interactive per iteration of this loop!
            }
            
        };

        // call the buttonGen function
        buttonGen();

        //Creating a text Box 
        const textBox = this.add.rectangle(650, 540, 600, 350, 0xffffff);


        // create all animations below

        // this creates the idle animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(
                'startSprite',
                {
                    start: 0,
                    end: 13
                }),
            frameRate: 5,
            repeat: -1
        });

        //Game gameTitle Text
        const gameTitle = {
            x: 100,
            y: 50, 
            text: "FLEET ACADEMY: \n\n A Naval Saga",
            style: {
                fontSize: '45px',
                fontFamily: 'Courier New',
                color: '#b38600',
                align: 'center'
            }
        };

        //call the gameTitle Text
        this.make.text(gameTitle);

        


    }

// Anything that will be uodated goes in here. Most of the game logic goes here for each scene individually.
    update(){
        if(gameStateMenu.active){
            gameStateMenu.startSprite.anims.play('idle', true);
            
        }

    }






}