//Create variables here
var dog, happyDog;
var garden, bedroom, washroom
var foodS, foodStock;
var feedButton, addButton
var fedTime, lastFed
var database;

var changeState, readState

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg.png");
  gardenImg = loadImage("virtual pet images/garden.png");
  bedroomImg = loadImage("virtual pet images/bedroom.png");
  washroomImg = loadImage("virtual pet images/washroom.png");

}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  
  database=firebase.database();
  foodstock=database.ref("Food");
  foodstock.on("value",readStock);

  foodObj = new Food ();

  addFood=createButton("Add Food");
  addFood.position(800,95);

  feed=createButton("Feed the dog");
  feed.position(700,95);

  //read game state from database
  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });
  
}


function draw() {  

  background(46,139,87);

  feed.mousePressed(function(){
    dog.addImage(happyDogImage);
    writeStock(foodStock);
    lastFed=hour();
    foodStock.updatelastFed(lastFed);
  });

  addFood.mousePressed(function(){
    foodObj.updateFoodStock(20)
  });

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  //textSize(15);
  if(lastFed>=12) {
    text("Last Fed :  12 AM" ,350,30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM",350,30);
  } else {
    if(lastFed!=undefined)
    text("Last Feed : " + lastFed + " AM", 350,30);
  }
    
  if(gameState! = "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(deadDog);
  }

 
  foodObj.display();
  drawSprites();

  //add styles here
  textSize = 24;
  text = ("Press UP_ARROW Key To Feed Comet Milk!");
  fill("pink");
  stroke("purple");
}

//function to read values from DB
function readStock(data) {
  foodStock = data.val();
}

//function to write values in DB
function writeStock(x) {
  if(x<=0) {
   x = 0;
  } else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  })
}

//function to update gamestates in database
function update(state){
  database.ref("/").update({
    gameState:state
  });


}
  
  
    
  





