// LutadorRepository.ts
import { Lutador } from '../../Entities/Lutador';

export interface LutadorRepository {
  criarLutador(lutador: Lutador): Promise<Lutador>;
  obterLutadores(): Promise<Lutador[]>;
  obterLutadorPorId(id: number): Promise<Lutador | null>;
  atualizarLutador(lutador: Lutador): Promise<Lutador>;
  excluirLutador(id: number): Promise<boolean>;
}
