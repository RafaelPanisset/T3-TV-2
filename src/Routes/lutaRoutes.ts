// lutaRoutes.ts
import { Router } from 'express';
import { LutaController } from '../../src/Controllers/LutaController';
import { InMemoryLutaRepository } from '../Repositories/InMemoryLutaRepository';
import { LutaUseCases } from '../usecases/LutaUseCases';

const lutaRoutes = Router();
const lutaRepository = new InMemoryLutaRepository();
const lutaUseCases = new LutaUseCases(lutaRepository);
const lutaController = new LutaController(lutaUseCases);

lutaRoutes.post('/lutas', lutaController.criarLuta.bind(lutaController));
lutaRoutes.get('/lutas', lutaController.obterLutas.bind(lutaController));
lutaRoutes.get('/lutas/:id', lutaController.obterLutaPorId.bind(lutaController));
lutaRoutes.put('/lutas/:id', lutaController.atualizarLuta.bind(lutaController));
lutaRoutes.delete('/lutas/:id', lutaController.excluirLuta.bind(lutaController));


export default lutaRoutes;
