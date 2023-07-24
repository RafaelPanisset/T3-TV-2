// LutaController.ts
import { Request, Response } from 'express';
import { LutaUseCases } from '../usecases/LutaUseCases';
import { Luta } from '../Entities/Luta';

export class LutaController {
  constructor(private readonly lutaUseCases: LutaUseCases) {}

  async criarLuta(req: Request, res: Response): Promise<void> {
    try {
      const { idLutador1, idLutador2, idEvento, idCard } = req.body;
      const luta: Luta = {
        id: (await this.lutaUseCases.obterLutas()).length + 1,
        idLutador1,
        idLutador2,
        idEvento,
        idCard,
      };
      const novaLuta = await this.lutaUseCases.criarLuta(luta);
      res.status(201).json(novaLuta);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar a luta' });
    }
  }

  async obterLutas(req: Request, res: Response): Promise<void> {
    try {
      const lutas = await this.lutaUseCases.obterLutas();
      res.json(lutas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter as lutas' });
    }
  }

  async obterLutaPorid(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lutaid = parseInt(id);
      const luta = await this.lutaUseCases.obterLutaPorId(lutaid);
      if (luta) {
        res.json(luta);
      } else {
        res.status(404).json({ error: 'Luta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter a luta' });
    }
  }

  async atualizarLuta(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { idLutador1, idLutador2, idEvento, idCard } = req.body;
      const lutaid = parseInt(id);
      const luta: Luta = {
        id: lutaid,
        idLutador1,
        idLutador2,
        idEvento,
        idCard,
      };
      const lutaAtualizada = await this.lutaUseCases.atualizarLuta(luta);
      if (lutaAtualizada) {
        res.json(lutaAtualizada);
      } else {
        res.status(404).json({ error: 'Luta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a luta' });
    }
  }

  async excluirLuta(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lutaid = parseInt(id);
      const lutaExcluida = await this.lutaUseCases.excluirLuta(lutaid);
      if (lutaExcluida) {
        res.json({ message: 'Luta excluída com sucesso' });
      } else {
        res.status(404).json({ error: 'Luta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir a luta' });
    }
  }
}
