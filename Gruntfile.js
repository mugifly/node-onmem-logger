module.exports = function(grunt) {

	// Configurations
	grunt.initConfig({

		// Read the package.json
		pkg: grunt.file.readJSON('package.json'),

		// Lint with using grunt-eslint
		eslint: {
			target: '.'
		},

		// Test with using grunt-mocha-test
		mochaTest: {
			test: {
				src: ['tests/*.js']
			}
		}

	});

	// Load tasks
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Register tasks
	grunt.registerTask('test', ['eslint', 'mochaTest']);
	grunt.registerTask('default', ['test']);

};
