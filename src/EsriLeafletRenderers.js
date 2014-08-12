L.esri.Renderers = {
  Renderers: {}
};

L.esri.Renderers.Symbol = L.Class.extend({

  initialize: function(symbolJson) {
    this.symbolJson = symbolJson;
    this.val = 0;
    this.styles = {};
  },


  //the geojson returned is in points
  pixelValue: function(pointValue) {
    return pointValue * 1.3333333333333;
  },

  //color is an array [r,g,b,a] - move this somewhere more global
  colorValue: function(color) {
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  },

  alphaValue: function(color) {
    return color[3] / 255;
  }
});

L.esri.Renderers.PointSymbol = L.esri.Renderers.Symbol.extend({
  statics: {
    SIMPLEMARKERTYPES:  ['esriSMSCircle','esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSX']
  },
  initialize: function(symbolJson) {
    L.esri.Renderers.Symbol.prototype.initialize.call(this, symbolJson);
      this.fillStyles(); 
  },

  fillStyles: function(){

    if(this.symbolJson.type === 'esriPMS') {
      return;
    }
    console.log(this.symbolJson);
    //did not find equivalent default leaflet values for these values (yet)
    //"angle" : <angle>,
    //"xoffset" : <xoffset>,
    //"yoffset" : <yoffset>,

    if(this.symbolJson.outline){
      this.styles['stroke'] = true;
      this.styles['weight'] = this.pixelValue(this.symbolJson.outline.width);
      this.styles['color'] = this.colorValue(this.symbolJson.outline.color);
      this.styles['opacity'] = this.alphaValue(this.symbolJson.outline.color);
    }else{
      this.styles['stroke'] = false;
    }
    //when should fill be set to false?
    this.styles['fillColor'] = this.colorValue(this.symbolJson.color);
    this.styles['fillOpacity'] = this.alphaValue(this.symbolJson.color);

    if(this.symbolJson.style == 'esriSMSCircle') {
      this.styles['radius'] = this.pixelValue(this.symbolJson.size) / 2;
    }
  }, 

  pointToLayer: function(geojson, latlng) {
    if (this.symbolJson.style === 'esriSMSCircle'){
      return  this.circleMarker(geojson, latlng);
    }
    if (this.symbolJson.type === 'esriPMS'){
      return  this.icon(latlng);
    }
  },

  icon: function(latlng) {
    var myIcon = L.icon({
      iconUrl: "http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/minop3x020_nt00020/FeatureServer/0/images/cd844779-9244-4a1b-be20-cf7849945e48",
      iconRetinaUrl: "http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/minop3x020_nt00020/FeatureServer/0/images/cd844779-9244-4a1b-be20-cf7849945e48",
      iconSize: [this.pixelValue(6),this.pixelValue(6)],
      iconAnchor: [17.5, 13.5],
      popupAnchor: [0, -11]
    });
    return L.marker(latlng, {icon: myIcon});
  },

  circleMarker: function (geojson, latlng) {
    return L.circleMarker(latlng, this.styles);
  }
});

L.esri.Renderers.LineSymbol = L.esri.Renderers.Symbol.extend({
  statics: {
    SIMPLELINETYPES:  ['esriSLSDash','esriSLSDot','esriSLSDashDotDot','esriSLSDashDot','esriSLSNull','esriSLSSolid']
  },
  initialize: function(symbolJson) {
    L.esri.Renderers.Symbol.prototype.initialize.call(this, symbolJson);
    this.fillStyles(); 
  },

  fillStyles: function(){

    this.styles['weight'] = this.pixelValue(this.symbolJson.width);
    this.styles['color'] = this.colorValue(this.symbolJson.color);
    this.styles['opacity'] = this.alphaValue(this.symbolJson.color);

    switch(this.symbolJson.style) {
      case 'esriSLSDash':
        this.styles['dashArray'] = '6,6';
        break;
      case 'esriSLSDot':
        this.styles['dashArray'] = '2,6';
        break;
      case 'esriSLSDashDot':
        this.styles['dashArray'] = '9,6,2,6';
        break;
      case 'esriSLSDashDotDot':
        this.styles['dashArray'] = '9,6,1,6,1,6';
        break;
    }
  }, 

  style: function(feature) {
    return this.styles;
  }
});

L.esri.Renderers.PolygonSymbol = L.esri.Renderers.Symbol.extend({
  statics: {
    SIMPLEPOLYGONTYPES:  ['esriSFSBackwardDiagonal','esriSFSCross','esriSFSDiagonalCross','esriSFSForwardDiagonal','esriSFSHorizontal','esriSFSNull','esriSFSSolid','esriSFSVertical']
  },
  initialize: function(symbolJson) {
    L.esri.Renderers.Symbol.prototype.initialize.call(this, symbolJson);
    this.lineSymbol = new L.esri.Renderers.LineSymbol(symbolJson.outline);
    if(L.esri.Renderers.PolygonSymbol.SIMPLEPOLYGONTYPES.indexOf(symbolJson.style) >= 0) {
      this.fillStyles(); 
    }
  },

  fillStyles: function(){
    this.styles['fillColor'] = this.colorValue(this.symbolJson.color);
    this.styles['fillOpacity'] = this.alphaValue(this.symbolJson.color);

    if(this.lineSymbol.styles['weight'] == 0){
      //when weight is 0, setting the stroke to false still looks bad (gaps
      //between the polygons)
      this.styles['stroke'] = false;
    } else {
      this.styles['weight'] = this.lineSymbol.styles['weight'];
      this.styles['color'] = this.lineSymbol.styles['color'];
      this.styles['opacity'] = this.lineSymbol.styles['opacity'];
    }

  }, 

  style: function(feature) {
    return this.styles;
  }
});

