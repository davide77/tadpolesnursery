'use strict';

module.exports = function (grunt) {
 
  grunt.initConfig({

      jshint: {
          all: [
            'Gruntfile.js',
            'app/js/*.js',
            '<%= nodeunit.tests %>'
          ],
          options: {
            jshintrc: '.jshintrc'
          }
      },

      clean: {
        test: [
          'test/tmp',
          '.sass-cache'
        ]
      },

      nodeunit: {
        tests: ['test/test.js']
      },

      sass: {
          files: ['scss/**/*.scss'],
          tasks: ['sass:dev', 'autoprefixer'],
          dist: {
              options: {
                  sourceMap: true,
                  lineNumbers: true,
                  loadPath: 'scss/**/*', 
                  outputStyle: 'compressed'
              },
              files: {
                  'app/css/style.css': 'scss/style.scss'
              }
          }
      },

      autoprefixer:{
        options: {
            map: true
        },
        dist:{
          files:{
            'app/css/style.css':'app/css/style.css'
          }
        }
      },

      connect: {
          options: {
              port: 9000,
              open: true,
              livereload: 35729,
              // Change this to '0.0.0.0' to access the server from outside
              hostname: 'localhost'
          },
          livereload: {
              options: {
                  base: 'app/'
              }
          }
      },
     
      watch: {
          options: {
              livereload: true
          },
          configFiles: {
              files: 'Gruntfile.js',
              options: {
                  reload: true
              }
          },
          sass: {
              files: ['scss/**/*.scss'],
              tasks: ['sass:dev', 'autoprefixer'],
              options: {
                  spawn: false, 
              }
          }, 
          livereload: {
              options: {
                  livereload: '<%= connect.options.livereload %>'
              },
              files: [
                  'app/*.html',
                  'app/css/*.css',
                  'app/js/*.js',
                  'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
              ]
          }
      }

    });

    grunt.loadNpmTasks('grunt-sass'); 
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('dev', ['sass', 'connect:livereload', 'watch']);
    grunt.registerTask('build', ['sass', ]);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('test', ['clean', 'nodeunit']);
};