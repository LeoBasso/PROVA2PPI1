import Joi from 'joi';

export const DeleteActivitySchema = Joi.object({

  params: Joi.object({
    id: Joi.number().required(),
  })
});
