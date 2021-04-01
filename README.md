# e_trading

A estrutura do projeto consiste em:

- Microserviços em: NodeJS/TypeScript na pasta `lambdas`;
- UI em Flutter na pasta `ui`;
- Estrutura do banco de dados DynamoDB gerenciado pelo framework Serverless na pasta `dynamodb`.

Leia os arquivos README.md em cada pasta para mais detalhes.
Este projeto está configurado para integração contínua em uma conta AWS. Veja o arquivo `buildspec.yml` na raiz do projeto para mais detalhes.

Essa aplicação está hospedada no endereço abaixo:
http://trading-web-app.s3-website-us-east-1.amazonaws.com/#/

Credenciais para testes:
username: `hugoalvares`
password: `1234`
