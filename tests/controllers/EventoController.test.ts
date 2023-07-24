import { Request, Response } from 'express';
import { EventoController } from '../../src/Controllers/EventoController';
import { CriarEventoUseCase, ObterEventosUseCase, ObterEventoPorIdUseCase, AtualizarEventoUseCase, ExcluirEventoUseCase } from '../../src/usecases/EventoUseCases';
import { InMemoryEventoRepository } from '../../src/Repositories/InMemoryEventoRepository';
import { Evento } from '../../src/Entities/Evento';

describe('EventoController', () => {
  let eventoController: EventoController;
  let eventoRepository: InMemoryEventoRepository;

  beforeEach(() => {
    eventoRepository = new InMemoryEventoRepository();
    const criarEventoUseCase = new CriarEventoUseCase(eventoRepository);
    const obterEventosUseCase = new ObterEventosUseCase(eventoRepository);
    const obterEventoPorIdUseCase = new ObterEventoPorIdUseCase(eventoRepository);
    const atualizarEventoUseCase = new AtualizarEventoUseCase(eventoRepository);
    const excluirEventoUseCase = new ExcluirEventoUseCase(eventoRepository);

    eventoController = new EventoController(
      criarEventoUseCase,
      obterEventosUseCase,
      obterEventoPorIdUseCase,
      atualizarEventoUseCase,
      excluirEventoUseCase
    );
  });

  describe('criarEvento', () => {
    it('should create a new event', async () => {
      const request: Request = {
        body: {
          nome: 'Test Event',
          data: new Date(),
          local: 'Test Location',
        },
      } as Request;

      const response: Response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as unknown as Response;

      await eventoController.criarEvento(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();

      // Check if the event was added to the repository
      const eventos = await eventoRepository.obterEventos();
      expect(eventos.length).toBe(1);
      expect(eventos[0].nome).toBe('Test Event');
    });

    // Add more test cases for error handling, validation, etc.
  });

  // describe('obterEventos', () => {
  //   it('should return all events', async () => {
  //     // Add test events to the repository
  //     await eventoRepository.criarEvento({
  //       id: 1,
  //       nome: 'Event 1',
  //       data: new Date(),
  //       local: 'Location 1',
  //     });

  //     await eventoRepository.criarEvento({
  //       id: 2,
  //       nome: 'Event 2',
  //       data: new Date(),
  //       local: 'Location 2',
  //     });

  //     const request: Request = {} as Request;
  //     const response: Response = {
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     await eventoController.obterEventos(request, response);

  //     expect(response.json).toHaveBeenCalledWith([
  //       {
  //         id: 1,
  //         nome: 'Event 1',
  //         data: expect.any(Date),
  //         local: 'Location 1',
  //       },
  //       {
  //         id: 2,
  //         nome: 'Event 2',
  //         data: expect.any(Date),
  //         local: 'Location 2',
  //       },
  //     ]);
  //   });

  //   // Add more test cases for different scenarios
  // });

  // // Add more test cases for other controller methods
});
