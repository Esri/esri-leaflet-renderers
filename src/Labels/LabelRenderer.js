import L from 'leaflet';

export var LabelRenderer = L.Class.extend({
  options: {
    clickable: true
  },

  initialize: function (rendererJson, options) {
    this._labelSymbolVariables = rendererJson.symbol;

    // in the symbol property are the color, font (family, size, style, ... ) and so on .
    // we start with the font properties and the color.
    this._labelExpression = rendererJson.labelExpression;
    this._labelPlacement = rendererJson.labelPlacement;

    this._layerTransparency = 1;
    if (options && options.layerTransparency) {
      this._layerTransparency = 1 - (options.layerTransparency / 100.0);
    }

    L.Util.setOptions(this, options);
  },

  // color is an array [r,g,b,a]
  textColorValue: function (color) {
    return 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + this.alphaValue(color) + ')';
  },

  alphaValue: function (color) {
    return Math.round(color[3] * this._layerTransparency);
  },

  _getLabelHtml: function (geojson, latlng) {
    // override
  },

  _getLabelPositionStyle: function (geojson, latlng) {
    if (this._labelPlacement === 'esriServerPointLabelPlacementAboveRight') {
      return 'position: relative; top: -10px; left: 10px';
    }
    return '';
  },
  getLabelExpressionValue: function (geojson, latlng) {
    if (this._labelExpression) {
      var expressionAttributes = this._labelExpression.match(/\[(.*?)\]/g);
      // In arcgis: labels can use values from the geojson object.
      // Therefor the field is surrounded by square brackets.
      // To start, only this values are taken and filled with the other content from the expression.
      // (@see: http://desktop.arcgis.com/en/arcmap/10.3/map/working-with-text/about-building-label-expressions.htm)
      var labelExpressionValue = '';
      var currentCharacterIndex = 0;
      for (var i = 0; i < expressionAttributes.length; i++) {
        var anExpressionAttribute = expressionAttributes[i];
        var indexOfExpressionAttribute = this._labelExpression.indexOf(anExpressionAttribute, currentCharacterIndex);
        if (indexOfExpressionAttribute !== currentCharacterIndex) {
          labelExpressionValue += this._labelExpression.substr(currentCharacterIndex, indexOfExpressionAttribute);
        }
        currentCharacterIndex = indexOfExpressionAttribute + anExpressionAttribute.length;

        var geoJsonPropertyValue = geojson.properties[anExpressionAttribute.substr(1, anExpressionAttribute.length - 2)];
        if (geoJsonPropertyValue !== undefined && geoJsonPropertyValue !== null) {
          labelExpressionValue += geoJsonPropertyValue;
        } else {
          labelExpressionValue += '';
        }
      }

      if (currentCharacterIndex !== this._labelExpression.length - 1) {
        labelExpressionValue += this._labelExpression.substr(currentCharacterIndex);
      }
      return labelExpressionValue;
    }

    return '';
  },

  _getDivIcon: function (geojson, latlng) {
    return L.divIcon({html: this._getLabelHtml(geojson, latlng), className: 'leaflet-div-icon-for-label-renderer'});
  },

  attachStylesToLayer: function (layer) {
    layer.options.pointToLayer = L.Util.bind(this.pointToLayer, this);
  },

  pointToLayer: function (geojson, latlng) {
    var _myIcon = this._getDivIcon(geojson, latlng);
    return L.marker(latlng, {icon: _myIcon});
  }

});

export default LabelRenderer;
