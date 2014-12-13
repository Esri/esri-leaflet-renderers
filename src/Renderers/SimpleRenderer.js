EsriLeafletRenderers.SimpleRenderer = EsriLeafletRenderers.Renderer.extend({

  initialize: function(rendererJson, options){
    EsriLeafletRenderers.Renderer.prototype.initialize.call(this, rendererJson, options);
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

EsriLeafletRenderers.simpleRenderer = function(rendererJson, options){
  return new EsriLeafletRenderers.SimpleRenderer(rendererJson, options);
};
