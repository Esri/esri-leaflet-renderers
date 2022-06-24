# Esri Leaflet Renderers

Leaflet plugin for [ArcGIS Feature Services](http://developers.arcgis.com). Esri Leaflet Renderers works in conjunction with the Esri Leaflet Plugin to draw [feature services](https://developers.arcgis.com/esri-leaflet/samples/simple-feature-layer/) using renderers defined by the service.

[![travis](https://img.shields.io/travis/Esri/Leaflet.shapeMarkers/master.svg?style=flat-square)](https://travis-ci.org/Esri/Leaflet.shapeMarkers)

The sole purpose of this plugin is to allow [`L.esri.FeatureLayer`](https://developers.arcgis.com/esri-leaflet/api-reference/layers/feature-layer/) to automatically take on renderers defined in [ArcGIS Feature Services](https://developers.arcgis.com/en/features/cloud-storage/). Esri Leaflet Renderers works in conjunction with Esri Leaflet, but it does not add any additional methods or properties to the class that it extends.

### Example
Take a look at the [live demo](https://developers.arcgis.com/esri-leaflet/samples/renderers-plugin/).

You can also find a side by side comparison of the ArcGIS API for JavaScript [here](https://esri.github.io/esri-leaflet-renderers/spec/comparisons.html).

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8 />
    <title>Renderer from Service</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

    <!-- Load Leaflet from CDN-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet-src.js"></script>

    <!-- Load Esri Leaflet from CDN -->
    <script src="https://unpkg.com/esri-leaflet@3"></script>

    <!-- Load Esri Leaflet Renderers -->
    <!-- This will hook into Esri Leaflet to get renderer info when adding a feature layer -->
    <script src="https://unpkg.com/esri-leaflet-renderers@3"></script>

    <style>
      body {margin:0;padding:0;}
      #map {position: absolute;top:0;bottom:0;right:0;left:0;}
    </style>
  </head>
  <body>

    <div id="map"></div>

    <script>
      var map = L.map('map').setView([37.837, -122.479], 6);
      L.esri.basemapLayer('Streets').addTo(map);

      // this plugin will get the predefined renderer from the layer's drawing info at:
      // https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0
      // use that renderer to style the polygons drawn on the map
      L.esri.featureLayer({
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0'
      }).addTo(map);
    </script>

  </body>
</html>
```

### Development Instructions

1. [Fork and clone Esri Leaflet Renderers](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-renderers` folder
3. Install the dependencies with `npm install`
4. Run `npm start` from the command line. This will compile minified source in a brand new `dist` directory, launch a tiny web server and begin watching the raw source for changes.
5. Run `npm test` to make sure you haven't introduced a new 'feature' accidentally.
6. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

### Limitations

* As of `2.0.1`, It is possible to override aspects of polyline and polygon symbology defined by the service in the FeatureLayer constructor.  For points, it is not.
* [Simple Marker](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#GUID-C8D40B32-5F4B-45EB-8048-6D5A8763E13B) symbols do not support rotation (ie: the 'angle' property is ignored).
* Polygons only support [solid fill](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#GUID-517D9B3F-DF13-4E79-9B58-A0D24C5E4994).  This does not include advanced fill types like PictureFill, Backward Diagonal, DiagonalCross, etc.
* [Text](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#ESRI_SECTION1_94E8CE0A9F614ABC8BEDDBCB0E9DC53A) symbols are not supported.

### Dependencies

* Esri Leaflet Renderers [1.x](https://github.com/Esri/esri-leaflet-renderers/releases/tag/v1.0.0) (available on [CDN](https://unpkg.com/esri-leaflet-renderers@1/dist/esri-leaflet-renderers.js)) can be used in apps alongside:
  *  [Leaflet](http://leafletjs.com) version 0.7.x.
  *  [Esri Leaflet](https://developers.arcgis.com/esri-leaflet/) version 1.0.x.

* Esri Leaflet Renderers [2.x](https://github.com/Esri/esri-leaflet-renderers/releases/tag/v2.0.4) (available on [CDN](https://unpkg.com/esri-leaflet-renderers@2/dist/esri-leaflet-renderers.js)) can be used in apps alongside:
  *  [Leaflet](http://leafletjs.com) version 1.0.0-rc.3.
  *  [Esri Leaflet](https://developers.arcgis.com/esri-leaflet/) version 2.0.x.

* Esri Leaflet Renderers [3.x](https://github.com/Esri/esri-leaflet-renderers/releases/tag/v3.0.0) (available on [CDN](https://unpkg.com/esri-leaflet-renderers@3/dist/esri-leaflet-renderers.js)) can be used in apps alongside:
  *  [Leaflet](http://leafletjs.com) version 1.x.
  *  [Esri Leaflet](https://developers.arcgis.com/esri-leaflet/) version 3.x.

### Versioning

For transparency into the release cycle and in striving to maintain backward compatibility, Esri Leaflet is maintained under the Semantic Versioning guidelines and will adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility **bumps the major** while resetting minor and patch
* New additions without breaking backward compatibility **bumps the minor** while resetting the patch
* Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

### Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/Esri/esri-leaflet-renderers/blob/master/CONTRIBUTING.md).

### Licensing
Copyright &copy; 2015-2018 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE]( https://raw.github.com/Esri/esri-leaflet/master/LICENSE) file.
