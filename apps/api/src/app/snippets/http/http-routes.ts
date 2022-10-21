import * as fs from 'fs'
import { messageForm } from './messageForm';
import path = require('node:path')

const httpRoutes = (req, res) => {
  const { url, method } = req
  // process.exit()
  switch (url) {
    case '/': {
      res.setHeader('Content-Type', 'text/html')
      res.write(messageForm('Message'))
      res.end()
      break
    }

    case '/api': {
      res.setHeader('Content-Type', 'text/json')
      res.write('{ "server": "httpServer" }')
      res.end()
      break
    }

    case '/message': {
      if (method == 'POST') {
        const body = []
        req.on('data', (chunk) => {
          //console.log(chunk)
          body.push(chunk)
        })
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString() // message=Das+ist+ein+Test
          const message = parsedBody.split('=')[1].split('+').join(' ')
          
          //            V-- . stands for project root "node-next"
          const file = "./apps/api/src/app/snippets/http/message.txt"
          fs.writeFile(
            file,           //file
            message,        // content
            (err) => {      // callback
              if (err) console.log(err.message)
              console.log({message})
              console.log(`File written to ${path.parse(file).dir}`)
              res.statusCode = 302
              res.setHeader('Location', '/')
              return res.end()
            }        
          )
        })
      }
      break
    }

    default: {
      res.setHeader('Content-Type', 'text/html')
      res.write('<h1>API on port 3333</h1>')
      res.end()
    }
  } 
}
export default httpRoutes



