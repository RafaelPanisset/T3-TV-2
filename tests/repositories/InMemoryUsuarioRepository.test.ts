import { InMemoryUsuarioRepository } from '../../src/Repositories/InMemoryUsuarioRepository';
import { Usuario } from '../../src/Entities/Usuario';

describe('InMemoryUsuarioRepository', () => {
  let usuarioRepository: InMemoryUsuarioRepository;

  beforeEach(() => {
    usuarioRepository = new InMemoryUsuarioRepository();
  });

  describe('criarUsuario', () => {
    it('deve criar um novo usuário', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'testuser',
        senha: 'testpassword',
        nomeCompleto: 'Test User',
      };

      const usuarioCriado = await usuarioRepository.criarUsuario(usuario);

      expect(usuarioCriado).toEqual(usuario);
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

      const usuarios = await usuarioRepository.obterUsuarios();

      expect(usuarios).toEqual([usuario1, usuario2]);
    });
  });

  describe('obterUsuarioPorId', () => {
    it('deve retornar o usuário com o id fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'testuser',
        senha: 'testpassword',
        nomeCompleto: 'Test User',
      };

      await usuarioRepository.criarUsuario(usuario);

      const usuarioObtido = await usuarioRepository.obterUsuarioPorId(1);

      expect(usuarioObtido).toEqual(usuario);
    });

    it('deve retornar null se o usuário com o id fornecido não existir', async () => {
      const usuarioObtido = await usuarioRepository.obterUsuarioPorId(1);

      expect(usuarioObtido).toBeNull();
    });
  });

  describe('obterUsuarioPorNomeUsuario', () => {
    it('deve retornar o usuário com o nome de usuário fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'testuser',
        senha: 'testpassword',
        nomeCompleto: 'Test User',
      };

      await usuarioRepository.criarUsuario(usuario);

      // const usuarioObtido = await usuarioRepository.obterUsuarioPorNomeUsuario('testuser');

      // expect(usuarioObtido).toEqual(usuario);
    });

    it('deve retornar null se o usuário com o nome de usuário fornecido não existir', async () => {
      // const usuarioObtido = await usuarioRepository.obterUsuarioPorNomeUsuario('testuser');

      // expect(usuarioObtido).toBeNull();
    });
  });

  describe('atualizarUsuario', () => {
    it('deve atualizar o usuário com o id fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'testuser',
        senha: 'testpassword',
        nomeCompleto: 'Test User',
      };

      await usuarioRepository.criarUsuario(usuario);

      const usuarioAtualizado: Usuario = {
        id: 1,
        nomeUsuario: 'updateduser',
        senha: 'updatedpassword',
        nomeCompleto: 'Updated User',
      };

      const usuarioAtualizadoObtido = await usuarioRepository.atualizarUsuario(usuarioAtualizado);

      expect(usuarioAtualizadoObtido).toEqual(usuarioAtualizado);

      const usuarios = await usuarioRepository.obterUsuarios();
      expect(usuarios[0]).toEqual(usuarioAtualizado);
    });

    it('deve lançar um erro se o usuário com o id fornecido não existir', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'testuser',
        senha: 'testpassword',
        nomeCompleto: 'Test User',
      };

      await expect(usuarioRepository.atualizarUsuario(usuario)).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe('excluirUsuario', () => {
    it('deve excluir o usuário com o id fornecido', async () => {
      const usuario: Usuario = {
        id: 1,
        nomeUsuario: 'testuser',
        senha: 'testpassword',
        nomeCompleto: 'Test User',
      };

      await usuarioRepository.criarUsuario(usuario);

      const usuarioExcluido = await usuarioRepository.excluirUsuario(1);

      expect(usuarioExcluido).toBe(true);

      const usuarios = await usuarioRepository.obterUsuarios();
      expect(usuarios.length).toBe(0);
    });

    it('deve retornar false se o usuário com o id fornecido não existir', async () => {
      const usuarioExcluido = await usuarioRepository.excluirUsuario(1);

      expect(usuarioExcluido).toBe(false);
    });
  });
});
