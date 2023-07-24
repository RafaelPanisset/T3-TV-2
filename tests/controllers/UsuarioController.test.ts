import { Request, Response } from 'express';
import { UsuarioController } from '../../src/Controllers/UsuarioController';
import { UsuarioUseCases } from '../../src/usecases/UsuarioUseCases';
import { InMemoryUsuarioRepository } from '../../src/Repositories/InMemoryUsuarioRepository';
import { Usuario } from '../../src/Entities/Usuario';

// Testes para UsuarioController
describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioRepository: InMemoryUsuarioRepository;

  beforeEach(() => {
    usuarioRepository = new InMemoryUsuarioRepository();
    usuarioController = new UsuarioController(usuarioRepository);
  });

  describe('criarUsuario', () => {
    it('deve criar um novo usuário', async () => {
      const request: Request = {
        body: {
          nomeUsuario: 'usuario1',
          senha: 'senha123',
          nomeCompleto: 'Usuário Um',
        },
      } as Request;

      const response: Response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as unknown as Response;

      await usuarioController.criarUsuario(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();

      const usuarios = await usuarioRepository.obterUsuarios();
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].nomeUsuario).toBe('usuario1');
    });

    // Adicione mais casos de teste para tratamento de erros, validações, etc.
  });

  describe('obterUsuarios', () => {
    it('deve retornar todos os usuários', async () => {
      // Adicione usuários de teste ao repositório
      await usuarioRepository.criarUsuario({
        id: 1,
        nomeUsuario: 'usuario1',
        senha: 'senha123',
        nomeCompleto: 'Usuário Um',
      });

      await usuarioRepository.criarUsuario({
        id: 2,
        nomeUsuario: 'usuario2',
        senha: 'test123',
        nomeCompleto: 'Usuário Dois',
      });

      const request: Request = {} as Request;
      const response: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await usuarioController.obterUsuarios(request, response);

      expect(response.json).toHaveBeenCalledWith([
        {
          id: 1,
          nomeUsuario: 'usuario1',
          senha: 'senha123',
          nomeCompleto: 'Usuário Um',
        },
        {
          id: 2,
          nomeUsuario: 'usuario2',
          senha: 'test123',
          nomeCompleto: 'Usuário Dois',
        },
      ]);
    });

  });

});