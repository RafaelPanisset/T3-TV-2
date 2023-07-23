// LutaRepository.ts
import { Luta } from '../../Entities/Luta';

export interface LutaRepository {
  criarLuta(luta: Luta): Promise<Luta>;
  obterLutas(): Promise<Luta[]>;
  obterLutaPorId(id: number): Promise<Luta | null>;
  atualizarLuta(luta: Luta): Promise<Luta>;
  excluirLuta(id: number): Promise<boolean>;
}
