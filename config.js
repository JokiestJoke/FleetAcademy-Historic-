const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: "b9eaff",
    physics: {
      default: 'arcade',
      arcade: {}
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ StartScene, TestScene ]
  };
  
  const game = new Phaser.Game(config);