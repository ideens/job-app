import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import { secret } from './environment.js'

// barrier before routes
export const secureRoute = async (req, res, next) => {
  try {
    // check if there's a token on the incoming request
    if (!req.headers.authorization) throw new Error()

    // extract the token from the request
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('TOKEN - ', token)

    // get the user information from the token
    const payload = jwt.verify(token, secret)
    console.log('PAYLOAD - ', payload)

    // find the user in the db, check if they exist
    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error('Header not found')

    // set a new key on request object
    console.log('CURRENT USER - ', userToVerify)
    req.currentUser = userToVerify

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
