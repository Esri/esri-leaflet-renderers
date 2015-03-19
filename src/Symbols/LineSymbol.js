EsriLeafletRenderers.LineSymbol = EsriLeafletRenderers.Symbol.extend({
  statics: {
    //Not implemented 'esriSLSNull'
    LINETYPES:  ['esriSLSDash','esriSLSDot','esriSLSDashDotDot','esriSLSDashDot','esriSLSSolid']
  },
  initialize: function(symbolJson){
    EsriLeafletRenderers.Symbol.prototype.initialize.call(this, symbolJson);
    this._fillStyles();
  },

  _fillStyles: function(){
    //set the defaults that show up on arcgis online
    this._styles.lineCap = 'butt';
    this._styles.lineJoin = 'miter';


    if (!this._symbolJson){
      return;
    }

    if(this._symbolJson.width){
      this._styles.weight = this.pixelValue(this._symbolJson.width);
    }

    if(this._symbolJson.color ){
      this._styles.color = this.colorValue(this._symbolJson.color);
      this._styles.opacity = this.alphaValue(this._symbolJson.color);
    }

    //usuing dash patterns pulled from arcgis online (converted to pixels)
    switch(this._symbolJson.style){
      case 'esriSLSDash':
        //4,3
        this._styles.dashArray = '5,4';
        break;
      case 'esriSLSDot':
        //1,3
        this._styles.dashArray = '1,4';
        break;
      case 'esriSLSDashDot':
        //8,3,1,3
        this._styles.dashArray = '11,4,1,4';
        break;
      case 'esriSLSDashDotDot':
        //8,3,1,3,1,3
        this._styles.dashArray = '11,4,1,4,1,4';
        break;
    }
  },

  style: function(feature, visualVariables){
    if(!this._isDefault && visualVariables){
      if(visualVariables.sizeInfo){
        var calculatedSize = this.pixelValue(this.getSize(feature, visualVariables.sizeInfo));
        if (calculatedSize) {
          this._styles.weight = calculatedSize;
        }
      }
      if(visualVariables.colorInfo){
        var color = this.getColor(feature, visualVariables.colorInfo);
        if(color){
          this._styles.color = this.colorValue(color);
          this._styles.opacity = this.alphaValue(color);
        }
      }
    }
    return this._styles;
  }
});
EsriLeafletRenderers.lineSymbol = function(symbolJson){
  return new EsriLeafletRenderers.LineSymbol(symbolJson);
};
