import { Router } from 'express';
import { TransactionController } from '../../controllers/transaction.controller';
import { check } from 'express-validator/check';
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';

const router: Router = Router();
const ctrl = new TransactionController();
const validateTransaction = [
  check('amount', 'Amount is required').isEmpty(),
  check('token', 'Token is required').isEmpty(),
  check('method', 'Method is required').isEmpty(),
  check('status', 'Status is required').isEmpty(),
];

router.post('/create', auth, validateTransaction, (req, res) => ctrl.createTransaction(req, res));
router.get('/list', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.getAllTransactions(req, res));
router.get('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.getTransactionById(req, res));
router.put('/:id', auth, roleAuthorization(['ADMIN']), validateTransaction, (req, res) => ctrl.updateTransaction(req, res));
router.delete('/:id', auth, roleAuthorization(['ADMIN']), (req, res) => ctrl.deleteTransaction(req, res));

export default router;
