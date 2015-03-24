EsriLeafletRenderers.PointSymbol = EsriLeafletRenderers.Symbol.extend({
  statics: {
    MARKERTYPES:  ['esriSMSCircle','esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSX', 'esriPMS']
  },
  initialize: function(symbolJson, options){
    EsriLeafletRenderers.Symbol.prototype.initialize.call(this, symbolJson);
    if(options) {
      this.serviceUrl = options.url;
    }
    if(symbolJson){
      if(symbolJson.type === 'esriPMS'){
        this._iconUrl = this.serviceUrl + 'images/' + this._symbolJson.url;
        //leaflet does not allow resizing icons so keep a hash of different
        //icon sizes to try and keep down on the number of icons created
        this._icons = {};
        //create base icon
        this.icon = this._createIcon(this._symbolJson);
      } else {
        this._fillStyles();
      }
    }
  },

  _fillStyles: function(){
    if(this._symbolJson.outline && this._symbolJson.size > 0){
      this._styles.stroke = true;
      this._styles.weight = this.pixelValue(this._symbolJson.outline.width);
      this._styles.color = this.colorValue(this._symbolJson.outline.color);
      this._styles.opacity = this.alphaValue(this._symbolJson.outline.color);
    }else{
      this._styles.stroke = false;
    }
    if(this._symbolJson.color){
      this._styles.fillColor = this.colorValue(this._symbolJson.color);
      this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
    } else {
      this._styles.fillOpacity = 0;
    }

    if(this._symbolJson.style === 'esriSMSCircle'){
      this._styles.radius = this.pixelValue(this._symbolJson.size) / 2.0;
    }
  },

  _createIcon: function(options){
    var width = this.pixelValue(options.width);
    var height = width;
    if(options.height){
      height = this.pixelValue(options.height);
    }
    var xOffset = width / 2.0;
    var yOffset = height / 2.0;


    if(options.xoffset){
       xOffset += this.pixelValue(options.xoffset);
    }
    if(options.yoffset){
      yOffset += this.pixelValue(options.yoffset);
    }

    var icon = L.icon({
      iconUrl: this._iconUrl,
      iconSize: [width, height],
      iconAnchor: [xOffset, yOffset]
    });
    this._icons[options.width.toString()] = icon;
    return icon;
  },

  _getIcon: function(size) {
    //check to see if it is already created by size
    var icon = this._icons[size.toString()];
    if(!icon){
      icon = this._createIcon({width: size});
    }
    return icon;
  },

  pointToLayer: function(geojson, latlng, visualVariables){
    var size = this._symbolJson.size || this._symbolJson.width;
    if(!this._isDefault){
      if( visualVariables.sizeInfo) {
        var calculatedSize = this.getSize(geojson, visualVariables.sizeInfo);
        if (calculatedSize) {
          size = calculatedSize;
        }
      }
      if(visualVariables.colorInfo){
        var color = this.getColor(geojson, visualVariables.colorInfo);
        if(color){
          this._styles.fillColor = this.colorValue(color);
          this._styles.fillOpacity = this.alphaValue(color);
        }
      }
    }

    if (this._symbolJson.type === 'esriPMS'){
      return L.marker(latlng, {icon: this._getIcon(size)});
    }
    size = this.pixelValue(size);

    switch(this._symbolJson.style){
      case 'esriSMSSquare':
        return EsriLeafletRenderers.squareMarker(latlng, size, this._styles);
      case 'esriSMSDiamond':
        return EsriLeafletRenderers.diamondMarker(latlng, size, this._styles);
      case 'esriSMSCross':
        return EsriLeafletRenderers.crossMarker(latlng, size, this._styles);
      case 'esriSMSX':
        return EsriLeafletRenderers.xMarker(latlng, size, this._styles);
    }
    this._styles.radius = size / 2.0;
    return L.circleMarker(latlng, this._styles);
  }
});
EsriLeafletRenderers.pointSymbol = function(symbolJson, options){
  return new EsriLeafletRenderers.PointSymbol(symbolJson, options);
};
