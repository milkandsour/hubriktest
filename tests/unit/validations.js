var chai = require('chai');
var expect = chai.expect;
var commands = require("../../src/validations/commands.js");
var workflows = require("../../src/validations/workflows.js");

describe('Validations', function(){
  describe('commands', function(){
		it('validate with expected payload', function() {
			expect(commands.validateCreateCommand({
        title:'test',
        true_id: 7, 
        false_id: 100000000,
        rule: 'function(){tertreterter}'
      })).to.be.true;
    });
    it('validate with not expected payload', function() {
			expect(commands.validateCreateCommand({})).to.be.false;
      expect(commands.validateCreateCommand({
        true_i________d: 7,
        false_id: 100000000,
        rule: 'function(){tertreterter}'
      })).to.be.false;
      expect(commands.validateCreateCommand({
        true_id: 7,
        false__________id: 100000000,
        rule: 'function(){tertreterter}'
      })).to.be.false;
      expect(commands.validateCreateCommand({
        true_id: 7,
        false_id: 100000000,
        rule: 'asd(){tertreterter}'
      })).to.be.false;
      expect(commands.validateCreateCommand({
        true_id: 7,
        false_id: "tetetetetete",
        rule: 'function(){tertreterter}'
      })).to.be.false;
    });
  });
  describe('workflows', function(){
		it('validate with expected payload', function() {
			expect(workflows.validateWorkflow({
        start_id:9,
        object:{}
      })).to.be.true;
      expect(workflows.validateWorkflow({
        start_id:9,
        object:{},
        commands:[]
      })).to.be.true;
    });
    it('validate with not expected payload', function() {
			expect(workflows.validateWorkflow({})).to.be.false;
      expect(workflows.validateWorkflow({
        object:{}
      })).to.be.false;
      expect(workflows.validateWorkflow({
        start_id:9,
      })).to.be.false;
    });
  })
});
