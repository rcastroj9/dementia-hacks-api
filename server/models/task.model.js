import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';


const TaskSchema = new mongoose.Schema({}, {
  timestamps: true
});

TaskSchema.add({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Sport', 'Creative', 'Musical', 'Entertainment']
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  frequencyPerDay:{
    type: Number,
    required: true
  },
  unitsOfDosage: {
    type: Number,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TaskSchema.method({
});

/**
 * Statics
 */
 TaskSchema.statics = {

 };

 /**
  * @typedef Task
  */
 export default mongoose.model('Task', TaskSchema);
