import { Evento } from '../../src/Entities/Evento';
import { CriarEventoUseCase, ObterEventosUseCase, ObterEventoPorIdUseCase, AtualizarEventoUseCase, ExcluirEventoUseCase } from '../../src/usecases/EventoUseCases';
import { InMemoryEventoRepository } from '../../src/Repositories/InMemoryEventoRepository';

describe('EventoUseCases', () => {
  let criarEventoUseCase: CriarEventoUseCase;
  let obterEventosUseCase: ObterEventosUseCase;
  let obterEventoPorIdUseCase: ObterEventoPorIdUseCase;
  let atualizarEventoUseCase: AtualizarEventoUseCase;
  let excluirEventoUseCase: ExcluirEventoUseCase;

  let eventoRepository: InMemoryEventoRepository;

  beforeEach(() => {
    eventoRepository = new InMemoryEventoRepository();

    criarEventoUseCase = new CriarEventoUseCase(eventoRepository);
    obterEventosUseCase = new ObterEventosUseCase(eventoRepository);
    obterEventoPorIdUseCase = new ObterEventoPorIdUseCase(eventoRepository);
    atualizarEventoUseCase = new AtualizarEventoUseCase(eventoRepository);
    excluirEventoUseCase = new ExcluirEventoUseCase(eventoRepository);
  });

  describe('CriarEventoUseCase', () => {
    it('deve criar um novo evento', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      const eventoCriado = await criarEventoUseCase.execute(evento);

      expect(eventoCriado).toEqual(evento);

      // Verifica se o evento foi adicionado ao repositório
      const eventos = await eventoRepository.obterEventos();
      expect(eventos.length).toBe(1);
      expect(eventos[0]).toEqual(evento);
    });
  });

  describe('ObterEventosUseCase', () => {
    it('deve retornar todos os eventos', async () => {
      const evento1: Evento = {
        id: 1,
        nome: 'Evento 1',
        data: new Date(),
        local: 'Local 1',
      };

      const evento2: Evento = {
        id: 2,
        nome: 'Evento 2',
        data: new Date(),
        local: 'Local 2',
      };

      await eventoRepository.criarEvento(evento1);
      await eventoRepository.criarEvento(evento2);

      const eventos = await obterEventosUseCase.execute();

      expect(eventos).toEqual([evento1, evento2]);
    });
  });

  describe('ObterEventoPorIdUseCase', () => {
    it('deve retornar o evento com o id fornecido', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await eventoRepository.criarEvento(evento);

      const eventoObtido = await obterEventoPorIdUseCase.execute(1);

      expect(eventoObtido).toEqual(evento);
    });

    it('deve retornar null se o evento com o id fornecido não existir', async () => {
      const eventoObtido = await obterEventoPorIdUseCase.execute(1);

      expect(eventoObtido).toBeNull();
    });
  });

  describe('AtualizarEventoUseCase', () => {
    it('deve atualizar o evento com o id fornecido', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await eventoRepository.criarEvento(evento);

      const eventoAtualizado: Evento = {
        id: 1,
        nome: 'Evento Atualizado',
        data: new Date(),
        local: 'Local Atualizado',
      };

      const eventoAtualizadoObtido = await atualizarEventoUseCase.execute(eventoAtualizado);

      expect(eventoAtualizadoObtido).toEqual(eventoAtualizado);

      const eventos = await eventoRepository.obterEventos();
      expect(eventos[0]).toEqual(eventoAtualizado);
    });

    it('deve lançar um erro se o evento com o id fornecido não existir', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await expect(atualizarEventoUseCase.execute(evento)).rejects.toThrow('Evento não encontrado');
    });
  });

  describe('ExcluirEventoUseCase', () => {
    it('deve excluir o evento com o id fornecido', async () => {
      const evento: Evento = {
        id: 1,
        nome: 'Evento de Teste',
        data: new Date(),
        local: 'Local de Teste',
      };

      await eventoRepository.criarEvento(evento);

      const eventoExcluido = await excluirEventoUseCase.execute(1);

      expect(eventoExcluido).toBe(true);

      const eventos = await eventoRepository.obterEventos();
      expect(eventos.length).toBe(0);
    });

    it('deve retornar false se o evento com o id fornecido não existir', async () => {
      const eventoExcluido = await excluirEventoUseCase.execute(1);

      expect(eventoExcluido).toBe(false);
    });
  });
});
