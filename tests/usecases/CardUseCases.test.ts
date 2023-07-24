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
    it('deve criar um novo card', async () => {
      const card: Card = {
        id: 1,
        nome: 'Teste Card',
      };

      const cardCriado = await cardUseCases.criarCard(card);

      expect(cardCriado).toEqual(card);

      // Verifica se o card foi adicionado ao repositório
      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(1);
      expect(cards[0]).toEqual(card);
    });
  });

  describe('obterCards', () => {
    it('deve retornar todos os cards', async () => {
      const card1: Card = {
        id: 1,
        nome: 'Card 1',
      };

      const card2: Card = {
        id: 2,
        nome: 'Card 2',
      };

      await cardRepository.criarCard(card1);
      await cardRepository.criarCard(card2);

      const cards = await cardUseCases.obterCards();

      expect(cards).toEqual([card1, card2]);
    });
  });

  describe('obterCardPorId', () => {
    it('deve retornar o card com o ID fornecido', async () => {
      const card: Card = {
        id: 1,
        nome: 'Teste Card',
      };

      await cardRepository.criarCard(card);

      const cardObtido = await cardUseCases.obterCardPorId(1);

      expect(cardObtido).toEqual(card);
    });

    it('deve retornar null se o card com o ID fornecido não existir', async () => {
      const cardObtido = await cardUseCases.obterCardPorId(1);

      expect(cardObtido).toBeNull();
    });
  });

  describe('atualizarCard', () => {
    it('deve atualizar o card com o ID fornecido', async () => {
      const card: Card = {
        id: 1,
        nome: 'Teste Card',
      };

      await cardRepository.criarCard(card);

      const cardAtualizado: Card = {
        id: 1,
        nome: 'Card Atualizado',
      };

      const cardAtualizadoObtido = await cardUseCases.atualizarCard(cardAtualizado);

      expect(cardAtualizadoObtido).toEqual(cardAtualizado);

      const cards = await cardRepository.obterCards();
      expect(cards[0]).toEqual(cardAtualizado);
    });

    it('deve lançar um erro se o card com o ID fornecido não existir', async () => {
      const card: Card = {
        id: 1,
        nome: 'Teste Card',
      };

      await expect(cardUseCases.atualizarCard(card)).rejects.toThrow('Card não encontrado');
    });
  });

  describe('excluirCard', () => {
    it('deve excluir o card com o ID fornecido', async () => {
      const card: Card = {
        id: 1,
        nome: 'Teste Card',
      };

      await cardRepository.criarCard(card);

      const cardExcluido = await cardUseCases.excluirCard(1);

      expect(cardExcluido).toBe(true);

      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(0);
    });

    it('deve retornar false se o card com o ID fornecido não existir', async () => {
      const cardExcluido = await cardUseCases.excluirCard(1);

      expect(cardExcluido).toBe(false);
    });
  });
});
