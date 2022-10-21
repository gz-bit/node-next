import { expressServerJack } from "./app/express-server-jack"
import { expressServer } from './app/express-server'
import { httpServer } from './app/http-server'
import { httpExercise } from './app/http-exercise'

enum Option {
  http = 'httpServer',
  exercise = 'httpExecrcise',
  jack = 'expressServerJack',
  express = 'expressServer'
}

let server
const option = Option.express
if (option == Option.express) {server = expressServer} 
else if (option == Option.http) {server = httpServer}
else if (option == Option.exercise) {server = httpExercise}
else if (option == Option.jack) {server = expressServerJack}

const port = process.env.port || 3333;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
