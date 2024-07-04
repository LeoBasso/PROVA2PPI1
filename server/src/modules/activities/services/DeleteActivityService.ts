import { inject, injectable } from "tsyringe";
import { IActivitiesRepository } from "../domain/interfaces/IActivitiesRepository";
import { BadRequestError } from "src/shared/errors/BadRequestError";

@injectable()
export class DeleteActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository) { }

  public async execute(id: number): Promise<void> {
    const activity = await this.activitiesRepository.findById(id);

    if (!activity) {
      throw new BadRequestError('Activity not founded')
    }

    await this.activitiesRepository.remove(activity);
  }
}
