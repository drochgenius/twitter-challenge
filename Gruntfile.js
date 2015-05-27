module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					require: true,
					console: true,
					module: true,
					__dirname: true
				},
			},
			files: {
				src: ['Gruntfile.js', 'app/**/*.js']
			}
		},
		concat: {
			dist: {
				src: 'js/**/*.js',
				dest: 'build/application.js'
			}
		},
		uglify: {
			dist: {
				src: 'build/bundle.js',
				dest: 'build/bundle.min.js'
			}
		},
		clean: {
			build: ['build']
		},
		browserify: {
			options: {
				transform: ['brfs'],
				debug: true
			},
			debug: {
				files: {
					'build/application.js': 'app/app.js'
				}
			}
		},
		// Grunt express - our webserver
		// https://github.com/blai/grunt-express
		express: {
			all: {
				options: {
					bases: ['D:\\AppDirect\\twitter-challenge'],
					port: 8080,
					hostname: "0.0.0.0",
					livereload: true
				}
			}
		},

		// grunt-watch will monitor the projects files
		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			app: {
				files: ['app/**/*.js', 'app/**/*.mu', 'sass/*.sass'],
				tasks: ['build'],
				options: {
					interrupt: true
				}
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Creates the `server` task
	grunt.registerTask('serve', [
		'express',
		'open',
		'watch'
	]);

	// Tasks
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['clean', 'browserify:debug']);
	grunt.registerTask('default', ['build', 'watch:app']);
};