import * as http from 'http'
import httpRoutes from './snippets/http/http-routes';

export const httpServer = http.createServer(
  (req, res) => httpRoutes(req, res)
)

