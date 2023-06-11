# T3-TV-2
# Sistema de gerenciamento de lutas em diferentes eventos do UFC.

# Entidades:
## Lutador
- A entidade "Lutador" representa um competidor de MMA.
- Atributos:
  - **Nome**: o nome completo do lutador.
  - **Categoria de Peso**: a categoria de peso em que o lutador compete (por exemplo, peso leve, peso médio, peso pesado).
  - **País de Origem**: o país de origem do lutador.
  - **Estatísticas de Lutas**: informações estatísticas sobre as lutas do lutador, como número total de vitórias, derrotas, empates, nocautes, finalizações, entre outros.
  - **Idade**: idade do lutador. 
  - **Altura**: altura do lutador. 
  - **Alcance**: alcance do lutador do lutador. 

## Evento
- A entidade "Evento" representa um evento do UFC
- Atributos:
  - **Nome**: o nome do evento de UFC.
  - **Data**: a data em que o evento ocorre.
  - **Local**: o local onde o evento é realizado.
  - **Lista de Lutas Programadas**: uma lista das lutas programadas para o evento, que inclui os lutadores envolvidos em cada luta.

## Luta
- A entidade "Luta" representa uma luta de UFC específica, que ocorre em um evento.
- Atributos:
  - **Lutadores Envolvidos**: os lutadores que participam da luta.
  - **Resultado**: o resultado da luta (vitória, derrota, empate).
  - **Método de Vitória**: o método pelo qual a luta foi decidida (nocaute, finalização, decisão).
  - **Duração**: a duração da luta, em minutos ou rounds.

## Usuário
- A entidade "Usuário" representa um usuário do sistema, com acesso ao projeto relacionado ao MMA.
- Atributos:
  - **Nome de Usuário (Login)**: o nome de usuário para autenticação no sistema.
  - **Senha**: a senha associada ao nome de usuário para autenticação.
  - **Nome Completo**: o nome completo do usuário.
  
