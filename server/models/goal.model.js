// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';


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
   /**
    * Get goal
    * @param {ObjectId} id - The objectId of goal.
    * @returns {Promise<User, APIError>}
    */
   get(id) {
     return this.findById(id)
       .exec()
       .then((goal) => {
         if (goal) {
           return goal;
         }
         const err = new APIError('No such goal exists!', httpStatus.NOT_FOUND);
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
  * @typedef Goal
  */
export default mongoose.model('Goal', GoalSchema);
