import { Request, Response } from 'express';
import { EventoRepository } from '../Repositories/EventoRepository';
import { Evento } from '../Models/Evento';

export class EventoController {
  constructor(private readonly eventoRepository: EventoRepository) {}

  async criarEvento(req: Request, res: Response): Promise<void> {
    try {
      const { nome, data, local } = req.body;
      const evento: Evento = { id: (await this.eventoRepository.obterEventos()).length + 1, nome, data, local };
      const novoEvento = await this.eventoRepository.criarEvento(evento);
      res.status(201).json(novoEvento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o evento' });
    }
  }

  async obterEventos(req: Request, res: Response): Promise<void> {
    try {
      const eventos = await this.eventoRepository.obterEventos();
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter os eventos' });
    }
  }

  async atualizarEvento(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, data, local } = req.body;
      const evento: Evento = { id: parseInt(id), nome, data, local };
      const eventoAtualizado = await this.eventoRepository.atualizarEvento(evento);
      if (eventoAtualizado) {
        res.json(eventoAtualizado);
      } else {
        res.status(404).json({ error: 'Evento não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o evento' });
    }
  }

  async excluirEvento(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eventoExcluido = await this.eventoRepository.excluirEvento(parseInt(id));
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