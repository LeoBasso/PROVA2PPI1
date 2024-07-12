import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { IActivity } from '../domain/interfaces/IActivity';

@injectable()
export class ListActivitiesService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository) { }

  public async execute(user_id: number): Promise<IActivity[]> {
    const activities = await this.activitiesRepository.findAll(user_id);

    activities.forEach(activity => {
      const date = new Date(activity.date);
      const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      activity.date = formattedDate as any;
    });

    return activities;
  }
}
