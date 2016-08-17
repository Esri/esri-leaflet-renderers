import Symbol from './Symbol';
import lineSymbol from './LineSymbol';

export var PolygonSymbol = Symbol.extend({
  statics: {
    // not implemented: 'esriSFSBackwardDiagonal','esriSFSCross','esriSFSDiagonalCross','esriSFSForwardDiagonal','esriSFSHorizontal','esriSFSNull','esriSFSVertical'
    POLYGONTYPES: ['esriSFSSolid']
  },
  initialize: function (symbolJson, options) {
    Symbol.prototype.initialize.call(this, symbolJson, options);
    if (symbolJson) {
      if (symbolJson.outline && symbolJson.outline.style === 'esriSLSNull') {
        this._lineStyles = { weight: 0 };
      } else {
        this._lineStyles = lineSymbol(symbolJson.outline, options).style();
      }
      this._fillStyles();
    }
  },

  _fillStyles: function () {
    if (this._lineStyles) {
      if (this._lineStyles.weight === 0) {
        // when weight is 0, setting the stroke to false can still look bad
        // (gaps between the polygons)
        this._styles.stroke = false;
      } else {
        // copy the line symbol styles into this symbol's styles
        for (var styleAttr in this._lineStyles) {
          this._styles[styleAttr] = this._lineStyles[styleAttr];
        }
      }
    }

    // set the fill for the polygon
    if (this._symbolJson) {
      if (this._symbolJson.color &&
          // don't fill polygon if type is not supported
          PolygonSymbol.POLYGONTYPES.indexOf(this._symbolJson.style >= 0)) {
        this._styles.fill = true;
        this._styles.fillColor = this.colorValue(this._symbolJson.color);
        this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
      } else {
        this._styles.fill = false;
        this._styles.fillOpacity = 0;
      }
    }
  },

  style: function (feature, visualVariables) {
    if (!this._isDefault && visualVariables && visualVariables.colorInfo) {
      var color = this.getColor(feature, visualVariables.colorInfo);
      if (color) {
        this._styles.fillColor = this.colorValue(color);
        this._styles.fillOpacity = this.alphaValue(color);
      }
    }
    return this._styles;
  }
});

export function polygonSymbol (symbolJson, options) {
  return new PolygonSymbol(symbolJson, options);
}

export default polygonSymbol;
