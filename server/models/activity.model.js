// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

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
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
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
  * @typedef Activity
  */
export default mongoose.model('Activity', ActivitySchema);
