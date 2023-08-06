import { CardController } from '../../src/Controllers/CardController';
import { CardUseCases } from '../../src/usecases/CardUseCases';
import { InMemoryCardRepository } from '../../src/Repositories/InMemoryCardRepository';

describe('CardController', () => {
  const cardRepository = new InMemoryCardRepository();
  const cardUseCases = new CardUseCases(cardRepository);
  const cardController = new CardController(cardUseCases);

  it('should create a new card', async () => {
    const req = {
      body: { id: 1, nome: 'Card 1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.criarCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Card 1' });
  });

  it('should get all cards', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.obterCards(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Card 1' }]);
  });

  it('should get a card by id', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.obterCardPorId(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Card 1' });
  });

  it('should return 404 when getting a non-existent card by id', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.obterCardPorId(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Card não encontrado' });
  });

  it('should handle errors when deleting a card with invalid id', async () => {
    const req = {
      params: { id: 'invalid_id' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    // Simulate an error when deleting a card with an invalid id
    jest.spyOn(cardUseCases, 'excluirCard').mockRejectedValueOnce(new Error('Invalid card id'));
  
    await cardController.excluirCard(req as any, res as any);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir o card' });
  });
  
  
  
  
  
  

  it('should update a card', async () => {
    const req = {
      params: { id: '1' },
      body: { nome: 'Updated Card' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.atualizarCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Updated Card' });
  });

  it('should return 404 when updating a non-existent card', async () => {
    const req = {
      params: { id: '100' },
      body: { nome: 'Updated Card' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.atualizarCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Card não encontrado' });
  });

  it('should delete a card', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.excluirCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Card excluído com sucesso' });
  });

  it('should return 404 when deleting a non-existent card', async () => {
    const req = {
      params: { id: '100' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cardController.excluirCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Card não encontrado' });
  });

  it('should handle errors when creating a card', async () => {
    const req = {
      body: { id: 1, nome: 'Card 1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    jest.spyOn(cardUseCases, 'criarCard').mockImplementationOnce(() => {
      throw new Error('Test error');
    });
  
    await cardController.criarCard(req as any, res as any);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar o card' });
  });

  it('should handle errors when getting all cards', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error while fetching all cards
    jest.spyOn(cardUseCases, 'obterCards').mockRejectedValueOnce(new Error('Error getting cards'));

    await cardController.obterCards(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter os cards' });
  });

  it('should handle errors when getting a card by id', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error while fetching a card by id
    jest.spyOn(cardUseCases, 'obterCardPorId').mockRejectedValueOnce(new Error('Error getting card by id'));

    await cardController.obterCardPorId(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter o card' });
  });

  it('should handle errors when updating a card', async () => {
    const req = {
      params: { id: '1' },
      body: { nome: 'Updated Card' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error while updating a card
    jest.spyOn(cardUseCases, 'atualizarCard').mockRejectedValueOnce(new Error('Error updating card'));

    await cardController.atualizarCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar o card' });
  });

  it('should handle errors when deleting a card', async () => {
    const req = {
      params: { id: '1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error while deleting a card
    jest.spyOn(cardUseCases, 'excluirCard').mockRejectedValueOnce(new Error('Error deleting card'));

    await cardController.excluirCard(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir o card' });
  });
});
