var fs = require('fs');

module.exports = function(grunt) {
  var browsers = grunt.option('browser') ? grunt.option('browser').split(',') : ['PhantomJS'];

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
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      run: {
        reporters: ['progress'],
        browsers: browsers
      },
      coverage: {
        reporters: ['progress', 'coverage'],
        browsers: browsers,
        preprocessors: {
          'src/**/*.js': 'coverage'
        }
      },
      watch: {
        singleRun: false,
        autoWatch: true,
        browsers: browsers
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
      dev: ['watch:scripts', 'karma:watch']
    },
    uglify: {
      options: {
        wrap: false,
        sourceMap: true
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
          'node_modules/leaflet-shape-markers/dist/leaflet-shape-markers.min.js',
          'src/FeatureLayerHook.js'
        ],
        dest: 'dist/esri-leaflet-renderers.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint','uglify', 'watch']);
  grunt.registerTask('build', ['jshint', 'uglify', 'karma:coverage', 'watch']);
  grunt.registerTask('test', ['jshint', 'karma:run']);
}