L.esri.Renderers.Renderer = L.Class.extend({

  initialize: function(metadata, layer) {
    this.layer = layer;
    this.metadata = metadata;
    this.rendererJson = metadata.drawingInfo.renderer;
  },

  styleLayer: function() {
    var symbol = this.newSymbol(this.rendererJson.symbol);
    if(this.metadata.geometryType == 'esriGeometryPoint'){
      this.layer.options.pointToLayer = L.Util.bind(symbol.pointToLayer, symbol);
    } else {
      this.layer.options.style = L.Util.bind(symbol.style, symbol);
    }
  },

  newSymbol: function(symbolJson) {
    if(this.metadata.geometryType == 'esriGeometryPoint'){
      return new L.esri.Renderers.PointSymbol(symbolJson);
    }
    if(this.metadata.geometryType == 'esriGeometryPolyline'){
      return new L.esri.Renderers.LineSymbol(symbolJson);
    }
    if(this.metadata.geometryType == 'esriGeometryPolygon'){
      return new L.esri.Renderers.PolygonSymbol(symbolJson);
    }
  }

});

L.esri.Renderers.UniqueValueRenderer = L.esri.Renderers.Renderer.extend({

  initialize: function(metadata, layer) {
    L.esri.Renderers.Renderer.prototype.initialize.call(this, metadata, layer);
    this.field = this.rendererJson.field1;
    this.symbols = [];
  },

  styleLayer: function() {
    this.createSymbols();
    if(this.metadata.geometryType == 'esriGeometryPoint'){
      this.layer.options.pointToLayer = L.Util.bind(this.pointToLayer, this);
    } else {
      this.layer.options.style = L.Util.bind(this.style, this);
    }
  },

  createSymbols: function() {
    var uniques = this.rendererJson.uniqueValueInfos;
    //create a symbol for each unique value
    var symbol;
    for (var i = uniques.length  - 1; i >= 0; i--) {
      symbol = this.newSymbol(uniques[i].symbol);
      symbol.val = uniques[i].value;
      this.symbols.push(symbol);
    }
  },

  getSymbol: function(val) {
    var symbol = this.symbols[0];
    for (var i = this.symbols.length  - 1; i >= 0; i--) {
      if(this.symbols[i].val == val){
        symbol = this.symbols[i]
      }
    }
    return symbol;
  },

  pointToLayer: function(geojson, latlng) {
    var sym = this.getSymbol(geojson.properties[this.field]);
    return sym.pointToLayer(geojson,latlng);
  },

  style: function(feature) {
    //find the symbol to represent this feature
    var sym = this.getSymbol(feature.properties[this.field]);
    return sym.style(feature);
  }
});
L.esri.Renderers.ClassBreaksRenderer = L.esri.Renderers.Renderer.extend({

  initialize: function(metadata, layer) {
    L.esri.Renderers.Renderer.prototype.initialize.call(this, metadata, layer);
    this.field = this.rendererJson.field;
    this.symbols = [];
  },

  styleLayer: function() {
    this.createSymbols();
    if(this.metadata.geometryType == 'esriGeometryPoint'){
      this.layer.options.pointToLayer = L.Util.bind(this.pointToLayer, this);
    } else {
      this.layer.options.style = L.Util.bind(this.style, this);
    }
  },

  createSymbols: function() {
    var classbreaks = this.rendererJson.classBreakInfos;
    //create a symbol for each class break 
    var symbol;
    for (var i = classbreaks.length  - 1; i >= 0; i--) {
      symbol = this.newSymbol(classbreaks[i].symbol);
      symbol.val = classbreaks[i].classMaxValue;
      this.symbols.push(symbol);
    }
    //sort the symbols in ascending value
    this.symbols.sort(function(a, b){
      return a.val > b.val ? 1 : -1;
    });
  },

  getSymbol: function(val) {
    var symbol = this.symbols[0];
    for (var i = this.symbols.length - 1; i >= 0; i--) {
      if(val > this.symbols[i].val){
        break;
      }
      symbol = this.symbols[i];
    }
    return symbol;
  },

  pointToLayer: function(geojson, latlng) {
    var sym = this.getSymbol(geojson.properties[this.field]);
    return sym.pointToLayer(geojson, latlng);
  },

  style: function(feature) {
    //find the symbol to represent this feature
    var sym = this.getSymbol(feature.properties[this.field]);
    return sym.style(feature);
  }
});

L.esri.FeatureLayer.addInitHook(function() {
  var oldOnAdd = L.Util.bind(this.onAdd, this);

  this._metadataLoaded = false;

  this.metadata(function(error, response) {
    console.log(response.drawingInfo.renderer);
    if(response.drawingInfo){
      var rend = this.getRenderer(response);
      rend.styleLayer(this);
    }
    this._metadataLoaded = true;
    if(this._addToMap){
      oldOnAdd(map);
    }
  }, this);

  this.onAdd = function(map){
    this._addToMap = true;
    if(this._metadataLoaded){
      oldOnAdd(map);
    }
  };

  this.getRenderer = function(geojson) {
    if(geojson.drawingInfo.renderer.type == 'classBreaks'){
      return new L.esri.Renderers.ClassBreaksRenderer(geojson, this);
    }
    if(geojson.drawingInfo.renderer.type == 'uniqueValue'){
      return new L.esri.Renderers.UniqueValueRenderer(geojson, this);
    }
    return new L.esri.Renderers.Renderer(geojson, this);
  }
});
