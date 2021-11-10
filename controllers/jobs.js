import Job from '../models/jobs.js'

//GET JOBS
export const getAllJobs = async (_req, res) => {
  const allJobs = await Job.find()
  return res.status(200).json(allJobs)
}
