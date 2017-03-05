import Doctor from '../models/doctor.model';

/**
 * Load doctor and append to req.
 */
function load(req, res, next, id) {
  Doctor.get(id)
    .then((doctor) => {
      req.doctor = doctor; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}


/**
 * Create new doctor
 * @property {string} req.body.doctorName - The doctorName of doctor.
 * @property {string} req.body.mobileNumber - The mobileNumber of doctor.
 * @property {string} req.body.email - The mobileNumber of doctor.
 * @property {string} req.body.officeNumber- The officeNumber of doctor.
 * @property {string} req.body.direction- The direction of doctor.
 * @returns {doctor}
 */
function create(req, res, next) {
  const doctor = new Doctor({
    doctorName: req.body.doctorName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    officeNumber: req.body.officeNumber,
    direction: req.body.direction
  });

  doctor.save()
    .then(saveddoctor => res.json(saveddoctor))
    .catch(e => next(e));
}

/**
 * Update existing doctor
 * @property {string} req.body.doctorName - The doctorName of doctor.
 * @property {string} req.body.mobileNumber - The mobileNumber of doctor.
 * @property {string} req.body.email - The mobileNumber of doctor.
 * @property {string} req.body.officeNumber - The officeNumber of doctor.
 * @property {string} req.body.direction- The direction of doctor.

 * @returns {doctor}
 */
function update(req, res, next) {
  const doctor = req.doctor;
  doctor.doctorName = req.body.doctorName;
  doctor.mobileNumber = req.body.mobileNumber;
  doctor.email = req.body.email;
  doctor.password = req.body.password;

  doctor.save()
    .then(saveddoctor => res.json(saveddoctor))
    .catch(e => next(e));
}

/**
 * Get doctor list.
 * @property {number} req.query.skip - Number of doctors to be skipped.
 * @property {number} req.query.limit - Limit number of doctors to be returned.
 * @returns {doctor[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Doctor.list({ limit, skip })
    .then(doctors => res.json(doctors))
    .catch(e => next(e));
}


/**
 * Get doctor information.
 * @property {number} req.params.doctorId
 */
function get(req, res, next) {
  var id= req.params.doctorId;
  Doctor.get(id)
  .then(doctors => res.json(doctors))
  .catch(e => next(e));

}

/**
 * Delete doctor.
 * @returns {doctor}
 */
function remove(req, res, next) {
  const doctor = req.doctor;
  doctor.remove()
    .then(deleteddoctor => res.json(deleteddoctor))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
