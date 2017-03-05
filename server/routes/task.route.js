import express from 'express';
import taskCtrl from '../controllers/task.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/task Get all the recommended tasks in our database **/
  .get(taskCtrl.index)
  /** POST /api/task Create a New Task for a Goal **/
  .post(taskCtrl.create);
router.route('/recommendedTasks/:userId')
  /* GET /api/task/recommendedTasks/:userId Get recommended tasks for a user */
  .get(taskCtrl.get);

router.route('/:taskId')
  /* PUT /api/task/:taskId Choose a task the user would like to follow */
  .get(taskCtrl.find)
  .delete(taskCtrl.remove);


export default router;
