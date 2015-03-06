module.exports = function(grunt) {
  var browsers = grunt.option('browser') ? grunt.option('browser').split(',') : ['PhantomJS'];

  var copyright = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                   '*   Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
                   '*   Apache 2.0 License ' +
                   '*/\n\n';

  var files = [
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
  ];

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

    concat: {
      options: {
        sourceMap: true,
        separator: '\n\n',
        banner: copyright,
      },
      js: {
        src: files,
        dest: 'dist/esri-leaflet-renderers-src.js'
      },
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
        mangle: {
          except: ['L']
        },
        preserveComments: 'some',
        report: 'gzip',
        banner: copyright,
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      build: {
        src: files,
        dest: 'dist/esri-leaflet-renderers.js'
      }
    },

    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        headers: {
          // 1 Year cache policy (1000 * 60 * 60 * 24 * 365)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },
      dev: {
        upload: [
          {
            src: 'dist/*',
            dest: 'esri-leaflet-renderers/<%= pkg.version %>/'
          }
        ]
      }
    },

    releaseable: {
      release: {
        options: {
          remote: 'upstream',
          dryRun: grunt.option('dryRun') ? grunt.option('dryRun') : false,
          silent: false
        },
        src: [ 'dist/**/*.js','dist/**/*.map' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-releaseable');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['test', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'karma:run']);
  grunt.registerTask('prepublish', ['concat', 'uglify']);
  grunt.registerTask('release', ['releaseable', 's3']);
}
