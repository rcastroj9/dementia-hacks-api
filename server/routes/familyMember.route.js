import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import familyMemberCtrl from '../controllers/familyMember.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

  /** POST /api/familyMember - Create new user */
  .post(familyMemberCtrl.create);

router.route('/:familyMemberId')
  /** GET /api/users/:familyMemberId - Get user */
  .get(familyMemberCtrl.get)

  /** PUT /api/users/:familyMemberId - Update user */
  .put(familyMemberCtrl.update)

  /** DELETE /api/users/:familyMemberId - Delete user */
  .delete(familyMemberCtrl.remove);

/** Load user when API with familyMemberId route parameter is hit */
router.param('familyMemberId', familyMemberCtrl.load);

export default router;
