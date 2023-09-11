// UsuarioController.ts
import { Request, Response } from 'express';
import { UsuarioRepository } from '../Repositories/contract/UsuarioRepository';
import { Usuario } from '../Entities/Usuario';

export class UsuarioController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { nomeUsuario, senha, nomeCompleto } = req.body;
      const usuario: Usuario = { id: (await this.usuarioRepository.obterUsuarios()).length + 1, nomeUsuario, senha, nomeCompleto };
      const novoUsuario = await this.usuarioRepository.criarUsuario(usuario);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  }

  async obterUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioRepository.obterUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter os usuários' });
    }
  }

  async obterUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuarioid = parseInt(id);
      const usuario = await this.usuarioRepository.obterUsuarioPorId(usuarioid);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter o usuário' });
    }
  }

  async logar(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const usuario = await this.usuarioRepository.logar(username, password);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter o usuário' });
    }
  }

  async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nomeUsuario, senha, nomeCompleto } = req.body;
      const usuarioid = parseInt(id);
      const usuario: Usuario = { id: usuarioid, nomeUsuario, senha, nomeCompleto };
      const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(usuario);
      if (usuarioAtualizado) {
        res.json(usuarioAtualizado);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
  }

  async excluirUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuarioid = parseInt(id);
      const usuarioExcluido = await this.usuarioRepository.excluirUsuario(usuarioid);
      if (usuarioExcluido) {
        res.json({ message: 'Usuário excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
  }
}
