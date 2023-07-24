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
    );
  });

  describe('criarLutador', () => {
    it('deve criar um novo lutador', async () => {
      const request: Request = {
        body: {
          nome: 'Teste Lutador',
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

      // Verifique se o lutador foi adicionado ao repositório
      const lutadores = await lutadorRepository.obterLutadores();
      expect(lutadores.length).toBe(1);
      expect(lutadores[0].nome).toBe('Teste Lutador');
    });

  });

  describe('obterLutadores', () => {
    it('deve retornar todos os lutadores', async () => {
      // Adicione lutadores de teste ao repositório
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

  });

});
