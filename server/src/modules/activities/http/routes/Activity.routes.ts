import { Router } from 'express';
import Validator from 'src/shared/middlewares/Validator';
import { CreateActivityController } from '../controllers/CreateActivityController';
import { UpdateActivityController } from '../controllers/UpdateActivityController';
import { DeleteActivityController } from '../controllers/DeleteActivityController';
import { ListActivitiesController } from '../controllers/ListActivitiesController';

import { CreateActivitySchema } from '../schemas/CreateActivitySchema';
import { UpdateActivitySchema } from '../schemas/UpdateActivitySchema';

import isAuthenticated from 'src/shared/middlewares/isAuthenticated';
import { DeleteActivitySchema } from '../schemas/DeleteActivitySchema';

const activitiesRouter = Router();
const createActivityController = new CreateActivityController();
const updateActivityController = new UpdateActivityController();
const deleteActivityController = new DeleteActivityController();
const listActivitiesController = new ListActivitiesController();

activitiesRouter.use(isAuthenticated);

activitiesRouter.post('/activity', Validator(CreateActivitySchema), createActivityController.execute);
activitiesRouter.put('/activity/:id', Validator(UpdateActivitySchema), updateActivityController.execute);
activitiesRouter.delete('/activity/:id', Validator(DeleteActivitySchema), deleteActivityController.execute);
activitiesRouter.get('/activities', listActivitiesController.execute);

export default activitiesRouter;
