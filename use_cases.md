
#Casos de Uso:

## Acompanhar eventos

**Descrição:** Possibilita aos usuários acompanhar os eventos de UFC, visualizando informações como nome, data, local e lista de lutas programadas.

### Caso principal

1. O usuário seleciona a opção de acompanhar eventos de UFC.
2. O sistema exibe uma lista de eventos de UFC, incluindo nome, data, local e lista de lutas programadas.

### Fluxos alternativos

- Se não houver eventos de UFC disponíveis:
  - O sistema exibe uma mensagem informando que não há eventos programados.

## Visualizar resultados de lutas

**Descrição:** Permite aos usuários visualizar os resultados das lutas de cada evento, incluindo os lutadores envolvidos, resultado, método de vitória e duração.

### Caso principal

1. O usuário escolhe visualizar os resultados de uma luta de um evento específico.
2. O sistema exibe informações dos lutadores e quem ganhou a luta.

### Fluxos alternativos

- Se ainda não tem vencedor:
  - O sistema exibe uma mensagem informando que os resultados ainda não estão disponíveis.

## CRUD de lutadores

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de lutadores.

### Criação

1. O usuário seleciona a opção de criar um novo lutador.
2. O sistema solicita as informações necessárias para criar o lutador, como nome, categoria de peso, país de origem e estatísticas de lutas.
3. O sistema cria o lutador com os dados fornecidos.

### Leitura

1. O usuário seleciona a opção de visualizar a lista de lutadores.
2. O sistema exibe uma lista de todos os lutadores cadastrados, incluindo suas informações.

### Atualização

1. O usuário escolhe editar as informações de um lutador específico.
2. O sistema exibe o lutador selecionado com seus detalhes atuais.
3. O usuário atualiza as informações desejadas do lutador.
4. O sistema salva as alterações realizadas.

### Exclusão

1. O usuário seleciona a opção de excluir um lutador.
2. O sistema confirma a exclusão do lutador selecionado.

## CRUD de lutas

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de lutas.

### Criação

1. O usuário escolhe criar uma nova luta.
2. O sistema solicita as informações necessárias para criar a luta, como os lutadores envolvidos, resultado, método de vitória e duração.
3. O sistema cria a luta com os dados fornecidos.

### Leitura

1. O usuário seleciona a opção de visualizar a lista de lutas.
2. O sistema exibe uma lista de todas as lutas cadastradas, incluindo suas informações.

### Atualização do status da luta

1. O usuário escolhe atualizar o status de uma luta específica.
2. O sistema exibe a luta selecionada com seus detalhes atuais.
3. O usuário informa o resultado da luta (empate ou vitória de um lutador).
4. O sistema atualiza o status da luta conforme o resultado informado.

## CRUD de Eventos

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de eventos.

### Criação

1. O usuário seleciona a opção de criar um novo evento.
2. O sistema solicita as informações necessárias para criar o evento, como nome, data, local e lista de lutas programadas.
3. O sistema cria o evento com os dados fornecidos.

### Leitura

1. O usuário seleciona a opção de visualizar a lista de eventos.
2. O sistema exibe uma lista de todos os eventos cadastrados, incluindo suas informações.

### Atualização

1. O usuário escolhe editar as informações de um evento específico.
2. O sistema exibe o evento selecionado com seus detalhes atuais.
3. O usuário atualiza as informações desejadas do evento.
4. O sistema salva as alterações realizadas.

### Exclusão

1. O usuário seleciona a opção de excluir um evento.
2. O sistema confirma a exclusão do evento selecionado.



## CRUD de Permissão

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de permissões.

### Criação

1. O usuário seleciona a opção de criar uma nova permissão.
2. O sistema solicita o nome da permissão.
3. O cria a permissão.

### Leitura

1. O usuário seleciona a opção de visualizar a lista de permissão.
2. O sistema exibe uma lista de todos os permissão.

### Exclusão

1. O usuário seleciona a opção de excluir um evento.
2. O sistema confirma a exclusão do evento selecionado.




## CRUD de Usuário

**Usuário:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de usuario.

### Criação

1. O usuário seleciona a opção de criar um novo usuário.
2. O sistema solicita o nome da permissão.
3. O criar permissão.

### Atualização

1. O usuário seleciona a opção de atualizar um usuário.

### Leitura

1. O usuário seleciona a opção de visualizar a lista de permissão.
2. O sistema exibe uma lista de todos os permissão.

### Exclusão

1. O usuário seleciona a opção de excluir um evento.
2. O sistema confirma a exclusão do evento selecionado.
