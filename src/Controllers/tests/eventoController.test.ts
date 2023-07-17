import { InMemoryEventoRepository } from '../../Repositories/InMemoryEventoRepository';
import { Evento } from '../../Models/Evento';

describe('InMemoryEventoRepository', () => {
  let eventoRepository: InMemoryEventoRepository;

  beforeEach(() => {
    eventoRepository = new InMemoryEventoRepository();
  });

  describe('criarEvento', () => {
    it('should create a new evento', async () => {
      const newEvento: Evento = { id: 1, nome: 'Test Event', data: new Date('2023-07-17'), local: 'Test Location' };
      const createdEvento = await eventoRepository.criarEvento(newEvento);

      expect(createdEvento).toEqual(newEvento);
      expect(eventoRepository.obterEventos()).toContainEqual(newEvento);
    });
  });

  describe('obterEventos', () => {
    it('should return an empty list if no eventos are present', async () => {
      const eventos = await eventoRepository.obterEventos();
      expect(eventos).toEqual([]);
    });

    it('should return a list of eventos if eventos are present', async () => {
      const eventosMock: Evento[] = [
        { id: 1, nome: 'Event 1', data: new Date('2023-07-16'), local: 'Location 1' },
        { id: 2, nome: 'Event 2', data: new Date('2023-07-17'), local: 'Location 2' },
      ];
      eventoRepository['eventos'] = eventosMock;

      const eventos = await eventoRepository.obterEventos();
      expect(eventos).toEqual(eventosMock);
    });
  });

  describe('obterEventoPorId', () => {
    it('should return null for non-existing evento', async () => {
      const eventoId = 1;
      const evento = await eventoRepository.obterEventoPorId(eventoId);
      expect(evento).toBeNull();
    });

    it('should return the evento for existing eventoId', async () => {
      const eventoId = 1;
      const eventoMock: Evento = { id: eventoId, nome: 'Event 1', data: new Date('2023-07-16'), local: 'Location 1' };
      eventoRepository['eventos'] = [eventoMock];

      const evento = await eventoRepository.obterEventoPorId(eventoId);
      expect(evento).toEqual(eventoMock);
    });
  });

  describe('atualizarEvento', () => {
    it('should update an existing evento', async () => {
      const eventoId = 1;
      const updatedEvento: Evento = { id: eventoId, nome: 'Updated Event', data: new Date('2023-07-18'), local: 'Updated Location' };
      eventoRepository['eventos'] = [{ id: eventoId, nome: 'Event 1', data: new Date('2023-07-16'), local: 'Location 1' }];

      const updated = await eventoRepository.atualizarEvento(updatedEvento);
      expect(updated).toEqual(updatedEvento);
      expect(eventoRepository['eventos']).toContainEqual(updatedEvento);
    });

    it('should throw an error for non-existing eventoId', async () => {
      const eventoId = 1;
      const updatedEvento: Evento = { id: eventoId, nome: 'Updated Event', data: new Date('2023-07-18'), local: 'Updated Location' };

      await expect(eventoRepository.atualizarEvento(updatedEvento)).rejects.toThrowError('Evento não encontrado');
    });
  });

  describe('excluirEvento', () => {
    it('should delete an existing evento and return true', async () => {
      const eventoId = 1;
      eventoRepository['eventos'] = [{ id: eventoId, nome: 'Event 1', data: new Date('2023-07-16'), local: 'Location 1' }];

      const deleted = await eventoRepository.excluirEvento(eventoId);
      expect(deleted).toBe(true);
      expect(eventoRepository['eventos']).toHaveLength(0);
    });

    it('should return false for non-existing eventoId', async () => {
      const eventoId = 1;
      const deleted = await eventoRepository.excluirEvento(eventoId);
      expect(deleted).toBe(false);
    });
  });
});
