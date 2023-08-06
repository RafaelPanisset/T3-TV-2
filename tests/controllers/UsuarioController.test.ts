// UsuarioController.test.ts
import { Request, Response } from 'express';
import { UsuarioController } from '../../src/Controllers/UsuarioController';
import { UsuarioUseCases } from '../../src/usecases/UsuarioUseCases';
import { InMemoryUsuarioRepository } from '../../src/Repositories/InMemoryUsuarioRepository';

describe('UsuarioController', () => {
  // Cria instâncias dos objetos necessários para os testes
  const usuarioRepository = new InMemoryUsuarioRepository();
  const usuarioUseCases = new UsuarioUseCases(usuarioRepository);
  const usuarioController = new UsuarioController(usuarioUseCases);

  beforeEach(async () => {
    // Limpar o repositório antes de cada caso de teste
  });

  it('deve criar um novo usuário', async () => {
    const req = {
      body: {
        nomeUsuario: 'usuario1',
        senha: 'senha123',
        nomeCompleto: 'Usuário 1',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.criarUsuario(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nomeUsuario: 'usuario1',
      senha: 'senha123',
      nomeCompleto: 'Usuário 1',
    });
  });

  it('deve obter todos os usuários', async () => {
    // Adicionar alguns usuários ao repositório para o teste
    await usuarioRepository.criarUsuario({
      id: 1,
      nomeUsuario: 'usuario1',
      senha: 'senha123',
      nomeCompleto: 'Usuário 1',
    });
    await usuarioRepository.criarUsuario({
      id: 2,
      nomeUsuario: 'usuario2',
      senha: 'senha456',
      nomeCompleto: 'Usuário 2',
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.obterUsuarios(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        nomeUsuario: 'usuario1',
        senha: 'senha123',
        nomeCompleto: 'Usuário 1',
      },
      {
        id: 2,
        nomeUsuario: 'usuario2',
        senha: 'senha456',
        nomeCompleto: 'Usuário 2',
      },
    ]);
  });

  it('deve obter um usuário pelo ID', async () => {
    // Adicionar um usuário ao repositório para o teste
    await usuarioRepository.criarUsuario({
      id: 1,
      nomeUsuario: 'usuario1',
      senha: 'senha123',
      nomeCompleto: 'Usuário 1',
    });

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.obterUsuarioPorId(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nomeUsuario: 'usuario1',
      senha: 'senha123',
      nomeCompleto: 'Usuário 1',
    });
  });

  it('deve retornar erro ao tentar obter um usuário inexistente pelo ID', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.obterUsuarioPorId(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
  });

  it('deve atualizar um usuário existente', async () => {
    // Adicionar um usuário ao repositório para o teste
    await usuarioRepository.criarUsuario({
      id: 1,
      nomeUsuario: 'usuario1',
      senha: 'senha123',
      nomeCompleto: 'Usuário 1',
    });

    const req = {
      params: { id: '1' },
      body: {
        nomeUsuario: 'usuario1_atualizado',
        senha: 'senha456',
        nomeCompleto: 'Usuário 1 Atualizado',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.atualizarUsuario(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nomeUsuario: 'usuario1_atualizado',
      senha: 'senha456',
      nomeCompleto: 'Usuário 1 Atualizado',
    });
  });

  it('deve retornar erro ao tentar atualizar um usuário inexistente', async () => {
    const req = {
      params: { id: '100' },
      body: {
        nomeUsuario: 'usuario100_atualizado',
        senha: 'senha456',
        nomeCompleto: 'Usuário 100 Atualizado',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.atualizarUsuario(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
  });

  it('deve excluir um usuário existente', async () => {
    // Adicionar um usuário ao repositório para o teste
    await usuarioRepository.criarUsuario({
      id: 1,
      nomeUsuario: 'usuario1',
      senha: 'senha123',
      nomeCompleto: 'Usuário 1',
    });

    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.excluirUsuario(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso' });
  });

  it('deve retornar erro ao tentar excluir um usuário inexistente', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.excluirUsuario(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
  });
});
