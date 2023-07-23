import { Evento } from '../../Entities/Evento';

export interface EventoRepository {
  criarEvento(evento: Evento): Promise<Evento>;
  obterEventos(): Promise<Evento[]>;
  obterEventoPorId(id: number): Promise<Evento | null>;
  atualizarEvento(evento: Evento): Promise<Evento>;
  excluirEvento(id: number): Promise<boolean>;
}
