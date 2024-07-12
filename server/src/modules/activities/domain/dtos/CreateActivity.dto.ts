import { ActivityTypes } from "../enums/ActivityTypes.enum";

export class CreateActivityDTO {
  readonly type: ActivityTypes;
  readonly distance: number;
  readonly time: number;
  avg: number;
  elevation: number;
  readonly date: Date;
  readonly user_id: number;
}
