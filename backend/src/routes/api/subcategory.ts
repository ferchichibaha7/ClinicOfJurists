import { SubcategoryController } from '../../controllers/subcategory.controller';
import { Router } from 'express';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';
import { check } from 'express-validator/check';

const router: Router = Router();
const ctrl = new SubcategoryController();

const validateSubcategory = [
  check('name', 'Subcategory name is required').not().isEmpty(),
  check('categoryId', 'Category ID is required').isInt()
];

router.get('/:id', auth, (req, res) => ctrl.getSubcategoryById(req, res));

router.get('/category/:categoryId',auth, (req, res) => ctrl.getAllSubcategoriesByCategory(req, res));
router.get('/:id', auth, (req, res) => ctrl.getSubcategoryById(req, res));
router.post('/', auth, roleAuthorization(['ADMIN']), validateSubcategory, (req, res) => ctrl.createSubcategory(req, res));
router.put('/:id', auth, roleAuthorization(['ADMIN']), validateSubcategory, (req, res) => ctrl.updateSubcategory(req, res));
router.delete('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.deleteSubcategory(req, res));

export default router;
