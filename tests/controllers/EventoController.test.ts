import { Request, Response } from 'express';
import { EventoController } from '../../src/Controllers/EventoController';
import { CriarEventoUseCase, ObterEventosUseCase, ObterEventoPorIdUseCase, AtualizarEventoUseCase, ExcluirEventoUseCase } from '../../src/usecases/EventoUseCases';
import { InMemoryEventoRepository } from '../../src/Repositories/InMemoryEventoRepository';
import { Evento } from '../../src/Entities/Evento';

describe('EventoController', () => {
  let eventoController: EventoController;
  let eventoRepository: InMemoryEventoRepository;
  let criarEventoUseCase: CriarEventoUseCase;
  let obterEventosUseCase: ObterEventosUseCase;
  let obterEventoPorIdUseCase: ObterEventoPorIdUseCase;
  let atualizarEventoUseCase: AtualizarEventoUseCase;
  let excluirEventoUseCase: ExcluirEventoUseCase;

  beforeEach(() => {
    eventoRepository = new InMemoryEventoRepository();
    criarEventoUseCase = new CriarEventoUseCase(eventoRepository);
    obterEventosUseCase = new ObterEventosUseCase(eventoRepository);
    obterEventoPorIdUseCase = new ObterEventoPorIdUseCase(eventoRepository);
    atualizarEventoUseCase = new AtualizarEventoUseCase(eventoRepository);
    excluirEventoUseCase = new ExcluirEventoUseCase(eventoRepository);
    eventoController = new EventoController(
      criarEventoUseCase,
      obterEventosUseCase,
      obterEventoPorIdUseCase,
      atualizarEventoUseCase,
      excluirEventoUseCase
    );
  });

  describe('criarEvento', () => {
    it('should create a new evento', async () => {
      const req = {
        body: { nome: 'evento1', data: new Date('2022-01-01'), local: 'Local Um' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await eventoController.criarEvento(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });
    });

    it('should handle error while creating an evento', async () => {
      const req = {
        body: { nome: 'evento1', data: new Date('2022-01-01'), local: 'Local Um' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Force the use case to throw an error
      criarEventoUseCase.execute = jest.fn().mockRejectedValue(new Error('Failed to create evento'));

      await eventoController.criarEvento(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar o evento' });
    });
  });

  describe('obterEventos', () => {
    it('should return all eventos', async () => {
      // Add test eventos to the repository
      await eventoRepository.criarEvento({
        id: 1,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });

      await eventoRepository.criarEvento({
        id: 2,
        nome: 'evento2',
        data: new Date('2022-02-02'),
        local: 'Local Dois',
      });

      const req = {};
      const res = {
        json: jest.fn(),
      };

      await eventoController.obterEventos(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith([
        { id: 1, nome: 'evento1', data: new Date('2022-01-01'), local: 'Local Um' },
        { id: 2, nome: 'evento2', data: new Date('2022-02-02'), local: 'Local Dois' },
      ]);
    });

    it('should handle error while fetching eventos', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Force the use case to throw an error
      obterEventosUseCase.execute = jest.fn().mockRejectedValue(new Error('Failed to fetch eventos'));

      await eventoController.obterEventos(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter os eventos' });
    });
  });

  describe('obterEventoPorId', () => {
    it('should return an evento by its id', async () => {
      const eventoId = 1;
      await eventoRepository.criarEvento({
        id: eventoId,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });

      const req = {
        params: { id: eventoId.toString() },
      };
      const res = {
        json: jest.fn(),
      };

      await eventoController.obterEventoPorId(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({
        id: eventoId,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });
    });

    it('should handle error if evento is not found', async () => {
      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Force the use case to return null, indicating evento not found
      obterEventoPorIdUseCase.execute = jest.fn().mockResolvedValue(null);

      await eventoController.obterEventoPorId(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });

    it('should handle error while fetching evento by id', async () => {
      const req = {
        params: { id: 'invalidId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Force the use case to throw an error
      obterEventoPorIdUseCase.execute = jest.fn().mockRejectedValue(new Error('Failed to fetch evento by id'));

      await eventoController.obterEventoPorId(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter o evento' });
    });
  });

  describe('atualizarEvento', () => {
    it('should update an existing evento', async () => {
      const eventoId = 1;
      await eventoRepository.criarEvento({
        id: eventoId,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });
  
      const req = {
        params: { id: eventoId.toString() },
        body: { nome: 'evento1 atualizado', data: new Date('2022-01-02'), local: 'Local Atualizado' },
      };
      const res = {
        json: jest.fn(),
      };
  
      await eventoController.atualizarEvento(req as any, res as any);
  
      expect(res.json).toHaveBeenCalledWith({
        id: eventoId,
        nome: 'evento1 atualizado',
        data: new Date('2022-01-02'),
        local: 'Local Atualizado',
      });
    });
  
    it('should handle error if evento is not found during update', async () => {
      const req = {
        params: { id: '999' },
        body: { nome: 'evento1 atualizado', data: new Date('2022-01-02'), local: 'Local Atualizado' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Force the use case to return null, indicating evento not found
      atualizarEventoUseCase.execute = jest.fn().mockResolvedValue(null);
  
      await eventoController.atualizarEvento(req as any, res as any);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });
  
    it('should handle error while updating evento', async () => {
      const eventoId = 1;
      await eventoRepository.criarEvento({
        id: eventoId,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });
  
      const req = {
        params: { id: eventoId.toString() },
        body: { nome: 'evento1 atualizado', data: new Date('2022-01-02'), local: 'Local Atualizado' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Force the use case to throw an error
      atualizarEventoUseCase.execute = jest.fn().mockRejectedValue(new Error('Failed to update evento'));
  
      await eventoController.atualizarEvento(req as any, res as any);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar o evento' });
    });
  });
  
  describe('excluirEvento', () => {
    it('should delete an existing evento', async () => {
      const eventoId = 1;
      await eventoRepository.criarEvento({
        id: eventoId,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });
  
      const req = {
        params: { id: eventoId.toString() },
      };
      const res = {
        json: jest.fn(),
      };
  
      await eventoController.excluirEvento(req as any, res as any);
  
      expect(res.json).toHaveBeenCalledWith({ message: 'Evento excluído com sucesso' });
    });
  
    it('should handle error if evento is not found during deletion', async () => {
      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Force the use case to return null, indicating evento not found
      excluirEventoUseCase.execute = jest.fn().mockResolvedValue(null);
  
      await eventoController.excluirEvento(req as any, res as any);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });
  
    it('should handle error while deleting evento', async () => {
      const eventoId = 1;
      await eventoRepository.criarEvento({
        id: eventoId,
        nome: 'evento1',
        data: new Date('2022-01-01'),
        local: 'Local Um',
      });
  
      const req = {
        params: { id: eventoId.toString() },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Force the use case to throw an error
      excluirEventoUseCase.execute = jest.fn().mockRejectedValue(new Error('Failed to delete evento'));
  
      await eventoController.excluirEvento(req as any, res as any);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir o evento' });
    });
  });
});