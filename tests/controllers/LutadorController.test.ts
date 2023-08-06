import { Request, Response } from 'express';
import { LutadorController } from '../../src/Controllers/LutadorController';
import { LutadorUseCases } from '../../src/usecases/LutadorUseCases';
import { InMemoryLutadorRepository } from '../../src/Repositories/InMemoryLutadorRepository';
import { Lutador } from '../../src/Entities/Lutador';

describe('LutadorController', () => {
  // Cria instâncias dos objetos necessários para os testes
  const lutadorRepository = new InMemoryLutadorRepository();
  const lutadorUseCases = new LutadorUseCases(lutadorRepository);
  const lutadorController = new LutadorController(lutadorUseCases);

  it('deve criar um novo lutador', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {
      body: {
        id: 1,
        nome: 'Lutador 1',
        categoriaPeso: 'Peso Médio',
        paisOrigem: 'Brasil',
        idade: 30,
        altura: 1.8,
        alcance: 2.0,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método criarLutador do controlador de lutadores
    await lutadorController.criarLutador(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nome: 'Lutador 1',
      categoriaPeso: 'Peso Médio',
      paisOrigem: 'Brasil',
      idade: 30,
      altura: 1.8,
      alcance: 2.0,
    });
  });

  it('deve obter todos os lutadores', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método obterLutadores do controlador de lutadores
    await lutadorController.obterLutadores(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        nome: 'Lutador 1',
        categoriaPeso: 'Peso Médio',
        paisOrigem: 'Brasil',
        idade: 30,
        altura: 1.8,
        alcance: 2.0,
      },
    ]);
  });

  it('deve obter um lutador pelo ID', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método obterLutadorPorId do controlador de lutadores
    await lutadorController.obterLutadorPorId(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nome: 'Lutador 1',
      categoriaPeso: 'Peso Médio',
      paisOrigem: 'Brasil',
      idade: 30,
      altura: 1.8,
      alcance: 2.0,
    });
  });


it('deve atualizar um lutador existente', async () => {
    const req = {
      params: { id: '1' },
      body: {
        nome: 'Lutador 1 Atualizado',
        categoriaPeso: 'Peso Pesado',
        paisOrigem: 'Brasil',
        idade: '35',
        altura: '1.85',
        alcance: '2.1',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutadorController.atualizarLutador(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nome: 'Lutador 1 Atualizado',
      categoriaPeso: 'Peso Pesado',
      paisOrigem: 'Brasil',
      idade: 35,
      altura: 1.85,
      alcance: 2.1,
    });
  });

  it('deve retornar erro ao tentar atualizar um lutador inexistente', async () => {
    const req = {
      params: { id: '100' },
      body: {
        nome: 'Lutador 100 Atualizado',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'EUA',
        idade: '28',
        altura: '1.75',
        alcance: '1.9',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutadorController.atualizarLutador(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Lutador não encontrado' });
  });

  it('deve excluir um lutador existente', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutadorController.excluirLutador(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Lutador excluído com sucesso' });
  });

  it('deve retornar erro ao tentar excluir um lutador inexistente', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutadorController.excluirLutador(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Lutador não encontrado' });
  });
});