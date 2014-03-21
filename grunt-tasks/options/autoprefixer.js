/**
 * Autoprefixer tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  test:{
    files: { "style.css" : "sass/style-unprefixed.css"},
  }
}