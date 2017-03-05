import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import doctorCtrl from '../controllers/doctor.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/doctors- Get list of users */
  .get(doctorCtrl.list)

  /** POST /api/doctors - Create new user */
  .post(doctorCtrl.create);

router.route('/:doctorId')
  /** GET /api/users/:doctorId - Get user */
  .get(doctorCtrl.get)

  /** PUT /api/users/:doctorId - Update user */
  .put(doctorCtrl.update)

  /** DELETE /api/users/:doctorId - Delete user */
  .delete(doctorCtrl.remove);

/** Load user when API with doctorId route parameter is hit */
router.param('doctorId', doctorCtrl.load);

export default router;
