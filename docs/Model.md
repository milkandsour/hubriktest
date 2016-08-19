# Model

The application has commands and workflows, and a restful interface.
The restful interface has the following endpoints:

- /commands
- /worklows

If you want to play and understand all the endpoints, just jump to the section [Manual test/Unit test](Test.md).
The manual testing it is all about curl http request

Command are stored and can be reused, workflow are just executed and only the execution stack it is stored.

### Command

#### example command

```
{
  "id":"235",
  "rule":"function(){return true;}",
  "false_id":"1",
  "true_id":"1"
}
```

- Id it is the id of the command, could be passed in the payload or, if not, 
created server side
- Rule it is the code that the command execute.
- [false/true]_id indicate the next command that has to be executed in case "Rule" return true or false

### Workflow

This is were I simplified a bit the specifications. 
Not being able to discuss it with anyone, I jumped to these conclusions:

- no need to create rules from the workflow paylolad directly, too much nested job.
- being no circular and being the commands executed sequentially, to start a worflow only the first command id it is needed

```
{
  "start_id":6,
  "object":{}
}
```

- start_id the id of the first command
- object the payload passed through the flow

