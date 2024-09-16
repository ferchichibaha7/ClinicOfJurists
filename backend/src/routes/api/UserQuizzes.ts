import { UserQuizzesController } from '../../controllers/userQuizzes.controller';
import { Router } from 'express';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';

const router: Router = Router();
const ctrl = new UserQuizzesController();

router.get('/user/:userId', auth, (req, res) => ctrl.getQuizzesByUser(req, res));
router.get('/results/:userId/:quizId', auth, (req, res) => ctrl.getQuizResults(req, res));
router.post('/save', auth, (req, res) => ctrl.saveQuizResults(req, res));

export default router;
