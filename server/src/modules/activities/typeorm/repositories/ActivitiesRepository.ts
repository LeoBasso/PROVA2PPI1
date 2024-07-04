import { Repository, FindOneOptions } from "typeorm";
import { dataSource } from "src/shared/typeorm/dataSource";
import { IActivitiesRepository } from "../../domain/interfaces/IActivitiesRepository";
import { CreateActivityDTO } from "../../domain/dtos/CreateActivity.dto";
import { IActivity } from "../../domain/interfaces/IActivity";
import Activity from "../entities/Activity";

export class ActivitiesRepository implements IActivitiesRepository {
  private ormRepository: Repository<Activity>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Activity);
  }

  public async create(createActivity: CreateActivityDTO): Promise<IActivity> {
    const activity = this.ormRepository.create(createActivity);
    return await this.ormRepository.save(activity);
  }

  public async save(activity: IActivity): Promise<IActivity> {
    return await this.ormRepository.save(activity);
  }

  public async findAll(user_id:number): Promise<IActivity[]> {
    return await this.ormRepository.find({where:{user_id}});
  }

  public async findById(id: number): Promise<IActivity | null> {
    const activity = await this.ormRepository.findOneBy({id});
    return activity;
  }
  
  public async remove(activity: IActivity): Promise<void> {
    await this.ormRepository.remove(activity);
  }
}
