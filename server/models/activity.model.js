import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const ActivitySchema = new mongoose.Schema({}, {
  timestamps: true
});


ActivitySchema.add({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Sport', 'Creative', 'Musical', 'Entertainment']
  },
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
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
ActivitySchema.method({
});

/**
 * Statics
 */
 ActivitySchema.statics = {

 };

 /**
  * @typedef Contact
  */
 export default mongoose.model('Activity', ActivitySchema);
