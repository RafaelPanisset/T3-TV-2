import { Request, Response } from 'express';
import { LutaController } from '../../src/Controllers/LutaController';
import { LutaUseCases } from '../../src/usecases/LutaUseCases';
import { InMemoryLutaRepository } from '../../src/Repositories/InMemoryLutaRepository';


describe('LutaController', () => {
  // Cria instâncias dos objetos necessários para os testes
  const lutaRepository = new InMemoryLutaRepository();
  const lutaUseCases = new LutaUseCases(lutaRepository);
  const lutaController = new LutaController(lutaUseCases);

  it('deve criar uma nova luta', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {
      body: { idLutador1: 1, idLutador2: 2, idEvento: 1, idCard: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método criarLuta do controlador de lutas
    await lutaController.criarLuta(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      idLutador1: 1,
      idLutador2: 2,
      idEvento: 1,
      idCard: 1,
    });
  });

  it('deve obter todas as lutas', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método obterLutas do controlador de lutas
    await lutaController.obterLutas(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, idLutador1: 1, idLutador2: 2, idEvento: 1, idCard: 1 },
    ]);
  });

  it('deve obter uma luta pelo ID', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método obterLutaPorId do controlador de lutas
    await lutaController.obterLutaPorId(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      idLutador1: 1,
      idLutador2: 2,
      idEvento: 1,
      idCard: 1,
    });
  });

  it('deve retornar erro ao tentar obter uma luta inexistente pelo ID', async () => {
    // Cria objetos de requisição e resposta falsos
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método obterLutaPorId do controlador de lutas
    await lutaController.obterLutaPorId(req as any, res as any);

    // Verifica se os métodos status e json da resposta foram chamados com os argumentos esperados
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Luta não encontrada' });
  });

  it('deve atualizar uma luta existente', async () => {
    const req = {
      params: { id: '1' },
      body: { idLutador1: 2, idLutador2: 3, idEvento: 2, idCard: 2 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutaController.atualizarLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      idLutador1: 2,
      idLutador2: 3,
      idEvento: 2,
      idCard: 2,
    });
  });

  it('deve retornar erro ao tentar atualizar uma luta inexistente', async () => {
    const req = {
      params: { id: '100' },
      body: { idLutador1: 2, idLutador2: 3, idEvento: 2, idCard: 2 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutaController.atualizarLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Luta não encontrada' });
  });

  it('deve excluir uma luta existente', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutaController.excluirLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Luta excluída com sucesso' });
  });

  it('deve retornar erro ao tentar excluir uma luta inexistente', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lutaController.excluirLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Luta não encontrada' });
  });

  
  it('deve atualizar uma luta existente', async () => {
    const req = {
      params: { id: '1' },
      body: { idLutador1: 2, idLutador2: 3, idEvento: 2, idCard: 2 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula uma luta existente no repositório
    jest.spyOn(lutaUseCases, 'obterLutaPorId').mockResolvedValueOnce({
      id: 1,
      idLutador1: 1,
      idLutador2: 2,
      idEvento: 1,
      idCard: 1,
    });

    // Chama o método atualizarLuta do controlador de lutas
    await lutaController.atualizarLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      idLutador1: 2,
      idLutador2: 3,
      idEvento: 2,
      idCard: 2,
    });
  });

  it('deve retornar erro ao tentar atualizar uma luta inexistente', async () => {
    const req = {
      params: { id: '100' },
      body: { idLutador1: 2, idLutador2: 3, idEvento: 2, idCard: 2 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula uma luta inexistente no repositório
    jest.spyOn(lutaUseCases, 'obterLutaPorId').mockResolvedValueOnce(null);

    // Chama o método atualizarLuta do controlador de lutas
    await lutaController.atualizarLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Luta não encontrada' });
  });

  it('deve excluir uma luta existente', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula uma luta existente no repositório
    jest.spyOn(lutaUseCases, 'obterLutaPorId').mockResolvedValueOnce({
      id: 1,
      idLutador1: 1,
      idLutador2: 2,
      idEvento: 1,
      idCard: 1,
    });

    // Chama o método excluirLuta do controlador de lutas
    await lutaController.excluirLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Luta excluída com sucesso' });
  });

  it('deve retornar erro ao tentar excluir uma luta inexistente', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula uma luta inexistente no repositório
    jest.spyOn(lutaUseCases, 'obterLutaPorId').mockResolvedValueOnce(null);

    // Chama o método excluirLuta do controlador de lutas
    await lutaController.excluirLuta(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Luta não encontrada' });
  });
});
