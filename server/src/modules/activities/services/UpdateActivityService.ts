import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { ActivityResponseDTO } from '../domain/dtos/ActivityReponse.dto';
import { UpdateActivityDTO } from '../domain/dtos/UpdateActivity.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';

@injectable()
export class UpdateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(updateActivity: UpdateActivityDTO): Promise<ActivityResponseDTO> {
    
    if(updateActivity.distance | updateActivity.time){
      const timeInHours = updateActivity.time / 60;
      updateActivity.avg = updateActivity.distance / timeInHours;
    }
    
    const activity = await this.activitiesRepository.findById(updateActivity.id);

    if(!activity){
      throw new BadRequestError('Activity not founded')
    }

    activity.avg = updateActivity.avg;
    activity.distance = updateActivity.distance;
    activity.elevation = updateActivity.elevation;
    activity.time = updateActivity.time;

    const response = await this.activitiesRepository.save(activity);

    return new ActivityResponseDTO(
      response.id, 
      response.type, 
      response.distance, 
      response.time, 
      response.avg, 
      response.date
    );
  }
}
