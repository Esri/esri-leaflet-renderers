# Esri Leaflet Renderers

Leaflet plugin for [ArcGIS Feature Services](http://developers.arcgis.com). Esri Leaflet Renderers works in conjunction with the Esri Leaflet Plugin to draw [feature services](http://esri.github.io/esri-leaflet/examples/simple-feature-layer.html) using renderers defined by the service.

**Esri Leaflet Renderers is currently in development and should be thought of as a beta or preview.**

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
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

    <!-- Load Esri Leaflet from CDN -->
    <script src="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.6/esri-leaflet.js"></script>

    <!-- Load Esri Leaflet Renderers -->
    <!-- This will hook into Esri Leaflet and draw the predefined Portland Heritage Tree symbols -->
    <script src="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet-renderers/v0.0.1-beta.2/esri-leaflet-renderers.js"></script>

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
      L.esri.featureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Heritage_Trees_Portland/FeatureServer/0').addTo(map);
    </script>

  </body>
</html>
```

### Development Instructions

Make sure you have the [Grunt CLI](http://gruntjs.com/getting-started) installed.

1. [Fork and clone Esri Leaflet Renderers](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-renderers` folder
5. Install the dependencies with `npm install`
5. run `grunt` from the command line. This will create minified source, run linting, and start watching the source files for changes.
6. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

### Limitations
* [Simple Marker](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#GUID-C8D40B32-5F4B-45EB-8048-6D5A8763E13B) symbols do not support rotation (ie: the 'angle' property is ignored).
* Polygons only support [solid fill](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#GUID-517D9B3F-DF13-4E79-9B58-A0D24C5E4994).  This does not include advanced fill types like PictureFill, Backward Diagonal, DiagonalCross, etc.
* [Text](http://resources.arcgis.com/en/help/arcgis-rest-api/02r3/02r3000000n5000000.htm#ESRI_SECTION1_94E8CE0A9F614ABC8BEDDBCB0E9DC53A) symbols are not supported.

### Dependencies

* [Leaflet](http://leaflet.com) version 0.7 or higher is required but the latest version is recommended.
* [Esri Leaflet](https://github.com/Esri/esri-leaflet) - for Esri feature services

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
