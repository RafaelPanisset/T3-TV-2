// UsuarioUseCases.ts
import { UsuarioRepository } from '../../src/Repositories/contract/UsuarioRepository';
import { Usuario } from '../Entities/Usuario';

export class UsuarioUseCases {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.criarUsuario(usuario);
  }

  async obterUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.obterUsuarios();
  }

  async obterUsuarioPorId(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.obterUsuarioPorId(id);
  }

  async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.atualizarUsuario(usuario);
  }

  async excluirUsuario(id: number): Promise<boolean> {
    return this.usuarioRepository.excluirUsuario(id);
  }


  async logar(username: string, password: string): Promise<boolean> {
    return this.usuarioRepository.logar(username, password);
  }
}
