import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { ActivityResponseDTO } from '../domain/dtos/ActivityReponse.dto';
import { UpdateActivityDTO } from '../domain/dtos/UpdateActivity.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { ActivityTypes } from '../domain/enums/ActivityTypes.enum';

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

    if(activity.type != ActivityTypes.NATACAO ){
    activity.elevation = updateActivity.elevation;
    }

    activity.avg = updateActivity.avg;
    activity.distance = updateActivity.distance;
    activity.time = updateActivity.time;

    const response = await this.activitiesRepository.save(activity);

    return new ActivityResponseDTO(
      response.id, 
      response.type, 
      response.elevation,
      response.distance, 
      response.time, 
      response.avg, 
      response.date
    );
  }
}
