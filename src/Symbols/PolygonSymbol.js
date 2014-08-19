L.esri.Renderers.PolygonSymbol = L.esri.Renderers.Symbol.extend({
  statics: {
    //not implemented: 'esriSFSBackwardDiagonal','esriSFSCross','esriSFSDiagonalCross','esriSFSForwardDiagonal','esriSFSHorizontal','esriSFSNull','esriSFSVertical'
    POLYGONTYPES:  ['esriSFSSolid']
  },
  initialize: function(symbolJson){
    L.esri.Renderers.Symbol.prototype.initialize.call(this, symbolJson);
    this._lineStyles = L.esri.Renderers.lineSymbol(symbolJson.outline).style();
    this._fillStyles();
  },

  _fillStyles: function(){
    if(this._lineStyles.weight === 0){
      //when weight is 0, setting the stroke to false can still look bad
      //(gaps between the polygons)
      this._styles.stroke = false;
    } else {
      //copy the line symbol styles into this symbol's styles
      for (var styleAttr in this._lineStyles){
        this._styles[styleAttr] = this._lineStyles[styleAttr];
      }
    }

    //set the fill for the polygon
    this._styles.fillColor = this.colorValue(this._symbolJson.color);
    this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
  },

  style: function() {
    return this._styles;
  }
});
L.esri.Renderers.polygonSymbol = function(symbolJson){
  return new L.esri.Renderers.PolygonSymbol(symbolJson);
};
