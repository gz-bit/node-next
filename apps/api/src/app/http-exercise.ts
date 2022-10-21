import * as http from 'http'
import { messageForm } from './snippets/http/messageForm'

export const httpExercise = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  switch(url){

    case '/': {
      res.write(`
        <h1>Welcome to the HTTP Exercise!</h1>
      `)
      res.write(messageForm('User Name'))
      res.write(`
        <a href="/users">Users</a>
      `)
      res.end()
      break
    }

    case '/message': {
      if (method == 'POST') {
        const body = []
        req.on('data', (chunk) => body.push(chunk))
        req.on('end', () => {
          const parsedBody =Buffer.concat(body).toString() // message=Das+ist+ein+Test
          const userName = parsedBody.split('=')[1].split('+').join(' ')
          console.log(userName)
        })
      }
      res.statusCode = 302
      res.setHeader('Location', '/')
      return res.end()
    }

    case '/users': {
      res.write(`
        <h1>Users</h1>
        <ul>
          <li>Max</li>
          <li>Moritz</li>
          <li>and G&uuml;nther</li>
        </ul>
        <a href="/">Home</a>
      `)
      res.end()
      break
    }

    default: {
      res.setHeader('Content-Type', 'text/html')
      res.write(`
        <h3>This route is not supported.</h3>
        <a href="/">Home</a>
      `)
      res.end()
    }
  }
})