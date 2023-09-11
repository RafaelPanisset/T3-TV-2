// usuarioRoutes.ts
import { Router } from 'express';
import { UsuarioController } from '../Controllers/UsuarioController';
import { InMemoryUsuarioRepository } from '../Repositories/InMemoryUsuarioRepository';
import { UsuarioUseCases } from '../usecases/UsuarioUseCases';

const usuarioRoutes = Router();
const usuarioRepository = new InMemoryUsuarioRepository();
const usuarioUseCases = new UsuarioUseCases(usuarioRepository);
const usuarioController = new UsuarioController(usuarioUseCases);

usuarioRoutes.post('/usuarios', usuarioController.criarUsuario.bind(usuarioController));
usuarioRoutes.get('/usuarios', usuarioController.obterUsuarios.bind(usuarioController));
usuarioRoutes.get('/usuarios/:id', usuarioController.obterUsuarioPorId.bind(usuarioController));
usuarioRoutes.put('/usuarios/:id', usuarioController.atualizarUsuario.bind(usuarioController));
usuarioRoutes.delete('/usuarios/:id', usuarioController.excluirUsuario.bind(usuarioController));
usuarioRoutes.post('/usuarios/logar', usuarioController.logar.bind(usuarioController));

export default usuarioRoutes;
