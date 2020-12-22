//Game based on Flappy bird PCGame
//The main character(created in a class), is a vector.
//There is a constant acceleration "pushing" it down similar to gravity(gravAcc).
//Every time ENTER is pressed an opossite acceleration is forcing it move up(repAcc).
//The goal is not to touch the obstacles(created in class).
//If character toucches the puple cirles(food), the obstacles dissapear.
//Three levels of difficulty changing the speed and the acceleration of the elements

//Code inspiration and advicing from:
//https://p5js.org/    - official p5js website
//https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw  - The Coding Train YouTube channel

//Music downloaded from:
//https://www.bensound.com/ - Bensound loyalty free music website_ track name: Psychedelic

//Sound effects downloaded from:
//https://freesfx.co.uk/Default.aspx  - FreeSFX website

//START-RESTART
var instructions;         //text giving instructions for the game
var moderateButton;       //button for moderate game
var easyButton;           //button for easy game
var hardButton;           //button for hard game
var restartButton;        //button restarting the game when lost

var colDetected = false;  //boole variable changing everytime the game is lost

//FOOD
var foods = [];           //array to keep the objects of purple cirles
var numFoods = 3;         //number of objects of circles created
var minNumCircles = 2;    //minimum number of cirles in each object
var maxNumCircles = 8;    //maximun number of cirles in each object
var minRadius = 5;        //minimun radius of cirles in each object
var maxRadius = 20;       //maximun radius of cirles in each object
var speed1;               // speed in which objects pass by

//CHARACTER VARIABLE
var player;           //variable for the main character
//CHARACTER ACCELERATION VARIABLES
var gravAcc;          //variable for gravitational acceleration
var repAcc = -0.04;   //variable for repellent acceleration
var prev = 0;         //variable for time change to come back to the gravAcc only

//OBSTACLES
var obs = [];         //array to keep the objects of obstacles
var numObs = 35;      //number of objects created in the array
var speed;            //speed in which obstacles pass by

//SOUND
var music;          //music played while playing the game
var bubbleSound;    //sound played everytime ENTER is pressed
var losingSound;    //sound played when game is lost
function preload(){
    music = loadSound("sound/music.mp3")
    bubbleSound = loadSound("sound/bubbles1.mp3")
    losingSound = loadSound("sound/losing1.mp3")
}


function setup() {
  noStroke();
  createCanvas(windowWidth, 500);
  colorMode(HSB,360,100,100,100);
  resetSetup(); //seperate function created to enable restarting after game is lost
}

function draw() {
  background(200, 100, 70, 100);
  food();             //call function displaying the purple cirles
  displayObs();       //call function displaying the obstacles
  player.move();      //call methods of character - move assigns the acceleration applied
  player.display();

  //every second change the acceleration back to gravAcc only
  if (millis() - prev > 1000) {
    player.acc = createVector(0, gravAcc);
    prev = millis();
  }
  //if Character touches an obstacle or the edge, game stops
  if (player.detectCollision() && !colDetected){
    speed = 0;
    gravAcc = 0.7;
    repAcc = 0;
    colDetected = true; //collision detected once
    music.stop();
    losingSound.play();
    restart();    //restart function with button to start the game again
  }
  //if character's center touches the purple cirles, obstacles dissapear
  if (player.detectD()){
    obs.shift();
    obs.push(createRandomObstacles());
  }
}

