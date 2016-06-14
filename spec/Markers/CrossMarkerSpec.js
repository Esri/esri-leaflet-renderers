/* global L beforeEach describe expect it */
describe('CrossMarker', function () {
  describe('#_size', function () {
    var map;
    beforeEach(function () {
      map = L.map(document.createElement('div'));
      map.setView([0, 0], 1);
    });
    describe('when were ready to get started ', function () {
      it('shapeMarkers should have been loaded successfully.', function () {
        var marker = L.shapeMarkers.crossMarker();
        expect(marker).to.not.eq(undefined);
      });
    });
  });
});
