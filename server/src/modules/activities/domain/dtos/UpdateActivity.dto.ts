import { ActivityTypes } from "../enums/ActivityTypes.enum";

export class UpdateActivityDTO {
  readonly id: string; // identificador da atividade a ser atualizada
  readonly distance?: number; // distância da atividade (opcional)
  readonly time?: number; // tempo da atividade (opcional)
  readonly elevation?: number; // elevação da atividade (opcional)

  constructor(id: string, distance?: number, time?: number, elevation?: number) {
    this.id = id;
    this.distance = distance;
    this.time = time;
    this.elevation = elevation;
  }
}
