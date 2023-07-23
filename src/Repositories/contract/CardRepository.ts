import { Card } from '../../Entities/Card';

export interface CardRepository {
  criarCard(card: Card): Promise<Card>;
  obterCards(): Promise<Card[]>;
  obterCardPorId(id: number): Promise<Card | null>;
  atualizarCard(card: Card): Promise<Card>;
  excluirCard(id: number): Promise<boolean>;
}
