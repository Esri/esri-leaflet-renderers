# Esri Leaflet Renderers

Leaflet plugin for [ArcGIS Feature Services](http://developers.arcgis.com). Esri Leaflet Renderers works in conjunction with the Esri Leaflet Plugin to draw [feature services](http://esri.github.io/esri-leaflet/examples/simple-feature-layer.html) using renderers defined by the service.

[![travis](https://img.shields.io/travis/Esri/Leaflet.shapeMarkers/master.svg?style=flat-square)](https://travis-ci.org/Esri/Leaflet.shapeMarkers)

### Example
Take a look at the [live demo](http://esri.github.io/esri-leaflet-renderers/index.html).

You can also find a side by side comparison of the ArcGIS API for JavaScript [here](http://esri.github.io/esri-leaflet-renderers/spec/comparisons.html).

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8 />
    <title>Renderer from Service</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

    <!-- Load Leaflet from CDN-->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-1.0.0-b1/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-1.0.0-b1/leaflet.js"></script>

    <!-- Load Esri Leaflet from CDN -->
    <script src="//cdn.jsdelivr.net/leaflet.esri/2.0.0-beta.5/esri-leaflet.js"></script>

    <!-- Load Esri Leaflet Renderers -->
    <!-- This will hook into Esri Leaflet and draw the predefined World Regions -->
    <script src="//cdn.jsdelivr.net/leaflet.esri.renderers/2.0.0/esri-leaflet-renderers.js"></script>

    <style>
      body {margin:0;padding:0;}
      #map {position: absolute;top:0;bottom:0;right:0;left:0;}
    </style>
  </head>
  <body>

    <div id="map"></div>

    <script>
      var map = L.map('map').setView([45.526, -122.667], 13);

      L.esri.basemapLayer('Streets').addTo(map);
      L.esri.featureLayer({url: '//services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Regions/FeatureServer/0', simplifyFactor: 1}).addTo(map);
    </script>

  </body>
</html>
```

### Development Instructions

1. [Fork and clone Esri Leaflet Renderers](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-renderers` folder
3. Install the dependencies with `npm install`
4. Run `npm run build` from the command line. This will compile minified source in a brand new `dist` directory.  Afterward, you can run `npm test` to make sure things are 'all good'.
5. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

### Limitations

* [Simple Marker](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#GUID-C8D40B32-5F4B-45EB-8048-6D5A8763E13B) symbols do not support rotation (ie: the 'angle' property is ignored).
* Polygons only support [solid fill](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#GUID-517D9B3F-DF13-4E79-9B58-A0D24C5E4994).  This does not include advanced fill types like PictureFill, Backward Diagonal, DiagonalCross, etc.
* [Text](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#ESRI_SECTION1_94E8CE0A9F614ABC8BEDDBCB0E9DC53A) symbols are not supported.
* [Unique value](http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#//02r30000019t000000#GUID-35C6482C-9BB2-4839-A180-25DCF62CB504) renderers based on more than a single field are not supported.

### Dependencies

* Esri Leaflet Renderers [1.0.0](https://github.com/Esri/esri-leaflet-renderers/releases/tag/v1.0.0) (available on [CDN](https://cdn.jsdelivr.net/leaflet.esri.renderers/1.0.0/esri-leaflet-renderers.js)) is compatible with [Leaflet](http://leaflet.com) version 0.7.3.
* Esri Leaflet Renderers [2.0.0](https://github.com/Esri/esri-leaflet-renderers/releases/tag/v2.0.0) (available on [CDN](https://cdn.jsdelivr.net/leaflet.esri.renderers/2.0.0/esri-leaflet-renderers.js)) is compatible with [Leaflet](http://leaflet.com) version 1.0.0-beta1.
* [Esri Leaflet](https://github.com/Esri/esri-leaflet) - for Esri feature services

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
Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt]( https://raw.github.com/Esri/esri-leaflet/master/license.txt) file.

[](Esri Tags: ArcGIS Web Mapping Leaflet)
[](Esri Language: JavaScript)
