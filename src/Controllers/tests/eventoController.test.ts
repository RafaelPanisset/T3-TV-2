import { Request, Response } from 'express';
import { EventoController } from '../EventoController';
import { InMemoryEventoRepository } from '../../Repositories/InMemoryEventoRepository';
import { Evento } from '../../Models/Evento';

describe('EventoController', () => {
  let eventoController: EventoController;
  let eventoRepositoryMock: InMemoryEventoRepository;

  beforeEach(() => {
    eventoRepositoryMock = new InMemoryEventoRepository();
    eventoController = new EventoController(eventoRepositoryMock);
  });

  describe('criarEvento', () => {
    it('should create a new evento and return it', async () => {
      const req = { body: { nome: 'Test Event', data: '2023-07-17', local: 'Test Location' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      // Mock the repository methods
      const mockEventos: Evento[] = [
        { id: 1, nome: 'Existing Event', data: new Date('2023-07-16'), local: 'Existing Location' },
      ];
      jest.spyOn(eventoRepositoryMock, 'obterEventos').mockResolvedValueOnce(mockEventos);
      
      const mockEvento: Evento = { id: 2, ...req.body };
      jest.spyOn(eventoRepositoryMock, 'criarEvento').mockResolvedValueOnce(mockEvento);

      await eventoController.criarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockEvento);
    });

    // ... Other tests ...
  });
});
