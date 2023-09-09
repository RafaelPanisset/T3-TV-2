// InMemoryCardRepository.ts
import { Card } from '../Entities/Card';
import { CardRepository } from '../Repositories/contract/CardRepository';

export class InMemoryCardRepository implements CardRepository {
  private cards: Card[] = [];

  async criarCard(card: Card): Promise<Card> {
    this.cards.push(card);
    return card;
  }

  async obterCards(): Promise<Card[]> {
    return this.cards;
  }

  async obterCardPorId(id: number): Promise<Card | null> {
    const card = this.cards.find(c => c.id === id);
    return card || null;
  }

  async atualizarCard(card: Card): Promise<Card> {
    const index = this.cards.findIndex(c => c.id === card.id);
    if (index !== -1) {
      this.cards[index] = card;
      return card;
    }
    throw new Error('Card não encontrado');
  }

  async excluirCard(id: number): Promise<boolean> {
    const index = this.cards.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cards.splice(index, 1);
      return true;
    }
    return false;
  }
}
