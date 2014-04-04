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
    src: 'sass-ie/style-ie.css',
    dest: 'sass/shame/ie8.css'
  },
  ie:{
    src: 'sass/shame/ie.css',
    dest: 'sass/shame/ie-px.css'
  }
}