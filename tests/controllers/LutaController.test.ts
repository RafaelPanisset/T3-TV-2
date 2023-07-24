import { Request, Response } from 'express';
import { LutaController } from '../../src/Controllers/LutaController';
import { LutaUseCases } from '../../src/usecases/LutaUseCases';
import { InMemoryLutaRepository } from '../../src/Repositories/InMemoryLutaRepository';
import { Luta } from '../../src/Entities/Luta';

describe('LutaController', () => {
  let lutaController: LutaController;
  let lutaRepository: InMemoryLutaRepository;

  beforeEach(() => {
    lutaRepository = new InMemoryLutaRepository();
    const lutaUseCases = new LutaUseCases(lutaRepository);

    lutaController = new LutaController(
      lutaUseCases,
    );
  });

  describe('criarLuta', () => {
    it('deve criar uma nova luta', async () => {
      const request: Request = {
        body: {
          idLutador1: 1,
          idLutador2: 2,
          idEvento: 1,
          idCard: 1,
        },
      } as Request;

      const response: Response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as unknown as Response;

      await lutaController.criarLuta(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();

      const lutas = await lutaRepository.obterLutas();
      expect(lutas.length).toBe(1);
      expect(lutas[0].idLutador1).toBe(1);
      expect(lutas[0].idLutador2).toBe(2);
    });

    // Adicione mais casos de teste para tratamento de erros, validações, etc.
  });

  describe('obterLutas', () => {
    it('deve retornar todas as lutas', async () => {
      // Adicione lutas de teste ao repositório
      await lutaRepository.criarLuta({
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      });

      await lutaRepository.criarLuta({
        id: 2,
        idLutador1: 3,
        idLutador2: 4,
        idEvento: 2,
        idCard: 2,
      });

      const request: Request = {} as Request;
      const response: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await lutaController.obterLutas(request, response);

      expect(response.json).toHaveBeenCalledWith([
        {
          id: 1,
          idLutador1: 1,
          idLutador2: 2,
          idEvento: 1,
          idCard: 1,
        },
        {
          id: 2,
          idLutador1: 3,
          idLutador2: 4,
          idEvento: 2,
          idCard: 2,
        },
      ]);
    });

    // Adicione mais casos de teste para cenários diferentes
  });

});
