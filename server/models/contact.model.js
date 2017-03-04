import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';


const ContactSchema = new mongoose.Schema({}, {
  timestamps: true
});

ContactSchema.add({
  name: {
    type: String,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  type: {
    type: String,
    required: true,
    enum: ['Doctor', 'Family'],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  email: {
    type: String,
    lowercase: true,
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
ContactSchema.method({
});

/**
 * Statics
 */
 ContactSchema.statics = {

 };

 /**
  * @typedef Contact
  */
 export default mongoose.model('Contact', ContactSchema);
