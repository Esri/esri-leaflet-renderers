describe('LineSymbol', function () {
	describe("#_symbolJson", function () {
    var symbolHelper;

    beforeEach(function () {
      symbolHelper = new L.esri.Renderers.Symbol();
    });
      
    it("should set defaults", function () {
      var symbol = L.esri.Renderers.lineSymbol({});
      var styles = symbol.style();
      expect(styles.lineCap).to.be.eq('butt');
      expect(styles.lineJoin).to.be.eq('miter');
      expect(styles.width).to.be.eq(undefined);
      expect(styles.color).to.be.eq(undefined);
      expect(styles.dashArray).to.be.eq(undefined);
    });

    describe("should set style from solid line symbol 'esriSLSSolid'", function () {
      var solidLine;

      beforeEach(function () {
        solidLine = {  
          "type":"esriSLS",
          "style":"esriSLSSolid",
          "color":[255, 85, 0, 255 ],
          "width":1.4
        };
      });

      it("should set solid line parameters", function () {
        var symbol = L.esri.Renderers.lineSymbol(solidLine);
        var styles = symbol.style();
        var c = symbolHelper.colorValue(solidLine.color);
        var o = symbolHelper.alphaValue(solidLine.color);
        expect(styles.color).to.be.eq(c);
        expect(styles.opacity).to.be.eq(o);
        expect(styles.dashArray).to.be.eq(undefined);
        expect(styles.weight).to.be.eq(symbolHelper.pixelValue(solidLine.width));
      });
    });

    describe("should set style from pattern line symbol", function () {
      var dashedLine;

      beforeEach(function () {
        dashedLine = {  
          "type" : "esriSLS", 
          "color" : [0, 0, 0, 255 ], 
          "width" : 2
        };
      });
      it("should set esriSLSDot parameters", function () {
        dashedLine.style = "esriSLSDot";
        var symbol = L.esri.Renderers.lineSymbol(dashedLine);
        var styles = symbol.style();
        expect(styles.dashArray).not.to.be.eq(undefined);
      });
      it("should set esriSLSDash line parameters", function () {
        dashedLine.style = "esriSLSDash";
        var symbol = L.esri.Renderers.lineSymbol(dashedLine);
        var styles = symbol.style();
        expect(styles.dashArray).not.to.be.eq(undefined);
      });
      it("should set esriSLSDashDot line parameters", function () {
        dashedLine.style = "esriSLSDashDot";
        var symbol = L.esri.Renderers.lineSymbol(dashedLine);
        var styles = symbol.style();
        expect(styles.dashArray).not.to.be.eq(undefined);
      });
      it("should set esriSLSDashDotDot line parameters", function () {
        dashedLine.style = "esriSLSDashDotDot";
        var symbol = L.esri.Renderers.lineSymbol(dashedLine);
        var styles = symbol.style();
        expect(styles.dashArray).not.to.be.eq(undefined);
      });
    });
	});
});
