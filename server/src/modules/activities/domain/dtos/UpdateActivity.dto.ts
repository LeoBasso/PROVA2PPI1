import { ActivityTypes } from "../enums/ActivityTypes.enum";

export class UpdateActivityDTO {
  readonly id: string; // identificador da atividade a ser atualizada
  readonly type?: ActivityTypes; // tipo da atividade (opcional)
  readonly distance?: number; // distância da atividade (opcional)
  readonly time?: number; // tempo da atividade (opcional)
  readonly elevation?: number; // elevação da atividade (opcional)
  readonly date?: Date; // data da atividade (opcional)
  readonly user_id?: number; // id do usuário associado à atividade (opcional)

  constructor(id: string, type?: ActivityTypes, distance?: number, time?: number, elevation?: number, date?: Date, user_id?: number) {
    this.id = id;
    this.type = type;
    this.distance = distance;
    this.time = time;
    this.elevation = elevation;
    this.date = date;
    this.user_id = user_id;
  }
}
