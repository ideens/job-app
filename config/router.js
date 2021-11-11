import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'
import {
  addAPost,
  getAllPosts,
  getSinglePost,
  removePost,
  updatePost,
} from '../controllers/posts.js'
import { secureRoute } from './secureRoute.js'

// Invoking a router
const router = express.Router()

// Setting up a route
router.route('/users').get(getUserProfile)
router.route('/posts').get(getAllPosts).post(secureRoute, addAPost)
router
  .route('/posts/:id')
  .get(getSinglePost)
  .delete(secureRoute, removePost)
  .put(secureRoute, updatePost)

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router
