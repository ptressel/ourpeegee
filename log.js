var Text = require('./text');

module.exports = Log;

function Log(options){
  this.el = options.el || '';
}

Text.prototype.update = function(html){
  this.el.innerHTML = html;
}

Text.prototype.clear = function(){
  this.el.innerHTML = '';
}