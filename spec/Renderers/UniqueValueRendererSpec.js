/* global L beforeEach describe expect it */
describe('UniqueValueRenderer', function () {
  describe('should create renderer from JSON', function () {
    var rendererJson;

    beforeEach(function () {
      rendererJson = {
        'type': 'uniqueValue',
        'field1': 'ZONE',
        'defaultSymbol': {
          'type': 'esriSFS',
          'style': 'esriSFSSolid',
          'color': [0, 0, 0, 64],
          'outline': {
            'type': 'esriSLS',
            'style': 'esriSLSSolid',
            'color': [0, 0, 0, 51],
            'width': 1
          }
        },
        'uniqueValueInfos': [
          {
            'value': '-12',
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [255, 255, 255, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [128, 128, 128, 255],
                'width': 1.5
              }
            }
          },
          {
            'value': '-11',
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [192, 192, 192, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [128, 128, 128, 255],
                'width': 1.5
              }
            }
          },
          {
            'value': '-10',
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [255, 255, 255, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [128, 128, 128, 255],
                'width': 1.5
              }
            }
          }
        ]
      };
    });

    it('should create three symbols', function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      expect(renderer._symbols.length).to.be.eq(3);
    });

    it('should merge symbol styles', function () {
      var options = {
        userDefinedStyle: function (feature) {
          return {opacity: 0.5};
        }
      }
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson, options);
      var feature = {'properties': {'ZONE': -12, 'VALUE': '$25.00', 'MARKET': '2Z'}};
      var style = renderer.style(feature);
      // user style
      expect(style.opacity).to.be.eq(0.5);
      // renderer style
      expect(style.weight).to.be.greaterThan(1);
    });

    describe('symbol transparency', function () {
      it('should be equal to symbol value when no layer transparency defined', function () {
        var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
        expect(renderer._symbols[0]._styles.fillOpacity).to.be.eq(128 / 255.0);
        expect(renderer._symbols[0]._lineStyles.opacity).to.be.eq(1);
        expect(renderer._defaultSymbol._styles.fillOpacity).to.be.eq(64 / 255.0);
        expect(renderer._defaultSymbol._lineStyles.opacity).to.be.eq(51 / 255.0);
      });

      it('should be equal to symbol value with transparency applied when defined', function () {
        var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson, {layerTransparency: 75});
        expect(renderer._symbols[0]._styles.fillOpacity).to.be.eq(128 / 255.0 * 0.25);
        expect(renderer._symbols[0]._lineStyles.opacity).to.be.eq(0.25);
        expect(renderer._defaultSymbol._styles.fillOpacity).to.be.eq(64 / 255.0 * 0.25);
        expect(renderer._defaultSymbol._lineStyles.opacity).to.be.eq(51 / 255.0 * 0.25);
      });
    });

    it('should create a default symbol', function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      expect(renderer._defaultSymbol).to.not.equal(undefined);
    });

    it('should get default symbol when no matching value', function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      var feature = {'properties': {'ZONE': 5}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.equal(null);
    });

    it('should get symbol for that matches the value', function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      var feature = {'properties': {'ZONE': -10}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq('-10');
    });
  });

  describe('should renderer based on multiple fields', function () {
    var multipleFieldRendererJson;

    beforeEach(function () {
      multipleFieldRendererJson = {
        'type': 'uniqueValue',
        'field1': 'ZONE',
        'field2': 'MARKET',
        'field3': 'VALUE',
        'fieldDelimiter': ',',
        'defaultSymbol': {
          'type': 'esriSFS',
          'style': 'esriSFSSolid',
          'color': [0, 0, 0, 64],
          'outline': {
            'type': 'esriSLS',
            'style': 'esriSLSSolid',
            'color': [0, 0, 0, 51],
            'width': 1
          }
        },
        'uniqueValueInfos': [
          {
            'value': '-12,2Z,$25.00',
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [255, 255, 255, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [128, 128, 128, 255],
                'width': 1.5
              }
            }
          }
        ]
      };
    });
    it('should get default symbol when not matching all fields', function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(multipleFieldRendererJson);
      var feature = {'properties': {'ZONE': -12, 'MARKET': '2Z'}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq(null);
    });

    it('should get symbol for that matches the value', function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(multipleFieldRendererJson);
      var feature = {'properties': {'ZONE': -12, 'VALUE': '$25.00', 'MARKET': '2Z'}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq('-12,2Z,$25.00');
    });
  });
});
