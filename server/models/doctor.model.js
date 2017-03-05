import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const DoctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  officeNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  direction: {
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
DoctorSchema.method({
});

/**
 * Statics
 */
DoctorSchema.statics = {
  /**
   * Get doctor
   * @param {ObjectId} id - The objectId of doctor.
   * @returns {Promise<Doctor, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((doctor) => {
        if (doctor) {
          return doctor;
        }
        const err = new APIError('No such doctor exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List doctors in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of doctors to be skipped.
   * @param {number} limit - Limit number of doctors to be returned.
   * @returns {Promise<doctor[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};



/**
 * @typedef Doctor
 */
export default mongoose.model('Doctor', DoctorSchema);
