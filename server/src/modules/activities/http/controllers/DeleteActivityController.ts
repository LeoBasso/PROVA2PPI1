import { Request, Response } from 'express';
import { DeleteActivityService } from '../../services/DeleteActivityService';
import { ActivitiesRepository } from '../../typeorm/repositories/ActivitiesRepository';
import { container } from 'tsyringe';

const activitiesRepository = new ActivitiesRepository();

export class DeleteActivityController {
  public async execute(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteActivity = container.resolve(DeleteActivityService);

    await deleteActivity.execute(id);

    return response.status(204).send();

  }
}
