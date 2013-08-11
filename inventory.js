var inherits = require('inherits');

module.exports = Inventory;

function Inventory(game){
  this.game = game;
  this.game.inventory = {};

  console.log(this.game.inventory.length)

  this.createHTML();

  var self = this;

  this.game.on('update', function(interval){
    if (this.inventory.length > 0){
      self.el.style.display = 'block';
    } else {
      self.el.style.display = 'none';
    }
  })
}

Inventory.prototype.createHTML = function(){
  this.el = document.createElement('ul');

  var h3 = document.createElement('h3');
  h3.innerHTML = 'inventory';

  this.el.appendChild(h3);

  document.body.appendChild(this.el);

};

Inventory.prototype.add = function(item){
  var self = this;

  this.findItem(item, function(exists, items){
    console.log(exists, items)
    if (exists === false){

      items[item.name] = {
        item: item,
        quantity: 1
      }

      var li = document.createElement('li');
      li.innerHTML = item.name;
      li.id = item.name;
      self.el.appendChild(li);

    } else {
      items[items.name].quantity += 1;
    }

  });
};

Inventory.prototype.remove = function(){
  this.findItem(this, function(exists, items, index){
    if (exists){
      //items.splice(index, 1);
    }
  });
};

Inventory.prototype.list = function(){
  return this.game.inventory.join(', ');
};

Inventory.prototype.findItem = function(itemToFind, callback){
  if (this.isEmpty()){
    return callback(false, this.game.inventory);
  }

  this.each(function(item, items){
    if (itemToFind === item){
      return callback(true, items);
    } else {
      return callback(false, items);
    }
  });
};

Inventory.prototype.each = function(callback){
  for (var item in this.game.inventory){
    console.log(this.game.inventory)
    callback(item, this.game.inventory);
  }
};

Inventory.prototype.isEmpty = function isEmpty(){
  var inventory = this.game.inventory;

  for(var item in inventory) {
    if(inventory.hasOwnProperty(item)){
      return false;
    }      
  }
  return true;
}
