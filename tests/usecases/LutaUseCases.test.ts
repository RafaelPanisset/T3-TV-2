import { Luta } from '../../src/Entities/Luta';
import { LutaUseCases } from '../../src/usecases/LutaUseCases';
import { InMemoryLutaRepository } from '../../src/Repositories/InMemoryLutaRepository';

describe('LutaUseCases', () => {
  let lutaUseCases: LutaUseCases;
  let lutaRepository: InMemoryLutaRepository;

  beforeEach(() => {
    lutaRepository = new InMemoryLutaRepository();
    lutaUseCases = new LutaUseCases(lutaRepository);
  });

  describe('criarLuta', () => {
    it('deve criar uma nova luta', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      };

      const lutaCriada = await lutaUseCases.criarLuta(luta);

      expect(lutaCriada).toEqual(luta);

      // Verifica se a luta foi adicionada ao repositório
      const lutas = await lutaRepository.obterLutas();
      expect(lutas.length).toBe(1);
      expect(lutas[0]).toEqual(luta);
    });
  });

  describe('obterLutas', () => {
    it('deve retornar todas as lutas', async () => {
      const luta1: Luta = {
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      };

      const luta2: Luta = {
        id: 2,
        idLutador1: 3,
        idLutador2: 4,
        idEvento: 1,
        idCard: 1,
      };

      await lutaRepository.criarLuta(luta1);
      await lutaRepository.criarLuta(luta2);

      const lutas = await lutaUseCases.obterLutas();

      expect(lutas).toEqual([luta1, luta2]);
    });
  });

  describe('obterLutaPorId', () => {
    it('deve retornar a luta com o id fornecido', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      };

      await lutaRepository.criarLuta(luta);

      const lutaObtida = await lutaUseCases.obterLutaPorId(1);

      expect(lutaObtida).toEqual(luta);
    });

    it('deve retornar null se a luta com o id fornecido não existir', async () => {
      const lutaObtida = await lutaUseCases.obterLutaPorId(1);

      expect(lutaObtida).toBeNull();
    });
  });

  describe('atualizarLuta', () => {
    it('deve atualizar a luta com o id fornecido', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      };

      await lutaRepository.criarLuta(luta);

      const lutaAtualizada: Luta = {
        id: 1,
        idLutador1: 3,
        idLutador2: 4,
        idEvento: 2,
        idCard: 2,
      };

      const lutaAtualizadaObtida = await lutaUseCases.atualizarLuta(lutaAtualizada);

      expect(lutaAtualizadaObtida).toEqual(lutaAtualizada);

      const lutas = await lutaRepository.obterLutas();
      expect(lutas[0]).toEqual(lutaAtualizada);
    });

    it('deve lançar um erro se a luta com o id fornecido não existir', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      };

      await expect(lutaUseCases.atualizarLuta(luta)).rejects.toThrow('Luta não encontrada');
    });
  });

  describe('excluirLuta', () => {
    it('deve excluir a luta com o id fornecido', async () => {
      const luta: Luta = {
        id: 1,
        idLutador1: 1,
        idLutador2: 2,
        idEvento: 1,
        idCard: 1,
      };

      await lutaRepository.criarLuta(luta);

      const lutaExcluida = await lutaUseCases.excluirLuta(1);

      expect(lutaExcluida).toBe(true);

      const lutas = await lutaRepository.obterLutas();
      expect(lutas.length).toBe(0);
    });

    it('deve retornar false se a luta com o id fornecido não existir', async () => {
      const lutaExcluida = await lutaUseCases.excluirLuta(1);

      expect(lutaExcluida).toBe(false);
    });
  });
});
