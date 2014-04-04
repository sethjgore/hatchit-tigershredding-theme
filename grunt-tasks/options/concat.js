/**
 * CONCAT tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  sass: {
    src: [
          'theme-description.css',
          'sass-ie/style.css',
          'sass-ie/plugins/owl.carousel.css',
          'sass-ie/plugins/owl.theme.css',
          'sass-ie/zigzag.css'
          ],
    dest: 'sass-ie/style-unprefixed.css'
  },
  ie: {
    src: [
          'theme-description.css',
          'sass-ie/style.css',
          'sass-ie/plugins/owl.carousel.css',
          'sass-ie/plugins/owl.theme.css',
          'sass-ie/zigzag.css'
          ],
    dest: 'sass-ie/style-unprefixed.css'
  }
}