
# Estorias

Funcionalidade: Criação de eventos

 **Cenário**: Criação de um novo evento com informações corretas
  - ***Given*** que o usuário seleciona a opção de criar um novo evento
  - ***When*** o usuário fornece todas as informações corretamente
  - ***Then*** o sistema cria o evento com os dados fornecidos

 **Cenário**: Tentativa de criação de um evento sem informações necessárias
   - ***Given*** que o usuário seleciona a opção de criar um novo evento
   - ***When*** o usuário não fornece todas as informações necessárias
   - ***Then*** o sistema exibe uma mensagem de erro e solicita as informações novamente

Funcionalidade: Leitura de eventos

**Cenário**: Visualização da lista de eventos
 - ***Given*** que o usuário selecionou a opção de visualizar a lista de eventos
 - ***Then*** o sistema exibe uma lista de todos os eventos cadastrados, incluindo suas informações

Funcionalidade: Atualização de eventos

**Cenário**: Atualização de informações de um evento específico
 - ***Given***  que o usuário escolhe editar as informações de um evento específico
 - ***When*** o usuário atualiza as informações desejadas do evento
 - ***Then*** o sistema salva as alterações realizadas

**Cenário**: Tentativa de atualização de um evento inexistente
 - ***Given*** que o usuário tenta atualizar um evento que não existe
 - ***Then*** o sistema exibe uma mensagem de erro

Funcionalidade: Exclusão de eventos

**Cenário**: Exclusão de um evento
  - ***Given*** que o usuário seleciona a opção de excluir um evento
  - ***Then*** o sistema confirma a exclusão do evento selecionado

**Cenário**: Tentativa de exclusão de um evento inexistente
   - ***Given*** que o usuário tenta excluir um evento que não existe
   - ***Then*** o sistema exibe uma mensagem de erro

Funcionalidade: Criação de cards

**Cenário**: Criação de um novo card com nome válido
  - ***Given*** que o usuário seleciona a opção de criar um novo card
  - ***When***  o usuário fornece um nome válido para o card
  - ***Then*** o sistema cria o card

Funcionalidade: Leitura de cards

 **Cenário**: Visualização da lista de cards
   - ***Given*** que o usuário selecionou a opção de visualizar a lista de cards
   - ***Then*** o sistema exibe uma lista de todos os cards

Funcionalidade: Exclusão de cards

**Cenário**: Exclusão de um card
  - ***Given***  que o usuário seleciona a opção de excluir um card
  - ***Then***  o sistema confirma a exclusão do card selecionado

**Cenário**: Tentativa de exclusão de um card inexistente
  - ***Given*** que o usuário tenta excluir um card que não existe
  - ***Then***  o sistema exibe uma mensagem de erro


Funcionalidade: Criação de lutadores

**Cenário**: Criação de lutador com informações corretas:
 - ***Given*** que o usuário selecionou a opção de criar um novo lutador
 - ***When*** o usuário fornece todas as informações corretamente
 - ***Then*** o sistema cria o lutador com os dados fornecidos

**Cenário**: Tentativa de criação de lutador sem informações necessárias
  - ***Given*** que o usuário selecionou a opção de criar um novo lutador
  - ***When***  o usuário não fornece todas as informações necessárias
  - ***Then*** o sistema exibe uma mensagem de erro e solicita as informações novamente

Funcionalidade: Leitura de lutadores

**Cenário**: Visualização da lista de lutadores
  - ***Given***  que o usuário selecionou a opção de visualizar a lista de lutadores
  - ***Then***  o sistema exibe uma lista de todos os lutadores cadastrados, incluindo suas informações

Funcionalidade: Atualização de lutadores

**Cenário**: Atualização de informações de um lutador específico
 - ***Given*** que o usuário escolhe editar as informações de um lutador específico
 - ***When***  o usuário atualiza as informações desejadas do lutador
 - ***Then*** o sistema salva as alterações realizadas

 **Cenário**: Tentativa de atualização de um lutador inexistente
   - ***Given*** que o usuário tenta atualizar um lutador que não existe
   - ***Then*** o sistema exibe uma mensagem de erro

Funcionalidade: Exclusão de lutadores

**Cenário**: Exclusão de um lutador
 - ***Given*** que o usuário seleciona a opção de excluir um lutador
 - ***Then*** o sistema confirma a exclusão do lutador selecionado

**Cenário**: Tentativa de exclusão de um lutador inexistente
 - ***Given*** que o usuário tenta excluir um lutador que não existe
 - ***Then*** o sistema exibe uma mensagem de erro

Funcionalidade: Criação de lutas

**Cenário**: Criação de uma nova luta com informações corretas
 - ***Given*** que o usuário escolhe criar uma nova luta
 - ***When*** o usuário fornece todas as informações corretamente
 - ***Then*** o sistema cria a luta com os dados fornecidos

**Cenário**: Tentativa de criação de uma luta sem informações necessárias
 - ***Given***  que o usuário escolhe criar uma nova luta
  - ***When*** o usuário não fornece todas as informações necessárias
  - ***Then*** o sistema exibe uma mensagem de erro e solicita as informações novamente

Funcionalidade: Leitura de lutas

 **Cenário**: Visualização da lista de lutas
  - ***Given*** que o usuário selecionou a opção de visualizar a lista de lutas
  - ***Then***  o sistema exibe uma lista de todas as lutas cadastradas, incluindo suas informações

Funcionalidade: Exclusão de lutas

 **Cenário**: Exclusão de uma luta
  - ***Given*** que o usuário seleciona a opção de excluir uma luta
  - ***Then***  o sistema confirma a exclusão da luta selecionada

 **Cenário**: Tentativa de exclusão de uma luta inexistente
   - ***Given***  que o usuário tenta excluir uma luta que não existe
   - ***Then***  o sistema exibe uma mensagem de erro

Funcionalidade: Criação de usuários

**Cenário**: Criação de um novo usuário com nome e senha válidos
  - ***Given*** que o usuário seleciona a opção de criar um novo usuário
  - ***When*** o usuário fornece um nome e senha válidos para o usuário
  - ***Then***  o sistema cria o usuário

Funcionalidade: Atualização de usuários

**Cenário**: Atualização de informações de um usuário
  - ***Given*** que o usuário seleciona a opção de atualizar um usuário
  - ***When*** o usuário atualiza as informações desejadas do usuário
  - ***Then***  o sistema salva as alterações realizadas

**Cenário**: Tentativa de atualização de um usuário inexistente
 - ***Given***  que o usuário tenta atualizar um usuário que não existe
 - ***Then*** o sistema exibe uma mensagem de erro

Funcionalidade: Leitura de usuários

**Cenário**: Visualização da lista de usuários
 - ***Given*** que o usuário selecionou a opção de visualizar a lista de usuários
 - ***Then*** o sistema exibe uma lista de todos os usuários

Funcionalidade: Exclusão de usuários

**Cenário**: Exclusão de um usuário
 - ***Given*** que o usuário seleciona a opção de excluir um usuário
 - ***Then*** o sistema confirma a exclusão do usuário selecionado

**Cenário**: Tentativa de exclusão de um usuário inexistente
- ***Given*** que o usuário tenta excluir um usuário que não existe
- ***Then*** o sistema exibe uma mensagem de erro

