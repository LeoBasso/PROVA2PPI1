import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListActivitiesService } from '../../services/ListActivitiesService';

export class ListActivitiesController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const listActivities = container.resolve(ListActivitiesService);
    const user_id = request.user.id
    const activities = await listActivities.execute(Number(user_id));

    return response.json(activities);
  }
}