# To Do List App

Este projeto é uma aplicação de lista de tarefas simples, desenvolvida como parte de um trabalho integrado envolvendo três disciplinas. O sistema é composto por três partes distintas, cada uma referente a uma das disciplinas envolvidas no semestre.

## Requisitos Específicos

O sistema é dividido em três partes: Banco de Dados, Back-end e Front-end.

### Banco de Dados

O banco de dados será onde os dados do sistema ficarão armazenados, localizado do lado do servidor. Os requisitos obrigatórios para o banco de dados incluem:
- Utilizar MongoDB ou outro banco NoSQL apropriado para a aplicação.
- Implementar no mínimo 3 conjuntos de informação, como páginas, comentários e usuários.
- Implementar as operações CRUD (criação, edição, exclusão e leitura) para pelo menos 1 conjunto de informações.

Requisitos opcionais incluem:
- Implementar pesquisa com filtros e opção de atualização em lote.

### Front-end

O front-end é executado do lado do cliente e é desenvolvido utilizando React.js. Os requisitos de telas incluem:
- Implementação de pelo menos 1 CRUD baseado no que foi criado no Back-end e Banco de Dados.
- Um CRUD consiste em Create, Read, Update e Delete, que correspondem à inclusão, leitura (listagem), alteração e exclusão de registros.

### Back-end

Ainda não temos requisitos específicos para o Back-end.

## Tecnologias Utilizadas

- **Front-end:** React.js
- **Back-end:** Node.js com Express.js
- **Banco de Dados:** MongoDB utilizando Mongoose.

## Como Rodar a Aplicação

### Instalação
1. Clone o repositório para a sua máquina:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:
   ```sh
   cd to-do-list
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

### Rodando a Aplicação
1. Inicie o back-end...
Primeiro, certifique-se de que o seu back-end está rodando. Abra um terminal, navegue até o diretório do seu back-end e inicie o servidor:
   ```sh
   node Server.js
   ```
2. Inicie o front-end...
Abra outro terminal, navegue até o diretório do seu front-end e inicie o servidor do React:
   ```sh
   npm start
   ```

2. Seu navegador abrirá o link: [http://localhost:3000](http://localhost:3000) com a aplicação rodando.
