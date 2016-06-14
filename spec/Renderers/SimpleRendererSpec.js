/* global L beforeEach describe expect it */
describe('SimpleRenderer', function () {
  describe('should create renderer from JSON', function () {
    var rendererJson;

    beforeEach(function () {
      rendererJson = {
        'type': 'simple',
        'symbol': {
          'type': 'esriSFS',
          'style': 'esriSFSSolid',
          'color': [255, 214, 180, 255],
          'outline': {
            'type': 'esriSLS',
            'style': 'esriSLSSolid',
            'color': [251, 164, 93, 255],
            'width': 0.75
          }
        }
      };
    });

    it('should create one symbol', function () {
      var renderer = L.esri.Renderers.simpleRenderer(rendererJson);
      expect(renderer._symbols.length).to.be.eq(1);
    });

    it('should merge symbol styles', function () {
      var options = {
        userDefinedStyle: function (feature) {
          return {opacity: 0.5};
        }
      }
      var renderer = L.esri.Renderers.simpleRenderer(rendererJson, options);
      var style = renderer.style();
      // user style
      expect(style.opacity).to.be.eq(0.5);
      // renderer style
      expect(style.weight).to.be.lessThan(1);
    });
  });
});
