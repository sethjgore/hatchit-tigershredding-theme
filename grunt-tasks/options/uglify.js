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
      'js/mediaqueries.js':['bower_components/css3-mediaqueries-js/css3-mediaqueries.js']
    },
  },
  pyShiv:{
      options:{
       mangle: false,
      beautify: true
    },
    files: {
      'js/html5shiv.js':['bower_components/html5shiv/dist/html5shiv.js']
    },
  }
}