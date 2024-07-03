import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { CreateActivityDTO } from '../domain/dtos/CreateActivity.dto';
import { ActivityRespondeDTO } from '../domain/dtos/ActivityReponse.dto';

@injectable()
export class CreateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute(createActivity: CreateActivityDTO): Promise<ActivityRespondeDTO> {
    createActivity.avg = createActivity.distance / createActivity.time;
    const response = await this.activitiesRepository.create(createActivity);

    return new ActivityRespondeDTO(response.id, response.type, response.distance, response.time, response.avg, response.date);
  }
}
