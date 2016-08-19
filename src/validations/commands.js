'use strict';
exports.mandatory = {
  true_id: function(value){
    return value === null || /\d+/.test(value);
  }, 
  false_id: function(value){
    return value === null || /\d+/.test(value);
  }, 
  rule: function(value){
    return /function\(.*\).*\{.*\}/.test(value);
  }, 
};


exports.validateCreateCommand = function(command){
  var self = this;
  return Object.keys(self.mandatory).every(function(property){
    return command.hasOwnProperty(property) && self.mandatory[property](
      command[property]
    );
  })
};

exports.validateUpdateCommand = function(command){
  var self = this;
  return Object.keys(self.mandatory).every(function(property){
    return !command.hasOwnProperty(property) || self.mandatory[property](
      command[property]
    );
  })
};
