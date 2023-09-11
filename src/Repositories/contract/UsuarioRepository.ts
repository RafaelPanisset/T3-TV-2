// UsuarioRepository.ts
import { Usuario } from '../../Entities/Usuario';

export interface UsuarioRepository {
  criarUsuario(usuario: Usuario): Promise<Usuario>;
  obterUsuarios(): Promise<Usuario[]>;
  obterUsuarioPorId(id: number): Promise<Usuario | null>;
  atualizarUsuario(usuario: Usuario): Promise<Usuario>;
  excluirUsuario(id: number): Promise<boolean>;
  logar(username: string, password: string): Promise<boolean>;

}
