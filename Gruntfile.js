'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

      jshint: {
          all: [
            'Gruntfile.js',
            'js/*.js',
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
 
      watch: {
          options: {
            livereload: '<%= connect.options.livereload %>', 
          },
 
          sass: {
            files: ['scss/**/*.scss'],
            tasks: ['sass:dev', 'autoprefixer'],
            options: {
                spawn: false,
                livereload: {
                  host: 'localhost',
                  port: 9000
                }
            }
          }, 
          gruntfile: {
            files: ['Gruntfile.js']
          },
          livereload: {
            options: {
              livereload: '<%= connect.options.livereload %>',
            },
            files: [
              '**/*.{html,js,scss,json}',
              '*.html',
              '.tmp/{,*/}*.css'
            ]
          }
      },
    
      sass: {
          options: {
              sourceMap: true,
              outputStyle: 'expanded',
              precision: 4,
              livereload: '<%= connect.options.livereload %>'
          },
          dist: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            files: {
              'css/style.css': 'scss/style.scss'
            },
          },
          dev: {
            options: {
              sourceMap: true,
              outputStyle: 'compressed'
            },
            files: {
              'css/style.css': 'scss/style.scss'
            }
          }
      },

      autoprefixer:{
        options: {
            map: true
        },
        dist:{
          files:{
            'css/style.css':'css/style.css'
          }
        }
      },

      
      // The actual grunt server settings
      connect: {
        options: {
          port: 9000,
          // Change this to 'localhost' to restrict access from outside.
          hostname: 'localhost',
          livereload: 34729
        },
        livereload: {
          options: {
            open: true,
            base: 'dist',
            middleware: function (connect) {
              return [
                connect().use(
                  'scss',
                  connect.static('scss')
                )
              ];
            }
          }
        },
        dist: {
          options: {
            open: true,
            base: 'dist'
          }
        }
      },
 
  });

     
    //grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-sass'); 
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');


    grunt.registerTask('test', ['clean', 'svgstore', 'nodeunit']);
    grunt.registerTask('default', ['connect:livereload', 'watch',  'sass:dev']);
    grunt.registerTask('server', ['connect','watch']);

};
