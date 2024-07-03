import { Repository, FindOneOptions } from "typeorm";
import { dataSource } from "src/shared/typeorm/dataSource";
import { IActivitiesRepository } from "../../domain/interfaces/IActivitiesRepository";
import Activity from "../entities/Activity";
import { CreateActivityDTO } from "../../domain/dtos/CreateActivity.dto";
import { UpdateActivityDTO } from "../../domain/dtos/UpdateActivity.dto";

export class ActivitiesRepository implements IActivitiesRepository {
  private ormRepository: Repository<Activity>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Activity);
  }

  public async create(createActivity: CreateActivityDTO): Promise<Activity> {
    const activity = this.ormRepository.create(createActivity);
    return await this.ormRepository.save(activity);
  }

  public async save(activity: Activity): Promise<Activity> {
    return await this.ormRepository.save(activity);
  }

  public async findAll(): Promise<Activity[]> {
    return await this.ormRepository.find();
  }

  public async findById(id: number): Promise<Activity | null> {
    const options: FindOneOptions<Activity> = { where: { id } };
    const activity = await this.ormRepository.findOne(options);
    return activity || null;
  }
  
  public async update(id: number, updateData: UpdateActivityDTO): Promise<Activity | null> {
    // Verifique se o id é um número válido
    if (isNaN(id)) {
      throw new Error("ID inválido");
    }
  
    const options: FindOneOptions<Activity> = { where: { id } };
    const activity = await this.ormRepository.findOne(options);
  
    if (!activity) {
      return null;
    }
  
    // Atualize apenas os campos permitidos
    if (updateData.distance !== undefined) {
      activity.distance = updateData.distance;
    }
    if (updateData.time !== undefined) {
      activity.time = updateData.time;
    }
    if (updateData.elevation !== undefined) {
      activity.elevation = updateData.elevation;
    }
  
    return await this.ormRepository.save(activity);
  }
  
  

  public async remove(activity: Activity): Promise<void> {
    await this.ormRepository.remove(activity);
  }
}
