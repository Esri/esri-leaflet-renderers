// https://github.com/Esri/esri-leaflet/pull/1125
// import config from '../node_modules/esri-leaflet/profiles/base.js';

import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';

var pkg = require('../package.json');
var copyright = '/* ' + pkg.name + ' - v' + pkg.version + ' - ' + new Date().toString() + '\n' +
                ' * Copyright (c) ' + new Date().getFullYear() + ' Environmental Systems Research Institute, Inc.\n' +
                ' * ' + pkg.license + ' */';

var config = {
  input: 'src/EsriLeaflet.js',
  external: ['leaflet', 'esri-leaflet', 'esri-leaflet-cluster'],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: false,
      browser: false,
      extensions: [ '.js', '.json' ]
    }),
    json()
  ],

  output: {
    banner: copyright,
    format: 'umd',
    name: 'L.esri',
    globals: {
      'leaflet': 'L',
      'esri-leaflet': 'L.esri'
    },
    sourcemap: true
  }
};

// end needless duplication
config.input = 'src/EsriLeafletRenderers.js';
config.output.name = 'L.esri.Renderers';
config.output.sourcemap = true;

export default config;
