import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import {
  getAllUsers,
  getCurrentUser,
  getOneUser,
} from '../controllers/users.js'
import {
  addAComment,
  addAPost,
  getAllPosts,
  getSinglePost,
  removePost,
  updatePost,
} from '../controllers/posts.js'
import { secureRoute } from './secureRoute.js'
import {
  addProfile,
  deleteProfile,
  updateProfile,
} from '../controllers/profile.js'

// Invoking a router
const router = express.Router()

// Setting up a route
router.route('/users').get(getAllUsers)
router.route('/users/:id').get(secureRoute, getOneUser)
router.route('/me').get(secureRoute, getCurrentUser)
router.route('/me/profile').post(secureRoute, addProfile)
router
  .route('/profile/:id')
  .delete(secureRoute, deleteProfile)
  .put(secureRoute, updateProfile)

router.route('/posts').get(getAllPosts).post(secureRoute, addAPost)
router
  .route('/posts/:id')
  .get(getSinglePost)
  .delete(secureRoute, removePost)
  .put(secureRoute, updatePost)

router.route('/posts/:id/comments').post(secureRoute, addAComment)

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router
