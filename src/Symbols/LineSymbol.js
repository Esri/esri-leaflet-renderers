import Symbol from './Symbol';

export var LineSymbol = Symbol.extend({
  statics: {
    // Not implemented 'esriSLSNull'
    LINETYPES: ['esriSLSDash', 'esriSLSDot', 'esriSLSDashDotDot', 'esriSLSDashDot', 'esriSLSSolid']
  },
  initialize: function (symbolJson, options) {
    Symbol.prototype.initialize.call(this, symbolJson, options);
    this._fillStyles();
  },

  _fillStyles: function () {
    // set the defaults that show up on arcgis online
    this._styles.lineCap = 'butt';
    this._styles.lineJoin = 'miter';
    this._styles.fill = false;
    this._styles.weight = 0;

    if (!this._symbolJson) {
      return this._styles;
    }

    if (this._symbolJson.color) {
      this._styles.color = this.colorValue(this._symbolJson.color);
      this._styles.opacity = this.alphaValue(this._symbolJson.color);
    }

    if (!isNaN(this._symbolJson.width)) {
      this._styles.weight = this.pixelValue(this._symbolJson.width);

      var dashValues = [];

      switch (this._symbolJson.style) {
        case 'esriSLSDash':
          dashValues = [4, 3];
          break;
        case 'esriSLSDot':
          dashValues = [1, 3];
          break;
        case 'esriSLSDashDot':
          dashValues = [8, 3, 1, 3];
          break;
        case 'esriSLSDashDotDot':
          dashValues = [8, 3, 1, 3, 1, 3];
          break;
      }

      // use the dash values and the line weight to set dash array
      if (dashValues.length > 0) {
        for (var i = 0; i < dashValues.length; i++) {
          dashValues[i] *= this._styles.weight;
        }

        this._styles.dashArray = dashValues.join(',');
      }
    }
  },

  style: function (feature, visualVariables) {
    if (!this._isDefault && visualVariables) {
      if (visualVariables.sizeInfo) {
        var calculatedSize = this.pixelValue(this.getSize(feature, visualVariables.sizeInfo));
        if (calculatedSize) {
          this._styles.weight = calculatedSize;
        }
      }
      if (visualVariables.colorInfo) {
        var color = this.getColor(feature, visualVariables.colorInfo);
        if (color) {
          this._styles.color = this.colorValue(color);
          this._styles.opacity = this.alphaValue(color);
        }
      }
    }
    return this._styles;
  }
});

export function lineSymbol (symbolJson, options) {
  return new LineSymbol(symbolJson, options);
}

export default lineSymbol;
