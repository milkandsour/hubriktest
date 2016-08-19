'use strict';
var commands = require("../dao/commands.js");
var validations = require("../validations/commands.js");

var sendResponse = function(err, data){
  this.setHeader('Content-Type', 'application/json');
  this.send(JSON.stringify({
    status: err ? 'ko' : 'ok',
    data: err ? err : data
  }));
}

exports.list = function(req, res){
  commands.list(sendResponse.bind(res));
};

exports.get = function(req, res){
  if(req.params.id){
    commands.get(req.params.id, sendResponse.bind(res));
  }else{
    sendResponse.call(
      res, "...Sure, a get call with nothing to search for"
    );
  }
};

exports.add = function(req, res){
  if(req.body && validations.validateCreateCommand(req.body)){
    commands.add(req.body, sendResponse.bind(res));
  }else{
    sendResponse.call(res, "...Very nice, but there is something wrong in the payload");
  }
};

exports.update = function(req, res){
  if(req.body && req.params.id && validations.validateUpdateCommand(req.body)){
    if(req.body.hasOwnProperty('id')){
      delete req.body.id;
    }
    commands.update(req.params.id, req.body, sendResponse.bind(res));
  }else{
    sendResponse.call(res, "...Great, but there is something wrong in the payload");
  }
};

exports.delete = function(req, res){
  if(req.params.id){
    commands.delete(req.params.id, sendResponse.bind(res));
  }else{
    sendResponse.call(res, "...You forgot the id");
  }
};
