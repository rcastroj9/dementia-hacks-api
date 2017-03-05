import express from 'express';
import activityCtrl from '../controllers/activity.controller';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/')
  /** GET /api/activiy Retrieves suggested activities for a user **/
  .get(activityCtrl.index)

router.route('/:activityId/:userId')
  /** PUT /api/:activityId/:userId Indicates a user likes an activity **/
  .put(activityCtrl.addActivity);
