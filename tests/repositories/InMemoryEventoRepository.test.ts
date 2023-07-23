import { InMemoryEventoRepository } from '../../src/Repositories/InMemoryEventoRepository';
import { Evento } from '../../src/Entities/Evento';

describe('InMemoryEventoRepository', () => {
  let eventoRepository: InMemoryEventoRepository;

  beforeEach(() => {
    eventoRepository = new InMemoryEventoRepository();
  });

  describe('criarEvento', () => {
    it('deve criar um novo evento', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      const eventoCriado = await eventoRepository.criarEvento(evento);

      expect(eventoCriado).toEqual(evento);
    });
  });

  describe('obterEventos', () => {
    it('deve retornar todos os eventos', async () => {
      const evento1: Evento = {
        id: 1,
        nome: 'Evento 1',
        data: new Date(),
        local: 'Local 1',
      };

      const evento2: Evento = {
        id: 2,
        nome: 'Evento 2',
        data: new Date(),
        local: 'Local 2',
      };

      await eventoRepository.criarEvento(evento1);
      await eventoRepository.criarEvento(evento2);

      const eventos = await eventoRepository.obterEventos();

      expect(eventos).toEqual([evento1, evento2]);
    });
  });

  describe('obterEventoPorId', () => {
    it('deve retornar o evento com o id fornecido', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await eventoRepository.criarEvento(evento);

      const eventoObtido = await eventoRepository.obterEventoPorId(1);

      expect(eventoObtido).toEqual(evento);
    });

    it('deve retornar null se o evento com o id fornecido não existir', async () => {
      const eventoObtido = await eventoRepository.obterEventoPorId(1);

      expect(eventoObtido).toBeNull();
    });
  });

  describe('atualizarEvento', () => {
    it('deve atualizar o evento com o id fornecido', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await eventoRepository.criarEvento(evento);

      const eventoAtualizado: Evento = {
        id: 1,
        nome: 'Evento Atualizado',
        data: new Date(),
        local: 'Local Atualizado',
      };

      const eventoAtualizadoObtido = await eventoRepository.atualizarEvento(eventoAtualizado);

      expect(eventoAtualizadoObtido).toEqual(eventoAtualizado);

      const eventos = await eventoRepository.obterEventos();
      expect(eventos[0]).toEqual(eventoAtualizado);
    });

    it('deve lançar um erro se o evento com o id fornecido não existir', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await expect(eventoRepository.atualizarEvento(evento)).rejects.toThrow('Evento não encontrado');
    });
  });

  describe('excluirEvento', () => {
    it('deve excluir o evento com o id fornecido', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await eventoRepository.criarEvento(evento);

      const eventoExcluido = await eventoRepository.excluirEvento(1);

      expect(eventoExcluido).toBe(true);

      const eventos = await eventoRepository.obterEventos();
      expect(eventos.length).toBe(0);
    });

    it('deve retornar false se o evento com o id fornecido não existir', async () => {
      const eventoExcluido = await eventoRepository.excluirEvento(1);

      expect(eventoExcluido).toBe(false);
    });
  });
});
