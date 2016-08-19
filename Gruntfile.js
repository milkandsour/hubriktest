module.exports = function(grunt) {
  var package = require('./package.json');
  var path = require('path');
  var config = grunt.util._.extend({},
    require('load-grunt-config')(grunt, {
			configPath: path.join(__dirname, 'grunt/options'),
			loadGruntTasks: true,
			init: false
		}), {
			pkg: package
		}
  );
  grunt.loadTasks('grunt/tasks');
  grunt.initConfig(config);
};

