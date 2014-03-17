/**
 * GoreBoiler Grunt Setup
 */

/**
 * Load configuration files for Grunt
 * @param  {string} path Path to folder with tasks
 * @return {object}      All options
 */

var xtend = require('xtend');

/**
 * Load configuration files for Grunt
 * @param  {string} path Path to folder with tasks
 * @return {object}      All options
 */
var loadConfig = function (path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', { cwd: path }).forEach(function (option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
};

/*
 * Call Grunt configuration
 */
module.exports = function (grunt) {

  // Measure time of grunt tasks
  require('time-grunt')(grunt);

  var config = xtend({
    pkg: require('./package')
  }, loadConfig('./grunt-tasks/options/'));

  // Load project configuration
  grunt.initConfig(config);

  // Load the tasks (only those prepended with "grunt-")
  require('load-grunt-tasks')(grunt);

  // A task for development
  grunt.registerTask('default', ['copy:fonts','concurrent:setUpEnv',
        'concurrent:watchFiles'
  ]);

  // A task for deployment
  grunt.registerTask('build', [
        'clean',
        'copy'
  ]);

};


//TEMPORARY FIX for ENDING MAMP WHEN HITS CRTL + C
var exec = require('child_process').exec;
process.on('SIGINT', function () {
    exec('/Applications/MAMP/bin/stop.sh', function () {
        process.exit();
    });
});