//TODO Canvas rendering
/* jshint ignore:start */
L.Canvas.include({
  _updateXMarker: function(layer){
    var latlng = layer._point,
        offset = layer._size / 2.0;
  }
});
/* jshint ignore:end */

L.SVG.include({
  _updateXMarker: function(layer){
    var latlng = layer._point,
        offset = layer._size / 2.0;

    if(L.Browser.vml){
      latlng._round();
      offset = Math.round(offset);
    }

    var str = 'M' + (latlng.x + offset) + ',' + (latlng.y + offset) +
      'L' + (latlng.x - offset) + ',' + (latlng.y - offset) +
      'M' + (latlng.x - offset) + ',' + (latlng.y + offset) +
      'L' + (latlng.x + offset) + ',' + (latlng.y - offset);

    this._setPath(layer, str);
  }
});

L.XMarker = L.Path.extend({
  initialize: function(latlng, size, options){
    L.setOptions(this, options);
    this._size = size;
    this._latlng = latlng;
  },

  _project: function(){
    this._point = this._map.latLngToLayerPoint(this._latlng);
  },

  _update: function(){
    if(this._map){
      this._updatePath();
    }
  },

  _updatePath: function(){
    this._renderer._updateXMarker(this);
  },

  setLatLng: function(latlng){
    this._latlng = L.latLng(latlng);
    this.redraw();
    return this.fire('move', {latlng: this._latlng});
  },

  getLatLng: function(){
    return this._latlng;
  },

  setSize: function(size){
    this._size = size;
    return this.redraw();
  },

  getSize: function(){
    return this._size;
  }
});

L.xMarker = function(latlng, size, options){
  return new L.XMarker(latlng, size, options);
};
