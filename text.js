var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Text;
inherits(Text, EventEmitter);

function Text(options){
  this.el = document.querySelector(options.el);

  if (options.html) {
    this.update(options.html);
  }
}

Text.prototype.update = function(html){
  this.el.innerHTML = html;
}

Text.prototype.empty = function(){
  this.el.innerHTML = '';
}