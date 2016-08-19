'use strict';

var path = require('path');
var root = {root:  path.join(__dirname, '..')};
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var commands = require('./routes/commands.js');
var workflows = require('./routes/workflows.js');
var colors = require('colors/safe');

app.get('/shutdown', function() {
	console.log(colors.yellow('I feel so lonely, unhappy...I will kill myself!!'));
	server.close(function() {
		console.log(colors.red('Goodbye cruel world!'));
		process.exit()
	});
});

app.use(bodyParser.json());
app.use('/commands', commands);
app.use('/workflows', workflows);

app.listen(3000, function(){
	console.log(colors.rainbow('Listening at http://locahost:3000'));
});
