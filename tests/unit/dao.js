'use strict';
var chai = require('chai');
var path = require('path');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var commands = require("../../src/dao/commands.js");
var workflows = require("../../src/dao/workflows.js");

commands.fileName = path.join(__dirname, 'commands.json');
workflows.fileName = path.join(__dirname, 'workflows.json');

var commmandsMock = require('./commands.json')
var commmandsMock = require('./workflows.json')

describe('Dao', function(done){
  var commandMock = {
    "rule":"function(){return true;}",
    "false_id":'1',
    "true_id":'1'
  };
  describe('commands', function(done){
    it('get an existing command', function(done){
      commands.get("6", function(err, data){
        expect(err).to.deep.null;
        expect(data).to.deep.equal(commandMock);
        done();
      })
		});
    it('add / delete a command', function(done){
      commands.add(commandMock, function(err, data){
        expect(err).to.deep.null;
        commands.get(data.id, function(err, data){
          expect(err).to.deep.null;
          expect(data).to.deep.equal(commandMock);
          commands.delete(data.id, function(err, data){
            expect(err).to.deep.null;
            done();
          });
        })
      })
		});
    it('add / delete a command with custom id', function(done){
      commandMock['id'] = '13231231231231231231';
      commands.add(commandMock, function(err, data){
        expect(err).to.deep.null;
        commands.get('13231231231231231231', function(err, data){
          expect(err).to.deep.null;
          expect(data).to.deep.equal(commandMock);
          delete commandMock.id
          commands.delete('13231231231231231231', function(err, data){
            expect(err).to.deep.null;
            done();
          });
        })
      });
		});
    it('execute an existing command', function(done){
      commands.execute('6', {}, function(err, data){
        expect(err).to.null;
        expect(data).to.deep.equal([
          { executed: '6', result: true, next: '1'},
          { executed: '1', result: true, next: null } 
        ]);
        done();
      });
    });
    it('get a not existing command give an empty object', function(done){
      commands.get('32131231231312312312', function(err, data){
        expect(data).to.be.empty;
        done();
      });
		});
    it('adding an new command with added id give an error', function(done){
      commandMock['id'] = '6';
      commands.add(commandMock, function(err, data){
        expect(err).to.not.be.null;
        delete commandMock.id;
        done()
      })
		});
    it('execute a not existing command give an error', function(done){
      commands.execute('e31312312312313123131313123131231231312312313123131', {}, function(err, data){
        expect(err).to.not.be.null;
        done();
      });
    });
    it('remove not existing command give an error', function(done){
       commands.delete('e31312312312313123131313123131231231312312313123131', function(err, data){
        expect(err).to.not.be.null;
        done();
      });
    });
  });
  var workflowMockNoCircular = {
    "start_id":'6',
    "object":{}
  };
  var workflowMockCircular = {
    "start_id":'2',
    "object":{}
  };
  describe('workflows', function(done){
		it('add / delete a workflow', function(done){
      workflows.add(workflowMockNoCircular, function(err, data){
        expect(err).to.be.null;
        expect(data).to.deep.equal({
          id: data.id,
          flow: [
            {executed: '6', result: true, next: '1'},
            {executed: '1', result: true, next: null}
          ]
        });
        done();
      })
		});
    it('add with custom commands and circular dependency', function(done){
      workflows.add(workflowMockCircular, function(err, data){
        expect(err).to.not.be.null;
        expect(err).to.equal("[commands.execute] circular dependency found");
        done();
      })
		});
  });
});
