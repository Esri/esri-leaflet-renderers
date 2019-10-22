import L from 'leaflet';

// values taken from https://wiki.openstreetmap.org/wiki/Zoom_levels

export var ScalingToZoom = L.Class.extend({

  // the geojson values returned are in points
  scaleToZoom: function (scaleValue) {
    if (scaleValue >= 500000000) {
      return 0;
    }
    if (scaleValue >= 250000000) {
      return 1;
    }
    if (scaleValue >= 150000000) {
      return 2;
    }
    if (scaleValue >= 70000000) {
      return 3;
    }
    if (scaleValue >= 35000000) {
      return 4;
    }
    if (scaleValue >= 15000000) {
      return 5;
    }
    if (scaleValue >= 10000000) {
      return 6;
    }
    if (scaleValue >= 4000000) {
      return 7;
    }
    if (scaleValue >= 2000000) {
      return 8;
    }
    if (scaleValue >= 1000000) {
      return 9;
    }
    if (scaleValue >= 500000) {
      return 10;
    }
    if (scaleValue >= 250000) {
      return 11;
    }
    if (scaleValue >= 150000) {
      return 12;
    }
    if (scaleValue >= 70000) {
      return 13;
    }
    if (scaleValue >= 35000) {
      return 14;
    }
    if (scaleValue >= 15000) {
      return 15;
    }
    if (scaleValue >= 8000) {
      return 16;
    }
    if (scaleValue >= 4000) {
      return 17;
    }
    if (scaleValue >= 2000) {
      return 18;
    }
    if (scaleValue >= 1000) {
      return 19;
    }
    return 20;
  }

});

export function scalingToZoom () {
  return new ScalingToZoom();
}

export default scalingToZoom;
