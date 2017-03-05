import Goal from '../models/goal.model';
// import Patient from '../models/patient.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Goal.get(id)
    .then((goal) => {
      req.goal = goal; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 *  Add Goal to a User
 */
function addGoal(req, res, next) {
  Patient.findByIdAndUpdate(req.body.patientId, { $addToSet: { goals: req.body.goalName },
  { new: true } })
    .then((patient) => {

    })
}
export default { load };
