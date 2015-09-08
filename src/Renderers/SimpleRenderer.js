import Renderer from './Renderer';

export var SimpleRenderer = Renderer.extend({
  initialize: function (rendererJson, options) {
    Renderer.prototype.initialize.call(this, rendererJson, options);
    this._createSymbol();
  },

  _createSymbol: function () {
    if (this._rendererJson.symbol) {
      this._symbols.push(this._newSymbol(this._rendererJson.symbol));
    }
  },

  _getSymbol: function () {
    return this._symbols[0];
  }
});

export function simpleRenderer (rendererJson, options) {
  return new SimpleRenderer(rendererJson, options);
}

export default simpleRenderer;
