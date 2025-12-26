# Zenkai Manager

Sistema de gerenciamento de torneios com formato Suíço + Mata-Mata, desenvolvido com NestJS, Prisma, PostgreSQL, Ionic e Angular.

# 🐘 Banco de Dados (PostgreSQL)

O projeto utiliza PostgreSQL rodando via Docker.

## Subir o banco de dados

Entre na pasta backend e execute o comando abaixo no terminal:

`` docker-compose up -d ``

Isso irá criar:

PostgreSQL na porta 5432

Banco de dados: arena

Usuário: arena

Senha: arena

Para verificar se o container está rodando:

`` docker ps ``

# ⚙️ Backend
## Instalar dependências

Entre na pasta backend e execute:

`` npm install `` 

## Criar arquivo .env

Crie um arquivo chamado ``.env`` dentro da pasta backend com o seguinte conteúdo:

`` DATABASE_URL="postgresql://arena:arena@localhost:5432/arena" `` 

Importante: sem esse arquivo o Prisma não irá inicializar.

## Rodar as migrations do Prisma

Execute:

``npx prisma migrate dev
npx prisma generate``

Opcional: abrir o Prisma Studio para visualizar o banco:

``npx prisma studio``

## Iniciar o backend

Execute:

``npm run start:dev``

O backend ficará disponível em: ``http://localhost:3000/``


# 🌐 Frontend (Ionic + Angular)
## Instalar dependências

Entre na pasta frontend e execute:

``npm install``

## Iniciar o frontend

Execute:

``ionic serve``

A aplicação ficará disponível em: ``http://localhost:8100``

# 🛠️ Comandos Úteis

Resetar o banco de dados:

``npx prisma migrate reset``

Regerar o Prisma Client:

``npx prisma generate``
