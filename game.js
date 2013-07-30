var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var SceneManager = require('crtrdg-scene');
var Inventory = require('./inventory');
var Player = require('./player');
var Door = require('./door');
var Item = require('./item');
var Text = require('./text');

var game = new Game({
  canvasId: 'game',
  width: window.innerWidth,
  height: window.innerHeight - 100,
  backgroundColor: '#ffffff'
});

game.on('update', function(interval){});

game.on('draw', function(context){});

game.on('pause', function(){});

game.on('resume', function(){});

var title = new Text({ 
  el: '#title',
  height: '100',
  styles: { 
    height: '40px',
    padding: '30px 0px',
    margin: '0px',
    color: '#ff0000'
  }
});


/*
*
* INVENTORY & ITEMS
*
*/

var inventory = new Inventory(game);

var pizza = new Item({
  name: 'pizza',
  position: {
    x: 500,
    y: 200
  }
});


/*
*
* KEYBOARD
*
*/

var keyboard = new Keyboard(game);

keyboard.on('keydown', function(key){
  if (key === '<space>' && game.currentScene.name === 'menu'){
    sceneManager.set(levelOne);
    game.resume();
  }

  if (key === 'P'){
    if (!game.paused){
      game.pause();
      player.visible = false;
      game.previousScene = game.currentScene;
      sceneManager.set(pauseMenu);
    } else {
      game.resume();
      player.visible = true;
      sceneManager.set(game.previousScene);
    }
  }
});



/*
*
* PLAYER
*
*/

var player = new Player({
  size: {
    x: 10,
    y: 10
  },
  position: {
    x: game.width / 2 - 5,
    y: game.height / 2 - 5,
  },
  color: '#fff',
  speed: 5,
  visible: false
});

player.addTo(game);

player.on('update', function(interval){
  this.input(keyboard);
  this.move();
  this.velocity.x = 0;
  this.velocity.y = 0;
  this.boundaries();
});

player.on('draw', function(context){
  if (player.visible){
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);    
  }
});



/*
*
* DOOR
*
*/

var door = new Door({ position: { x: 100, y: 200 } });

door.on('draw', function(context){
  context.fillStyle = door.color;
  context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);    
});



/*
*
* SCENE MANAGER
*
*/

var sceneManager = new SceneManager(game);



/*
*
* MAIN MENU
*
*/

var menu = sceneManager.create({
  name: 'menu',
  backgroundColor: '#ffffff'
});

menu.on('init', function(){
  console.log('this is the menu.');
  title.update('this is the menu.');
  player.visible = false;
  game.pause();
});

// set main menu as first screen
sceneManager.set(menu);



/*
*
* PAUSE MENU
*
*/

var pauseMenu = sceneManager.create({
  name: 'pause menu',
  backgroundColor: 'blue'
});

pauseMenu.on('init', function(){
  console.log('this is the pause menu');
  title.update('this is the pause menu');
});



/*
*
* LEVEL ONE
*
*/

var levelOne = sceneManager.create({
  name: 'level one',
  backgroundColor: 'rgb(1,255,155)'
});

levelOne.on('init', function(){
  console.log('this is level one.')
  player.visible = true;
  door.addTo(game);
  pizza.addTo(game);
  title.update('this is level one.');
});

levelOne.on('update', function(interval){
  if (player.boundingBox.intersects(door.boundingBox)){
    sceneManager.set(levelTwo);
  }

  if (player.boundingBox.intersects(pizza.boundingBox)){
    inventory.add(pizza);
    pizza.remove();
  }
});



/*
*
* LEVEL TWO
*
*/

var levelTwo = sceneManager.create({
  name: 'level two',
  backgroundColor: 'rgb(111, 42, 237)'
});

levelTwo.on('init', function(){
  console.log('this is level two.');
  title.update('this is level two.');
  door.position = {
    x: 500,
    y: 100
  }
})