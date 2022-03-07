import Renderer from './Renderer';

export var UniqueValueRenderer = Renderer.extend({
  initialize: function (rendererJson, options) {
    Renderer.prototype.initialize.call(this, rendererJson, options);
    this._field = this._rendererJson.field1;
    this._createSymbols();
  },

  _createSymbols: function () {
    var symbol;
    var uniques = this._rendererJson.uniqueValueInfos;

    // create a symbol for each unique value
    for (var i = uniques.length - 1; i >= 0; i--) {
      symbol = this._newSymbol(uniques[i].symbol);
      symbol.val = uniques[i].value;
      this._symbols.push(symbol);
    }
    this._createDefaultSymbol();
  },

  _getSymbol: function (feature) {
    var val = feature.properties[this._field];
    // accumulate values if there is more than one field defined
    if (this._rendererJson.fieldDelimiter && this._rendererJson.field2) {
      var val2 = feature.properties[this._rendererJson.field2];
      if (val2) {
        val += this._rendererJson.fieldDelimiter + val2;
        var val3 = feature.properties[this._rendererJson.field3];
        if (val3) {
          val += this._rendererJson.fieldDelimiter + val3;
        }
      }
    }

    var symbol = this._defaultSymbol;
    for (var i = this._symbols.length - 1; i >= 0; i--) {
      // using the === operator does not work if the field
      // of the unique renderer is not a string
      /*eslint-disable */
      if (this._symbols[i].val == val) {
        symbol = this._symbols[i];
      }
      /* eslint-enable */
    }
    return symbol;
  }
});

export function uniqueValueRenderer (rendererJson, options) {
  return new UniqueValueRenderer(rendererJson, options);
}

export default uniqueValueRenderer;
