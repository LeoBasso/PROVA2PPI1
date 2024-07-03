import { ActivityTypes } from "../enums/ActivityTypes.enum";

export class ActivityResponseDTO {
  readonly id: number;
  readonly type: ActivityTypes;
  readonly distance: number;
  readonly time: number;
  readonly avg: number;
  readonly date: Date;

  constructor(id: number, type: ActivityTypes, distance: number, time: number, avg: number, date: Date) {
    this.id = id;
    this.type = type;
    this.distance = distance;
    this.time = time;
    this.avg = avg;
    this.date = date;
  }
}
