import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
// import activityRoutes from './activity.route';
// import goalRoutes from './goal.route';
import familyMemberRoutes from './familyMember.route';
import patientRoutes from './patient.route';
import doctorRoutes from './doctor.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

//mount activity routes at /activity
// router.use('/activity', activityRoutes);
// mount goal routes at /goals
// router.use('/goals', goalRoutes);

// mount familyMember routes at /familyMember
router.use('/familyMember', familyMemberRoutes);

router.use('/doctor', doctorRoutes);






export default router;
