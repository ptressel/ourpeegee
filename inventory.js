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
}

Inventory.prototype.remove = function(item){
  this.findItem(this, function(exists, items, index){
    if (exists){
      items.splice(index, 1);
    }
  });
}

Inventory.prototype.list = function(){
  return this.game.inventory;
}

Inventory.prototype.findItem = function(item, callback){
  var items = this.game.inventory;

  if (items.length === 0){
    callback(false, items)
  }

  for (var i=0; i<items.length; i++){
    if (items[i] === item) {
      callback(true, items, i);
    } else {
      callback(false, items, i);
    }
  }
};