////////////////////////////////////////////////////////////
function restart(){  //restart function called when the game is lost
  restartButton = createButton("GAME OVER Play Again");
  restartButton.style("font-size", "40px");
  restartButton.style("color", "#0003ab");
  restartButton.position(width/2-150, height +10);
  restartButton.style("width", "300px");
  restartButton.style("height", "100px");
  restartButton.style("background", "#ffffff");
  restartButton.mousePressed(playAgain);
}
////////////////////////////////////////////////////////////
function playAgain(){
  restartButton.hide();
  resetSetup();
}
////////////////////////////////////////////////////////////
function resetSetup(){  //resetSetup function to be called once in setup and then, everytime restartButton(Play Again) is pressed
  colDetected = false;  //collision hasn't been detected
  createButtons();      //function creating interface buttons
  gravAcc = 0;      //keep everything steady
  speed = 0;        //keep everything steady
  speed1 = 0;       //keep everything steady

  //assign foods is the array of food(purple circles)
  for(let i=0; i<numFoods; i++){
      foods[i] = new Food(width + random(width),randomGaussian(height/2,height/6),
                          random(minNumCircles,maxNumCircles),
                          random(minRadius,maxRadius), 280);
  }
  //assign Character object to the variable player
  player = new Character(gravAcc);
  //assign Obstacles in the array of obs
  for (let i = 0; i < numObs; i++){
    obs[i] = new Obstacle(i * random(100,500), int(random(0,2)),int(random(2,4)));  //(x, t, scale)
  }
}
////////////////////////////////////////////////////////////
function createButtons(){
  instructions = createDiv('Welcome to the <br>UNDERWATER WORLD!<br><br><br>Keep swimming by pressing ENTER<br> <br>Be careful! The seaweeds are toxic! Keep away! <br><br> Eat the purple plankton to make seaweed dissapear!');
  instructions.position(80, height/2-150);
  instructions.style("width", "250px");
  instructions.style("font-size", "22px");
  instructions.style("color","#ffffff" )

  moderateButton = createButton("MODERATE");
  moderateButton.style("font-size", "25px");
  moderateButton.style("color", "#0003ab");
  moderateButton.position(width/2-150, height +10);
  moderateButton.style("width", "250px");
  moderateButton.style("height", "100px");
  moderateButton.style("background", "#ffffff");
  moderateButton.mousePressed(moderatePlaying); //function to start playing.

  easyButton = createButton("EASY");
  easyButton.style("font-size", "25px");
  easyButton.style("color", "#0003ab");
  easyButton.position(width/2-480, height +10);
  easyButton.style("width", "250px");
  easyButton.style("height", "100px");
  easyButton.style("background", "#ffffff");
  easyButton.mousePressed(easyPlaying);

  hardButton = createButton("HARD");
  hardButton.style("font-size", "25px");
  hardButton.style("color", "#0003ab");
  hardButton.position(width/2+180, height +10);
  hardButton.style("width", "250px");
  hardButton.style("height", "100px");
  hardButton.style("background", "#ffffff");
  hardButton.mousePressed(hardPlaying);
}

////////////////////////////////////////////////////////////
function moderatePlaying(){      // function setting values to the variables making elements move
  instructions.hide();
  moderateButton.hide();
  easyButton.hide();
  hardButton.hide();
  repAcc = -0.04;
  gravAcc = 0.02;
  speed = -4;
  speed1 = -1;
  music.setVolume(0.2, 2);
  music.play();
}
////////////////////////////////////////////////////////////
function easyPlaying(){
  instructions.hide();
  moderateButton.hide();
  easyButton.hide();
  hardButton.hide();
  repAcc = -0.02;
  gravAcc = 0.01;
  speed = -2;
  speed1 = -1;
  music.setVolume(0.2, 2);
  music.play();
}
////////////////////////////////////////////////////////////
function hardPlaying(){
  instructions.hide();
  moderateButton.hide();
  easyButton.hide();
  hardButton.hide();
  repAcc = -0.03;
  gravAcc = 0.05;
  speed = -5;
  speed1 = -2;
  music.setVolume(0.2, 2);
  music.play();
}
////////////////////////////////////////////////////////////
function displayObs(){        //function displaying obstacles
  for (o of obs) {
    if (o.x <-width){
      obs.shift();
      obs.push(createRandomObstacles());
    }
    o.move();
    o.display();
  }
}
////////////////////////////////////////////////////////////
function createRandomObstacles(){ //function creating obstacles
  return new Obstacle(width+random(50,600), int(random(0,2)),int(random(2,6)));
}

////////////////////////////////////////////////////////////
function keyPressed(){        //keyPressed function to add the repellent acceleration
  if (keyCode == ENTER){
    bubbleSound.setVolume(0.5);
    bubbleSound.play();
    var repellent = createVector(0,repAcc);
    player.acc.add(repellent);
  }
}
////////////////////////////////////////////////////////////
function food(){            //function displaying food
   for( f of foods){
     if (f.x <-width/4){
       foods.shift();
       foods.push(generateFood());
     }
     f.move();
     f.update();
     f.display();
   }
}
////////////////////////////////////////////////////////////
function generateFood(i){   //function creating food
  return new Food(width + random(100,500),randomGaussian(height/2,height/6),
                  random(minNumCircles,maxNumCircles),
                  random(minRadius,maxRadius), 280);
}
