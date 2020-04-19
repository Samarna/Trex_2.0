var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloud_image;
var obstaclesGroup,obsta_img1,obsta_img2, obsta_img3, obsta_img4, obsta_img5, obsta_img6;
var count = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloud_image = loadImage("cloud.png");
  
  obsta_img1 = loadImage("obstacle1.png");
  obsta_img2 = loadImage("obstacle2.png");
  obsta_img3 = loadImage("obstacle3.png");
  obsta_img4 = loadImage("obstacle4.png");
  obsta_img5 = loadImage("obstacle5.png");
  obsta_img6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}

function draw() {
  background(180);
  
  count = count + Math.round(getFrameRate()/60);
  text("Score: "+ count, 500, 50);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.addImage("obstacle" + rand);
    switch (rand) {
      case 1 : obstacle.addImage(obsta_img1) ;
               break;
      case 2 : obstacle.addImage(obsta_img2) ;
               break;
      case 3 : obstacle.addImage(obsta_img3) ;
               break;         
      case 4 : obstacle.addImage(obsta_img4) ;
               break;  
      case 5 : obstacle.addImage(obsta_img5) ;
               break;  
      case 6 : obstacle.addImage(obsta_img6) ;
               break;         
      default :break;
    }
        
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
