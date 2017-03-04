import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';


const GoalSchema = new mongoose.Schema({}, {
  timestamps: true
});

GoalSchema.add({
  name: {
    type: String,
    required: true
  },
  idealValue: {
    type: Number,
    required: true
  },
  recommendedTasks: [{
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    frequencyPerDay: Number,
    dosage: Number,
    startTime: Date,
    durationHours: Number
  }]
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
GoalSchema.method({
});

/**
 * Statics
 */
 GoalSchema.statics = {

 };

 /**
  * @typedef Goal
  */
 export default mongoose.model('Goal', GoalSchema);
