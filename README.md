# <center>POC - Filas e mensageria</center>

## Table of Contents

- [Sobre o Projeto](#about)
- [Iniciando o projeto](#getting_started)
- [Funcionameno](#usage)

## Sobre o projeto <a name = "about"></a>

Esse projeto tem como objetivo a demonstração do uso de filas e mensageria com API's e Microsserviços.

Foi criada uma API com Express simulando a criação de usuários e pedidos em um MongoDB, quando algum desses requests é feito, é enviado uma mensagem para uma das filas definidas no RabbitMQ (`new_users, new_orders e newsletter`).
Do outro lado consumindo as mensagens das filas, temos uma estrutura básica de microsserviços criados com NestJS, onde cada um dos apps se alimenta de uma das filas e envia um email utilizando a API do Sendgrid informando a criação de usuário, pedido ou de cadastro na newsletter.

### Tecnologias utilizadas no projeto:

<center>

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/static/v1?style=for-the-badge&message=Docker&color=2496ED&logo=Docker&logoColor=FFFFFF&label=)

</center>

## Iniciando o projeto <a name = "getting_started"></a>

Iniciando o projeto, respeitando os pré-requisitos descritos logo abaixo, você terá uma cópia rodando em sua máquina para testar as funcionalidades do projeto.

### Pré-requisitos

- Docker
- Ambiente no MongoDB Atlas configurado (<a name = "about" href="https://www.mongodb.com/pt-br" target="_blank">Configure MongoDB aqui</a>)
- Instância no CloudAMQP configurado (<a name = "about" href="https://www.cloudamqp.com/docs/index.html" target="_blank">Configure CloudAMQP Aqui</a>)

### Instalação

Com o Docker instalado e o Docker Desktop aberto (caso esteja utilizando Windows ou MacOS), crie um arquivo `.env` na raíz do projeto com as mesmas variáveis definidas no `.env.example`:

```
# Rabbit MQ
RMQ_URI="..."
RMQ_ORDERS_QUEUE="..."
RMQ_USERS_QUEUE="..."
RMQ_NEWSLETTER_QUEUE="..."

# MongoDB
DATABASE_URI="..."

# Sendgrid
SENDGRID_API_KEY="..."
SENDGRID_MAIL_SENDER="..."
```

Com as variáveis de ambiente definidas, abra o terminal na pasta raíz do projeto e dê o comando:

```
docker-compose up -d
```

Após isso, verifique o terminal do Docker Desktop para ver se tudo está rodando de forma tranquila.

## Funcionamento <a name = "usage"></a>

Você pode acessar a collection criada no Postman para fazer as requisições no link: <a name = "about" href="https://www.getpostman.com/collections/86cd0c2ea50236b3a8e4" target="_blank">Collection Postman</a>
Ou copie e cole: `https://www.getpostman.com/collections/86cd0c2ea50236b3a8e4`

As requisições para criação de usuários seguem o seguinte padrão:

```
METHOD: POST
URL: http://localhost:3000/users

{
	"name": "Name",
	"email": "email@email.com",
	"password": "password",
	"newsletter": true
}
```

E as requisições para criação de pedidos utilizam o corpo de requisição que se segue:

```
METHOD: POST
URL: http://localhost:3000/orders

{
	"product": "GTX 4060",
	"price": "Fora do meu orçamento",
	"email": "email@email.com"
}
```

Com tudo preparado, a API e os microsserviços rodando, você pode fazer as requisições a API.

A API armazena o request no banco e envia para o RabbitMQ apenas o ID do documento criado com as definições, os microsserviços ficarão escutando as filas definidas e assim que a mensagem chegar elas vão tratar cada uma das mensagens enviadas, buscando o ID no banco e enviando os dados, seja de usuário, pedido ou newsletter para o email definido na requisição.
