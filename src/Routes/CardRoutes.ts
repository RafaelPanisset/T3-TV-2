// CardRoutes.ts
import express from 'express';
import { CardController } from '../Controllers/CardController';
import { InMemoryCardRepository } from '../Repositories/InMemoryCardRepository';
import { CardUseCases } from '../usecases/CardUseCases';

const cardRouter = express.Router();

const cardRepository = new InMemoryCardRepository();
const cardUseCases = new CardUseCases(cardRepository);
const cardController = new CardController(cardUseCases);

cardRouter.post('/cards', cardController.criarCard.bind(cardController));
cardRouter.get('/cards', cardController.obterCards.bind(cardController));
cardRouter.get('/cards/:id', cardController.obterCardPorId.bind(cardController));
cardRouter.put('/cards/:id', cardController.atualizarCard.bind(cardController));
cardRouter.delete('/cards/:id', cardController.excluirCard.bind(cardController));

export default cardRouter;
