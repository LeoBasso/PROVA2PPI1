import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import Validator from 'src/shared/middlewares/Validator';

const usersRouter = Router();
const createUserController = new CreateUserController();

usersRouter.post('/user', Validator(CreateUserSchema), createUserController.execute);

export default usersRouter;
