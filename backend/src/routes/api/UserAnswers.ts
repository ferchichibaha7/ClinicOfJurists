import { Router } from 'express';
import { UserAnswersController } from '../../controllers/UserAnswers.controller';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';

const router: Router = Router();
const ctrl = new UserAnswersController();

router.get('/answers/:userQuizId', auth, (req, res) => ctrl.getUserAnswers(req, res));
router.post('/answers', auth, (req, res) => ctrl.saveAnswer(req, res));

export default router;
