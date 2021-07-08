var towerImg, tower;
var doorImg, door, doorsGroup;
var ledgeImg, ledge, ledgesGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ledgeImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,400);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  doorsGroup= new Group();
  ledgesGroup=new Group();
  invisibleBlockGroup=new Group();

}

function draw() {
  background(200);
  if(gameState=="play"){
  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space")){
      ghost.velocityY= -6
    }
    if (keyDown("left")){
      ghost.x -= 3
    }
    if (keyDown("right")){
      ghost.x += 3
    }
    ghost.velocityY= ghost.velocityY +0.8

    spawnDoors();

    if(ledgesGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy();
      gameState="end"
    }


   

    drawSprites();
  }
  else if(gameState=="end"){
    fill("red")
    stroke("black")
    textSize(30)
    text("Game Over",200,300)
  }


}

function spawnDoors(){
  if(frameCount%240==0){
door=createSprite(Math.round(random(100,500)),-60);
door.addImage(doorImg);
door.velocityY=1;
door.lifetime=750;
doorsGroup.add(door);

ledge=createSprite(door.x,10);
ledge.addImage(ledgeImg);
ledge.velocityY=1;
ledge.lifetime=750;
ledgesGroup.add(ledge);
door.depth=ghost.depth
ledge.depth=ghost.depth
ghost.depth+=1

invisibleBlock=createSprite(door.x,15,ledge.width,1);
invisibleBlock.velocityY=1;
invisibleBlock.lifetime=750;
invisibleBlockGroup.add(invisibleBlock)
  }
}












