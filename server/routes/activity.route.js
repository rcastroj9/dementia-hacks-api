import express from 'express';
import activityCtrl from '../controllers/activity.controller';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/')
  /** GET /api/activiy Retrieves suggested activities for a category **/
  .get(activityCtrl.index)


router.route('/:activityId/:patientId')
  /** PUT /api/:activityId/:userId Indicates a patient likes an activity **/
  .put(activityCtrl.addActivity);


export default router;
