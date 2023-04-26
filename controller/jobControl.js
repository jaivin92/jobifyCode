import Job from "../model/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../error/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide all values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};



const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  //res.send('getall job')
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;

  if (!position || !company ) {
    throw new BadRequestError("Please Provide all values");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`no job with id :${jobId}`);
  }

  //check permissions
    console.log(typeof req.user.userId)
    console.log(typeof job.createdBy)

    checkPermissions(req.user.userId, job.createdBy)

  const updatedJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

//   job.position = position
//   job.company = company
//   job.jobLocation = jobLocation

//   await job.save()
  res.status(StatusCodes.OK).json({updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`no job with id :${jobId}`);
  }

  checkPermissions(req.user.userId, job.createdBy)

  //await job.remove();
  //await Job.findByIdAndDelete(jobId)
  await  Job.schema.remove("")

  res.status(StatusCodes.OK).json({msg: "Success! Job removed "});
};

const showStats = async (req, res) => {
  res.send("show all job");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
