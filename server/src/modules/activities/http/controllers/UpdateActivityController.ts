import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateActivityService } from '../../services/UpdateActivityService';
import { UpdateActivityDTO } from '../../domain/dtos/UpdateActivity.dto';

export class UpdateActivityController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { type, distance, time, elevation, date, user_id } = req.body;

      // Instanciar o serviço de atualização de atividade
      const updateActivityService = container.resolve(UpdateActivityService);

      // Executar o serviço de atualização com os dados recebidos
      const updatedActivity = await updateActivityService.execute(
        parseInt(id), // converter id para número, se necessário
        new UpdateActivityDTO(type, distance, time, elevation, date, user_id)
      );

      // Retornar a atividade atualizada como resposta
      return res.status(200).json(updatedActivity);
    } catch (err) {
      // Retornar um erro com status 400 em caso de falha
      return res.status(400).json({ error: err.message });
    }
  }
}
