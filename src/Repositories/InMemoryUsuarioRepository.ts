// InMemoryUsuarioRepository.ts
import { UsuarioRepository } from '../Repositories/contract/UsuarioRepository';
import { Usuario } from '../Entities/Usuario';

export class InMemoryUsuarioRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [];

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    this.usuarios.push(usuario);
    return usuario;
  }

  async obterUsuarios(): Promise<Usuario[]> {
    return this.usuarios;
  }

  async obterUsuarioPorId(id: number): Promise<Usuario | null> {
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario || null;
  }

  async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      this.usuarios[index] = usuario;
      return usuario;
    }
    throw new Error('Usuário não encontrado');
  }

  async excluirUsuario(id: number): Promise<boolean> {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return true;
    }
    return false;
  }
}
