import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { UpdateActivityDTO } from '../domain/dtos/UpdateActivity.dto';
import { ActivityResponseDTO } from '../domain/dtos/ActivityReponse.dto';

@injectable()
export class UpdateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(id: number, updateActivity: UpdateActivityDTO): Promise<ActivityResponseDTO> {
    // Verifique se há campos para atualizar
    if (!updateActivity.distance && !updateActivity.time && !updateActivity.elevation) {
      throw new Error('Nenhum campo de atualização fornecido.');
    }

    // Atualize a atividade no repositório
    const updatedActivity = await this.activitiesRepository.update(id, updateActivity);

    // Verifique se a atividade foi encontrada e atualizada
    if (!updatedActivity) {
      throw new Error('Atividade não encontrada.');
    }

    // Calcula a média em KM/H se a distância ou o tempo forem atualizados
    if (updateActivity.distance !== undefined || updateActivity.time !== undefined) {
      const distance = updateActivity.distance !== undefined ? updateActivity.distance : updatedActivity.distance;
      const time = updateActivity.time !== undefined ? updateActivity.time : updatedActivity.time;
      const timeInHours = time / 60; // Converte o tempo de minutos para horas

      updatedActivity.avg = distance / timeInHours;
    }

    // Salva a atividade atualizada no repositório com a nova média calculada
    await this.activitiesRepository.save(updatedActivity);

    // Criar o DTO de resposta com os dados atualizados da atividade
    const responseDTO = new ActivityResponseDTO(
      updatedActivity.id,
      updatedActivity.type,
      updatedActivity.distance,
      updatedActivity.time,
      updatedActivity.avg,
      updatedActivity.date
    );

    return responseDTO;
  }
}
