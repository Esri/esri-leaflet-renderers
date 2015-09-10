import Renderer from './Renderer';

export var ClassBreaksRenderer = Renderer.extend({
  initialize: function (rendererJson, options) {
    Renderer.prototype.initialize.call(this, rendererJson, options);
    this._field = this._rendererJson.field;
    if (this._rendererJson.normalizationType && this._rendererJson.normalizationType === 'esriNormalizeByField') {
      this._normalizationField = this._rendererJson.normalizationField;
    }
    this._createSymbols();
  },

  _createSymbols: function () {
    var symbol;
    var classbreaks = this._rendererJson.classBreakInfos;

    this._symbols = [];

    // create a symbol for each class break
    for (var i = classbreaks.length - 1; i >= 0; i--) {
      if (this.options.proportionalPolygon && this._rendererJson.backgroundFillSymbol) {
        symbol = this._newSymbol(this._rendererJson.backgroundFillSymbol);
      } else {
        symbol = this._newSymbol(classbreaks[i].symbol);
      }
      symbol.val = classbreaks[i].classMaxValue;
      this._symbols.push(symbol);
    }
    // sort the symbols in ascending value
    this._symbols.sort(function (a, b) {
      return a.val > b.val ? 1 : -1;
    });
    this._createDefaultSymbol();
    this._maxValue = this._symbols[this._symbols.length - 1].val;
  },

  _getSymbol: function (feature) {
    var val = feature.properties[this._field];
    if (this._normalizationField) {
      var normValue = feature.properties[this._normalizationField];
      if (!isNaN(normValue) && normValue !== 0) {
        val = val / normValue;
      } else {
        return this._defaultSymbol;
      }
    }

    if (val > this._maxValue) {
      return this._defaultSymbol;
    }
    var symbol = this._symbols[0];
    for (var i = this._symbols.length - 1; i >= 0; i--) {
      if (val > this._symbols[i].val) {
        break;
      }
      symbol = this._symbols[i];
    }
    return symbol;
  }
});

export function classBreaksRenderer (rendererJson, options) {
  return new ClassBreaksRenderer(rendererJson, options);
}

export default classBreaksRenderer;
