/**
 * Autoprefixer tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  options:{
    browsers: ['last 2 versions', 'ie 8','ie 9']
  },
  test:{
    files: { "style.css" : "sass/style-unprefixed.css"},
  },
  ie:{
    files: { "sass-ie/style-ie.css" : "sass-ie/style-unprefixed.css"},
  }
}