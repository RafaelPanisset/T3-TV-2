// LutadorController.ts
import { Request, Response } from 'express';
import { LutadorUseCases } from '../usecases/LutadorUseCases';
import { Lutador } from '../Entities/Lutador';

export class LutadorController {
  constructor(private readonly lutadorUseCases: LutadorUseCases) {}

  async criarLutador(req: Request, res: Response): Promise<void> {
    try {
      const {
        id,
        nome,
        categoriaPeso,
        paisOrigem,
        idade,
        altura,
        alcance,
      } = req.body;
      const lutador: Lutador = {
        id,
        nome,
        categoriaPeso,
        paisOrigem,
        idade,
        altura,
        alcance,
      };
      const novoLutador = await this.lutadorUseCases.criarLutador(lutador);
      res.status(201).json(novoLutador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o lutador' });
    }
  }

  async obterLutadores(req: Request, res: Response): Promise<void> {
    try {
      const lutadores = await this.lutadorUseCases.obterLutadores();
      res.json(lutadores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter os lutadores' });
    }
  }

  async obterLutadorPorid(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lutadorid = parseInt(id);
      const lutador = await this.lutadorUseCases.obterLutadorPorId(lutadorid);
      if (lutador) {
        res.json(lutador);
      } else {
        res.status(404).json({ error: 'Lutador não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter o lutador' });
    }
  }

  async atualizarLutador(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        nome,
        categoriaPeso,
        paisOrigem,
        idade,
        altura,
        alcance,
      } = req.body;
      const lutadorid = parseInt(id);
      const lutador: Lutador = {
        id: lutadorid, // Include the 'id' property with the correct value
        nome,
        categoriaPeso,
        paisOrigem,
        idade,
        altura,
        alcance,
      };
      const lutadorAtualizado = await this.lutadorUseCases.atualizarLutador(
        lutador
      );
      if (lutadorAtualizado) {
        res.json(lutadorAtualizado);
      } else {
        res.status(404).json({ error: 'Lutador não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o lutador' });
    }
  }
  

  async excluirLutador(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lutadorid = parseInt(id);
      const lutadorExcluido = await this.lutadorUseCases.excluirLutador(
        lutadorid
      );
      if (lutadorExcluido) {
        res.json({ message: 'Lutador excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Lutador não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o lutador' });
    }
  }
}
