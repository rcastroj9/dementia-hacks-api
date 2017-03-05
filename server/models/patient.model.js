// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

const PatientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  stage: {
    type: Number,
    required: true,
    min: 0,
    max: 7
  },
  goals: [{
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal'
    },
    dateStarted: {
      type: Date
    }
  }],
  familyMember: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  likedActivites: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }
});

/**
 * @typedef Patient
 */
export default mongoose.model('Patient', PatientSchema);
