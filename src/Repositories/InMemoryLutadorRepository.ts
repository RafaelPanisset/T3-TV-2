// InMemoryLutadorRepository.ts
import { Lutador } from '../../src/Entities/Lutador';
import { LutadorRepository } from '../Repositories/contract/LutadorRepository';

export class InMemoryLutadorRepository implements LutadorRepository {
  private lutadores: Lutador[] = [];

  async criarLutador(lutador: Lutador): Promise<Lutador> {
    this.lutadores.push(lutador);
    return lutador;
  }

  async obterLutadores(): Promise<Lutador[]> {
    return this.lutadores;
  }

  async obterLutadorPorId(id: number): Promise<Lutador | null> {
    const lutador = this.lutadores.find(l => l.Id === id);
    return lutador || null;
  }

  async atualizarLutador(lutador: Lutador): Promise<Lutador> {
    const index = this.lutadores.findIndex(l => l.Id === lutador.Id);
    if (index !== -1) {
      this.lutadores[index] = lutador;
      return lutador;
    }
    throw new Error('Lutador não encontrado');
  }

  async excluirLutador(id: number): Promise<boolean> {
    const index = this.lutadores.findIndex(l => l.Id === id);
    if (index !== -1) {
      this.lutadores.splice(index, 1);
      return true;
    }
    return false;
  }
}
