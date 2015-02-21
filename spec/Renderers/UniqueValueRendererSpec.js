describe('UniqueValueRenderer', function () {
  describe("should create renderer from JSON", function () {
    var rendererJson;

    beforeEach(function () {
      rendererJson = {  
        "type":"uniqueValue",
        "field1":"ZONE",
        "defaultSymbol":{  
          "type":"esriSFS",
          "style":"esriSFSSolid",
          "color":[0, 0, 0, 64],
          "outline":{  
            "type":"esriSLS",
            "style":"esriSLSSolid",
            "color":[0, 0, 0, 255],
            "width":1
          }
        },
        "uniqueValueInfos":[  
          {  
          "value":"-12",
          "symbol":{  
            "type":"esriSFS",
            "style":"esriSFSSolid",
            "color":[255, 255, 255, 128],
            "outline":{  
              "type":"esriSLS",
              "style":"esriSLSSolid",
              "color":[128, 128, 128, 255],
              "width":1.5
            }
          }
        },
        {  
          "value":"-11",
          "symbol":{  
            "type":"esriSFS",
            "style":"esriSFSSolid",
            "color":[192, 192, 192, 128],
            "outline":{  
              "type":"esriSLS",
              "style":"esriSLSSolid",
              "color":[128, 128, 128, 255],
              "width":1.5
            }
          }
        },
        {  
          "value":"-10",
          "symbol":{  
            "type":"esriSFS",
            "style":"esriSFSSolid",
            "color":[255, 255, 255, 128],
            "outline":{  
              "type":"esriSLS",
              "style":"esriSLSSolid",
              "color":[128, 128, 128, 255],
              "width":1.5
            }
          }
        }]
      }
    });

    it("should create three symbols", function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      expect(renderer._symbols.length).to.be.eq(3);
    });

    it("should create a default symbol", function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      expect(renderer._defaultSymbol).not.to.be.eq(undefined);
    });

    it("should get default symbol when no matching value", function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      var feature = {"properties": {"ZONE": 5}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq(null);
    });

    it("should get symbol for that matches the value", function () {
      var renderer = L.esri.Renderers.uniqueValueRenderer(rendererJson);
      var feature = {"properties": {"ZONE": -10}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq('-10');
      var feature = {"properties": {"ZONE": '-10'}};
      var sym = renderer._getSymbol(feature);
      expect(sym.val).to.be.eq('-10');
    });
  });
});
