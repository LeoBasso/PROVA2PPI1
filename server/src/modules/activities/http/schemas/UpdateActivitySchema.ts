import Joi from 'joi';
import { ActivityTypes } from '../../domain/enums/ActivityTypes.enum';

export const UpdateActivitySchema = Joi.object({
  body: Joi.object({
    type: Joi.string().valid(...Object.values(ActivityTypes)),
    distance: Joi.number(),
    time: Joi.number(),
    date: Joi.date().min(4),
  }),

  params: Joi.object({
    id: Joi.number().required(),
  })
});
