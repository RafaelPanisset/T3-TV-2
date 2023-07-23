// LutaUseCases.ts
import { LutaRepository } from '../../src/Repositories/contract/LutaRepository';
import { Luta } from '../Entities/Luta';

export class LutaUseCases {
  constructor(private readonly lutaRepository: LutaRepository) {}

  async criarLuta(luta: Luta): Promise<Luta> {
    return this.lutaRepository.criarLuta(luta);
  }

  async obterLutas(): Promise<Luta[]> {
    return this.lutaRepository.obterLutas();
  }

  async obterLutaPorId(id: number): Promise<Luta | null> {
    return this.lutaRepository.obterLutaPorId(id);
  }

  async atualizarLuta(luta: Luta): Promise<Luta> {
    return this.lutaRepository.atualizarLuta(luta);
  }

  async excluirLuta(id: number): Promise<boolean> {
    return this.lutaRepository.excluirLuta(id);
  }
}
