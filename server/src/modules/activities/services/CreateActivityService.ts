import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { CreateActivityDTO } from '../domain/dtos/CreateActivity.dto';
import { ActivityResponseDTO } from '../domain/dtos/ActivityReponse.dto';
import { ActivityTypes } from '../domain/enums/ActivityTypes.enum';

@injectable()
export class CreateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(createActivity: CreateActivityDTO): Promise<ActivityResponseDTO> {
    console.log(createActivity)
    const timeInHours = createActivity.time / 60;
    createActivity.avg = createActivity.distance / timeInHours;
    
    if(createActivity.type == ActivityTypes.NATACAO ){
      createActivity.elevation = 0
    }
    
    const response = await this.activitiesRepository.create(createActivity);

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
