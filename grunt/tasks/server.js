'use strict';
module.exports = function (grunt) {
	grunt.registerTask('server', 'Start/Stop the server', function(action){
		if(!action || action === 'start'){	
			grunt.task.run([
				'exec:pm2Delete',
				'exec:pm2Start'
			]); 
		}else{
			grunt.task.run([
				'exec:pm2Stop',
				'exec:pm2Delete'
			]);
		}
	});
};

