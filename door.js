var inherits = require('inherits');
var aabb = require('aabb-2d');
var Entity = require('crtrdg-entity');

module.exports = Door;
inherits(Door, Entity);

function Door(options){
  this.position = {
    x: options.position.x,
    y: options.position.y
  };

  this.size = {
    x: 20,
    y: 40
  };

  this.color = '#999';
  this.setBoundingBox();
}

Door.prototype.setBoundingBox = function(){
  this.boundingBox = aabb([this.position.x, this.position.y], [this.size.x, this.size.y]);  
}