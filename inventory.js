var inherits = require('inherits');

module.exports = Inventory;

function Inventory(game){
  this.game = game;
  this.game.inventory = [];
}

Inventory.prototype.add = function(item){
  this.findItem(item, function(exists, items, index){
    if (!exists){
      items.push(item);
    }
  });
};

Inventory.prototype.remove = function(item){
  this.findItem(this, function(exists, items, index){
    if (exists){
      items.splice(index, 1);
    }
  });
};

Inventory.prototype.list = function(){
  return this.game.inventory;
};

Inventory.prototype.findItem = function(itemToFind, callback){
  this.each(function(item, i, items){
    if (itemToFind === item){
      callback(true, items, i);
    } else {
      callback(false, items, i);
    }
  });
};

Inventory.prototype.display = function(el){
  this.createHTML();
};

Inventory.prototype.createHTML = function(){
  this.each(function(item, i, items){
    console.log(item);
  });
};

Inventory.prototype.each = function(callback){
  var items = this.game.inventory;

  for (var i=0; i<items.length; i++){
    callback(items[i], i, items);
  }
};