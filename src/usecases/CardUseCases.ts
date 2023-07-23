// CardUseCases.ts
import { Card } from '../Entities/Card';
import { CardRepository } from '../Repositories/contract/CardRepository';

export class CardUseCases {
  constructor(private readonly cardRepository: CardRepository) {}

  async criarCard(card: Card): Promise<Card> {
    return this.cardRepository.criarCard(card);
  }

  async obterCards(): Promise<Card[]> {
    return this.cardRepository.obterCards();
  }

  async obterCardPorId(id: number): Promise<Card | null> {
    return this.cardRepository.obterCardPorId(id);
  }

  async atualizarCard(card: Card): Promise<Card> {
    return this.cardRepository.atualizarCard(card);
  }

  async excluirCard(id: number): Promise<boolean> {
    return this.cardRepository.excluirCard(id);
  }
}
