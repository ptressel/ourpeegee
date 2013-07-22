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
    x: 10,
    y: 20
  };

  this.color: '#46461';
  this.setBoundingBox();
}

Door.prototype.setBoundingBox = function(){
  this.boundingBox = aabb([this.position.x, this.position.y], [this.size.x, this.size.y]);  
}