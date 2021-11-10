import Job from '../models/jobs.js'

//GET JOBS
export const getAllJobs = async (_req, res) => {
  const allJobs = await Job.find()
  console.log('ALL JOBS - ', allJobs)
  return res.status(200).json(allJobs)
}
