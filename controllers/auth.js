import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

// register a user

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log('NEW USER - ', newUser)
    return res.status(202).json({ message: `Hello, ${newUser.firstName}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

// log in the user
export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('USER - ', userToLogin)
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }

    //token
    const token = jwt.sign({ sub: userToLogin._id }, secret, {
      expiresIn: '7 days',
    })

    return res
      .status(200)
      .json({ message: `Hello again ${userToLogin.email}`, token: token })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorised' })
  }
}

export const userToLogin = await User.findOne
