import { Usuario } from '../../src/Entities/Usuario';
import { UsuarioUseCases } from '../../src/usecases/UsuarioUseCases';
import { InMemoryUsuarioRepository } from '../../src/Repositories/InMemoryUsuarioRepository';

describe('UsuarioUseCases', () => {
  let usuarioUseCases: UsuarioUseCases;
  let usuarioRepository: InMemoryUsuarioRepository;

  beforeEach(() => {
    usuarioRepository = new InMemoryUsuarioRepository();
    usuarioUseCases = new UsuarioUseCases(usuarioRepository);
  });

  describe('criarUsuario', () => {
    it('deve criar um novo usuário', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One',
      };

      const usuarioCriado = await usuarioUseCases.criarUsuario(usuario);

      expect(usuarioCriado).toEqual(usuario);

      // Verifica se o usuário foi adicionado ao repositório
      const usuarios = await usuarioRepository.obterUsuarios();
      expect(usuarios.length).toBe(1);
      expect(usuarios[0]).toEqual(usuario);
    });
  });

  describe('obterUsuarios', () => {
    it('deve retornar todos os usuários', async () => {
      const usuario1: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One',
      };

      const usuario2: Usuario = {
        id: 2,
        nomeUsuario: 'user2',
        senha: 'password2',
        nomeCompleto: 'User Two',
      };

      await usuarioRepository.criarUsuario(usuario1);
      await usuarioRepository.criarUsuario(usuario2);

      const usuarios = await usuarioUseCases.obterUsuarios();

      expect(usuarios).toEqual([usuario1, usuario2]);
    });
  });

  describe('obterUsuarioPorId', () => {
    it('deve retornar o usuário com o id fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One',
      };

      await usuarioRepository.criarUsuario(usuario);

      const usuarioObtido = await usuarioUseCases.obterUsuarioPorId(1);

      expect(usuarioObtido).toEqual(usuario);
    });

    it('deve retornar null se o usuário com o id fornecido não existir', async () => {
      const usuarioObtido = await usuarioUseCases.obterUsuarioPorId(1);

      expect(usuarioObtido).toBeNull();
    });
  });

  describe('atualizarUsuario', () => {
    it('deve atualizar o usuário com o id fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One',
      };

      await usuarioRepository.criarUsuario(usuario);

      const usuarioAtualizado: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One Updated',
      };

      const usuarioAtualizadoObtido = await usuarioUseCases.atualizarUsuario(usuarioAtualizado);

      expect(usuarioAtualizadoObtido).toEqual(usuarioAtualizado);

      const usuarios = await usuarioRepository.obterUsuarios();
      expect(usuarios[0]).toEqual(usuarioAtualizado);
    });

    it('deve lançar um erro se o usuário com o id fornecido não existir', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One',
      };

      await expect(usuarioUseCases.atualizarUsuario(usuario)).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe('excluirUsuario', () => {
    it('deve excluir o usuário com o id fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'user1',
        senha: 'password1',
        nomeCompleto: 'User One',
      };

      await usuarioRepository.criarUsuario(usuario);

      const usuarioExcluido = await usuarioUseCases.excluirUsuario(1);

      expect(usuarioExcluido).toBe(true);

      const usuarios = await usuarioRepository.obterUsuarios();
      expect(usuarios.length).toBe(0);
    });

    it('deve retornar false se o usuário com o id fornecido não existir', async () => {
      const usuarioExcluido = await usuarioUseCases.excluirUsuario(1);

      expect(usuarioExcluido).toBe(false);
    });
  });
});
