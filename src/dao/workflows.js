'use strict';
var utils = require('./utils.js');
var commands = require('./commands.js');
var path = require('path');

exports.fileName = path.join(__dirname, '..', '..', 'data', 'workflows.json');

exports.list = function(callback){
  utils.readData(this.fileName, callback);
};

exports.add = function(workflow, callback){
  var self = this;
  if(workflow){
    this.list(function(err, data){
      if(!err){
        if(typeof data !== 'object'){
          data = {};
        }
        var id = utils.getUUID();
        commands.execute(workflow.start_id, {}, function(err, stack){
          if(!err){
            data[id] = {id:id, flow: stack};
            utils.rewriteData(self.fileName, data, function(err){
              callback(err, data[id]);
            });
          }else{
            callback(err);
          }
        });
      }else{
        callback(err);
      }
    });
  }else{
    callback('no data provided');
  }
};

exports.delete = function(id, callback){  
  var self = this;
  this.list(function(err, data){
    if(id){
      if(!err && data.hasOwnProperty(id)){
        delete data[id];
        utils.rewriteData(self.fileName, data, callback);
      }else{
        callback(err || 'cannot delete, workflow do not exists');
      }
    }else{
      utils.rewriteData(self.fileName, {}, callback);
    }
  });
};
