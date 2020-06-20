import { Class } from 'leaflet';

export var Symbol = Class.extend({
  initialize: function (symbolJson, options) {
    this._symbolJson = symbolJson;
    this.val = null;
    this._styles = {};
    this._isDefault = false;
    this._layerTransparency = 1;
    if (options && options.layerTransparency) {
      this._layerTransparency = 1 - (options.layerTransparency / 100.0);
    }
  },

  // the geojson values returned are in points
  pixelValue: function (pointValue) {
    return pointValue * 1.333;
  },

  // color is an array [r,g,b,a]
  colorValue: function (color) {
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  },

  alphaValue: function (color) {
    var alpha = color[3] / 255.0;
    return alpha * this._layerTransparency;
  },

  getSize: function (feature, sizeInfo) {
    var attr = feature.properties;
    var field = sizeInfo.field;
    var size = 0;
    var featureValue = null;

    if (field) {
      featureValue = attr[field];
      var minSize = sizeInfo.minSize;
      var maxSize = sizeInfo.maxSize;
      var minDataValue = sizeInfo.minDataValue;
      var maxDataValue = sizeInfo.maxDataValue;
      var featureRatio;
      var normField = sizeInfo.normalizationField;
      var normValue = attr ? parseFloat(attr[normField]) : undefined;

      if (featureValue === null || (normField && ((isNaN(normValue) || normValue === 0)))) {
        return null;
      }

      if (!isNaN(normValue)) {
        featureValue /= normValue;
      }

      if (minSize !== null && maxSize !== null && minDataValue !== null && maxDataValue !== null) {
        if (featureValue <= minDataValue) {
          size = minSize;
        } else if (featureValue >= maxDataValue) {
          size = maxSize;
        } else {
          featureRatio = (featureValue - minDataValue) / (maxDataValue - minDataValue);
          size = minSize + (featureRatio * (maxSize - minSize));
        }
      }
      size = isNaN(size) ? 0 : size;
    }
    return size;
  },

  getColor: function (feature, colorInfo) {
    // required information to get color
    if (!(feature.properties && colorInfo && colorInfo.field && colorInfo.stops)) {
      return null;
    }

    var attr = feature.properties;
    var featureValue = attr[colorInfo.field];
    var lowerBoundColor, upperBoundColor, lowerBound, upperBound;
    var normField = colorInfo.normalizationField;
    var normValue = attr ? parseFloat(attr[normField]) : undefined;
    if (featureValue === null || (normField && ((isNaN(normValue) || normValue === 0)))) {
      return null;
    }

    if (!isNaN(normValue)) {
      featureValue /= normValue;
    }

    if (featureValue <= colorInfo.stops[0].value) {
      return colorInfo.stops[0].color;
    }
    var lastStop = colorInfo.stops[colorInfo.stops.length - 1];
    if (featureValue >= lastStop.value) {
      return lastStop.color;
    }

    // go through the stops to find min and max
    for (var i = 0; i < colorInfo.stops.length; i++) {
      var stopInfo = colorInfo.stops[i];

      if (stopInfo.value <= featureValue) {
        lowerBoundColor = stopInfo.color;
        lowerBound = stopInfo.value;
      } else if (stopInfo.value > featureValue) {
        upperBoundColor = stopInfo.color;
        upperBound = stopInfo.value;
        break;
      }
    }

    // feature falls between two stops, interplate the colors
    if (!isNaN(lowerBound) && !isNaN(upperBound)) {
      var range = upperBound - lowerBound;
      if (range > 0) {
        // more weight the further it is from the lower bound
        var upperBoundColorWeight = (featureValue - lowerBound) / range;
        if (upperBoundColorWeight) {
          // more weight the further it is from the upper bound
          var lowerBoundColorWeight = (upperBound - featureValue) / range;
          if (lowerBoundColorWeight) {
            // interpolate the lower and upper bound color by applying the
            // weights to each of the rgba colors and adding them together
            var interpolatedColor = [];
            for (var j = 0; j < 4; j++) {
              interpolatedColor[j] = Math.round((lowerBoundColor[j] * lowerBoundColorWeight) + (upperBoundColor[j] * upperBoundColorWeight));
            }
            return interpolatedColor;
          } else {
            // no difference between featureValue and upperBound, 100% of upperBoundColor
            return upperBoundColor;
          }
        } else {
          // no difference between featureValue and lowerBound, 100% of lowerBoundColor
          return lowerBoundColor;
        }
      }
    }
    // if we get to here, none of the cases apply so return null
    return null;
  }
});

// export function symbol (symbolJson) {
//   return new Symbol(symbolJson);
// }

export default Symbol;
