var fs = require('fs');

module.exports = function(grunt) {

  pkg: grunt.file.readJSON('package.json'),

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: [
          'src/*.js',
          'src/**/*.js'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'src/**/*.js',
          'src/*.js'
        ],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['watch:scripts']
    },

    uglify: {
      options: {
        wrap: false
      },
      build: {
        src: [
          'src/EsriLeafletRenderers.js',
          'src/Symbols/Symbol.js',
          'src/Symbols/PointSymbol.js',
          'src/Symbols/LineSymbol.js',
          'src/Symbols/PolygonSymbol.js',
          'src/Renderers/Renderer.js',
          'src/Renderers/SimpleRenderer.js',
          'src/Renderers/ClassBreaksRenderer.js',
          'src/Renderers/UniqueValueRenderer.js',
          'src/Markers/SquareMarker.js',
          'src/Markers/DiamondMarker.js',
          'src/Markers/CrossMarker.js',
          'src/Markers/XMarker.js',
          'src/FeatureLayerHook.js'

        ],
        dest: 'build/esri-leaflet-renderers.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint','uglify', 'watch']);
}
