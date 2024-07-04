import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateActivityService } from '../../services/UpdateActivityService';
import { UpdateActivityDTO } from '../../domain/dtos/UpdateActivity.dto';

export class UpdateActivityController {
  public async execute(req: Request, res: Response): Promise<Response> {

      const id = req.params.id;
      const {distance, time, elevation} = req.body;

      const updateActivityService = container.resolve(UpdateActivityService);

      const updateActivityDTO: UpdateActivityDTO = {
        id,
        distance,
        time,
        elevation,
      }

      const updatedActivity = await updateActivityService.execute(updateActivityDTO);

      return res.status(200).json(updatedActivity);
    }
}
