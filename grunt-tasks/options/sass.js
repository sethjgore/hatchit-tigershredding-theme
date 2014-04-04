/**
 * Sass taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dist: {
    files: {
      'sass/style.css':'sass/style.sass',
      'sass/shame/ie.css' : 'sass/shame/ie.sass'
    },
    options: {
      lineNumbers: true,
      sourcemap: true,
      loadPath: 'bower_components'
    }
  },
  ie: {
    files: {
      'sass-ie/style.css':'sass-ie/style.sass',
      'sass-ie/shame/ie.css' : 'sass-ie/shame/ie.sass'
    },
    options: {
      lineNumbers: false,
      sourcemap: false,
      loadPath: 'bower_components'
    }
  },

}