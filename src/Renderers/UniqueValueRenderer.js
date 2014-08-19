L.esri.Renderers.UniqueValueRenderer = L.esri.Renderers.Renderer.extend({

  initialize: function(rendererJson, options){
    L.esri.Renderers.Renderer.prototype.initialize.call(this, rendererJson, options);

    //what to do when there are other fields?
    this._field = this._rendererJson.field1;
    this._createSymbols();
  },

  _createSymbols: function(){
    var symbol, uniques = this._rendererJson.uniqueValueInfos;

    //create a symbol for each unique value
    for (var i = uniques.length  - 1; i >= 0; i--){
      symbol = this._newSymbol(uniques[i].symbol);
      symbol.val = uniques[i].value;
      this._symbols.push(symbol);
    }
  },

  /* jshint ignore:start */
  _getSymbol: function(feature){
    var val = feature.properties[this._field];
    var symbol = this._defaultSymbol;
    for (var i = this._symbols.length  - 1; i >= 0; i--){
      //using the === operator does not work if the field
      //of the unique renderer is not a string
      if(this._symbols[i].val == val){
        symbol = this._symbols[i];
      }
    }
    return symbol;
  }
  /* jshint ignore:end */
});

L.esri.Renderers.uniqueValueRenderer = function(rendererJson, options){
  return new L.esri.Renderers.UniqueValueRenderer(rendererJson, options);
};
