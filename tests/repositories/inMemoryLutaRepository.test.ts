import { InMemoryLutaRepository } from '../../src/Repositories/InMemoryLutaRepository';
import { Luta } from '../../src/Entities/Luta';

describe('InMemoryLutaRepository', () => {
  let lutaRepository: InMemoryLutaRepository;

  beforeEach(() => {
    lutaRepository = new InMemoryLutaRepository();
  });

  describe('criarLuta', () => {
    it('deve criar uma nova luta', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 2,
        idLutador2: 3,
        idEvento: 4,
        idCard: 5,
      };

      const lutaCriada = await lutaRepository.criarLuta(luta);

      expect(lutaCriada).toEqual(luta);
    });
  });

  describe('obterLutas', () => {
    it('deve retornar todas as lutas', async () => {
      const luta1: Luta = {
        id: 1,
        idLutador1: 2,
        idLutador2: 3,
        idEvento: 4,
        idCard: 5,
      };

      const luta2: Luta = {
        id: 6,
        idLutador1: 7,
        idLutador2: 8,
        idEvento: 9,
        idCard: 10,
      };

      await lutaRepository.criarLuta(luta1);
      await lutaRepository.criarLuta(luta2);

      const lutas = await lutaRepository.obterLutas();

      expect(lutas).toEqual([luta1, luta2]);
    });
  });

  describe('obterLutaPorId', () => {
    it('deve retornar a luta com o id fornecido', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 2,
        idLutador2: 3,
        idEvento: 4,
        idCard: 5,
      };

      await lutaRepository.criarLuta(luta);

      const lutaObtida = await lutaRepository.obterLutaPorId(1);

      expect(lutaObtida).toEqual(luta);
    });

    it('deve retornar null se a luta com o id fornecido não existir', async () => {
      const lutaObtida = await lutaRepository.obterLutaPorId(1);

      expect(lutaObtida).toBeNull();
    });
  });

  describe('atualizarLuta', () => {
    it('deve atualizar a luta com o id fornecido', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 2,
        idLutador2: 3,
        idEvento: 4,
        idCard: 5,
      };

      await lutaRepository.criarLuta(luta);

      const lutaAtualizada: Luta = {
        id: 1,
        idLutador1: 6,
        idLutador2: 7,
        idEvento: 8,
        idCard: 9,
      };

      const lutaAtualizadaObtida = await lutaRepository.atualizarLuta(lutaAtualizada);

      expect(lutaAtualizadaObtida).toEqual(lutaAtualizada);

      const lutas = await lutaRepository.obterLutas();
      expect(lutas[0]).toEqual(lutaAtualizada);
    });

    it('deve lançar um erro se a luta com o id fornecido não existir', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 2,
        idLutador2: 3,
        idEvento: 4,
        idCard: 5,
      };

      await expect(lutaRepository.atualizarLuta(luta)).rejects.toThrow('Luta não encontrada');
    });
  });

  describe('excluirLuta', () => {
    it('deve excluir a luta com o id fornecido', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 2,
        idLutador2: 3,
        idEvento: 4,
        idCard: 5,
      };

      await lutaRepository.criarLuta(luta);

      const lutaExcluida = await lutaRepository.excluirLuta(1);

      expect(lutaExcluida).toBe(true);

      const lutas = await lutaRepository.obterLutas();
      expect(lutas.length).toBe(0);
    });

    it('deve retornar false se a luta com o id fornecido não existir', async () => {
      const lutaExcluida = await lutaRepository.excluirLuta(1);

      expect(lutaExcluida).toBe(false);
    });
  });
});
