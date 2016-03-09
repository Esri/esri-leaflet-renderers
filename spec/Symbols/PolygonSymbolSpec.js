/* global L beforeEach describe expect it */
describe('PolygonSymbol', function () {
  describe('#_symbolJson', function () {
    var symbolHelper;

    beforeEach(function () {
      symbolHelper = new L.esri.Renderers.Symbol();
    });

    describe('should set style from solid polygon symbol esriFSSolid', function () {
      var solidPolygon;

      beforeEach(function () {
        solidPolygon = {
          'type': 'esriSFS',
          'style': 'esriSFSSolid',
          'color': [237, 248, 233, 128],
          'outline': {
            'type': 'esriSLS',
            'style': 'esriSLSSolid',
            'color': [0, 0, 0, 255],
            'width': 1.5
          }
        };
      });

      it('should set solid polygon parameters', function () {
        var symbol = L.esri.Renderers.polygonSymbol(solidPolygon);
        var styles = symbol.style();

        expect(styles.fill).to.be.eq(true);
        expect(styles.fillColor).to.be.eq(symbolHelper.colorValue(solidPolygon.color));
        expect(styles.fillOpacity).to.be.eq(symbolHelper.alphaValue(solidPolygon.color));
        expect(styles.color).to.be.eq(symbolHelper.colorValue(solidPolygon.outline.color));
        expect(styles.opacity).to.be.eq(symbolHelper.alphaValue(solidPolygon.outline.color));
      });

      it('should set line stroke to false if line width is 0', function () {
        solidPolygon.outline.width = 0;
        var symbol = L.esri.Renderers.polygonSymbol(solidPolygon);
        var styles = symbol.style();

        expect(styles.stroke).to.be.eq(false);
      });

      it('should set line stroke to false if outline is null', function () {
        solidPolygon.outline = null
        var symbol = L.esri.Renderers.polygonSymbol(solidPolygon);
        var styles = symbol.style();

        expect(styles.stroke).to.be.eq(false);
      });
    });
  });
});
