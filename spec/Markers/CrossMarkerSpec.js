describe('CrossMarker', function () {
  describe('#_size', function () {
    var map;
    beforeEach(function () {
      map = L.map(document.createElement('div'));
      map.setView([0, 0], 1);
    });
    describe('when a CrossMarker is added to the map ', function () {
      it('should have center and size set', function () {
        var marker = L.shapeMarkers.crossMarker([45.50, -122.70], 20).addTo(map);
        expect(marker.getSize()).to.eq(20);
        expect(marker.getLatLng().lat).to.eq(45.50);
        expect(marker.getLatLng().lng).to.eq(-122.70);
      });
      describe('and size is set before adding it', function () {
        it('takes that size', function () {
          var marker = L.shapeMarkers.crossMarker([0, 0], 20);
          marker.setSize(15);
          marker.addTo(map);
          expect(marker.getSize()).to.eq(15);
        });
      });

      describe('and size is set after adding it', function () {
        it('takes that size', function () {
          var marker = L.shapeMarkers.crossMarker([0, 0], 20);
          marker.addTo(map);
          marker.setSize(15);
          expect(marker.getSize()).to.eq(15);
        });
      });

      describe('and center is set before adding it', function () {
        it('takes that center', function () {
          var marker = L.shapeMarkers.crossMarker([0, 0], 20);
          marker.setLatLng(L.latLng(44, -128));
          marker.addTo(map);
          expect(marker.getLatLng().lat).to.eq(44);
          expect(marker.getLatLng().lng).to.eq(-128);
        });
      });
      describe('and center is set after adding it', function () {
        it('takes that center', function () {
          var marker = L.shapeMarkers.crossMarker([0, 0], 20);
          marker.addTo(map);
          marker.setLatLng(L.latLng(44, -128));
          expect(marker.getLatLng().lat).to.eq(44);
          expect(marker.getLatLng().lng).to.eq(-128);
        });
      });
    });
  });
});
