import { OptionController } from '../../controllers/option.controller';
import { Router } from 'express';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';
import { check } from 'express-validator/check';

const router: Router = Router();
const ctrl = new OptionController();

const validateOption = [
  check('text', 'Option text is required').not().isEmpty(),
  check('questionId', 'Question ID is required').isInt(),
  check('isCorrect', 'Option must specify if it is correct').isBoolean()
];

router.get('/question/:questionId', auth, (req, res) => ctrl.getOptionsByQuestion(req, res));
router.get('/:id', auth,(req, res) => ctrl.getOptionById(req, res));
router.post('/', auth, roleAuthorization(['ADMIN']), validateOption, (req, res) => ctrl.createOption(req, res));
router.put('/:id', auth, roleAuthorization(['ADMIN']), validateOption, (req, res) => ctrl.updateOption(req, res));
router.delete('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.deleteOption(req, res));

export default router;
