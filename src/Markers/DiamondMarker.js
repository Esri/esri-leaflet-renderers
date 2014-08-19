L.esri.Renderers.DiamondMarker = L.Path.extend({
  options: {
    fill: true
  },

  initialize: function(center, size, options){
    L.Path.prototype.initialize.call(this, options);
    this._size = size;
    this._center = center;
  },

  projectLatlngs: function(){
    this._point = this._map.latLngToLayerPoint(this._center);
  },

  getPathString: function(){
    if (!this._map){
      return '';
    }

    var center = this._point,
        offset = this._size / 2.0;

    if(L.Path.VML){
      center._round();
      offset = Math.round(offset);
    }

    var str = 'M' + center.x + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + center.y +
      'L' + center.x + ',' + (center.y - offset) +
      'L' + (center.x + offset) + ',' + center.y;

    return str + (L.Browser.svg ? 'z' : 'x');
  },

  setLatLng: function(latlng){
    this._center = L.latLng(latlng);
    return this.redraw();
  },

  getLatLng: function(){
    return this._center;
  },

  getSize: function(){
    return this._size;
  },

  setSize: function(size){
    this._size = size;
    return this.redraw();
  }
});

L.esri.Renderers.diamondMarker = function(center, size, options){
  return new L.esri.Renderers.DiamondMarker(center, size, options);
};
