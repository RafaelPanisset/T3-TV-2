// lutadorRoutes.ts
import { Router } from 'express';
import { LutadorController } from '../Controllers/LutadorController';
import { InMemoryLutadorRepository } from '../Repositories/InMemoryLutadorRepository';
import { LutadorUseCases } from '../usecases/LutadorUseCases';

const lutadorRoutes = Router();
const lutadorRepository = new InMemoryLutadorRepository();
const lutadorUseCases = new LutadorUseCases(lutadorRepository);
const lutadorController = new LutadorController(lutadorUseCases);

lutadorRoutes.post('/lutadores', lutadorController.criarLutador.bind(lutadorController));
lutadorRoutes.get('/lutadores', lutadorController.obterLutadores.bind(lutadorController));
lutadorRoutes.get('/lutadores/:id', lutadorController.obterLutadorPorId.bind(lutadorController));
lutadorRoutes.put('/lutadores/:id', lutadorController.atualizarLutador.bind(lutadorController));
lutadorRoutes.delete('/lutadores/:id', lutadorController.excluirLutador.bind(lutadorController));

export default lutadorRoutes;
