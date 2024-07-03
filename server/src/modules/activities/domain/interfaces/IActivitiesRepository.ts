import { CreateActivityDTO } from "../../domain/dtos/CreateActivity.dto";
import { UpdateActivityDTO } from "../../domain/dtos/UpdateActivity.dto";
import Activity from "../../typeorm/entities/Activity";

export interface IActivitiesRepository {
  create(createActivity: CreateActivityDTO): Promise<Activity>;
  save(activity: Activity): Promise<Activity>;
  findAll(): Promise<Activity[]>;
  findById(id: number): Promise<Activity | null>;
  update(id: number, updateData: UpdateActivityDTO): Promise<Activity | null>;
  remove(activity: Activity): Promise<void>;
}
