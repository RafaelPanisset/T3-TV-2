import { Evento } from '../Entities/Evento';
import { EventoRepository } from '../Repositories/contract/EventoRepository';

export class InMemoryEventoRepository implements EventoRepository {
  private eventos: Evento[] = [];

  async criarEvento(evento: Evento): Promise<Evento> {
    this.eventos.push(evento);
    return evento;
  }

  async obterEventos(): Promise<Evento[]> {
    return this.eventos;
  }

  async obterEventoPorId(id: number): Promise<Evento | null> {
    const evento = this.eventos.find((e) => e.id === id);
    return evento || null;
  }

  async atualizarEvento(evento: Evento): Promise<Evento> {
    const index = this.eventos.findIndex((e) => e.id === evento.id);
    if (index !== -1) {
      this.eventos[index] = evento;
      return evento;
    }
    throw new Error('Evento não encontrado');
  }

  async excluirEvento(id: number): Promise<boolean> {
    const index = this.eventos.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.eventos.splice(index, 1);
      return true;
    }
    return false;
  }
}
