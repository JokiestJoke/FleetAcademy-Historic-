// Game Menu Scene 

// initiate gameState
const gameStateMenu = { 
    // Important that we define a state for the global sphere to make the buttons in buttonGen() accessible in the update() method.
    interactiveButtonState: false

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

        //creates a buttons array with the button names. THis will be used to load button onto the scren in a for loop.

        gameStateMenu.buttons = [
            'newGameButton',
            'loadGameButton',
            'storyButton',
            'creditsButton'
        ];

        const textBoxGen = () => {
            
        }

        ///creating buttons
        ///create a function that will create the buttons.
        ///a function expression allows for cleaner code.
        const buttonGen = () => {
            let xCord = 150;
            for (let i = 0; i < gameStateMenu.buttons.length; i++){
                let button = this.add.image(xCord, 250, `${gameStateMenu.buttons[i]}`).setScale(1.2);
                xCord += 250;
                //Adding some interactivity. It's important to make all interactivity here in this gen loop, so that EACH button has some interactivity
                button.setInteractive();
                // adding interactivity for mousing over the buttons
                button.on('pointerover', function(pointer){
                    // this gives the buttons a little bit of a pop when it is moused over. 
                    this.setScale(1.5);
                    // this sets the gameState of the buttons as true, and by doing so it allows for me to use this function to manipulate the update() method!
                    gameStateMenu.interactiveButtonState = true;
                    //Testing purposes
                    console.log(gameStateMenu.interactiveButtonState);
                    
                });

                // add interactvity for mousing out of a button
                button.on('pointerout', function(pointer){
                    //returns the button to its originalish size. 
                    this.setScale(1.2)
                    gameStateMenu.interactiveButtonState = false;
                    console.log(gameStateMenu.interactiveButtonState);

                });


                button.on('pointerup', function() {
                    alert(`The ${gameStateMenu.buttons[i]} is working as expected.`)
                });
            }
            
        };

        // call the buttonGen function
        buttonGen();

        //Creating a text Box 
        gameStateMenu.textBox = this.add.rectangle(650, 540, 600, 350, 0x37507B);
        // Sadly Phaser documentation is too clear about what .setSTrokeStyle(intensity, color) does. In short, with experimentation
        // in short, this adds a outline to a shape. 
        gameStateMenu.textBox.setStrokeStyle(4, 0xefc53f);

        // create all animations below
        //These animations will be manipulated in the create() method. 

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
            frames: this.anims.generateFrameNumbers('startSprite', 
            {
                start: 16,
                end: 40
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
        // if the gameStateMenu.interactiveButtonState is true, which is defined in create()'s buttonGen(), then play buttonSelected animations
        if (gameStateMenu.interactiveButtonState === true){
            gameStateMenu.startSprite.anims.play('buttonSelected', true);     
        } else {
            gameStateMenu.startSprite.anims.play('idle', true);
        }

    }






}