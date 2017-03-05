import Goal from '../models/goal.model';
import Patient from '../models/patient.model';

/**
 * Return all the Possible Goals
 */
function index(req, res, next) {
  Goal.find({}).exec()
    .then(goals => res.json(goals))
    .catch(e => next(e));
}

/**
 * Add a Specific Goal or array of goals to a user
 * @param {req.params.goalId} GoalId Goal to add to a user
 * @param {req.body.patientId} UserId User to add goal
 *
 */
function assignGoal(req, res, next) {
  const response = {
    goal: req.params.goalId,
    dateStarted: Date.now
  };
  Patient.findByIdAndUpdate(req.body.patientId, { $addToSet: { goals: response } },
  { new: true }).exec()
  .then((patient) => {
    if (patient) {
      return res.json(patient);
    }
    return res.status(404).end();
  })
  .catch(e => next(e));
}

/**
* @param {req.params.name} Name Name of the Goal
* @param {req.body.idealValue} IdealValue of Goal
* @param {req.body.tasks} Tasks Recommended Tasks for this Goal
 */
function create(req, res, next) {
  const goal = new Goal(req.body);
  goal.save()
    .then(savedGoal => res.json(savedGoal))
    .catch(e => next(e));
}
/**
 * Stop Tracking a Specific Goal for a user
 * @param {req.params.goalId} GoalId Goal to add to a user
 * @param {req.body.patientId} UserId User to add goal
 */
function stopGoal(req, res, next) {
  Patient.findByIdAndUpdate(req.body.patientId, { $pull: { goals: req.params.goalId } },
  { new: true }).exec()
  .then((patient) => {
    if (patient) {
      return res.json(patient);
    }
    return res.status(404).end();
  })
  .catch(e => next(e));
}


export default { index, create, assignGoal, stopGoal };
