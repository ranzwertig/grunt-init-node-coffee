'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffee: {
      module: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: 'src/',      // Src matches are relative to this path.
          src: ['**/*.coffee'], // Actual pattern(s) to match.
          dest: '.',   // Destination path prefix.
          ext: '.js'   // Dest filepaths will have this extension.
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      bin: {
        src: ['bin/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    jasmine_node: {
      specNameMatcher: ".spec", // load only specs containing specNameMatcher
      projectRoot: "test/",
      requirejs: false,
      forceExit: true,
      matchall: false,
      extensions: 'js',
      jUnit: {
        report: false,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      }
    },
    watch: {
      default: {
        files: ['src/**/*.coffee'],
        tasks: 'default'
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['coffee', 'jshint:lib']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['coffee', 'jshint:test']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Default task.
  grunt.registerTask('default', ['coffee', 'jasmine_node', 'jshint']);

};
