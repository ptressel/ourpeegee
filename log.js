var Text = require('./text');

module.exports = Log;

function Log(options){
  this.el = document.createElement('ul');

  var body = document.querySelector('body');
  body.appendChild(this.el);

  //this.el.id = options.id || 'log';

  this.el.style.overflow = 'scroll';
  this.el.style.display = 'block';
  this.el.style.position = 'fixed';
  this.el.style.zIndex = '1111';
  this.el.style.top = '0'
  this.el.style.width = options.width || '';
  this.el.style.height = options.height || '';
}

Log.prototype.add = function(html){
  var item =  document.createElement('li');
  item.innerHTML = html;
  item.style.listStyleType = 'none';
  this.el.appendChild(item);
  this.el.scrollTop = this.el.scrollHeight;
};

Log.prototype.clear = function(){
  this.el.innerHTML = '';
};