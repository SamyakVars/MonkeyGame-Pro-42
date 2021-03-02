var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var bananaImg, foodGroup, obsImg, obsGroup;

var score = 0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png")
  obsImg = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = createGroup()
  obsGroup = createGroup()
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

    spawnFood()
    spawnObstacles()
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach()
      score += 1
      player.scale += 0.01
    }

    if(obsGroup.isTouching(player)){
      gameState = END
    }
  }else if(gameState == END){
    backgr.velocityX = 0
    player.destroy()
    obsGroup.destroyEach()
    foodGroup.destroyEach()
  
  }

  drawSprites();

  if(gameState == PLAY){
    textSize(20)
    fill(0)
    text("Score: " + score, 20, 20)
  }else if(gameState == END){
    textSize(25)
    fill(0)
    text("GAME OVER", 330, 150)
    textSize(20)
    text("Your Score Was: " + score, 325, 200)
  }
  
}

function spawnFood(){
  if(frameCount % 100 == 0){
    var banana = createSprite(800, random(100, 300), 20, 20)
    banana.velocityX = -8
    banana.scale = 0.05
    banana.lifetime = 102
    banana.addImage(bananaImg)
    foodGroup.add(banana)

    
    
  }
}

function spawnObstacles(){
  if(frameCount % 80 == 0){
    var obstacle = createSprite(800, random(300, 370), 20, 20)
    obstacle.velocityX = -4
    obstacle.scale = 0.2
    obstacle.lifetime = 202
    obstacle.addImage(obsImg)

    obsGroup.add(obstacle)
  }
}
