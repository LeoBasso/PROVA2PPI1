import { ActivityTypes } from "../enums/ActivityTypes.enum";

export interface IActivity {
  id: number;
  type: ActivityTypes;
  distance: number;
  time: number;
  elevation: number;
  avg: number;
  date: Date;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
