import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company"],
    maxlength: 50,
  },

  position: {
    type: String,
    required: [true, "Please provide position"],
    maxlength: 50,
  },

  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default:'pending'
  },

  jobType: {
    type: String,
    enum:['full-time', 'part-time', 'remote', 'internship'],
    default:'full-time'
  },
  
  jobLocation: {
    type: String,
    default:'my city',
    require: [true]
  },

  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    require:[true, 'Please Provide User']
  }  

},
{timestamps:true}
);

export default mongoose.model('Job', JobSchema)