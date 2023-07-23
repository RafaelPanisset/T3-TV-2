import express, { Request, Response } from 'express';
import { EventoController } from '../../src/Controllers/EventoController';
import { InMemoryEventoRepository } from '../../src/Repositories/InMemoryEventoRepository';
import { CriarEventoUseCase, ObterEventosUseCase, ObterEventoPorIdUseCase, AtualizarEventoUseCase, ExcluirEventoUseCase } from '../../src/usecases/EventoUseCases';

const eventoRoutes = express.Router();
const eventoRepository = new InMemoryEventoRepository();
const eventoController = new EventoController(
  new CriarEventoUseCase(eventoRepository),
  new ObterEventosUseCase(eventoRepository),
  new ObterEventoPorIdUseCase(eventoRepository),
  new AtualizarEventoUseCase(eventoRepository),
  new ExcluirEventoUseCase(eventoRepository)
);

// Rota para criar um novo evento
eventoRoutes.post('/eventos', async (req: Request, res: Response) => {
  await eventoController.criarEvento(req, res);
});

// Rota para obter todos os eventos
eventoRoutes.get('/eventos', async (req: Request, res: Response) => {
  await eventoController.obterEventos(req, res);
});

// Rota para obter um evento pelo ID
eventoRoutes.get('/eventos/:id', async (req: Request, res: Response) => {
  await eventoController.obterEventoPorId(req, res);
});

// Rota para atualizar um evento pelo ID
eventoRoutes.put('/eventos/:id', async (req: Request, res: Response) => {
  await eventoController.atualizarEvento(req, res);
});

// Rota para excluir um evento pelo ID
eventoRoutes.delete('/eventos/:id', async (req: Request, res: Response) => {
  await eventoController.excluirEvento(req, res);
});

export default eventoRoutes;
