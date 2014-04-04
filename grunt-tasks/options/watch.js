/**
 * WATCH tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  scripts : {
    files: ['js/tigershredding.js'],
    tasks: ['uglify']
  },
  haml : {
    files: ['haml/*.haml'],
    tasks : ['haml:layouts', 'haml:templates', 'haml:partials']
  },
  sass : {
    files: ['sass/**/**/*.{sass, scss}','sass-ie/**/**/*.{sass, scss}'],
    tasks : ['sass', 'concat']
  },
  autoprefixer: {
    files: ['sass/style-unprefixed.css','sass-ie/style-unprefixed.css'],
    tasks: ['autoprefixer','pixrem']
  },
  coffee : {
    files: ['_themes/**/js/*.coffee'],
    tasks: ['coffee']
  },
  livereload: {
    files: ['*.html', '*.php', 'js/**/*.{js,json}', '*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
    options: {
      livereload: true
    }
  }
}