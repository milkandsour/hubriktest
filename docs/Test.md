# Test

Unitest and Manual testing

#### Unitest
```
grunt unit
```
Run all the unitest in fantastic nyancat fashion with mocha

#### Manual testing

The "application" I wrote the application exposes restful api, 
in the sample folder you will find few useful example. 

```
curl -X GET --header "Content-Type: application/json" http://localhost:3000/commands
```

Get all the available commands

```
curl -X POST -d @sample/command.json --header "Content-Type: application/json" http://localhost:3000/commands
```

Create a new command, if the given payload validate.

```
curl -X GET --header "Content-Type: application/json" http://localhost:3000/commands/235
```

Search for the command with id 235

```
curl -X PUT -d @sample/commandUpdate.json --header "Content-Type: application/json" http://localhost:3000/commands/235
```

Modify the command 235, if the given payload validate and the command exist

```
curl -X DELETE --header "Content-Type: application/json" http://localhost:3000/commands/235
```

Delete the command 235, if exists.

```
curl -X POST -d @sample/workflow.json --header "Content-Type: application/json" http://localhost:3000/workflows
```

Execute a new workflow and store the flow, if the payload validate, the commands already exists and they execute correctly

```
curl -X GET --header "Content-Type: application/json" http://localhost:3000/workflows
```

List all the executed workflows

```
curl -X DELETE --header "Content-Type: application/json" http://localhost:3000/workflows
```

Delete all the workflows

```
curl -X DELETE --header "Content-Type: application/json" http://localhost:3000/workflows/636568
```

Delete the workflow with id 636568, if exists
