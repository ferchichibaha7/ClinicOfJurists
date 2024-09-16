import { QuestionController } from '../../controllers/question.controller';
import { Router } from 'express';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';
import { check } from 'express-validator/check';

const router: Router = Router();
const ctrl = new QuestionController();

const validateQuestion = [
  check('text', 'Question text is required').not().isEmpty(),
  check('quizId', 'Quiz ID is required').isInt()
];

router.get('/quiz/:quizId', auth, (req, res) => ctrl.getQuestionsByQuiz(req, res));
router.get('/:id', auth, (req, res) => ctrl.getQuestionById(req, res));
router.post('/', auth, roleAuthorization(['ADMIN']), validateQuestion, (req, res) => ctrl.createQuestion(req, res));
router.put('/:id', auth, roleAuthorization(['ADMIN']), validateQuestion, (req, res) => ctrl.updateQuestion(req, res));
router.delete('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.deleteQuestion(req, res));

export default router;
