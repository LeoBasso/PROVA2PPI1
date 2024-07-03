import { Router } from 'express';
import Validator from 'src/shared/middlewares/Validator';
import { CreateActivityController } from '../controllers/CreateActivityController';
import { UpdateActivityController } from '../controllers/UpdateActivityController'; // Importe o controlador de atualização
import { CreateActivitySchema } from '../schemas/CreateActivitySchema';
import { UpdateActivitySchema } from '../schemas/UpdateActivitySchema'; // Importe o esquema de validação para atualização

import isAuthenticated from 'src/shared/middlewares/isAuthenticated';

const activitiesRouter = Router();
const createActivityController = new CreateActivityController();
const updateActivityController = new UpdateActivityController(); // Instancie o controlador de atualização


activitiesRouter.use(isAuthenticated)
activitiesRouter.post('/activity', Validator(CreateActivitySchema), createActivityController.execute);
activitiesRouter.put('/activity/:id', Validator(UpdateActivitySchema), updateActivityController.execute);


export default activitiesRouter;
