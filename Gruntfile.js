var fs = require('fs');

module.exports = function(grunt) {

  pkg: grunt.file.readJSON('package.json'),

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        wrap: false
      },
      build: {
        src: 'src/EsriLeafletRenderers.js',
        dest: 'build/esri-leaflet-renderers.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
}
