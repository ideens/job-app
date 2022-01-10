import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import { port, dbURI } from './config/environment.js'
import path from 'path'

const app = express()
const __dirname = path.resolve()
const startServers = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database connected successfully')
    app.use(express.static(`${__dirname}/front-end/build`))
    app.use(express.json())

    // Logger
    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} = ${req.url}`)
      next()
    })

    // Router
    app.use('/api', router)

    app.use('/*', (_, res) => res.sendFile(`${__dirname}/front-end/build/index.html`))

    // Catch-all
    app.use((_req, res) => {
      res.status(404).json({ message: 'Not Found' })
    })

    app.listen(port, () => console.log('Listening'))
  } catch (err) {
    console.log('ERROR')
    console.log(err)
  }
}

startServers()
