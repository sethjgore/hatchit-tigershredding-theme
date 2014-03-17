/**
 * Sass taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dist: {
    files: {
      'sass/style.css':'sass/style.sass'
    },
    options: {
      lineNumbers: true,
      sourcemap: true,
      loadPath: 'bower_components'
    }
  }
}