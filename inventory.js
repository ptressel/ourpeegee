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

Inventory.prototype.remove = function(){
  this.findItem(this, function(exists, items, index){
    if (exists){
      items.splice(index, 1);
    }
  });
};

Inventory.prototype.list = function(){
  return this.game.inventory.join(', ');
};

Inventory.prototype.findItem = function(itemToFind, callback){
  if (this.game.inventory.length === 0){
    callback(false, this.game.inventory, null);
  }

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
  var ul = document.createElement('ul');
  this.each(function(item, i, items){
    var li = document.createElement('li');
    li.innerHTML = item.name;
    li.id = item.name;
    ul.appendChild(li);
    console.log(ul);
  });
};

Inventory.prototype.each = function(callback){
  for (var i=0; i<this.game.inventory.length; i++){
    callback(this.game.inventory[i], i, this.game.inventory);
  }
};