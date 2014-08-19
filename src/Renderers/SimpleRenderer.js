L.esri.Renderers.SimpleRenderer = L.esri.Renderers.Renderer.extend({

  initialize: function(rendererJson, options){
    L.esri.Renderers.Renderer.prototype.initialize.call(this, rendererJson, options);
    this._createSymbol();
  },

  _createSymbol: function(){
    if(this._rendererJson.symbol){
      this._symbols.push(this._newSymbol(this._rendererJson.symbol));
    }
  },

  _getSymbol: function(){
    return this._symbols[0];
  }
});

L.esri.Renderers.simpleRenderer = function(rendererJson, options){
  return new L.esri.Renderers.SimpleRenderer(rendererJson, options);
};
