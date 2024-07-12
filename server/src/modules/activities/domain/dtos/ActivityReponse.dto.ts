import { ActivityTypes } from "../enums/ActivityTypes.enum";

export class ActivityResponseDTO {
  readonly id: number;
  readonly type: ActivityTypes;
  readonly distance: number;
  readonly time: number;
  readonly elevation: number;
  readonly avg: number;
  readonly date: Date;

  constructor(id: number, type: ActivityTypes, elevation: number ,distance: number, time: number, avg: number, date: Date) {
    this.id = id;
    this.type = type;
    this.elevation = elevation;
    this.distance = distance;
    this.time = time;
    this.avg = avg;
    this.date = date;
  }
}
