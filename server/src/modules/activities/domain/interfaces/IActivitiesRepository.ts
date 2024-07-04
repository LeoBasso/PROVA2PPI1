import { CreateActivityDTO } from "../../domain/dtos/CreateActivity.dto";
import { IActivity } from "./IActivity";

export interface IActivitiesRepository {
  create(createActivity: CreateActivityDTO): Promise<IActivity>;
  save(activity: IActivity): Promise<IActivity>;
  findAll(user_id:number): Promise<IActivity[]>;
  findById(id: number): Promise<IActivity | null>;
  remove(activity: IActivity): Promise<void>;
}
