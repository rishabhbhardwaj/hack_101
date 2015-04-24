module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    sass: {
	    options: {
	    	includePaths: ["bower_components/foundation/scss"]
	    },	
		dist: {
		    files: {
			'assets/css/app.css': ['assets/scss/app.scss']
		    }
		}
	    },

	    watch: {
		files: 'assets/scss/*.scss',
		tasks: ['sass']
	    }
     });

    // Load the plugin that provides the "sass" task.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'watch']);

};
