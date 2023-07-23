// LutadorController.ts
import { Request, Response } from 'express';
import { LutadorUseCases } from '../usecases/LutadorUseCases';
import { Lutador } from '../Entities/Lutador';

export class LutadorController {
  constructor(private readonly lutadorUseCases: LutadorUseCases) {}

  async criarLutador(req: Request, res: Response): Promise<void> {
    try {
      const {
        Nome,
        CategoriaPeso,
        PaisOrigem,
        Idade,
        Altura,
        Alcance,
      } = req.body;
      const lutador: Lutador = {
        Nome,
        CategoriaPeso,
        PaisOrigem,
        Idade,
        Altura,
        Alcance,
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

  async obterLutadorPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lutadorId = parseInt(id);
      const lutador = await this.lutadorUseCases.obterLutadorPorId(lutadorId);
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
        Nome,
        CategoriaPeso,
        PaisOrigem,
        Idade,
        Altura,
        Alcance,
      } = req.body;
      const lutadorId = parseInt(id);
      const lutador: Lutador = {
        Nome,
        CategoriaPeso,
        PaisOrigem,
        Idade,
        Altura,
        Alcance,
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
      const lutadorId = parseInt(id);
      const lutadorExcluido = await this.lutadorUseCases.excluirLutador(
        lutadorId
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
