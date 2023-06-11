## CRUD de lutadores

**Criação**

**Caso Feliz:**
1. O usuário seleciona a opção de criar um novo lutador.
2. O sistema solicita as informações necessárias para criar o lutador, como nome, categoria de peso, país de origem, etc.
3. O usuário fornece todas as informações corretamente.
4. O sistema cria o lutador com os dados fornecidos.

**Fluxo Alternativo:**
- Se o usuário não fornecer todas as informações necessárias, o sistema exibe uma mensagem de erro e solicita as informações novamente.

**Leitura**

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de lutadores.
2. O sistema exibe uma lista de todos os lutadores cadastrados, incluindo suas informações.

**Atualização**

**Caso Feliz:**
1. O usuário escolhe editar as informações de um lutador específico.
2. O sistema exibe o lutador selecionado com seus detalhes atuais.
3. O usuário atualiza as informações desejadas do lutador.
4. O sistema salva as alterações realizadas.

**Fluxo Alternativo:**
- Se o usuário tentar atualizar um lutador que não existe, o sistema exibe uma mensagem de erro.

**Exclusão**

**Caso Feliz:**
1. O usuário seleciona a opção de excluir um lutador.
2. O sistema confirma a exclusão do lutador selecionado.

## CRUD de lutas

**Criação**

**Caso Feliz:**
1. O usuário escolhe criar uma nova luta.
2. O sistema solicita as informações necessárias para criar a luta, como os lutadores envolvidos, etc.
3. O usuário fornece todas as informações corretamente.
4. O sistema cria a luta com os dados fornecidos.

**Fluxo Alternativo:**
- Se o usuário não fornecer todas as informações necessárias, o sistema exibe uma mensagem de erro e solicita as informações novamente.

**Leitura**

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de lutas.
2. O sistema exibe uma lista de todas as lutas cadastradas, incluindo suas informações.

**Exclusão**

**Caso Feliz:**
1. O usuário seleciona a opção de excluir uma luta.
2. O sistema confirma a exclusão da luta selecionada.

**Fluxo Alternativo:**
- Se o usuário tentar excluir uma luta que não existe, o sistema exibe uma mensagem de erro.

## CRUD de Eventos

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de eventos.

### Criação

**Caso Feliz:**
1. O usuário seleciona a opção de criar um novo evento.
2. O sistema solicita as informações necessárias para criar o evento, como nome, data, local e lista de lutas programadas.
3. O usuário fornece todas as informações corretamente.
4. O sistema cria o evento com os dados fornecidos.

**Fluxos Alternativos:**
- Se o usuário não fornecer todas as informações necessárias, o sistema exibe uma mensagem de erro e solicita as informações novamente.
- Se ocorrer algum erro no momento da criação do evento, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

### Leitura

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de eventos.
2. O sistema exibe uma lista de todos os eventos cadastrados, incluindo suas informações.

### Atualização

**Caso Feliz:**
1. O usuário escolhe editar as informações de um evento específico.
2. O sistema exibe o evento selecionado com seus detalhes atuais.
3. O usuário atualiza as informações desejadas do evento.
4. O sistema salva as alterações realizadas.

**Fluxos Alternativos:**
- Se o usuário tentar atualizar um evento que não existe, o sistema exibe uma mensagem de erro.
- Se ocorrer algum erro no momento da atualização das informações do evento, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

### Exclusão

**Caso Feliz:**
1. O usuário seleciona a opção de excluir um evento.
2. O sistema confirma a exclusão do evento selecionado.

**Fluxos Alternativos:**
- Se o usuário tentar excluir um evento que não existe, o sistema exibe uma mensagem de erro.
- Se ocorrer algum erro no momento da exclusão do evento, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

## CRUD de Card

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de cards.

### Criação

**Caso Feliz:**
1. O usuário seleciona a opção de criar um novo card.
2. O sistema solicita o nome do card.
3. O usuário fornece o nome do card.
4. O sistema cria o card.

### Leitura

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de cards.
2. O sistema exibe uma lista de todos os cards.

### Exclusão

**Caso Feliz:**
1. O usuário seleciona a opção de excluir um card.
2. O sistema confirma a exclusão do card selecionado.

**Fluxos Alternativos:**
- Se o usuário tentar excluir um card que não existe, o sistema exibe uma mensagem de erro.
- Se ocorrer algum erro no momento da exclusão do card, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

## CRUD de Permissão

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de permissões.

### Criação

**Caso Feliz:**
1. O usuário seleciona a opção de criar uma nova permissão.
2. O sistema solicita o nome da permissão.
3. O usuário fornece o nome da permissão.
4. O sistema cria a permissão.

**Fluxos Alternativos:**
- Se o usuário não fornecer o nome da permissão, o sistema exibe uma mensagem de erro e solicita o nome novamente.
- Se ocorrer algum erro no momento da criação da permissão, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

### Leitura

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de permissões.
2. O sistema exibe uma lista de todas as permissões.

### Exclusão

**Caso Feliz:**
1. O usuário seleciona a opção de excluir uma permissão.
2. O sistema confirma a exclusão da permissão selecionada.

**Fluxos Alternativos:**
- Se o usuário tentar excluir uma permissão que não existe, o sistema exibe uma mensagem de erro.
- Se ocorrer algum erro no momento da exclusão da permissão, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

## CRUD de Usuário

**Descrição:** Permite realizar operações de criação, leitura, atualização e exclusão (CRUD) de usuários.

### Criação

**Caso Feliz:**
1. O usuário seleciona a opção de criar um novo usuário.
2. O sistema solicita o nome e senha do usuário.
3. O usuário fornece o nome e senha do usuário.
4. O sistema cria o usuário.

### Atualização

**Caso Feliz:**
1. O usuário seleciona a opção de atualizar um usuário.
2. O sistema exibe o usuário selecionado com seus detalhes atuais.
3. O usuário atualiza as informações desejadas do usuário.
4. O sistema salva as alterações realizadas.

**Fluxos Alternativos:**
- Se o usuário tentar atualizar um usuário que não existe, o sistema exibe uma mensagem de erro.
- Se ocorrer algum erro no momento da atualização das informações do usuário, o sistema exibe uma mensagem de erro apropriada e cancela a operação.

### Leitura

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de usuários.
2. O sistema exibe uma lista de todos os usuários.

### Exclusão

**Caso Feliz:**
1. O usuário seleciona a opção de excluir um usuário.
2. O sistema confirma a exclusão do usuário selecionado.

**Fluxos Alternativos:**
- Se o usuário tentar excluir um usuário que não existe, o sistema exibe uma mensagem de erro.
- Se ocorrer algum erro no momento da exclusão do usuário, o sistema exibe uma mensagem de erro apropriada e cancela a operação.
