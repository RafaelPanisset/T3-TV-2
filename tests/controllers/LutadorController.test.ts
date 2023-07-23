import { Request, Response } from 'express';
import { LutadorController } from '../../src/Controllers/LutadorController';
import { LutadorUseCases } from '../../src/usecases/LutadorUseCases';
import { InMemoryLutadorRepository } from '../../src/Repositories/InMemoryLutadorRepository';
import { Lutador } from '../../src/Entities/Lutador';

describe('LutadorController', () => {
  let lutadorController: LutadorController;
  let lutadorRepository: InMemoryLutadorRepository;

  beforeEach(() => {
    lutadorRepository = new InMemoryLutadorRepository();
    const lutadorUseCases = new LutadorUseCases(lutadorRepository);

    lutadorController = new LutadorController(
      lutadorUseCases,
      // ... (rest of the use cases)
    );
  });

  describe('criarLutador', () => {
    it('should create a new lutador', async () => {
      const request: Request = {
        body: {
          nome: 'Test Lutador',
          categoriaPeso: 'Peso Médio',
          paisOrigem: 'Brasil',
          idade: 30,
          altura: 1.8,
          alcance: 1.9,
        },
      } as Request;

      const response: Response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as unknown as Response;

      await lutadorController.criarLutador(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();

      // Check if the lutador was added to the repository
      const lutadores = await lutadorRepository.obterLutadores();
      expect(lutadores.length).toBe(1);
      expect(lutadores[0].nome).toBe('Test Lutador');
    });

    // Add more test cases for error handling, validation, etc.
  });

  describe('obterLutadores', () => {
    it('should return all lutadores', async () => {
      // Add test lutadores to the repository
      await lutadorRepository.criarLutador({
        id: 1,
        nome: 'Lutador 1',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 25,
        altura: 1.75,
        alcance: 1.8,
      });

      await lutadorRepository.criarLutador({
        id: 2,
        nome: 'Lutador 2',
        categoriaPeso: 'Peso Pesado',
        paisOrigem: 'Estados Unidos',
        idade: 28,
        altura: 1.85,
        alcance: 2.0,
      });

      const request: Request = {} as Request;
      const response: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await lutadorController.obterLutadores(request, response);

      expect(response.json).toHaveBeenCalledWith([
        {
          id: 1,
          nome: 'Lutador 1',
          categoriaPeso: 'Peso Leve',
          paisOrigem: 'Brasil',
          idade: 25,
          altura: 1.75,
          alcance: 1.8,
        },
        {
          id: 2,
          nome: 'Lutador 2',
          categoriaPeso: 'Peso Pesado',
          paisOrigem: 'Estados Unidos',
          idade: 28,
          altura: 1.85,
          alcance: 2.0,
        },
      ]);
    });

    // Add more test cases for different scenarios
  });

  // Add more test cases for other controller methods
});
