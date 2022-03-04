import { Class, Util, circleMarker } from 'leaflet';

import pointSymbol from '../Symbols/PointSymbol';
import lineSymbol from '../Symbols/LineSymbol';
import polygonSymbol from '../Symbols/PolygonSymbol';

export var Renderer = Class.extend({
  options: {
    proportionalPolygon: false,
    clickable: true
  },

  initialize: function (rendererJson, options) {
    this._rendererJson = rendererJson;
    this._pointSymbols = false;
    this._symbols = [];
    this._visualVariables = this._parseVisualVariables(rendererJson.visualVariables);
    Util.setOptions(this, options);
  },

  _parseVisualVariables: function (visualVariables) {
    var visVars = {};
    if (visualVariables) {
      for (var i = 0; i < visualVariables.length; i++) {
        visVars[visualVariables[i].type] = visualVariables[i];
      }
    }
    return visVars;
  },

  _createDefaultSymbol: function () {
    if (this._rendererJson.defaultSymbol) {
      this._defaultSymbol = this._newSymbol(this._rendererJson.defaultSymbol);
      this._defaultSymbol._isDefault = true;
    }
  },

  _newSymbol: function (symbolJson) {
    if (symbolJson.type === 'esriSMS' || symbolJson.type === 'esriPMS') {
      this._pointSymbols = true;
      return pointSymbol(symbolJson, this.options);
    }
    if (symbolJson.type === 'esriSLS') {
      return lineSymbol(symbolJson, this.options);
    }
    if (symbolJson.type === 'esriSFS') {
      return polygonSymbol(symbolJson, this.options);
    }
  },

  _getSymbol: function () {
    // override
  },

  attachStylesToLayer: function (layer) {
    if (this._pointSymbols) {
      layer.options.pointToLayer = Util.bind(this.pointToLayer, this);
    } else {
      layer.options.style = Util.bind(this.style, this);
      layer._originalStyle = layer.options.style;
    }
  },

  pointToLayer: function (geojson, latlng) {
    var sym = this._getSymbol(geojson);
    if (sym && sym.pointToLayer) {
      // right now custom panes are the only option pushed through
      return sym.pointToLayer(geojson, latlng, this._visualVariables, this.options);
    }
    // invisible symbology
    return circleMarker(latlng, { radius: 0, opacity: 0 });
  },

  style: function (feature) {
    var userStyles;
    if (this.options.userDefinedStyle) {
      userStyles = this.options.userDefinedStyle(feature);
    }
    // find the symbol to represent this feature
    var sym = this._getSymbol(feature);
    if (sym) {
      return this.mergeStyles(sym.style(feature, this._visualVariables), userStyles);
    } else {
      // invisible symbology
      return this.mergeStyles({ opacity: 0, fillOpacity: 0 }, userStyles);
    }
  },

  mergeStyles: function (styles, userStyles) {
    var mergedStyles = {};
    var attr;
    // copy renderer style attributes
    for (attr in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, attr)) {
        mergedStyles[attr] = styles[attr];
      }
    }
    // override with user defined style attributes
    if (userStyles) {
      for (attr in userStyles) {
        if (Object.prototype.hasOwnProperty.call(userStyles, attr)) {
          mergedStyles[attr] = userStyles[attr];
        }
      }
    }
    return mergedStyles;
  }
});

export default Renderer;
