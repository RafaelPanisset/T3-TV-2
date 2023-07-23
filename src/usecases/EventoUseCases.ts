import { Evento } from '../Entities/Evento';
import { EventoRepository } from '../Repositories/contract/EventoRepository';

export class CriarEventoUseCase {
  constructor(private readonly eventoRepository: EventoRepository) {}

  async execute(evento: Evento): Promise<Evento> {
    return this.eventoRepository.criarEvento(evento);
  }
}

export class ObterEventosUseCase {
  constructor(private readonly eventoRepository: EventoRepository) {}

  async execute(): Promise<Evento[]> {
    return this.eventoRepository.obterEventos();
  }
}

export class ObterEventoPorIdUseCase {
  constructor(private readonly eventoRepository: EventoRepository) {}

  async execute(id: number): Promise<Evento | null> {
    return this.eventoRepository.obterEventoPorId(id);
  }
}

export class AtualizarEventoUseCase {
  constructor(private readonly eventoRepository: EventoRepository) {}

  async execute(evento: Evento): Promise<Evento> {
    return this.eventoRepository.atualizarEvento(evento);
  }
}

export class ExcluirEventoUseCase {
  constructor(private readonly eventoRepository: EventoRepository) {}

  async execute(id: number): Promise<boolean> {
    return this.eventoRepository.excluirEvento(id);
  }
}
