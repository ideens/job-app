import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import User from '../models/users.js'
import devData from './data/devsSeed.js'
import bossData from './data/bossesSeed.js'
import Job from '../models/jobs.js'
import jobsData from './data/jobsSeed.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database connected')

    // drop database deletes the db entirely
    await mongoose.connection.db.dropDatabase()
    console.log('DB dropped')

    // seed the users - add user data into db
    const devs = await User.create(devData)
    const bosses = await User.create(bossData)

    const jobsAdded = await Job.create(jobsData)
    console.log('JOBS ADDED - ', jobsAdded)

    // close the connection to the db
    await mongoose.connection.close()
    console.log('Connection closed')
  } catch (err) {
    console.log(err)
    // close connection to the db
    await mongoose.connection.close()
    console.log('ERROR - connection closed')
  }
}

seedDatabase()
