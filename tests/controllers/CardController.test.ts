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

    cardController = new CardController(
      cardUseCases,
      // ... (rest of the use cases)
    );
  });

  describe('criarCard', () => {
    it('should create a new card', async () => {
      const request: Request = {
        body: {
          nome: 'Test Card',
          data: new Date(),
          local: 'Test Location',
        },
      } as Request;

      const response: Response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as unknown as Response;

      await cardController.criarCard(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();

      // Check if the card was added to the repository
      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(1);
      expect(cards[0].nome).toBe('Test Card');
    });

    // Add more test cases for error handling, validation, etc.
  });

  describe('obterCards', () => {
    it('should return all cards', async () => {
      // Add test cards to the repository
      await cardRepository.criarCard({
        id: 1,
        nome: 'Card 1',
        data: new Date(),
        local: 'Location 1',
      });

      await cardRepository.criarCard({
        id: 2,
        nome: 'Card 2',
        data: new Date(),
        local: 'Location 2',
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
          data: expect.any(Date),
          local: 'Location 1',
        },
        {
          id: 2,
          nome: 'Card 2',
          data: expect.any(Date),
          local: 'Location 2',
        },
      ]);
    });

    // Add more test cases for different scenarios
  });

  // Add more test cases for other controller methods
});
