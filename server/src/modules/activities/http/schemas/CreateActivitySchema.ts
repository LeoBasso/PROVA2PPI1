import Joi from 'joi';
import { ActivityTypes } from '../../domain/enums/ActivityTypes.enum';

export const CreateActivitySchema = Joi.object({
  body: Joi.object({
    type: Joi.string().valid(...Object.values(ActivityTypes)).required(),
    distance: Joi.number().required(),
    time: Joi.number().required(),
    date: Joi.date().required().min(4),
  }),
});
