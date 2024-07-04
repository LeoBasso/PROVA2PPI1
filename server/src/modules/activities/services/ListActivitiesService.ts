import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { IActivity } from '../domain/interfaces/IActivity';

@injectable()
export class ListActivitiesService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository) {}

  public async execute(user_id:number): Promise<IActivity[]> {
      return await this.activitiesRepository.findAll(user_id);
  }
}
