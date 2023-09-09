import { Request, Response } from 'express';
import { Evento } from '../Entities/Evento';
import { CriarEventoUseCase, ObterEventosUseCase, ObterEventoPorIdUseCase, AtualizarEventoUseCase, ExcluirEventoUseCase } from '../../src/usecases/EventoUseCases';

export class EventoController {
  constructor(
    private criarEventoUseCase: CriarEventoUseCase,
    private obterEventosUseCase: ObterEventosUseCase,
    private obterEventoPorIdUseCase: ObterEventoPorIdUseCase,
    private atualizarEventoUseCase: AtualizarEventoUseCase,
    private excluirEventoUseCase: ExcluirEventoUseCase,
  ) {}

  async criarEvento(req: Request, res: Response): Promise<void> {
    try {
      const { id, nome, data, local } = req.body;
      const evento: Evento = { id, nome, data, local };
      const novoEvento = await this.criarEventoUseCase.execute(evento);
      res.status(201).json(novoEvento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o evento' });
    }
  }

  async obterEventos(req: Request, res: Response): Promise<void> {
    try {
      const eventos = await this.obterEventosUseCase.execute();
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter os eventos' });
    }
  }

  async obterEventoPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eventoId = parseInt(id);
      const evento = await this.obterEventoPorIdUseCase.execute(eventoId);
      if (evento) {
        res.json(evento);
      } else {
        res.status(404).json({ error: 'Evento não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter o evento' });
    }
  }

  async atualizarEvento(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, data, local } = req.body;
      const evento: Evento = { id: parseInt(id), nome, data, local };
      const eventoAtualizado = await this.atualizarEventoUseCase.execute(evento);
      res.json(eventoAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o evento' });
    }
  }

  async excluirEvento(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eventoId = parseInt(id);
      const eventoExcluido = await this.excluirEventoUseCase.execute(eventoId);
      if (eventoExcluido) {
        res.json({ message: 'Evento excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Evento não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o evento' });
    }
  }
}
