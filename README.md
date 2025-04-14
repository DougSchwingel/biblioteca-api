# API Biblioteca

![https://img.shields.io/badge/:badgeContent](https://img.shields.io/badge/NODE.JS-BACKEND-5FA04E?logo=nodedotjs&style=for-the-badge)![https://img.shields.io/badge/:badgeContent](https://img.shields.io/badge/EXPRESS-FRAMEWORK-000000?logo=express&style=for-the-badge)![https://img.shields.io/badge/:badgeContent](https://img.shields.io/badge/MYSQL-DATABASE-4479A1?logo=mysql&style=for-the-badge)![https://img.shields.io/badge/:badgeContent](https://img.shields.io/badge/TYPESCRIPT-BACKEND-3178C6?logo=typescript&style=for-the-badge)![https://img.shields.io/badge/:badgeContent](https://img.shields.io/badge/SWAGGER-API%20DOCS-85EA2D?logo=SWAGGER&style=for-the-badge)

A **API Biblioteca** é uma **RESTful API** para o gerenciamento de uma biblioteca, permitindo o controle de livros, empréstimos e o cadastro de usuários. A API foi construída utilizando o padrão **MVC** (Model-View-Controller) e expõe endpoints para operações CRUD (Criar, Ler, Atualizar, Deletar) sobre as entidades principais da biblioteca, como livros, categorias, pessoas, usuários e empréstimos.

## Funcionalidades

A **API Biblioteca** oferece as opções de criar, listar, atualizar e remover as seguintes entidades:

- **Pessoas**
- **Usuários**
- **Livros**
- **Categorias**
- **Empréstimos**

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs REST.
- **MySQL**: Banco de dados relacional para armazenar os dados.
- **TypeScript**: Superset do JavaScript para garantir tipagem estática.
- **Swagger**: Documentação interativa da API.
- **MVC**: Arquitetura de software utilizada para separar a lógica de controle, visualização e manipulação de dados.

## Estrutura do Projeto

O projeto está estruturado seguindo o padrão **MVC** (Model-View-Controller):

- **Models**: Contém a lógica de acesso e manipulação de dados.
- **Controllers**: Processa as requisições e interage com os models.
- **Services** (opcional, mas utilizado): Lógica de negócio separada da camada de controle.
- **Swagger**: Documentação da API interativa.

## Endpoints da API

A API possui os seguintes endpoints:

### Pessoas

- **GET** `/pessoas`: Listar todas as pessoas.
- **POST** `/pessoas`: Criar uma nova pessoa.
- **GET** `/pessoas/:id`: Buscar uma pessoa pelo Id.
- **PUT** `/pessoas/:id`: Atualizar as informações de uma pessoa.
- **DELETE** `/pessoas/:id`: Remover uma pessoa (não havendo usuário vinculado a esta pessoa).

### Usuários

- **GET** `/usuarios`: Listar todos os usuários.
- **POST** `/usuarios`: Criar um novo usuário.
- **GET** `/usuarios/:id`: Buscar um usuário pelo Id.
- **PUT** `/usuarios/:id`: Atualizar as informações de um usuário.
- **DELETE** `/usuarios/:id`: Remover um usuário (não havendo empréstimo de livro vinculado a este usuário).

### Livros

- **GET** `/livros`: Listar todos os livros.
- **POST** `/livros`: Criar um novo livro.
- **GET** `/livros/:id`: Buscar um livro por Id.
- **PUT** `/livros/:id`: Atualizar as informações de um livro.
- **DELETE** `/livros/:id`: Remover um livro (não havendo empréstimo de livro vinculado a este livro).

### Categorias

- **GET** `/categorias`: Listar todas as categorias.
- **POST** `/categorias`: Criar uma nova categoria.
- **GET** `/categorias/:id`: Buscar categoria por Id.
- **PUT** `/categorias/:id`: Atualizar as informações de uma categoria.
- **DELETE** `/categorias/:id`: Remover uma categoria (não havendo livro vinculado a esta categoria).

### Empréstimos

- **GET** `/emprestimos`: Listar todos os empréstimos.
- **POST** `/emprestimos`: Criar um novo empréstimo.
- **GET** `/emprestimos/:id`: Buscar empréstimo por Id.
- **PUT** `/emprestimos/:id`: Atualizar as informações de um empréstimo.
- **DELETE** `/emprestimos/:id`: Remover um empréstimo.

## Documentação da API

A documentação completa e interativa da API está disponível através do **Swagger**, que pode ser acessada diretamente ao rodar a aplicação. Para visualizar a documentação, inicie o servidor e acesse:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Modelagem C4

A modelagem C4 descreve a arquitetura do sistema em diferentes níveis de detalhe. O projeto segue os diagramas C4 até o nível 3.

### Diagrama de Contexto

O diagrama de contexto mostra o sistema em seu ambiente, com os usuários e sistemas externos interagindo com a API da biblioteca.

![Diagrama de Contexto](https://github.com/user-attachments/assets/9824b436-61ff-4aed-ab39-acc16d4e11a3)

### Diagrama de Contêineres

O diagrama de contêineres descreve a aplicação como um conjunto de contêineres, com a API, banco de dados e outros componentes do sistema.

![Diagrama de Contêineres](https://github.com/user-attachments/assets/362f22fb-0725-476a-88cd-0532807e7300)

### Diagrama de Componentes

O diagrama de componentes detalha as partes internas da API, como os controllers, models, services, e como eles se comunicam para realizar as operações.

![Diagrama de Componentes](https://github.com/user-attachments/assets/56ec094f-b413-4d01-8ff1-ba5aff0b0cd5)

## Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/api-biblioteca.git
   cd api-biblioteca
   npm install
   npm run dev

## Contribuições

O projeto atualmente consta com contribuições dos seguintes envolvidos:
@github/DougSchwingel
