L.Canvas.include({
  _updateCrossMarker: function(layer){
    var latlng = layer._point,
        offset = layer._size / 2.0,
        ctx = this._ctx;

    ctx.beginPath();
    ctx.moveTo(latlng.x, latlng.y + offset);
    ctx.lineTo(latlng.x, latlng.y - offset);
    this._fillStroke(ctx, layer);

    ctx.moveTo(latlng.x - offset, latlng.y);
    ctx.lineTo(latlng.x + offset, latlng.y);
    this._fillStroke(ctx, layer);
  }
});

L.SVG.include({
  _updateCrossMarker: function(layer){
    var latlng = layer._point,
        offset = layer._size / 2.0;

    if(L.Browser.vml){
      latlng._round();
      offset = Math.round(offset);
    }

    var str =  'M' + latlng.x + ',' + (latlng.y + offset) +
      'L' + latlng.x + ',' + (latlng.y - offset) +
      'M' + (latlng.x - offset) + ',' + latlng.y +
      'L' + (latlng.x + offset) + ',' + latlng.y;

    this._setPath(layer, str);
  }
});

L.CrossMarker = L.Path.extend({

  initialize: function (latlng, size, options){
    L.setOptions(this, options);
    this._size = size;
    this._latlng = latlng;
  },

  _project: function () {
    this._point = this._map.latLngToLayerPoint(this._latlng);
  },

  _update: function(){
    if(this._map){
      this._updatePath();
    }
  },

  _updatePath: function(){
    this._renderer._updateCrossMarker(this);
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

L.crossMarker = function(latlng, size, options){
  return new L.CrossMarker(latlng, size, options);
};
