import { InMemoryLutadorRepository } from '../../src/Repositories/InMemoryLutadorRepository';
import { Lutador } from '../../src/Entities/Lutador';

describe('InMemoryLutadorRepository', () => {
  let lutadorRepository: InMemoryLutadorRepository;

  beforeEach(() => {
    lutadorRepository = new InMemoryLutadorRepository();
  });

  describe('criarLutador', () => {
    it('deve criar um novo lutador', async () => {
      const lutador: Lutador = {
        id: 1,
        nome: 'Lutador de Teste',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 25,
        altura: 1.75,
        alcance: 1.80,
      };

      const lutadorCriado = await lutadorRepository.criarLutador(lutador);

      expect(lutadorCriado).toEqual(lutador);
    });
  });

  describe('obterLutadores', () => {
    it('deve retornar todos os lutadores', async () => {
      const lutador1: Lutador = {
        id: 1,
        nome: 'Lutador 1',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 28,
        altura: 1.80,
        alcance: 1.85,
      };

      const lutador2: Lutador = {
        id: 2,
        nome: 'Lutador 2',
        categoriaPeso: 'Peso Médio',
        paisOrigem: 'Estados Unidos',
        idade: 30,
        altura: 1.85,
        alcance: 1.90,
      };

      await lutadorRepository.criarLutador(lutador1);
      await lutadorRepository.criarLutador(lutador2);

      const lutadores = await lutadorRepository.obterLutadores();

      expect(lutadores).toEqual([lutador1, lutador2]);
    });
  });

  describe('obterLutadorPorId', () => {
    it('deve retornar o lutador com o id fornecido', async () => {
      const lutador: Lutador = {
        id: 1,
        nome: 'Lutador de Teste',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 25,
        altura: 1.75,
        alcance: 1.80,
      };

      await lutadorRepository.criarLutador(lutador);

      const lutadorObtido = await lutadorRepository.obterLutadorPorId(1);

      expect(lutadorObtido).toEqual(lutador);
    });

    it('deve retornar null se o lutador com o id fornecido não existir', async () => {
      const lutadorObtido = await lutadorRepository.obterLutadorPorId(1);

      expect(lutadorObtido).toBeNull();
    });
  });

  describe('atualizarLutador', () => {
    it('deve atualizar o lutador com o id fornecido', async () => {
      const lutador: Lutador = {
        id: 1,
        nome: 'Lutador de Teste',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 25,
        altura: 1.75,
        alcance: 1.80,
      };

      await lutadorRepository.criarLutador(lutador);

      const lutadorAtualizado: Lutador = {
        id: 1,
        nome: 'Lutador Atualizado',
        categoriaPeso: 'Peso Médio',
        paisOrigem: 'Estados Unidos',
        idade: 28,
        altura: 1.80,
        alcance: 1.85,
      };

      const lutadorAtualizadoObtido = await lutadorRepository.atualizarLutador(lutadorAtualizado);

      expect(lutadorAtualizadoObtido).toEqual(lutadorAtualizado);

      const lutadores = await lutadorRepository.obterLutadores();
      expect(lutadores[0]).toEqual(lutadorAtualizado);
    });

    it('deve lançar um erro se o lutador com o id fornecido não existir', async () => {
      const lutador: Lutador = {
        id: 1,
        nome: 'Lutador de Teste',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 25,
        altura: 1.75,
        alcance: 1.80,
      };

      await expect(lutadorRepository.atualizarLutador(lutador)).rejects.toThrow('Lutador não encontrado');
    });
  });

  describe('excluirLutador', () => {
    it('deve excluir o lutador com o id fornecido', async () => {
      const lutador: Lutador = {
        id: 1,
        nome: 'Lutador de Teste',
        categoriaPeso: 'Peso Leve',
        paisOrigem: 'Brasil',
        idade: 25,
        altura: 1.75,
        alcance: 1.80,
      };

      await lutadorRepository.criarLutador(lutador);

      const lutadorExcluido = await lutadorRepository.excluirLutador(1);

      expect(lutadorExcluido).toBe(true);

      const lutadores = await lutadorRepository.obterLutadores();
      expect(lutadores.length).toBe(0);
    });

    it('deve retornar false se o lutador com o id fornecido não existir', async () => {
      const lutadorExcluido = await lutadorRepository.excluirLutador(1);

      expect(lutadorExcluido).toBe(false);
    });
  });
});
