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
  });
});
