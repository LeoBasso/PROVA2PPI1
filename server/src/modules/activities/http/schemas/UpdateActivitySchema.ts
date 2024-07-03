import Joi from 'joi';
import { ActivityTypes } from '../../domain/enums/ActivityTypes.enum';

export const UpdateActivitySchema = Joi.object({
  type: Joi.string().valid(...Object.values(ActivityTypes)).optional(),
  distance: Joi.number().optional(),
  time: Joi.number().optional(),
  date: Joi.date().optional().min(4),
});
