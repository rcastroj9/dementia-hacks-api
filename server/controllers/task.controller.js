import Task from '../models/task.model';

/**
 *
 */
function index(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Task.list({ limit, skip })
    .then(tasks => res.json(tasks))
    .catch(e => next(e));
}

/**
* @property {string} req.body.name - The name of a Task.
* @property {string} req.body.type - The type of task.
* @property {string} req.body.description - The desc of task.
* @property {string} req.body.startTime - The startTime of task.
* @property {string} req.body.frequencyPerDay - The frequencyPerDay of task.
* @property {string} req.body.unitsOfDosage - The unitsOfDosage.
* @property {string} req.body.patient - The password of patient.
*
*/
function create(req, res, next) {
  const task = new Task(req.body)
  task.save()
    .then(savedTask => res.json(savedTask))
    .catch(e => next(e));
}

/**
 * @param {string} req.param.taskId
 */
function get(req, res, next) {
  Task.find({ patient: req.params.userId }).exec()
    .then((tasks) => {
      return res.json(tasks);
    })
    .catch(e =>  next(e));
}

/**
 *
 */
function find(req, res, next) {
  Task.get(req.query.taskId)
    .then(task => res.json(task))
    .catch(e => next(e));
}

/**
 *
 */
 function remove(req, res, next) {
   Task.findByIdAndRemove(req.params.taskId).exec()
    .then((doc) => res.json(doc))
    .catch(e => next(e));
 }
export default {index, create, get, find, remove};
