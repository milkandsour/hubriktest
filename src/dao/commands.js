'use strict';
var path = require('path');
var utils = require('./utils.js');
var colors = require('colors/safe');

exports.fileName = path.join(__dirname, '..', '..', 'data', 'commands.json');

exports.list = function(callback){
  utils.readData(this.fileName, callback);
};

exports.get = function(id, callback){
  utils.readData(this.fileName, function(err, data){
    if(id && data && data.hasOwnProperty(id)){
      callback(err, data[id]);
    }else{
      callback(err, {});
    }
  });
};

exports.add = function(command, callback){
  var self = this;
  if(command){
    this.list(function(err, data){
      if(!err && (!command.hasOwnProperty('id') || !data.hasOwnProperty(command.id))){
        if(typeof data !== 'object'){
          data = {};
        }
        var id = command.id || utils.getUUID();
        command['id'] = id;
        data[id] = command;
        utils.rewriteData(self.fileName, data, function(err){
          callback(err, data[id]);
        });
      }else{
        callback(err || '[commands.add] cannot create, command exists');
      }
    });
  }else{
    callback('[commands.add] no data provided');
  }
};

exports.update = function(id, command, callback){
  var self = this;
  if(command && id){
    this.list(function(err, data){
      if(!err && data.hasOwnProperty(id)){
        var tmp = Object.assign(data[id], command)
        data[id] = tmp;
        utils.rewriteData(self.fileName, data, callback);
      }else{
        callback(err || '[commands.update] cannot update, command do not exists');
      }
    });
  }else{
    callback('[commands.update] no data or id provided');
  }
  
};

exports.delete = function(id, callback){
  var self = this;
  if(id){
    this.list(function(err, data){
      if(!err && data.hasOwnProperty(id)){
        delete data[id];
        utils.rewriteData(self.fileName, data, callback);
      }else{
        callback(err || '[commands.delete] cannot delete, command do not exists');
      }
    });
  }else{
    callback('[commands.delete] no id provided', null);
  }
};

exports.execute = function(id, payload, callback, stack, executed){
  var self = this;
  if(!stack){
    stack = [];
  }
  if(id){
    this.get(id, function(err, data){
      if(!err && data.hasOwnProperty('rule')){
        var result = eval('(' + data['rule'] + ')')(payload);
        if(typeof result === 'boolean'){
          var next = data[result.toString()+'_id'];
          stack.push({executed: id, result: result, next: next});
          if(!executed){
            executed = [];
          }
          if(executed.indexOf(next) === -1){
            executed.push(id)
            console.log(colors[result ? 'green' : 'red']('[+] Comand '+id+' executed, next: '+next));
            if(next){
              self.execute(next, payload, callback, stack, executed);
            }else{
              callback(err, stack);
            }
          }else{
            callback('[commands.execute] circular dependency found');
          }
        }else{
          callback('[commands.execute] something very wrong it is going on with '+id+', do not works at all');
        }
      }else{
        callback(err || '[commands.execute] cannot execute, seems that the rule for the command '+id+' do not works or do not exists');
      }
    });
  }else{
    callback('[commands.execute] no id provided, cannot execute');
  }
};
