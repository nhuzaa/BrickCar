/**********************************************************
 *
 * ********************************************************
 *
 *@description
 *  Car - Brick Game
 *
 *@author
 * Rohit Ratna Sthapit
 *
 *
 ********************************************************/


var TIME_LOOP = 50; // Millisecond
var CANVAS_WIDTH = 200;
var CANVAS_HEIGHT = 500;
var BLOCKADE_LIMIT = 4 ;


var CAR_HEIGHT = 100;
var CAR_WIDTH = 60;

var BLOCKADE_HEIGHT = 60
var BLOCKADE_WIDTH = 60;

var BLOCKADE_SPACING =1.75 ;

var BLOCKAGE_SPEED = 2;
/**
 * Car Porperties
 */
function Car() {

    var posX; // Bottom
    var posY; // Left
    var state = 0; // 0 >> Left 1 >> Right

    this.element ;

    /**
     * Car Constructor
     * @return {[type]} [description]
     */
    this.init = function() {
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'car');
        posX = 0;
        posY = 0;
        this.set(0);
    }

    /**
     * Change the Left and Right State of Car
     * @param {[Boolean]} key [ 0 >> Left 1 >> Right ]
     */
    this.set = function(key) {
        state = key;
        this.checkState();
    }

    this.checkState = function() {
      var that = this;
        if (state == 0) //LEFT
        {
            posX = 0;
        } else if (state == 1) // RIGHT
        {
            posX = CANVAS_WIDTH / 2;

        }

      that.draw();
    }

    this.getState = function(){
      return state;

    }

    this.draw = function() {
        this.element.style.left = posX + 'px';
        this.element.style.bottom = posY + 'px';

    }
}



/**
 * Blockade Properties
 */
function Blockade() {


    var state; // 0 >> LEFT  | 1 >> RIGHT

    var color = "red"
    var speed = 10;

    this.posX = 0; // Bottom
    this.posY = 0; // Left

    var blockadeId ;
    this.element;

    /**
     * Blockad Constructor
     * @return {[type]} [description]
     */
    this.init = function(id) {
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'blockade'); // div with class car
        blockadeId = id;
        this.set();
    }

    this.set = function() {

        state = getRandom(0, 1); // LEFT | RIGHT

        this.posY =  blockadeId * BLOCKADE_SPACING * CAR_HEIGHT +  2 * CAR_HEIGHT ;

        if (state == 0 ){
          this.posX = 0
        }else if (state == 1){

          this.posX = CANVAS_WIDTH /2;
        }

        this.draw();
    }

    this.getState  = function(){
      return state;

    }

    this.draw = function() {

        this.element.style.left = this.posX + 'px';

        this.element.style.bottom = this.posY + 'px';


    }
}






/**
 * Main Fuction
 * @return {[type]} [description]
 */
function main() {
    var blockades = [];
    var container = document.getElementById('container');

    // Creating Car
    var car = new Car();
    car.init(0, 0);
    car.draw();
    console.log("car drawn");
    container.appendChild(car.element); // Adding bubble to the container


    var keyPress = document.addEventListener("keydown", function (event) {

      var c = event.keycode || event.which ;
      switch (c) {
        case 37:
          car.set(0); //LEFT
          break;

        case 39:
          car.set(1); // RIGHT
          break
        default:
      };
    });


    /**
     * Creating Blockades and adding it to the blockades array
     * @return {[None]} [None]
     */
    var createBlockades = function() {

        for (var i = 0; i < BLOCKADE_LIMIT; i++) {
            var blockade = new Blockade();
            blockade.init(i);
            console.log("blockade created" + i);



            blockades.push(blockade);
            container.appendChild(blockade.element); // Adding bubble to the container
        }

    }

    /**
     * Movement of Blockades
     * @return {[None]} [None]
     */
     var moveBlockades= function() {
        for (var i = 0; i < BLOCKADE_LIMIT; i++) {
            var blockade = blockades[i];
            if (blockade.posY > 0)
            {
              blockade.posY -= BLOCKAGE_SPEED;
            }else{
              blockade.posY  =  BLOCKADE_LIMIT * BLOCKADE_SPACING * CAR_HEIGHT +  2 * CAR_HEIGHT ;
            }

            if(blockade.getState() == car.getState() && blockade.posY <= CAR_HEIGHT)
            {
              console.log("Car" + car.getState()  + "blockade" + blockade.getState());
              clearInterval(gameloop_var);
            }
            blockade.draw();

        }
    }

    // ############### GAME LOOP ########################
    var gameloop_var = setInterval(gameloop, TIME_LOOP);

    /**
     * Main Game Loop
     * @return {[type]} [description]
     */
    function gameloop() {

        moveBlockades();



    }
      createBlockades();

}

/**
 * Generate Random Number
 * @param  {[Integer]} min [description]
 * @param  {[Integer]} max [description]
 * @return {[Random Value]}     [description]
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Initializing
main();
