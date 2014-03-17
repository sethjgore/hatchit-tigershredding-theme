/**
 * COPY tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  fonts: {
    cwd: 'bower_components',
    src: [ 'font-awesome/fonts/**'],
    dest: 'source/fonts',
    expand: true,
    filter: 'isFile',
    flatten: true
  }
}