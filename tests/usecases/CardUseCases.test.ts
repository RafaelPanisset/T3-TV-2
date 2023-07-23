import { Card } from '../../src/Entities/Card';
import { CardRepository } from '../../src/Repositories/contract/CardRepository';
import { CardUseCases } from '../../src/usecases/CardUseCases';
import { InMemoryCardRepository } from '../../src/Repositories/InMemoryCardRepository';

describe('CardUseCases', () => {
  let cardUseCases: CardUseCases;
  let cardRepository: InMemoryCardRepository;

  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    cardUseCases = new CardUseCases(cardRepository);
  });

  describe('criarCard', () => {
    it('should create a new card', async () => {
      const card: Card = {
        id: 1,
        nome: 'Test Card',
        data: new Date(),
        local: 'Test Location',
      };

      const cardCriado = await cardUseCases.criarCard(card);

      expect(cardCriado).toEqual(card);

      // Check if the card was added to the repository
      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(1);
      expect(cards[0]).toEqual(card);
    });
  });

  describe('obterCards', () => {
    it('should return all cards', async () => {
      const card1: Card = {
        id: 1,
        nome: 'Card 1',
        data: new Date(),
        local: 'Location 1',
      };

      const card2: Card = {
        id: 2,
        nome: 'Card 2',
        data: new Date(),
        local: 'Location 2',
      };

      await cardRepository.criarCard(card1);
      await cardRepository.criarCard(card2);

      const cards = await cardUseCases.obterCards();

      expect(cards).toEqual([card1, card2]);
    });
  });

  describe('obterCardPorId', () => {
    it('should return the card with the provided ID', async () => {
      const card: Card = {
        id: 1,
        nome: 'Test Card',
        data: new Date(),
        local: 'Test Location',
      };

      await cardRepository.criarCard(card);

      const cardObtido = await cardUseCases.obterCardPorId(1);

      expect(cardObtido).toEqual(card);
    });

    it('should return null if the card with the provided ID does not exist', async () => {
      const cardObtido = await cardUseCases.obterCardPorId(1);

      expect(cardObtido).toBeNull();
    });
  });

  describe('atualizarCard', () => {
    it('should update the card with the provided ID', async () => {
      const card: Card = {
        id: 1,
        nome: 'Test Card',
        data: new Date(),
        local: 'Test Location',
      };

      await cardRepository.criarCard(card);

      const cardAtualizado: Card = {
        id: 1,
        nome: 'Updated Card',
        data: new Date(),
        local: 'Updated Location',
      };

      const cardAtualizadoObtido = await cardUseCases.atualizarCard(cardAtualizado);

      expect(cardAtualizadoObtido).toEqual(cardAtualizado);

      const cards = await cardRepository.obterCards();
      expect(cards[0]).toEqual(cardAtualizado);
    });

    it('should throw an error if the card with the provided ID does not exist', async () => {
      const card: Card = {
        id: 1,
        nome: 'Test Card',
        data: new Date(),
        local: 'Test Location',
      };

      await expect(cardUseCases.atualizarCard(card)).rejects.toThrow('Card not found');
    });
  });

  describe('excluirCard', () => {
    it('should delete the card with the provided ID', async () => {
      const card: Card = {
        id: 1,
        nome: 'Test Card',
        data: new Date(),
        local: 'Test Location',
      };

      await cardRepository.criarCard(card);

      const cardExcluido = await cardUseCases.excluirCard(1);

      expect(cardExcluido).toBe(true);

      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(0);
    });

    it('should return false if the card with the provided ID does not exist', async () => {
      const cardExcluido = await cardUseCases.excluirCard(1);

      expect(cardExcluido).toBe(false);
    });
  });
});
