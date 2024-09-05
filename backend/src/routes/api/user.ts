import { userController } from '../../controllers/user.controller';
import { Router } from "express";
import { check } from "express-validator/check";
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';


const router: Router = Router();
const ctrl = new userController();
const validateOptions =   [
  check("name", "Please include a valid alphanumeric username").isAlphanumeric(),
  check( "password",  "Please enter a password with 8 or more characters" ).isLength({ min: 8 })
];

router.get( "/list",auth,roleAuthorization(['ADMIN']),(...params) => ctrl.findAllUsers(...params));
router.delete( "/delete/:id",auth,roleAuthorization(['ADMIN']),(...params) => ctrl.deleteUser(...params));
router.get( "/:id",auth,roleAuthorization(['ADMIN']),(...params) => ctrl.findOneUser(...params));
router.put( "/:id",auth,roleAuthorization(['ADMIN']),validateOptions,(...params) => ctrl.updateUser(...params));


export default router;
