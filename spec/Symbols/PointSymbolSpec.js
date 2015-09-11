/* global L beforeEach describe expect it */
describe('PointSymbol', function () {
  describe('#_symbolJson', function () {
    it('should set defaults', function () {
      var symbol = L.esri.Renderers.pointSymbol({});
      var styles = symbol._styles;
      expect(styles.stroke).to.be.eq(false);
    });

    describe('should set style from point symbol json', function () {
      var pointSymbolJson;

      beforeEach(function () {
        pointSymbolJson = {
          'type': 'esriSMS',
          'style': 'esriSMSquare',
          'color': [0, 0, 128, 128],
          'size': 15,
          'angle': 0,
          'xoffset': 0,
          'yoffset': 0,
          'outline': {
            'color': [0, 0, 128, 255],
            'width': 1
          }
        };
      });
      it('should set square parameters', function () {
        var symbol = L.esri.Renderers.pointSymbol(pointSymbolJson);
        var styles = symbol._styles;

        expect(symbol.icon).to.be.equal(undefined);
        expect(styles).not.to.be.equal(undefined);
      });
    });

    describe('should set style from icon symbol json', function () {
      var iconSymbolJson, fLayer;

      beforeEach(function () {
        iconSymbolJson = {
          'type': 'esriPMS',
          'url': '5661274d49834505d5815990f7696493',
          'imageData': 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAP5JREFUKJGFkT1KxGAURc88nqmCbUqZ0kGEwc4thJhiygHdhI3YWFhPkUq0EBcQIX5bsLdw7I0L0P4jXGxGDUOCr7yXc9+fM1KLxeIoxrgXQnjs6z4GSLozs2fgf6AoikNJc0m3294g4O6nkkiS5K0XsnT3l18gz/MUSCVNJC038kee56mZZWZ2I+nYN/S9mZ0Bk36nruve3f+GcPfOAZIkuYoxvrr7LjCRdAHsAJeSortnks5',
          'contentType': 'image/png',
          'width': 9,
          'height': 9,
          'angle': 0,
          'xoffset': 0,
          'yoffset': 0
        };
        fLayer = 'http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Airports/FeatureServer/0';
      });

      it('should set icon parameters', function () {
        var symbol = L.esri.Renderers.pointSymbol(iconSymbolJson, {url: fLayer});
        var styles = symbol._styles;

        expect(symbol.icon).not.to.be.equal(undefined);
        expect(symbol.serviceUrl).to.be.eq(fLayer);
        expect(styles.stroke).to.be.equal(undefined);
      });
    });
  });
});
