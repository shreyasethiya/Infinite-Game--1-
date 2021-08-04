var PLAY = 0;
var END = 1;
var c;
var gameState = PLAY;
var monkey , monkey_running, monkeyFallen;
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, bananaScore, score2Img,score2;
var invisibalGround;
var gameOverImg,over,overSound,fall, jumpSound, restartImg, restart;
var jungle, jungleImg;
var size;

function preload(){
  // Preloding our images and audio clips here
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  jungleImage = loadImage("jungle.jpg"); 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("game-over-2720584_640.png")
  monkeyFallen = loadImage("monkey-309461_640-1.png")
  overSound = loadSound("salamisound-7409355-cartoon-boing.mp3");
  jumpSound = loadSound("salamisound-6941726-sfx-jump-9-game-computer.mp3");
  restartImg = loadImage("loop-button-5484820_640.png");
  score2Img = loadImage("Screenshot (5).png");
}

function setup() {
  createCanvas(700,400);
  score = 0;
  bananaScore = 0;
  c = 0;
  
   // Creating Jungle
  //jungle = createSprite(300,180);
  //jungle.addImage(jungleImage);
 // jungle.scale = 0.7;
 // jungle.velocityX = -3;
  
  //Creating Score
  score2 = createSprite(400,40);
  score2.addImage(score2Img);
  score2.scale = 0.3;
 
  
  // Creating Small Sprites for 
  fall = createSprite(210,320,1,1);
  over = createSprite(300,160,1,1);
  invisibalGround = createSprite(350,350,900,10);
  invisibalGround.shapeColor = "Green";
  
  restart = createSprite(over.x+85,over.y+130);
  
  restart.addImage(restartImg);
  restart.scale = 0.13;
  
  // Creating Monkey
  monkey = createSprite(100,60,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.12;
  
  monkey.x=camera.position.x;
  // Creating Ground
  ground = createSprite(350,350,900,10);
  ground.shapeColor = "Green";
  ground.velocityX = 4;
  ground.x = ground.width/2;
  //ground.visible= false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("skyblue");
  monkey.x=camera.position.x-350;
 
  bananaGroup.x=camera.position.x-150
  obstacleGroup.x=camera.position.x-150
 // Arranging codes in Play and End Stages 
  if(gameState === PLAY){
    
    if(keyDown("p")&& monkey.y >= 280){
    monkey.velocityY = -19;
    jumpSound.play();  
    
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaScore = bananaScore + 1;
    bananaGroup.destroyEach();
    
    switch(bananaScore){
       case 5:  monkey.scale=  0.14;
       break;
       case 10: monkey.scale=  0.16;
       break;
       case 15: monkey.scale=  0.18;
       break;
       case 20: monkey.scale=  0.20;
       break;
       case 25: monkey.scale = 0.22;
       break; 
       case 30: monkey.scale = 0.24;
       break; 
    default: break;  
        
        
    }
  }
   
  
  score = score + Math.round(getFrameRate()/60);
    
  monkey.velocityY = monkey.velocityY + 0.9;
    
  if(ground.x < 150){
     ground.x = ground.width/2; 
  }
     monkey.collide(invisibalGround);
    restart.visible = false;
    
  if(monkey.isTouching(obstacleGroup)){
    c = c + 1;
    obstacleGroup.destroyEach();
    overSound.play();
    monkey.scale = 0.12;
  }
    
  if(c===2 && gameState===PLAY){
  gameState = END;
  monkey.scale = 0.12;  
  }
    
  }
   
  
   if(gameState === END){
     
   restart.visible = true;  
   monkey.visible = false;
   ground.visible = false;  
   invisibalGround.visible = false;  
   fall.visible = true; 
   over.visible = true;  
   jungle.velocityX = 0; 
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.setVelocity(0,0);
   over.addImage(gameOverImg);  
   over.scale = 0.6;
   fall.addImage(monkeyFallen);
   fall.scale = 0.25;  
   
   
 }
   
 
   
    ground.visible = false;
    invisibalGround.visible = false;
  
  
  if(mousePressedOver(restart)&& gameState === END) {
    gameState = PLAY;
    monkey.visible = true;
    fall.visible = false;
   //ground.visible = true;
   //invisibalGround.visible = true;
    over.visible = false;
    score = 0;
    bananaScore = 0;
    jungle.velocityX = -3;
    c = 0;
  }
  
    
    
  
  
 // if(jungle.x<270){
  // jungle.x = jungle.width/2.9;
 // }
  drawSprites(); 
  
  textSize(40);
  stroke("red");
  fill("red");
  
 
  text(" - "+bananaScore,480,54);
  
  
  
  createBananas();
  spawnObstacles();
}

function createBananas(){
  if (frameCount% 80 === 0){
    var banana = createSprite(400,400,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.115;
    banana.velocityX = -(4 + bananaScore/5);
    banana.lifetime = 200;
    banana.y = Math.round(random(120,200));
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if (frameCount% 150===0){
    obstacle = createSprite(400,320,50,50);
    obstacle.velocityX = -(6 + bananaScore/7);
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale = 0.14;
    obstacle.lifetime = 200;
    obstacle.setCollider("circle", 0, 0, 180);
    obstacleGroup.add(obstacle);
  }
  
}
 
  


