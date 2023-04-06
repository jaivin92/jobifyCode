import Job from "../model/Job.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError , UnAuthenticatedError} from "../error/index.js"

const createJob = async (req, res) => {
    const { position, company } = req.body

    if(!position || !company){
        throw new BadRequestError('Please Provide all values')
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}

const getAllJobs = async (req, res) => {
    res.send('getall job')
}

const updateJob = async (req, res) => {
    res.send('update job')
}

const showStats = async (req, res) => {
    res.send('show all job')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats };