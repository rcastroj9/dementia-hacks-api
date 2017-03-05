import Activity from '../models/activity.model';
import Patient from '../models/patient.model';


/**
 * @param {String} req.query.type Type of Activity
 */
function index(req, res, next) {
  const type = req.query.type;
  Activity.find({ type: type }).exec()
    .then((activities) => {
      if (activities) {
        return res.json(activities);
      }
      return res.status(404).end();
    })
    .catch(e =>  next(e));
}

/**
 * @param {ActivityId} req.params.activityId
 * @param {PatientId} req.params.patientId
 */
function addActivity(req, res, next) {
  Patient.findByIdAndUpdate(req.params.patientId, { $addToSet: { likedActivites: req.params.activityId}},
  {new: true}).exec()
  .then((patient) => {
    return res.json(patient);
  })
  .catch(e => next(e));
}

export default { index, addActivity };
