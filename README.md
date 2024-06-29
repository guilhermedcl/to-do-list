# To Do List App

Este projeto é uma aplicação de lista de tarefas simples, desenvolvida como parte de um trabalho integrado envolvendo quatro disciplinas. O sistema é composto por três partes distintas, cada uma referente a uma das disciplinas envolvidas no semestre.

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


### DevOps

- Criar um repositório que contenha:
- Branch develop
- 1 Workflow que faça Continuous Integration e Continuous Delivery
- Deverá rodar analise de código estático, cobertura e os testes de unidade
- 1 Workflow que faça Continuous Deployment em uma instância do EC2
- Construir uma aplicação Node.js que será gerenciada pelo repositório
- Aplicação deve conter alguns testes de unidade

## Tecnologias Utilizadas
<img src="https://skillicons.dev/icons?i=html,css,javascript,nodejs,express,jest,mongodb,git,npm,postman,vscode" /><br>

# Como Rodar a Aplicação

### Instalação
1. Clone o repositório para a sua máquina:

   ```sh
   git clone https://github.com/guilhermedcl/to-do-list.git
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd to-do-list
   ```

3. Instale as dependências com o comando abaixo na raiz do projeto:

   ```sh
   npm run install-all
   ```

## Configurando variáveis de ambiente

1. Renomeie o arquivo `.env.example` para `.env`.
   
2. Preencha a variável `MONGODB_URL` com sua própria URL de conexão

3. Para pegar sua `MONGODB_URL`, siga este passo: Abra o site do MONGODB -> entre em sua conta -> Database -> Connect -> Drivers > copie e cole sua string de conexão.


### Rodando a Aplicação

1. Inicie a aplicação com o comando abaixo na raiz do projeto:

   ```sh
   npm start
   ```

2. Seu navegador abrirá o link: [http://localhost:3000](http://localhost:3000) com a aplicação rodando.

## Como Rodar os Testes

1. Inicie os testes com o comando abaixo na raiz do projeto:
    ```sh
   npm test
   ```

2. Na estrutura do projeto, abra a pasta --> backend/coverage/Icov-report/index.html nela abrirá o navegador web mostrando todo o relatório dos testes realizados, também verifique seu terminal.

