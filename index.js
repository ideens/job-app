import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import { port, dbURI } from './config/environment.js'

const app = express()

const startServers = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database connected successfully')
    app.use(express.json())

    // Logger
    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} = ${req.url}`)
      console.log(req.query)
      next()
    })

    // Router
    app.use('/api', router)

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
