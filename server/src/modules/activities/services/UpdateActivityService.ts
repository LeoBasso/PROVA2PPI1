import { inject, injectable } from 'tsyringe';
import { IActivitiesRepository } from '../domain/interfaces/IActivitiesRepository';
import { UpdateActivityDTO } from '../domain/dtos/UpdateActivity.dto';
import { ActivityResponseDTO } from '../domain/dtos/ActivityResponse.dto';

@injectable()
export class UpdateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(id: number, updateActivity: UpdateActivityDTO): Promise<ActivityResponseDTO> {
    // Verifique se há campos para atualizar
    if (!updateActivity.distance && !updateActivity.time && !updateActivity.type) {
      throw new Error('Nenhum campo de atualização fornecido.');
    }
  
    // Atualize a atividade no repositório
    const updatedActivity = await this.activitiesRepository.update(id, updateActivity);
  
    // Verifique se a atividade foi encontrada e atualizada
    if (!updatedActivity) {
      throw new Error('Atividade não encontrada.');
    }
  
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
