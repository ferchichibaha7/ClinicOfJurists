import { CategoryController } from '../../controllers/category.controller';
import { Router } from 'express';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';
import { check } from 'express-validator/check';

const router: Router = Router();
const ctrl = new CategoryController();

const validateCategory = [
  check('name', 'Category name is required').not().isEmpty()
];

router.get('/list', auth, (req, res) => ctrl.getAllCategories(req, res));
router.get('/:id', auth, (req, res) => ctrl.getCategoryById(req, res));
router.post('/', auth, roleAuthorization(['ADMIN']), validateCategory, (req, res) => ctrl.createCategory(req, res));
router.put('/:id', auth, roleAuthorization(['ADMIN']), validateCategory, (req, res) => ctrl.updateCategory(req, res));
router.delete('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.deleteCategory(req, res));

export default router;
