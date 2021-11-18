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
  toggleSave,
  updatePost,
} from '../controllers/posts.js'
import { secureRoute } from './secureRoute.js'
import {
  addProfile,
  deleteProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
} from '../controllers/profile.js'

// Invoking a router
const router = express.Router()

// Setting up a route
router.route('/users').get(getAllUsers)
router.route('/users/:id').get(secureRoute, getOneUser)
router.route('/me').get(secureRoute, getCurrentUser)
router.route('/me/profile').post(secureRoute, addProfile)
router.route('/profile/:id').delete(secureRoute, deleteProfile)

router
  .route('/profile')
  .get(secureRoute, getProfile)
  .put(secureRoute, updateProfile)

router.route('/profiles').get(getAllProfiles)

router.route('/posts').get(getAllPosts).post(secureRoute, addAPost)
router
  .route('/posts/:id')
  .get(getSinglePost)
  .delete(secureRoute, removePost)
  .put(secureRoute, updatePost)
  .post(secureRoute, toggleSave)

router.route('/posts/:id/comments').post(secureRoute, addAComment)

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router
