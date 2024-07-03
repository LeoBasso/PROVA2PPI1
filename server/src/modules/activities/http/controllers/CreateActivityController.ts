import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateActivityService } from '../../services/CreateActivityService';
import { CreateActivityDTO } from '../../domain/dtos/CreateActivity.dto';

export class CreateActivityController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createActivity = container.resolve(CreateActivityService);
    const { type, distance, time, elevation, date } = request.body;
    const user_id = request.user.id;

    const createActivityDTO: CreateActivityDTO = {
      type,
      distance,
      time,
      elevation,
      date,
      avg: null,
      user_id
    };
    const activity = await createActivity.execute(createActivityDTO);

    return response.json(activity);
  }
}
