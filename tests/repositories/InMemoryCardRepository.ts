import { InMemoryCardRepository } from '../../src/Repositories/InMemoryCardRepository';
import { Card } from '../../src/Entities/Card';

describe('InMemoryCardRepository', () => {
  let cardRepository: InMemoryCardRepository;

  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
  });

  describe('criarCard', () => {
    it('deve criar um novo card', async () => {
      const card: Card = {
        id: 1,
        nome: 'Card de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      const cardCriado = await cardRepository.criarCard(card);

      expect(cardCriado).toEqual(card);
    });
  });

  describe('obterCards', () => {
    it('deve retornar todos os cards', async () => {
      const card1: Card = {
        id: 1,
        nome: 'Card 1',
        data: new Date(),
        local: 'Local 1',
      };

      const card2: Card = {
        id: 2,
        nome: 'Card 2',
        data: new Date(),
        local: 'Local 2',
      };

      await cardRepository.criarCard(card1);
      await cardRepository.criarCard(card2);

      const cards = await cardRepository.obterCards();

      expect(cards).toEqual([card1, card2]);
    });
  });

  describe('obterCardPorId', () => {
    it('deve retornar o card com o id fornecido', async () => {
      const card: Card = {
        id: 1,
        nome: 'Card de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await cardRepository.criarCard(card);

      const cardObtido = await cardRepository.obterCardPorId(1);

      expect(cardObtido).toEqual(card);
    });

    it('deve retornar null se o card com o id fornecido não existir', async () => {
      const cardObtido = await cardRepository.obterCardPorId(1);

      expect(cardObtido).toBeNull();
    });
  });

  describe('atualizarCard', () => {
    it('deve atualizar o card com o id fornecido', async () => {
      const card: Card = {
        id: 1,
        nome: 'Card de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await cardRepository.criarCard(card);

      const cardAtualizado: Card = {
        id: 1,
        nome: 'Card Atualizado',
        data: new Date(),
        local: 'Local Atualizado',
      };

      const cardAtualizadoObtido = await cardRepository.atualizarCard(cardAtualizado);

      expect(cardAtualizadoObtido).toEqual(cardAtualizado);

      const cards = await cardRepository.obterCards();
      expect(cards[0]).toEqual(cardAtualizado);
    });

    it('deve lançar um erro se o card com o id fornecido não existir', async () => {
      const card: Card = {
        id: 1,
        nome: 'Card de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await expect(cardRepository.atualizarCard(card)).rejects.toThrow('Card não encontrado');
    });
  });

  describe('excluirCard', () => {
    it('deve excluir o card com o id fornecido', async () => {
      const card: Card = {
        id: 1,
        nome: 'Card de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await cardRepository.criarCard(card);

      const cardExcluido = await cardRepository.excluirCard(1);

      expect(cardExcluido).toBe(true);

      const cards = await cardRepository.obterCards();
      expect(cards.length).toBe(0);
    });

    it('deve retornar false se o card com o id fornecido não existir', async () => {
      const cardExcluido = await cardRepository.excluirCard(1);

      expect(cardExcluido).toBe(false);
    });
  });
});
