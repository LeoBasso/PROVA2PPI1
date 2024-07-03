import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { CreateActivityDTO } from '../domain/dtos/CreateActivity.dto';
import { ActivityResponseDTO } from '../domain/dtos/ActivityReponse.dto';

@injectable()
export class CreateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(createActivity: CreateActivityDTO): Promise<ActivityResponseDTO> {
    // Calcula a média em KM/H
    const timeInHours = createActivity.time / 60; // Converte o tempo de minutos para horas
    createActivity.avg = createActivity.distance / timeInHours;
    
    const response = await this.activitiesRepository.create(createActivity);

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
