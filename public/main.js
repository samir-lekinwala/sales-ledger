// import { readFile } from 'node:fs/promises'
// import * as Path from 'node:path'

// const publicFolder = Path.resolve('public')
// server.use(express.static(publicFolder))
// server.use(express.urlencoded({ extended: false }))

async function addToDatabase() {
  const data = await readFile('/data/data.json')
  const parsed = JSON.parse(data)
  console.log(parsed)
}

addToDatabase()
