//Create variables here
var dog, happydog, database, foodS, foodStock;
var saddogImage, happydogImage;
var addFood, foodobj;

function preload()
{
  //load images here
  happydogImage = loadImage("dogImg1.png");
  saddogImage = loadImage("dogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodobj = new Food();

  dog = createSprite(800,200, 150,150);
  dog.addImage(saddogImage);
  dog.scale = 0.15;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDogs);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
  background(46, 139, 87);

  if(foodStock !== undefined){
    foodobj.display();
  }

    drawSprites();
}
  

function readStock(data){
  foodS = data.val();
  foodobj.updateFoodStock(foodS);
}

function feedDogs(){
  dog.addImage(happydogImage);

  foodobj.updateFoodStock(foodobj.getFoodStock() - 1);
  database.ref('/').update({
    food : foodobj.getFoodStock()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food : foodS
  })
}