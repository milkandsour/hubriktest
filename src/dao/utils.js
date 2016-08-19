'use strict';
var fs = require('fs');

exports.getUUID = function(){
  return Math.floor(Math.random(100)*1000000);
};

exports.readData = function(fileName, callback){
  fs.readFile(fileName, 'utf8', function(err, data){
    callback(err, data && JSON.parse(data));
  });
};

exports.rewriteData = function(fileName, data, callback){
  fs.writeFile(fileName, JSON.stringify(data), callback);
}
