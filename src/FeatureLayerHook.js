import L from 'leaflet';
import Esri from 'esri-leaflet';
import classBreaksRenderer from './Renderers/ClassBreaksRenderer';
import uniqueValueRenderer from './Renderers/UniqueValueRenderer';
import simpleRenderer from './Renderers/SimpleRenderer';
import simpleLabelRenderer from './Labels/SimpleLabelRenderer';
import scalingToZoom from './Scaling/ScalingToZoom';

function wireUpRenderers () {
  if (this.options.ignoreRenderer) {
    return;
  }

  this.on('createfeature', function (e) {
    if (this._hasLabelRenderer) {
      var feature = e.feature;

      var labelLayer = L.GeoJSON.geometryToLayer(feature, this._labelLayer.options);

      if (!labelLayer) {
        console.warn('invalid GeoJSON encountered');
      } else {
        labelLayer.feature = feature;

        var featureId = feature.id.toString();
        // only add the feature if it does not already exist on the map
        if (!this._labelLayerIds[featureId]) {
          this._labelLayerIds[featureId] = labelLayer;
        }
        labelLayer.addEventParent(this);
        this._labelLayer.bringToFront();

        if (this._labelsShouldBeVisible()) {
          this._map.addLayer(labelLayer);
        }
      }
    }
  });

  this.on('removefeature', function (e) {
    if (this._hasLabelRenderer) {
      var layer = this._labelLayerIds[e.feature.id];
      if (layer) {
        this._map.removeLayer(layer);
      }
      if (layer && e.permanent) {
        delete this._labelLayerIds[e.feature.id];
      }
    }
  });

  this.on('addfeature ', function (e) {
    if (this._hasLabelRenderer) {
      var layer = this._labelLayerIds[e.feature.id];
      if (layer) {
        if (this._labelsShouldBeVisible()) {
          this._map.addLayer(layer);
        }
      }
    }
  });

  this._labelsShouldBeVisible = function () {
    var currentZoom = this._map.getZoom();
    if (this._labelLayerMaxZoom) {
      if (this._labelLayerMinZoom) {
        if (currentZoom >= this._labelLayerMinZoom && currentZoom <= this._labelLayerMaxZoom) {
          return true;
        }
        return false;
      }

      return currentZoom <= this._labelLayerMaxZoom;
    }

    if (this._labelLayerMinZoom) {
      return currentZoom >= this._labelLayerMinZoom;
    }
    return true;
  };

  var oldOnAdd = L.Util.bind(this.onAdd, this);
  var oldUnbindPopup = L.Util.bind(this.unbindPopup, this);
  var oldOnRemove = L.Util.bind(this.onRemove, this);

  this.onAdd = function (map) {
    this.metadata(function (error, response) {
      if (error) {
        console.warn('failed to load metadata from the service.');
        return;
      } if (response && response.drawingInfo) {
        if (this.options.drawingInfo) {
          // allow L.esri.webmap (and others) to override service symbology with info provided in layer constructor
          response.drawingInfo = this.options.drawingInfo;
        }

        // the default pane for lines and polygons is 'overlayPane', for points it is 'markerPane'
        if (this.options.pane === 'overlayPane' && response.geometryType === 'esriGeometryPoint') {
          this.options.pane = 'markerPane';
        }

        this._setRenderers(response);
        if (response.hasLabels) {
          this._setLabelRenderers(response);
        }

        oldOnAdd(map);
        this._addPointLayer(map);
        this._addLabelLayer(map);

        map.on('zoomend', this._handleZoomChangeForLabels, this);
      }
    }, this);
  };

  this.onRemove = function (map) {
    oldOnRemove(map);
    if (this._pointLayer) {
      var pointLayers = this._pointLayer.getLayers();
      for (var i in pointLayers) {
        map.removeLayer(pointLayers[i]);
      }
    }

    map.off('zoomend', this._handleZoomChangeForLabels, this);
  };

  this.unbindPopup = function () {
    oldUnbindPopup();
    if (this._pointLayer) {
      var pointLayers = this._pointLayer.getLayers();
      for (var i in pointLayers) {
        pointLayers[i].unbindPopup();
      }
    }
  };

  this._handleZoomChangeForLabels = function () {
    if (this._labelsShouldBeVisible()) {
      for (var i in this._labelLayerIds) {
        this._map.addLayer(this._labelLayerIds[i]);
      }
    } else {
      for (var j in this._labelLayerIds) {
        this._map.removeLayer(this._labelLayerIds[j]);
      }
    }
  };

  this._addPointLayer = function (map) {
    if (this._pointLayer) {
      this._pointLayer.addTo(map);
      this._pointLayer.bringToFront();
    }
  };

  this._addLabelLayer = function (map) {
    if (this._labelLayer) {
      this._labelLayer.addTo(map);
      this._labelLayer.bringToFront();
    }
  };

  this._createPointLayer = function () {
    if (!this._pointLayer) {
      this._pointLayer = L.geoJson();
      // store the feature ids that have already been added to the map
      this._pointLayerIds = {};

      if (this._popup) {
        var popupFunction = function (feature, layer) {
          layer.bindPopup(this._popup(feature, layer), this._popupOptions);
        };
        this._pointLayer.options.onEachFeature = L.Util.bind(popupFunction, this);
      }
    }
  };

  this._createLabelLayer = function () {
    if (!this._labelLayer) {
      this._labelLayer = L.geoJson();
      // store the feature ids that have already been added to the map
      this._labelLayerIds = {};
    }
  };

  this.createNewLayer = function (geojson) {
    var fLayer = L.GeoJSON.geometryToLayer(geojson, this.options);

    // add a point layer when the polygon is represented as proportional marker symbols
    if (this._hasProportionalSymbols) {
      var centroid = this.getPolygonCentroid(geojson.geometry.coordinates);
      if (!(isNaN(centroid[0]) || isNaN(centroid[0]))) {
        this._createPointLayer();

        var featureId = geojson.id.toString();
        // only add the feature if it does not already exist on the map
        if (!this._pointLayerIds[featureId]) {
          var pointjson = this.getPointJson(geojson, centroid);

          this._pointLayer.addData(pointjson);
          this._pointLayerIds[featureId] = true;
        }

        this._pointLayer.bringToFront();
      }
    }
    return fLayer;
  };

  this.getPolygonCentroid = function (coordinates) {
    var pts = coordinates[0][0];
    if (pts.length === 2) {
      pts = coordinates[0];
    }

    var twicearea = 0;
    var x = 0;
    var y = 0;
    var nPts = pts.length;
    var p1;
    var p2;
    var f;

    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
      p1 = pts[i]; p2 = pts[j];
      twicearea += p1[0] * p2[1];
      twicearea -= p1[1] * p2[0];
      f = (p1[0] * p2[1]) - (p2[0] * p1[1]);
      x += (p1[0] + p2[0]) * f;
      y += (p1[1] + p2[1]) * f;
    }
    f = twicearea * 3;
    return [x / f, y / f];
  };

  this.getPointJson = function (geojson, centroid) {
    return {
      type: 'Feature',
      properties: geojson.properties,
      id: geojson.id,
      geometry: {
        type: 'Point',
        coordinates: [centroid[0], centroid[1]]
      }
    };
  };

  this._checkForProportionalSymbols = function (geometryType, renderer) {
    this._hasProportionalSymbols = false;
    if (geometryType === 'esriGeometryPolygon') {
      if (renderer.backgroundFillSymbol) {
        this._hasProportionalSymbols = true;
      }
      // check to see if the first symbol in the classbreaks is a marker symbol
      if (renderer.classBreakInfos && renderer.classBreakInfos.length) {
        var sym = renderer.classBreakInfos[0].symbol;
        if (sym && (sym.type === 'esriSMS' || sym.type === 'esriPMS')) {
          this._hasProportionalSymbols = true;
        }
      }
    }
  };

  this._setRenderers = function (serviceInfo) {
    var rend;
    var rendererInfo = serviceInfo.drawingInfo.renderer;

    var options = {
      url: this.options.url
    };

    if (this.options.token) {
      options.token = this.options.token;
    }

    if (this.options.pane) {
      options.pane = this.options.pane;
    }

    if (serviceInfo.drawingInfo.transparency) {
      options.layerTransparency = serviceInfo.drawingInfo.transparency;
    }

    if (this.options.style) {
      options.userDefinedStyle = this.options.style;
    }

    switch (rendererInfo.type) {
      case 'classBreaks':
        this._checkForProportionalSymbols(serviceInfo.geometryType, rendererInfo);
        if (this._hasProportionalSymbols) {
          this._createPointLayer();
          var pRend = classBreaksRenderer(rendererInfo, options);
          pRend.attachStylesToLayer(this._pointLayer);
          options.proportionalPolygon = true;
        }
        rend = classBreaksRenderer(rendererInfo, options);
        break;
      case 'uniqueValue':
        rend = uniqueValueRenderer(rendererInfo, options);
        break;
      default:
        rend = simpleRenderer(rendererInfo, options);
    }
    rend.attachStylesToLayer(this);
  };

  this._setLabelRenderers = function (serviceInfo) {
    this._firstLabelingInfo = serviceInfo.drawingInfo.labelingInfo[0];

    if (this._firstLabelingInfo) {
      this._hasLabelRenderer = true;
      var options = {
        url: this.options.url
      };

      if (this.options.token) {
        options.token = this.options.token;
      }

      if (this.options.pane) {
        options.pane = this.options.pane;
      }

      if (serviceInfo.drawingInfo.transparency) {
        options.layerTransparency = serviceInfo.drawingInfo.transparency;
      }

      if (this._firstLabelingInfo.minScale) {
        this._labelLayerMinZoom = scalingToZoom().scaleToZoom(this._firstLabelingInfo.minScale);
      }
      if (this._firstLabelingInfo.maxScale) {
        this._labelLayerMaxZoom = scalingToZoom().scaleToZoom(this._firstLabelingInfo.maxScale);
      }

      var labelRenderer = simpleLabelRenderer(this._firstLabelingInfo, options);
      this._createLabelLayer();
      labelRenderer.attachStylesToLayer(this._labelLayer);
    }
  };
}

Esri.FeatureLayer.addInitHook(function () {
  // the only method not shared with the clustered implementation
  L.Util.bind(this.createNewLayer, this);
  wireUpRenderers.bind(this)();
});

if (L.esri.Cluster) {
  L.esri.Cluster.FeatureLayer.addInitHook(wireUpRenderers);
}
