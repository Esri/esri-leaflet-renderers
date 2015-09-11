/* global L beforeEach describe expect it */
describe('SmartClassbreaksRenderer', function () {
  describe('should create renderer with size variables from JSON', function () {
    var renderer, pointFeatureOne, pointFeatureTwo, sizeInfoJson;

    beforeEach(function () {
      sizeInfoJson = {
        'visualVariables': [{
          'type': 'sizeInfo',
          'field': 'FIELD_ONE',
          'minSize': 1,
          'maxSize': 37.5,
          'minDataValue': 0,
          'maxDataValue': 113
        }],
        'type': 'classBreaks',
        'field': 'DIAMETER',
        'minValue': -9007199254740991,
        'classBreakInfos': [{
          'symbol': {
            'color': [227, 139, 79, 204],
            'size': 9,
            'angle': 0,
            'xoffset': 0,
            'yoffset': 0,
            'type': 'esriSMS',
            'style': 'esriSMSCircle',
            'outline': {
              'color': [255, 255, 255, 255],
              'width': 0.75,
              'type': 'esriSLS',
              'style': 'esriSLSSolid'
            }
          },
          'classMaxValue': 9007199254740991
        }]
      };
      pointFeatureOne = {
        'type': 'Point',
        'properties': {
          'FID': 1,
          'FIELD_ONE': 2,
          'FIELD_TWO': 36
        }
      };
      pointFeatureTwo = {
        'type': 'Point',
        'properties': {
          'FID': 2,
          'FIELD_ONE': 50,
          'FIELD_TWO': 36
        }
      };
      renderer = L.esri.Renderers.classBreaksRenderer(sizeInfoJson);
    });

    it('size info visual variables should create one base symbol', function () {
      expect(renderer._symbols.length).to.be.eq(1);
      expect(renderer._symbols[0].val).to.be.eq(9007199254740991);
    });

    it('should get different circle marker sizes for different feature values', function () {
      var sizeOne = renderer.pointToLayer(pointFeatureOne, [0, 0]).options.radius;
      var sizeTwo = renderer.pointToLayer(pointFeatureTwo, [0, 0]).options.radius;
      expect(sizeOne).not.to.be.eq(sizeTwo);
    });
  });
  describe('should create renderer with color variables from JSON', function () {
    var renderer, polygonFeatureOne, polygonFeatureTwo, colorInfoJson;

    beforeEach(function () {
      colorInfoJson = {
        'visualVariables': [{
          'type': 'colorInfo',
          'field': 'FIELD_ONE',
          'stops': [
            {
              'value': 4.6,
              'color': [255, 252, 212, 204]
            }, {
              'value': 5.95,
              'color': [224, 178, 193, 204]
            }, {
              'value': 7.3,
              'color': [193, 104, 173, 204]
            }, {
              'value': 8.65,
              'color': [123, 53, 120, 204]
            }, {
              'value': 10,
              'color': [53, 2, 66, 204]
            }
          ]
        }],
        'type': 'classBreaks',
        'field': 'FIELD_ONE',
        'minValue': -9007199254740991,
        'classBreakInfos': [{
          'symbol': {
            'color': [170, 170, 170, 204],
            'outline': {
              'color': [153, 153, 153, 255],
              'width': 0.375,
              'type': 'esriSLS',
              'style': 'esriSLSSolid'
            },
            'type': 'esriSFS',
            'style': 'esriSFSSolid'
          },
          'classMaxValue': 9007199254740991
        }]
      };
      polygonFeatureOne = {
        'type': 'Polygon',
        'properties': {
          'FID': 1,
          'FIELD_ONE': 6,
          'FIELD_TWO': 10
        }
      };
      polygonFeatureTwo = {
        'type': 'Polygon',
        'properties': {
          'FID': 2,
          'FIELD_ONE': 8,
          'FIELD_TWO': 36
        }
      };
      renderer = L.esri.Renderers.classBreaksRenderer(colorInfoJson);
    });

    it('color info visual variables should create one base symbol', function () {
      expect(renderer._symbols.length).to.be.eq(1);
      expect(renderer._symbols[0].val).to.be.eq(9007199254740991);
    });

    it('should get different polygon fills for different feature values', function () {
      var fillOne = renderer.style(polygonFeatureOne).fillColor;
      var fillTwo = renderer.style(polygonFeatureTwo).fillColor;
      expect(fillOne).not.to.be.eq(fillTwo);
    });
  });
});
