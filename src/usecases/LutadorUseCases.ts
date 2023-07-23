// LutadorUseCases.ts
import { Lutador } from '../../src/Entities/Lutador';
import { LutadorRepository } from '../../src/Repositories/contract/LutadorRepository';

export class LutadorUseCases {
  constructor(private readonly lutadorRepository: LutadorRepository) {}

  async criarLutador(lutador: Lutador): Promise<Lutador> {
    return this.lutadorRepository.criarLutador(lutador);
  }

  async obterLutadores(): Promise<Lutador[]> {
    return this.lutadorRepository.obterLutadores();
  }

  async obterLutadorPorId(id: number): Promise<Lutador | null> {
    return this.lutadorRepository.obterLutadorPorId(id);
  }

  async atualizarLutador(lutador: Lutador): Promise<Lutador> {
    return this.lutadorRepository.atualizarLutador(lutador);
  }

  async excluirLutador(id: number): Promise<boolean> {
    return this.lutadorRepository.excluirLutador(id);
  }
}
