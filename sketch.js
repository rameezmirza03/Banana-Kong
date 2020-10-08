var PLAY = 1
var END = 0
var gameState = PLAY

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, fruit
var score, eat , jump

var monkey

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  eat = loadSound("monkeys1.mp3")
  jump = loadSound("monkey1.mp3")
}

function setup() {
  
monkey = createSprite(80,315,20,20)
monkey.addAnimation("moving",monkey_running)
monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10)
  
  fruitGroup = new Group()
  obstacleGroup = new Group()
  
  score = 0
}


function draw() {

  background("lightBlue")

  
  
  text("Score: "+ score, 350,50)
  
  if(gameState === PLAY){
    
  fruits()
  obstacles()
    
     if(monkey.isTouching(fruitGroup)){
      fruitGroup.destroyEach()
      score = score+2
       
    }
    
    if(keyDown("space")&& monkey.y >= 150){
        monkey.velocityY = -12
      jump.play()
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
      
  }
  else
    if(monkey.isTouching(obstacleGroup)){
      gameState = END  
      
      
      obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     fruitGroup.setVelocityXEach(0);
    }
  
  
  
 drawSprites() 
  
  monkey.collide(ground)
}

function fruits(){
  
  // fruits function and logic
if (World.frameCount%30===0){
  fruit = createSprite(400,200,20,20)
  fruit.addImage(bananaImage)
  fruit.scale = 0.125
  
   var position = Math.round(random(1,2))
  
    
  fruit.y = Math.round(random(50,340))
  
  if(position == 1){
    fruit.x = 400
    fruit.velocityX = -(6+score/10)
  }
  if(position == 2){
    fruit.x = 0
    fruit.velocityX = (6+score/10)
  }
  
  
  fruit.SetLifetime = 100 
  
  fruitGroup.add(fruit)

  console.log(fruit.velocityX)
  
 }
}


function obstacles(){
  
  // fruits function and logic
if (World.frameCount%90===0){
  obstacle = createSprite(400,325,20,20)
  obstacle.addImage(obstaceImage)
  obstacle.scale = 0.125
  
  obstacle.velocityX = -(7+ score/100)
  
  obstacle.SetLifetime = 50 
  
  obstacleGroup.add(obstacle)

 }
}