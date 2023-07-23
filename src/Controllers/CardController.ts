// CardController.ts
import { Request, Response } from 'express';
import { CardUseCases } from '../usecases/CardUseCases';
import { Card } from '../Entities/Card';

export class CardController {
  constructor(private readonly cardUseCases: CardUseCases) {}

  async criarCard(req: Request, res: Response): Promise<void> {
    try {
      const { Id, Nome } = req.body;
      const card: Card = { Id, Nome };
      const novoCard = await this.cardUseCases.criarCard(card);
      res.status(201).json(novoCard);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o card' });
    }
  }

  async obterCards(req: Request, res: Response): Promise<void> {
    try {
      const cards = await this.cardUseCases.obterCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter os cards' });
    }
  }

  async obterCardPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cardId = parseInt(id);
      const card = await this.cardUseCases.obterCardPorId(cardId);
      if (card) {
        res.json(card);
      } else {
        res.status(404).json({ error: 'Card não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter o card' });
    }
  }

  async atualizarCard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cardId = parseInt(id);
      const { Nome } = req.body;
      const card: Card = { Id: cardId, Nome };
      const cardAtualizado = await this.cardUseCases.atualizarCard(card);
      if (cardAtualizado) {
        res.json(cardAtualizado);
      } else {
        res.status(404).json({ error: 'Card não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o card' });
    }
  }

  async excluirCard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cardId = parseInt(id);
      const cardExcluido = await this.cardUseCases.excluirCard(cardId);
      if (cardExcluido) {
        res.json({ message: 'Card excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Card não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o card' });
    }
  }
}
