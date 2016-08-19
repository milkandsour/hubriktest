# Server

#### start / stop the server

```
grunt server:start
```

Start a nodejs server on http://localhost:3000, unfortunately not in watch mode.
Source files modification requires a server restart, and this command will do the job.

```
grunt server:stop
```

Start the nodejs server on http://localhost:3000

#### colorful log
The server writes the log in text files in the folder server/logs with a miserable black and white fashion.
If you instead start the server manually...

```
node src/index.js
```

or

```
npm start
```
