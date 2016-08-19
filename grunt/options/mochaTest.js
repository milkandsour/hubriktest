'use strict';
var grunt= require('grunt');
module.exports= {
	test: {
		options: {reporter: 'nyan', quiet: false, clearRequireCache: false},
		src: ['tests/unit/*.js']
	}
}; 
