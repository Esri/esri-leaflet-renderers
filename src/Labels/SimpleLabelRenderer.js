import LabelRenderer from './LabelRenderer';

export var SimpleLabelRenderer = LabelRenderer.extend({
  initialize: function (rendererJson, options) {
    LabelRenderer.prototype.initialize.call(this, rendererJson, options);
  },

  _getLabelHtml: function (geojson, latlng) {
    var _inlineLabelStyling = '';
    if (this._labelSymbolVariables.color) {
      _inlineLabelStyling = 'color: ' + this.textColorValue(this._labelSymbolVariables.color) + ';';
    }
    if (this._labelSymbolVariables.font) {
      _inlineLabelStyling += 'font-family: ' + this._labelSymbolVariables.font.family + ';';
      _inlineLabelStyling += 'font-size: ' + this._labelSymbolVariables.font.size + 'px;';
      _inlineLabelStyling += 'font-style: ' + this._labelSymbolVariables.font.style + ';';
      _inlineLabelStyling += 'font-weight: ' + this._labelSymbolVariables.font.weight + ';';
      _inlineLabelStyling += 'text-decoration: ' + this._labelSymbolVariables.font.decoration + ';';
    }

    _inlineLabelStyling += this._getLabelPositionStyle(geojson, latlng);

    var _labelValue = this.getLabelExpressionValue(geojson, latlng);
    return '<label style="' + _inlineLabelStyling + '">' + _labelValue + '</label>';
  }

});

export function simpleLabelRenderer (rendererJson, options) {
  return new SimpleLabelRenderer(rendererJson, options);
}

export default simpleLabelRenderer;
