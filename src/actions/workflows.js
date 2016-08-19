'use strict';
var workflows = require("../dao/workflows.js");
var validations = require("../validations/workflows.js");
var utils = require("./utils.js");

exports.list = function(req, res){
  workflows.list(utils.sendResponse.bind(res));
};

exports.add = function(req, res){
  if(req.body && validations.validateWorkflow(req.body)){
    workflows.add(req.body, utils.sendResponse.bind(res));
  }else{
    utils.sendResponse.call(res, "...Very nice try, but there is something wrong in the payload");
  }
};

exports.delete = function(req, res){
  if(req.params.id){
    workflows.delete(req.params.id, utils.sendResponse.bind(res));
  }else{
    workflows.delete(null, utils.sendResponse.bind(res));
  }
};
