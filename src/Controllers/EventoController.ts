import { Request, Response } from 'express';
import { EventoController } from './EventoController';
import { EventoRepository } from '../Repositories/EventoRepository';

describe('EventoController', () => {
  let eventoController: EventoController;
  let eventoRepository: EventoRepository;

  beforeEach(() => {
    eventoRepository = new EventoRepository();
    eventoController = new EventoController(eventoRepository);
  });

  describe('criarEvento', () => {
    it('should create a new event and return it', async () => {
      const req = {
        body: {
          nome: 'Test Event',
          data: '2023-07-16',
          local: 'Test Location',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await eventoController.criarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should handle errors and return a 500 status code', async () => {
      const req = {
        body: {
          nome: 'Test Event',
          data: '2023-07-16',
          local: 'Test Location',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'criarEvento').mockRejectedValue(new Error('Failed to create event'));

      await eventoController.criarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar o evento' });
    });
  });

  describe('obterEventos', () => {
    it('should return a list of events', async () => {
      const eventos = [
        { id: 1, nome: 'Event 1', data: '2023-07-16', local: 'Location 1' },
        { id: 2, nome: 'Event 2', data: '2023-07-17', local: 'Location 2' },
      ];

      const req = {} as Request;

      const res = {
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'obterEventos').mockResolvedValue(eventos);

      await eventoController.obterEventos(req, res);

      expect(res.json).toHaveBeenCalledWith(eventos);
    });

    it('should handle errors and return a 500 status code', async () => {
      const req = {} as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'obterEventos').mockRejectedValue(new Error('Failed to fetch events'));

      await eventoController.obterEventos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter os eventos' });
    });
  });

  describe('atualizarEvento', () => {
    it('should update an existing event and return it', async () => {
      const req = {
        params: { id: '1' },
        body: {
          nome: 'Updated Event',
          data: '2023-07-18',
          local: 'Updated Location',
        },
      } as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'atualizarEvento').mockResolvedValue({ id: 1, nome: 'Updated Event', data: '2023-07-18', local: 'Updated Location' });

      await eventoController.atualizarEvento(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it('should handle updating a non-existing event and return a 404 status code', async () => {
      const req = {
        params: { id: '100' },
        body: {
          nome: 'Updated Event',
          data: '2023-07-18',
          local: 'Updated Location',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'atualizarEvento').mockResolvedValue(null);

      await eventoController.atualizarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });

    it('should handle errors and return a 500 status code', async () => {
      const req = {
        params: { id: '1' },
        body: {
          nome: 'Updated Event',
          data: '2023-07-18',
          local: 'Updated Location',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'atualizarEvento').mockRejectedValue(new Error('Failed to update event'));

      await eventoController.atualizarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar o evento' });
    });
  });

  describe('excluirEvento', () => {
    it('should delete an existing event and return a success message', async () => {
      const req = {
        params: { id: '1' },
      } as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'excluirEvento').mockResolvedValue(true);

      await eventoController.excluirEvento(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Evento excluído com sucesso' });
    });

    it('should handle deleting a non-existing event and return a 404 status code', async () => {
      const req = {
        params: { id: '100' },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'excluirEvento').mockResolvedValue(false);

      await eventoController.excluirEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });

    it('should handle errors and return a 500 status code', async () => {
      const req = {
        params: { id: '1' },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(eventoRepository, 'excluirEvento').mockRejectedValue(new Error('Failed to delete event'));

      await eventoController.excluirEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir o evento' });
    });
  });
});
