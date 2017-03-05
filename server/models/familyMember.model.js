import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const FamilyMemberSchema = new mongoose.Schema({
  familyMember: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // required: true
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
FamilyMemberSchema.method({
});

/**
 * Statics
 */
FamilyMemberSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of familyMember.
   * @returns {Promise<FamilyMember, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((familyMember) => {
        if (familyMember) {
          return familyMember;
        }
        const err = new APIError('No such family member exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
}

/**
 * @typedef FamilyMember
 */
export default mongoose.model('FamilyMember', FamilyMemberSchema);
