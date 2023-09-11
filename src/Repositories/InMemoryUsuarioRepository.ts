// InMemoryUsuarioRepository.ts
import { UsuarioRepository } from '../Repositories/contract/UsuarioRepository';
import { Usuario } from '../Entities/Usuario';
const jwt = require('jsonwebtoken');

export class InMemoryUsuarioRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [];

  async authenticateUser(username: string, password: string): Promise<Usuario | null> {
    // Find a user with the provided username
    const user = this.usuarios.find(u => u.nomeUsuario === username);

    // Check if the user exists and if the password matches
    if (user && user.senha === password) {
      // Return the authenticated user
      return user;
    }

    return null;
  }

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

  async logar(username: string, password: string): Promise<boolean> {
    console.log("dddd", this.usuarios);
    console.log("ssssssss", username, password);

    const index = this.usuarios.findIndex(u => u.nomeUsuario === username && u.senha === password);
    if (index !== -1) {

      const payload = {
        username: username,
        senha: password,
        // Add other user-related data as needed
      };
      // Sign the token with a secret key
      const token = jwt.sign(payload, 'topicos-avacados-2', { expiresIn: '1h' });

      return token;
    }
    else {
    return false;
  }
}
}
