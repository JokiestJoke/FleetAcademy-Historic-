const gameState = {

};

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: "000000",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        enableBody: true,
        debug: true
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ StartScene, SecondScene, TestScene ]
  };
  
  const game = new Phaser.Game(config);