'use strict';
var colors = require('colors/safe');

exports.sendResponse = function(err, data){
  var status = err ? 'ko' : 'ok';
  var tmpData = err ? err : data;
  console.log(colors[err ? 'red' : 'cyan'](
    '[Response] Url:' + this.req.baseUrl + ' Status: ' + status + ' Method: ' + this.req.method
  ));
  if(err){
    console.log(colors.red('[Error] :' + err));
  }
  this.setHeader('Content-Type', 'application/json');
  this.send(JSON.stringify({
    status: err ? 'ko' : 'ok',
    data: tmpData
  }));
}
