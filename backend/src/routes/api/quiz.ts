import { QuizController } from '../../controllers/quiz.controller';
import { Router } from 'express';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';
import { check } from 'express-validator/check';

const router: Router = Router();
const ctrl = new QuizController();

const validateQuiz = [
  check('name', 'Quiz name is required').not().isEmpty(),
  check('subcategoryId', 'Subcategory ID is required').isInt()
];

router.get('/subcategory/:subcategoryId', auth, (req, res) => ctrl.getQuizzesBySubcategory(req, res));
router.get('/:id', auth, (req, res) => ctrl.getQuizById(req, res));
router.post('/', auth, roleAuthorization(['ADMIN']), validateQuiz, (req, res) => ctrl.createQuiz(req, res));
router.put('/:id', auth, roleAuthorization(['ADMIN']), validateQuiz, (req, res) => ctrl.updateQuiz(req, res));
router.delete('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.deleteQuiz(req, res));
router.post('/submit', auth, (req, res) => ctrl.submitQuiz(req, res)); // For submitting quiz answers

export default router;
