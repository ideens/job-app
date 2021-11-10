import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'
import { getAllJobs } from '../controllers/jobs.js'

//import routes
//import secure route

// Invoking a router
const router = express.Router()

// Setting up a route
router.route('/devs').get(getUserProfile)
router.route('/jobs').get(getAllJobs)

//router.route('/register').post

// devs:
// `/jobs` get
// `/jobs/:id` get
// `/jobs/:id/messages` get, post
// `/jobs/:id/messages/:messageId` get, edit

// `/register/dev` post
// `/login` post

// employers
// `/jobs` get, post
// `/jobs/:id` get, edit, delete
// `/jobs/:id/messages` get, post, edit
// `/jobs/:id/messages/:messageId` get, edit

// `/developers` get
// `/developers/:id` get

// `/register/employer` post
// `/login` post

export default router
