import {
  marker,
  icon as leafletIcon,
  extend,
  circleMarker
} from 'leaflet';
import Symbol from './Symbol';
import { squareMarker, xMarker, crossMarker, diamondMarker } from 'leaflet-shape-markers';

export var PointSymbol = Symbol.extend({

  statics: {
    MARKERTYPES: ['esriSMSCircle', 'esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSX', 'esriPMS']
  },

  initialize: function (symbolJson, options) {
    var url;
    Symbol.prototype.initialize.call(this, symbolJson, options);
    if (options) {
      this.serviceUrl = options.url;
    }
    if (symbolJson) {
      if (symbolJson.type === 'esriPMS') {
        var imageUrl = this._symbolJson.url;
        if ((imageUrl && imageUrl.substr(0, 7) === 'http://') || (imageUrl.substr(0, 8) === 'https://')) {
          // web image
          url = this.sanitize(imageUrl);
          this._iconUrl = url;
        } else {
          url = this.serviceUrl + 'images/' + imageUrl;
          this._iconUrl = options && options.token ? url + '?token=' + options.token : url;
        }
        if (symbolJson.imageData) {
          this._iconUrl = 'data:' + symbolJson.contentType + ';base64,' + symbolJson.imageData;
        }
        // leaflet does not allow resizing icons so keep a hash of different
        // icon sizes to try and keep down on the number of icons created
        this._icons = {};
        // create base icon
        this.icon = this._createIcon(this._symbolJson);
      } else {
        this._fillStyles();
      }
    }
  },

  // prevent html injection in strings
  sanitize: function (str) {
    if (!str) {
      return '';
    }
    var text;
    try {
      // removes html but leaves url link text
      text = str.replace(/<br>/gi, '\n');
      text = text.replace(/<p.*>/gi, '\n');
      text = text.replace(/<a.*href='(.*?)'.*>(.*?)<\/a>/gi, ' $2 ($1) ');
      text = text.replace(/<(?:.|\s)*?>/g, '');
    } catch (ex) {
      text = null;
    }
    return text;
  },

  _fillStyles: function () {
    if (this._symbolJson.outline && this._symbolJson.size > 0 && this._symbolJson.outline.style !== 'esriSLSNull') {
      this._styles.stroke = true;
      this._styles.weight = this.pixelValue(this._symbolJson.outline.width);
      this._styles.color = this.colorValue(this._symbolJson.outline.color);
      this._styles.opacity = this.alphaValue(this._symbolJson.outline.color);
    } else {
      this._styles.stroke = false;
    }
    if (this._symbolJson.color) {
      this._styles.fillColor = this.colorValue(this._symbolJson.color);
      this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
    } else {
      this._styles.fillOpacity = 0;
    }

    if (this._symbolJson.style === 'esriSMSCircle') {
      this._styles.radius = this.pixelValue(this._symbolJson.size) / 2.0;
    }
  },

  _createIcon: function (options) {
    var width = this.pixelValue(options.width);
    var height = width;
    if (options.height) {
      height = this.pixelValue(options.height);
    }
    var xOffset = width / 2.0;
    var yOffset = height / 2.0;

    if (options.xoffset) {
      xOffset += this.pixelValue(options.xoffset);
    }
    if (options.yoffset) {
      yOffset += this.pixelValue(options.yoffset);
    }

    var icon = leafletIcon({
      iconUrl: this._iconUrl,
      iconSize: [width, height],
      iconAnchor: [xOffset, yOffset]
    });
    this._icons[options.width.toString()] = icon;
    return icon;
  },

  _getIcon: function (size) {
    // check to see if it is already created by size
    var icon = this._icons[size.toString()];
    if (!icon) {
      icon = this._createIcon({ width: size });
    }
    return icon;
  },

  pointToLayer: function (geojson, latlng, visualVariables, options) {
    var size = this._symbolJson.size || this._symbolJson.width;
    if (!this._isDefault) {
      if (visualVariables.sizeInfo) {
        var calculatedSize = this.getSize(geojson, visualVariables.sizeInfo);
        if (calculatedSize) {
          size = calculatedSize;
        }
      }
      if (visualVariables.colorInfo) {
        var color = this.getColor(geojson, visualVariables.colorInfo);
        if (color) {
          this._styles.fillColor = this.colorValue(color);
          this._styles.fillOpacity = this.alphaValue(color);
        }
      }
    }

    if (this._symbolJson.type === 'esriPMS') {
      var layerOptions = extend({}, { icon: this._getIcon(size) }, options);
      return marker(latlng, layerOptions);
    }
    size = this.pixelValue(size);

    switch (this._symbolJson.style) {
      case 'esriSMSSquare':
        return squareMarker(latlng, size, extend({}, this._styles, options));
      case 'esriSMSDiamond':
        return diamondMarker(latlng, size, extend({}, this._styles, options));
      case 'esriSMSCross':
        return crossMarker(latlng, size, extend({}, this._styles, options));
      case 'esriSMSX':
        return xMarker(latlng, size, extend({}, this._styles, options));
    }
    this._styles.radius = size / 2.0;
    return circleMarker(latlng, extend({}, this._styles, options));
  }
});

export function pointSymbol (symbolJson, options) {
  return new PointSymbol(symbolJson, options);
}

export default pointSymbol;
