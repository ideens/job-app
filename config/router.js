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

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router
