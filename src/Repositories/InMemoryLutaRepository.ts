// InMemoryLutaRepository.ts
import { LutaRepository } from '../Repositories/contract/LutaRepository';
import { Luta } from '../Entities/Luta';

export class InMemoryLutaRepository implements LutaRepository {
  private lutas: Luta[] = [];

  async criarLuta(luta: Luta): Promise<Luta> {
    this.lutas.push(luta);
    return luta;
  }

  async obterLutas(): Promise<Luta[]> {
    return this.lutas;
  }

  async obterLutaPorId(id: number): Promise<Luta | null> {
    const luta = this.lutas.find(l => l.Id === id);
    return luta || null;
  }

  async atualizarLuta(luta: Luta): Promise<Luta> {
    const index = this.lutas.findIndex(l => l.Id === luta.Id);
    if (index !== -1) {
      this.lutas[index] = luta;
      return luta;
    }
    throw new Error('Luta não encontrada');
  }

  async excluirLuta(id: number): Promise<boolean> {
    const index = this.lutas.findIndex(l => l.Id === id);
    if (index !== -1) {
      this.lutas.splice(index, 1);
      return true;
    }
    return false;
  }
}
