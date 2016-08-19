'use strict';
var grunt= require('grunt');
module.exports= {
	pm2Flush: {
		cmd: 'node ./node_modules/pm2/bin/pm2 flush'
	},
	pm2Start: {
		cmd: 'node ./node_modules/pm2/bin/pm2 start server/server.json'
	},
	pm2Stop: {
		cmd: 'node ./node_modules/pm2/bin/pm2 stop server/server.json'
	},
	pm2Delete: {
		cmd: 'node ./node_modules/pm2/bin/pm2 delete server/server.json'
	}
};
