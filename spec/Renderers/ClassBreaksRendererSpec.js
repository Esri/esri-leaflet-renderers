/* global L beforeEach describe expect it */
describe('ClassBreaksRenderer', function () {
  describe('should create renderer from JSON', function () {
    var rendererJson;

    beforeEach(function () {
      rendererJson = {
        'type': 'classBreaks',
        'field': 'SHAPE_AREA',
        'defaultSymbol': null,
        'minValue': 41569,
        'classBreakInfos': [
          {
            'classMaxValue': 15327379,
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [237, 248, 233, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [0, 0, 0, 255],
                'width': 1.5
              }
            }
          },
          {
            'classMaxValue': 64615118,
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [116, 196, 118, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [0, 0, 0, 255],
                'width': 1.5
              }
            }
          },
          {
            'classMaxValue': 38231763,
            'symbol': {
              'type': 'esriSFS',
              'style': 'esriSFSSolid',
              'color': [177, 222, 176, 128],
              'outline': {
                'type': 'esriSLS',
                'style': 'esriSLSSolid',
                'color': [0, 0, 0, 255],
                'width': 1.5
              }
            }
          }]
      };
    });

    it('should create three symbols', function () {
      var renderer = L.esri.Renderers.classBreaksRenderer(rendererJson);
      expect(renderer._symbols.length).to.be.eq(3);
    });

    it('should order the symbols', function () {
      var renderer = L.esri.Renderers.classBreaksRenderer(rendererJson);

      expect(renderer._symbols[0].val).to.be.eq(15327379);
      expect(renderer._symbols[1].val).to.be.eq(38231763);
      expect(renderer._symbols[2].val).to.be.eq(64615118);
    });
    it('should get symbol for a value that falls on a classbreak', function () {
      var renderer = L.esri.Renderers.classBreaksRenderer(rendererJson);
      var feature = {'properties': {'SHAPE_AREA': 38231763}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq(38231763);
    });
    it('should get symbol for a value that falls within a classbreak range', function () {
      var renderer = L.esri.Renderers.classBreaksRenderer(rendererJson);
      var feature = {'properties': {'SHAPE_AREA': 50000000}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq(64615118);
    });

    it('should merge symbol styles', function () {
      var options = {
        userDefinedStyle: function (feature) {
          return {opacity: 0.5};
        }
      }
      var renderer = L.esri.Renderers.classBreaksRenderer(rendererJson, options);
      var feature = {'properties': {'SHAPE_AREA': 50000000}};
      var style = renderer.style(feature);
      // user style
      expect(style.opacity).to.be.eq(0.5);
      // renderer style
      expect(style.weight).to.be.greaterThan(1);
    });
  });
});
