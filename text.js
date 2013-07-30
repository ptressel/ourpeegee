module.exports = Text;

function Text(options){
  this.el = document.querySelector(options.el);

  for (var style in options.styles){
    this.el.style[style] = options.styles[style];
  }

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