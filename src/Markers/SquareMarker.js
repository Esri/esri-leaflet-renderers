EsriLeafletRenderers.SquareMarker = L.Path.extend({
  options: {
    fill: true
  },

  initialize: function (center, size, options) {
    L.Path.prototype.initialize.call(this, options);
    this._size = size;
    this._center = center;
  },

  projectLatlngs: function () {
    this._point = this._map.latLngToLayerPoint(this._center);
  },

  getPathString: function () {
    if (!this._map) {
      return '';
    }

    var center = this._point;
    var offset = this._size / 2.0;

    if (L.Path.VML) {
      center._round();
      offset = Math.round(offset);
    }

    var str = 'M' + (center.x + offset) + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + (center.y - offset) +
      'L' + (center.x + offset) + ',' + (center.y - offset);

    return str + (L.Browser.svg ? 'z' : 'x');
  },

  setLatLng: function (latlng) {
    this._center = latlng;
    return this.redraw();
  },

  getLatLng: function () {
    return L.latLng(this._center);
  },

  getSize: function () {
    return this._size;
  },

  setSize: function (size) {
    this._size = size;
    return this.redraw();
  }
});

EsriLeafletRenderers.squareMarker = function (center, size, options) {
  return new EsriLeafletRenderers.SquareMarker(center, size, options);
};
