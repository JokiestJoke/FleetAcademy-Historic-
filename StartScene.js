// Game Menu Scene 

// initiate gameState
const gameStateMenu = { 
    // Important that we define a state for the global sphere to make the buttons in buttonGen() accessible in the update() method.
    interactiveButtonState: false,
    spriteText: {
        newGameText: 'This is where new cadets begin their journey.\nJoin countless others and serve your Imperator!\nShould you choose to proceed, be aware that\nyou will be conscripted  at a minimum of two\nyears of service.',
        continueText: 'Continue serving the Empire, and gain\nfull-citizen rights!',
        storyText: 'Delve into the historical vaults of the Empire',
        creditsText: 'Imperial Hall of Heroes'
    },
    textBoxTextStyle: {
        fontFamily: 'Courier',
        size: '12px',
        align: 'center'  
    }
    

};

class StartScene extends Phaser.Scene{
    constructor(){
        super({ key: 'StartScene' })
    }
    
// preload method. load all assets here before calling an instance with create.
    preload(){
        // preloads the main menu sprite
        this.load.spritesheet('startSprite',
        './assets/sprites/AdmiralMainMenuSpriteSheetv2.png',
        {
            frameWidth: 512,
            frameHeight: 384
        });

        //preloads main menu battleship
        this.load.spritesheet('battleshipMenu',
        './assets/sprites/battleshipSprite-Sheet1.png', 
        {
            frameWidth: 600, 
            frameheight: 300
        });

        // loads background image
        // this.load.image('menuBackground', './assets/sprites/mainMenuBackground.png')

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

        // Creates the background image
        // gameStateMenu.backgroundSprite = this.add.sprite(0, 0, 'menuBackground').setOrigin(0, 0);

        //initiates the battleship sprite
        gameStateMenu.battleshipMenu = this.add.sprite(500, 350, 'battleshipMenu');

        //initiates the start sprite used for the Main Menu Screen. Syntax (X, Y, 'spriteKey')
        gameStateMenu.startSprite = this.add.sprite(210, 580, 'startSprite');


        //creates a buttons array with the button names. THis will be used to load button onto the scren in a for loop.

        gameStateMenu.buttons = [
            'newGameButton',
            'loadGameButton',
            'storyButton',
            'creditsButton'
        ];


        // pretty simply function that creates a text box. Can be used to call in event Handlers.
        const textBoxGen = (text) => {
            //Creating a text Box 
            gameStateMenu.textBox = this.add.rectangle(650, 540, 600, 350, 0x37507B);
            // setSTrokeStyle(intensity, color) In short this adds a outline to a shape. 
            gameStateMenu.textBox.setStrokeStyle(4, 0xefc53f);
            gameStateMenu.textBoxText = this.add.text(440, 500, text, gameState.textBoxTextStyle);
            

        };

        ///creating buttons
        const buttonGen = () => {
            let xCord = 150;
            for (let i = 0; i < gameStateMenu.buttons.length; i++){
                let button = this.add.image(xCord, 150, `${gameStateMenu.buttons[i]}`).setScale(1.2);
                xCord += 250;
                //Adding some interactivity. It's important to make all interactivity here in this gen loop, so that EACH button has some interactivity
                button.setInteractive();
                // adding interactivity for mousing over the buttons
                button.on('pointerover', function(pointer){
                    // this gives the buttons a little bit of a pop when it is moused over. 
                    this.setScale(1.5);
                    // this sets the gameState of the buttons as true, and by doing so it allows for me to use this function to manipulate the update() method!
                    gameStateMenu.interactiveButtonState = true;
                    if (gameStateMenu.buttons[i] === 'newGameButton') {
                        //call this function to create the rectangle
                        textBoxGen(gameStateMenu.spriteText.newGameText);
                        // console.log(gameStateMenu.buttons[i]);
                    } else if (gameStateMenu.buttons[i] === 'loadGameButton') {
                        textBoxGen(gameStateMenu.spriteText.continueText);
                        // console.log(gameStateMenu.buttons[i]);
                    } else if (gameStateMenu.buttons[i] === 'storyButton') {
                        textBoxGen(gameStateMenu.spriteText.storyText);
                        // console.log(gameStateMenu.buttons[i]);
                    } else if (gameStateMenu.buttons[i] === 'creditsButton') {
                        textBoxGen(gameStateMenu.spriteText.creditsText);
                        // console.log(gameStateMenu.buttons[i]);
                    }
                    
                    
                });

                // add interactvity for mousing out of a button
                button.on('pointerout', function(pointer){
                    //returns the button to its originalish size. 
                    this.setScale(1.2)
                    gameStateMenu.interactiveButtonState = false;
                    //this is make sure the rectangle leaves the screen when the pointer leaves the button. 
                    gameStateMenu.textBox.destroy();
                    gameStateMenu.textBoxText.destroy();

                });


                button.on('pointerup', function() {
                    alert(`The ${gameStateMenu.buttons[i]} is working as expected.`)
                });
            }
            
        };

        // call the buttonGen function
        buttonGen();

        

        // create all animations below
        //These animations will be manipulated in the create() method. 
        this.anims.create({
            key: 'battleshipMenuIdle',
            frames: this.anims.generateFrameNumbers(
                'battleshipMenu',
                {
                    start: 0,
                    end: 8
                }),
                frameRate: 2,
                repeat: -1
        });

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

        this.anims.create({
            key: 'buttonSelected',
            frames: this.anims.generateFrameNumbers(
            'startSprite', 
            {
                start: 16,
                end: 40
            }),
            frameRate: 5, 
            repeat: -1
        });

 
        //Game gameTitle Text
        const gameTitle = {
            x: 550,
            y: 600, 
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
        // if the gameStateMenu.interactiveButtonState is true, which is defined in create()'s buttonGen(), then play buttonSelected animations
        if (gameStateMenu.interactiveButtonState === true){
            gameStateMenu.startSprite.anims.play('buttonSelected', true);

        } else {
            gameStateMenu.startSprite.anims.play('idle', true);
            gameStateMenu.battleshipMenu.anims.play('battleshipMenuIdle', true);
        }

    }






}