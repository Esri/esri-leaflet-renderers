EsriLeafletRenderers.Renderer = L.Class.extend({

  options: {
    proportionalPolygon: false,
    clickable: true
  },

  initialize: function(rendererJson, options){
    this._rendererJson = rendererJson;
    this._pointSymbols = false;
    this._symbols = [];
    this._visualVariables = this._parseVisualVariables(rendererJson.visualVariables);
    L.Util.setOptions(this, options);
  },

  _parseVisualVariables: function(visualVariables){
    var visVars = {};
    if (visualVariables) {
      for (var i = 0; i < visualVariables.length; i++){
        visVars[visualVariables[i].type] = visualVariables[i];
      }
    }
    return visVars;
  },

  _createDefaultSymbol: function(){
    if(this._rendererJson.defaultSymbol){
      this._defaultSymbol = this._newSymbol(this._rendererJson.defaultSymbol);
      this._defaultSymbol._isDefault = true;
    }
  },

  _newSymbol: function(symbolJson){
    if(symbolJson.type === 'esriSMS' || symbolJson.type === 'esriPMS'){
      this._pointSymbols = true;
      return EsriLeafletRenderers.pointSymbol(symbolJson, this.options);
    }
    if(symbolJson.type === 'esriSLS'){
      return EsriLeafletRenderers.lineSymbol(symbolJson);
    }
    if(symbolJson.type === 'esriSFS'){
      return EsriLeafletRenderers.polygonSymbol(symbolJson);
    }
  },

  _getSymbol: function(){
    //override
  },

  attachStylesToLayer: function(layer){
    if(this._pointSymbols){
      layer.options.pointToLayer = L.Util.bind(this.pointToLayer, this);
    } else {
      layer.options.style = L.Util.bind(this.style, this);
    }
  },

  pointToLayer: function(geojson, latlng){
    var sym = this._getSymbol(geojson);
    if(sym && sym.pointToLayer){
      return sym.pointToLayer(geojson, latlng, this._visualVariables);
    }
    //invisible symbology
    return L.circleMarker(latlng, {radius: 0, opacity: 0});
  },

  style: function(feature){
    //find the symbol to represent this feature
    var sym = this._getSymbol(feature);
    if(sym){
      return sym.style(feature, this._visualVariables);
    }else{
      //invisible symbology
      return {opacity: 0, fillOpacity: 0};
    }
  }
});
