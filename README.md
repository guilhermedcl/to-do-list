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

#### Tecnologias:
- Node.js + Express + JavaScript + (módulos necessários para a aplicação)
#### Requisitos
- Criar API RESTful que ofereça os serviços necessários para que o Front-End possa consultar,
criar, alterar e remover os dados do banco de dados
- A aplicação deverá interagir com algum banco de dados NoSQL
- Desenvolver o tratamento de exceções para lidar com os possíveis erros que podem ocorrer
durante a execução
- Configurar a análise de código estático com Jest
- Gerar o relatório de cobertura de testes com Jest
- Implementar 100% de cobertura de testes unitários - partes de código sem teste deverão ser
justificadas

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
1. Inicie a aplicação com o comando abaixo na raiz do projeto:
   ```sh
   npm start
   ```

2. Seu navegador abrirá o link: [http://localhost:3001](http://localhost:3001) com a aplicação rodando.

## Como Rodar os Testes
1. Já dentro da raiz do projeto, navegue até a pasta do backend:
   ```sh
   cd backend
   ```

2. Inicie os testes com o seguinte comando:
    ```sh
   npm test
   ```

3. Abra a pasta --> backend/coverage/Icov-report/index.html nela abrirá o navegador web mostrando todo o relatório dos testes realizados.

