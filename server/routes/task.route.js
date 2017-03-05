import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import taskCtrl from '../controllers/task.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/recommendedTasks/:userId')
  /* GET /api/task/recommendedTasks/:userId Get recommended tasks for a user */
  .get(taskCtrl.get);

router.route('/:taskId')
  /* PUT /api/task/:taskId Choose a task the user would like to follow */
  .put(taskCtrl.chooseTask);
