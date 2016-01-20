# esri-leaflet-renderers change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

## [Unreleased]

## [2.0.1] - 2016-01-19

### Added

* Now developers can now override individual style properties of interest for polyline and polygon services directly in the FeatureLayer constructor. (via [pull #100](https://github.com/Esri/esri-leaflet-renderers/pull/100))

```js
L.esri.featureLayer({
  url: 'http://[server]/arcgis/rest/services/[yourservice]/MapServer/0',
  style: function (feature) {
    return {
      // override service symbology to make polygon fill 50% transparent
      fillOpacity: 0.5
    };
  }
}).addTo(map);
```

## [2.0.0] - 2015-09-10

This is the first release that supports [Leaflet 1.0.0-beta.1](http://leafletjs.com/2015/07/15/leaflet-1.0-beta1-released.html).  As with version [1.0.0](https://github.com/Esri/esri-leaflet/releases/tag/v1.0.0) of Esri Leaflet, FeatureLayer constructors now expect `url`s to be provided within an options object (ie: `L.esri.featureLayer(url)` should be replaced with `L.esri.featureLayer( {url: url} )`).

## [1.0.1] - 2015-11-30

### Added

* support for clusteredFeatureLayers
* support for unique value renderers based on more than one field
* support for transparency applied to the entire renderer (via the service symbology)

### Changed

* Rewritten build and test systems to rely on ES 2015 Modules specification
* More build and release automation

## [1.0.0] - 2015-09-08

This is expected to be the last (and only) stable release of Esri Leaflet Renderers compatible with Leaflet 0.7.3. All future 1.0.X releases will be compatible with Leaflet 0.7.3 and contain only bug fixes. New features will only be added in Esri Leaflet Renderers 2.0.0 (which will require Leaflet 1.0.0).

### Breaking Changes

* In Esri Leaflet itself, in L.esri.FeatureLayer constructors, the `url` is now provided within an options object (ie: `L.esri.featureLayer(url)` should be replaced with `L.esri.featureLayer( {url: url} )`).

### Added

* support for unique value renderers based on more than one field
* support for transparency applied to the entire renderer

### Fixed
* ensured that tokens are passed through in requests for picture marker symbols

## [0.0.1-beta.3] - 2015-03-24
* Render from the new visualVariables objects in the renderer JSON
* Still backwards compatible with classic renderers

## [0.0.1-beta.2] - 2015-03-02
* Fix to work with Browserify
* Update to work with esri-leaflet 1.0.0-rc.5
* Still backwards compatible with esri-leaflet 1.0.0-rc.4

## 0.0.1-beta.1 - 2015-01-29
* First Beta release
* Works with esri-leaflet 1.0.0-rc.4

[Unreleased]: https://github.com/Esri/esri-leaflet-renderers/compare/v2.0.0...HEAD
[2.0.1]: https://github.com/Esri/esri-leaflet-renderers/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/Esri/esri-leaflet-renderers/compare/v1.0.0...v2.0.0
[1.0.1]: https://github.com/Esri/esri-leaflet-renderers/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Esri/esri-leaflet-renderers/compare/v0.0.1-beta.3...v1.0.0
[0.0.1-beta.3]: https://github.com/Esri/esri-leaflet-renderers/compare/v0.0.1-beta.2...v0.0.1-beta.3
[0.0.1-beta.2]: https://github.com/Esri/esri-leaflet-renderers/compare/v0.0.1-beta.1...v0.0.1-beta.2
