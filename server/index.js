import server from './server.js'

const port = 3003

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', port)
})
