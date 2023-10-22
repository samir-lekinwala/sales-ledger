import * as Path from 'node:path'
import { readFile } from 'node:fs/promises'

import express from 'express'
import hbs from 'express-handlebars'
import { writeFile } from 'node:fs/promises'
// import { readFile } from 'node:fs/promises'
// import puppiesRouter from './routes.js'
const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  res.render('home')
})

async function readData() {
  const data = await readFile('server/data/data.json')
    .then(function (result) {
      const parsed = JSON.parse(result)
      return parsed
    })
    .catch(function (error) {
      console.log(error)
    })
  return data
  // console.log(data)
}

server.post('/salessubmit', async (req, res) => {
  const originalData = await readData()
  const { itemSoldInput, itemPriceInput, platform } = req.body
  const newSaleData = {
    id: originalData.sales.length + 1,
    itemSold: itemSoldInput,
    price: itemPriceInput,
    platform: platform,
  }
  originalData.sales.push(newSaleData)
  console.log(originalData.sales)
  await writeFileToDatabase(originalData)
  res.redirect('/')
})

async function writeFileToDatabase(data) {
  const jsonData = JSON.stringify(data, null, 2)
  const newData = writeFile('server/data/data.json', jsonData, 'utf-8')
  return newData
}

export default server
