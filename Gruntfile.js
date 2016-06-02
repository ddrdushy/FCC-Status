/*global module*/

/* Installing jscoverage on ubuntu trusty */
/* sudo apt-get install jscoverage */

module.exports = function (grunt) {
  'use strict';

  var gruntConfig = {};
  grunt.loadNpmTasks('grunt-contrib-jshint');
  gruntConfig.jshint = {
    options: { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true,
      indent: 2, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true,
      quotmark: true, regexp: true, undef: true, unused: true, strict: true, trailing: true,
      maxparams: 3, maxdepth: 2, maxstatements: 50},
    all: [
      'Gruntfile.js',
      'src/js/**/*.js'
    ]
  };
  grunt.initConfig(gruntConfig);
  grunt.registerTask('travis', ['jshint', 'test']);

  grunt.loadNpmTasks('grunt-contrib-qunit');
  gruntConfig.qunit = {
    src: ['src/test/index.html']
  };

  grunt.registerTask('test', 'qunit:src');

  gruntConfig.watch = {
    scripts: {
      files: ['src/**/*.*'],
      tasks: ['jshint', 'test']
    }
  };

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-qunit-cov');

  gruntConfig['qunit-cov'] = {
    test:
    {
      minimum: 0.99,
      baseDir: 'src',
      srcDir: 'src/js',
      depDirs: ['src/test', 'src/test/lib'],
      outDir: 'output/coverage',
      testFiles: ['src/test/index.html']
    }
  };

  grunt.registerTask('coverage', 'qunit-cov');

};
