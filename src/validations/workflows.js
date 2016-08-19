'use strict';
var commandsValidations = require('./commands.js');

exports.mandatory = {
  start_id: /\d+/,
  object: {test: function(obj){return typeof obj === 'object'}}
};

exports.validateWorkflow = function(command){
  var self = this;
  return Object.keys(self.mandatory).every(function(property){
    return command.hasOwnProperty(property) && self.mandatory[property].test(
      command[property]
    );
  });
}
