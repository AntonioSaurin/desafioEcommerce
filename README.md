# desafioEcommerce

Esta é uma API RESTful desenvolvida para o gerenciamento de uma plataforma de e-commerce simples, abrangendo o controle de usuários, catálogo de produtos e processamento transacional de pedidos

## Tecnologias e Ferramentas

O projeto foi construído utilizando as seguintes tecnologias:

* Runtime: Node.js
* Framework Web: Express.js
* Banco de Dados: PostgreSQL
* ORM & Migrations: Prisma
* Autenticação: JSON Web Token (JWT)
* Versionamento: Git    

## Estrutura do Projeto

A organização dos arquivos segue o padrão de separação de responsabilidades exigido :

src/
├── controllers/    # Lógica das rotas
├── routes/         # Definição dos endpoints
├── middlewares/    # Middlewares de autenticação e erro
├── models/         # Instância do Prisma Client
├── database/       # Schema do Prisma e Migrations
.env                # Variáveis de ambiente (não commitado)
.env.example        # Guia de configuração de variáveis
README.md           # Documentação do projeto

## Configuração do Ambiente
Siga as instruções abaixo para configurar o projeto localmente:
1. Clonar o Repositório
    git clone [https://github.com/AntonioSaurin/desafioEcommerce.git](https://github.com/AntonioSaurin/desafioEcommerce.git)
    cd desafioEcommerce
2. Instalar Dependências
    npm install
3. Configurar Variáveis de Ambiente
    O projeto utiliza obrigatoriamente variáveis de ambiente.
    Copie o arquivo .env.example para um novo arquivo chamado .env:
        cp .env.example .env
    Abra o arquivo .env e preencha os valores com as credenciais do seu banco de dados local e sua chave secreta JWT.
4. Executar Migrations
    Para criar as tabelas no PostgreSQL e gerar o Prisma Client:
        npx prisma migrate dev
5. Iniciar a Aplicação
    npm run dev
O servidor iniciará por padrão na porta 3000.

## Endpoints da API

### Autenticação
* `POST /users`: Cadastro de novo usuário (nome, e-mail, senha)
* `POST /login`: Autenticação de usuário com geração de token JWT.

### Produtos
* `GET /products`: Listagem de todos os produtos ativos (Público).
* `GET /products/:id`: Detalhes de um produto específico (Público).
* `POST /products`: Criação de produto (Autenticado).
* `PUT /products/:id`: Edição de produto (Autenticado).
* `DELETE /products/:id`: Exclusão lógica de produto (Autenticado).

### Pedidos
* `POST /orders`: Criação de pedido com um ou mais produtos. Possui controle transacional onde o estoque dos produtos é decrementado automaticamente (Autenticado).
* `GET /orders`: Listagem de pedidos do usuário autenticado (Autenticado).