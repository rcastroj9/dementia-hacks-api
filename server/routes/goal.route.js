import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import goalCtrl from '../controllers/goal.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/goal Get all the possible goals that the user can choose **/
  .get(goalCtrl.index)
  /** POST /api/goal Create a new Goal **/
  .post(goalCtrl.create);

router.route('/user/:goalId')
  /** POST /api/goal/user/:goalId Indicate that a user wants a goal **/
  .post(goalCtrl.assignGoal)
  /** DELETE /api/goal/user/:goalId Indicate that a user stops wanting a goal **/
  .delete(goalCtrl.stopGoal);
