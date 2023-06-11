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
2. O sistema solicita as informações necessárias para criar a luta, como os lutadores envolvidos, resultado, método de vitória e duração.
3. O usuário fornece todas as informações corretamente.
4. O sistema cria a luta com os dados fornecidos.

**Fluxo Alternativo:**
- Se o usuário não fornecer todas as informações necessárias, o sistema exibe uma mensagem de erro e solicita as informações novamente.

**Leitura**

**Caso Feliz:**
1. O usuário seleciona a opção de visualizar a lista de lutas.
2. O sistema exibe uma lista de todas as lutas cadastradas, incluindo suas informações.

**Atualização do status da luta**

**Caso Feliz:**
1. O usuário escolhe atualizar o status de uma luta específica.
2. O sistema exibe a luta selecionada com seus detalhes atuais.
3. O usuário informa o resultado da luta (empate ou vitória de um lutador).
4. O sistema atualiza o status da luta conforme o resultado informado.

**Fluxo Alternativo:**
- Se o usuário tentar atualizar o status de uma luta que não existe, o sistema exibe uma mensagem de erro.

**Exclusão**

**Caso Feliz:**
1. O usuário seleciona a opção de excluir uma luta.
2. O sistema confirma a exclusão da luta selecionada.

**Fluxo Alternativo:**
- Se o usuário tentar excluir uma luta que não existe, o sistema exibe uma mensagem de erro.

