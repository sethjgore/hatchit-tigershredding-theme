/**
 * Middleman taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dev: {
    options:{
      mangle: false
    },
    files: {
      'js/script.js' : ['bower_components/conditionizr/src/conditionizr.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/owlcarousel/owl-carousel/owl.carousel.js' , 'js/tigershredding.js']
    }
  },
  polyfills: {
    files: {
      'js/ios.js':['js/parser.js', 'js/tokenizer.js', 'js/vminpoly.js'],
    }
  }
}