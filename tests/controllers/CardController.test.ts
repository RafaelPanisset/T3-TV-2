import { Request, Response } from 'express';
import { CardController } from '../../src/Controllers/CardController';
import { CardUseCases } from '../../src/usecases/CardUseCases';
import { InMemoryCardRepository } from '../../src/Repositories/InMemoryCardRepository';
import { Card } from '../../src/Entities/Card';

describe('CardController', () => {
  let cardController: CardController;
  let cardRepository: InMemoryCardRepository;

  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    const cardUseCases = new CardUseCases(cardRepository);

    cardController = new CardController(cardUseCases);
  });

  describe('criarCard', () => {
    it('deve criar um novo card', async () => {
      const request: Request = {
        body: {
          nome: 'Teste Card',
        },
      } as Request;

      const response: Response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as unknown as Response;

      await cardController.criarCard(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();

      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(1);
      expect(cards[0].nome).toBe('Teste Card');
    });
  });

  describe('obterCards', () => {
    it('deve retornar todos os cards', async () => {
      // Adicionar cards de teste ao repositório
      await cardRepository.criarCard({
        id: 1,
        nome: 'Card 1',
      });

      await cardRepository.criarCard({
        id: 2,
        nome: 'Card 2',
      });

      const request: Request = {} as Request;
      const response: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await cardController.obterCards(request, response);

      expect(response.json).toHaveBeenCalledWith([
        {
          id: 1,
          nome: 'Card 1',
        },
        {
          id: 2,
          nome: 'Card 2',
        },
      ]);
    });
  });
});
