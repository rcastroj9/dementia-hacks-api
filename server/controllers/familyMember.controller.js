import FamilyMember from '../models/familyMember.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  FamilyMember.get(id)
    .then((familyMember) => {
      req.familyMember = familyMember; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get familyMember
 * @returns {FamilyMember}
 */
function get(req, res) {
  return res.json(req.familyMember);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @property {string} req.body.email - The mobileNumber of user.
 * @property {string} req.body.officeNumber - The officeNumber of user.
 * @returns {FamilyMember}
 */
function create(req, res, next) {
  const familyMember = new FamilyMember({
    familyMember: req.body.familyMember,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    officeNumber: req.body.officeNumber
  });

  familyMember.save()
    .then(savedFamilyMember => res.json(savedFamilyMember))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @property {string} req.body.email - The mobileNumber of user.
 * @property {string} req.body.officeNumber - The officeNumber of user.
 * @returns {FamilyMember}
 */
function update(req, res, next) {
  const familyMember = req.familyMember;
  user.familyMember = req.body.familyMember;
  user.mobileNumber = req.body.mobileNumber;
  user.email = req.body.email;
  user.officeNumber = req.body.officeNumber;


  familyMember.save()
    .then(savedFamilyMember => res.json(savedFamilyMember))
    .catch(e => next(e));
}


/**
 * Delete user.
 * @returns {FamilyMember}
 */
function remove(req, res, next) {
  const familyMember = req.familyMember;
  familyMember.remove()
    .then(deletedFamilyMember => res.json(deletedFamilyMember))
    .catch(e => next(e));
}

export default { load, get, create, update, remove };
