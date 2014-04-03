/**
 * Middleman taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dev: {
    options:{
      mangle: false,
      beautify: true
    },
    files: {
      'js/script.js' : ['bower_components/conditionizr/src/conditionizr.js', 'bower_components/owlcarousel/owl-carousel/owl.carousel.js' , 'js/tigershredding.js']
    }
  },
  polyfills: {
    files: {
      'js/ios.js':['js/parser.js', 'js/tokenizer.js', 'js/vminpoly.js'],
    }
  },
  pySelect:{
    files: {
      'js/selectivizr.js':['bower_components/selectivizr/selectivizr.js']
    }
  },
  pyRem:{
    options:{
       mangle: false,
      beautify: true
    },
    files: {
      'js/rem.js':['bower_components/REM-unit-polyfill/js/rem.js']
    },
  },
  pyMedia:{
      options:{
       mangle: false,
      beautify: true
    },
    files: {
      'js/respond.js':['bower_components/respond/src/respond.js']
    },
  }
}