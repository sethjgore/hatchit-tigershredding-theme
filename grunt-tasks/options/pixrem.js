/**
 * Pix-Rem tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  options: {
    rootValue: '100%',
    replace: true
    },
  dist:{
    src: 'style.css',
    dest: 'sass/shame/ie8.css'
  }
}