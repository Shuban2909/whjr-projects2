//creating the variables
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var Play=1;
var End=0;
var gameState=1;

function preload(){
  //loading the images and animations
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  //creating the gameover banner
  gameover=createSprite(200,200,10,10)  
  gameover.addImage("done",endImg) ; 
  //making it invisible
  gameover.visible=false; 

  //creating the groups
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {

  //creating the background
  background(0);
  
  //making the boy move
  boy.x = World.mouseX;
  
  //creating the edges
  edges= createEdgeSprites();
  
  //creating the boy collide with the edges
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  //if the gamestate is end then the sprites will be destroyed
  //the boy disappears and the road's velocity is 0
  if(gameState==End){
     swordGroup.destroyEach();
     jwelleryG.destroyEach(); 
     diamondsG.destroyEach();
     cashG.destroyEach();
     cashG.setVelocityYEach(0);
     boy.visible=false;
     path.velocityY = 0;
  }
   
   //if the gamestate is play then the sprites will be created
   if(gameState==Play){ 
     
       createCash();
       createDiamonds();
       createJwellery();
       createSword();

   //the scores are increased and the sprites are destroyed
     
   if (cashG.isTouching(boy)) {
       cashG.destroyEach();
       treasureCollection=treasureCollection+50;
    }
   else if (diamondsG.isTouching(boy)) {
       diamondsG.destroyEach();
       treasureCollection=treasureCollection+100;
      }
   else if(jwelleryG.isTouching(boy)) {
       jwelleryG.destroyEach();
       treasureCollection=treasureCollection+150;
     }
     
   //when the boy touches the sword then the game is over
   else{
       if(swordGroup.isTouching(boy)) {        
         gameover.visible=true;        
         gameState=0;        
    }
  }
}

  drawSprites();
  //creating the score
  textSize(20);
  fill("red");
  text("Treasure: "+ treasureCollection,150,30);

}

//creating the cash
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

//creating the diamonds
function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

//creating the jewels
function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}


//creating the sword
function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}