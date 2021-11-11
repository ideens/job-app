import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import User from '../models/users.js'
import devData from './data/devsSeed.js'
import Post from '../models/post.js'
import postData from './data/postsSeed.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database connected')

    // drop database deletes the db entirely
    await mongoose.connection.db.dropDatabase()
    console.log('DB dropped')

    // seed the users - add user data into db
    const users = await User.create(devData)

    const postsWithOwners = postData.map((post) => {
      post.owner = users[0]._id
      return post
    })

    const postsAdded = await Post.create(postData)
    console.log('NO. OF POSTS ADDED - ', postsAdded.length)

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
