import L from 'leaflet';

export var Symbol = L.Class.extend({
  initialize: function (symbolJson) {
    this._symbolJson = symbolJson;
    this.val = null;
    this._styles = {};
  },

  // the geojson values returned are in points
  pixelValue: function (pointValue) {
    return pointValue * 1.3333333333333;
  },

  // color is an array [r,g,b,a]
  colorValue: function (color) {
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  },

  alphaValue: function (color) {
    return color[3] / 255.0;
  }
});

// export function symbol (symbolJson) {
//   return new Symbol(symbolJson);
// }

export default Symbol;
