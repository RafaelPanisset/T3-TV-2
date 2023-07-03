import { Evento } from '../src/Models/Evento';
import { EventoRepository } from '../src/Repositories/EventoRepository';
import { InMemoryEventoRepository } from '../src/Repositories/InMemoryEventoRepository';

describe('EventoRepository', () => {
  let eventoRepository: EventoRepository;

  beforeAll(() => {
    eventoRepository = new InMemoryEventoRepository();
  });

  describe('criarEvento', () => {
    test('deve criar um novo evento', async () => {
      // Simule os dados do evento
      const eventoData: Evento = { id: 1, nome: 'Evento de Teste', data: new Date('2023-07-01'), local: 'Local de Teste' };

      // Chame o método criarEvento do eventoRepository
      const novoEvento = await eventoRepository.criarEvento(eventoData);

      // Verifique se o evento retornado corresponde aos dados do evento
      expect(novoEvento).toEqual(eventoData);
    });
  });

  describe('obterEventos', () => {
    test('deve retornar uma lista de eventos', async () => {
      // Chame o método obterEventos do eventoRepository
      const eventos = await eventoRepository.obterEventos();

      // Verifique se o valor retornado é um array
      expect(Array.isArray(eventos)).toBe(true);

      // Verifique se os eventos são do tipo Evento
      expect(eventos.every((evento: Evento) => typeof evento === 'object')).toBe(true);
    });
  });

  describe('obterEventoPorId', () => {
    test('deve retornar um evento para um determinado ID', async () => {
      const eventId = 1;

      // Chame o método obterEventoPorId do eventoRepository
      const evento = await eventoRepository.obterEventoPorId(eventId);

      // Verifique se o evento retornado possui o ID correto
      expect(evento?.id).toBe(eventId);
    });

    test('deve retornar null para um ID inexistente', async () => {
      const eventId = 999;

      // Chame o método obterEventoPorId do eventoRepository
      const evento = await eventoRepository.obterEventoPorId(eventId);

      // Verifique se o evento retornado é null
      expect(evento).toBeNull();
    });
  });

  describe('atualizarEvento', () => {
    test('deve atualizar um evento existente', async () => {
      // Simule os dados do evento com valores atualizados
      const updatedEventoData: Evento = { id: 1, nome: 'Evento Atualizado', data: new Date('2023-07-02'), local: 'Local Atualizado' };

      // Chame o método atualizarEvento do eventoRepository
      const eventoAtualizado = await eventoRepository.atualizarEvento(updatedEventoData);

      // Verifique se o evento retornado corresponde aos dados do evento atualizado
      expect(eventoAtualizado).toEqual(updatedEventoData);
    });
  });

  describe('excluirEvento', () => {
    test('deve excluir um evento existente', async () => {
      const eventId = 1;

      // Chame o método excluirEvento do eventoRepository
      const eventoExcluido = await eventoRepository.excluirEvento(eventId);

      // Verifique se o valor retornado é true indicando exclusão bem-sucedida
      expect(eventoExcluido).toBe(true);
    });

    test('deve retornar false para um ID inexistente', async () => {
      const eventId = 999;

      // Chame o método excluirEvento do eventoRepository
      const eventoExcluido = await eventoRepository.excluirEvento(eventId);

      // Verifique se o valor retornado é false indicando evento não encontrado
      expect(eventoExcluido).toBe(false);
    });
  });
});
