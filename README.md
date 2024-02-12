# Documentação da API

Bem-vindo à documentação da API "Amigo Secreto"! Esta API é desenvolvida utilizando Node.js com o framework Express e fornece endpoints para lidar com eventos, grupos e pessoas em um sistema de gerenciamento de eventos.

## Configuração

Antes de iniciar o servidor, é necessário configurar algumas variáveis de ambiente. Você pode configurá-las criando um arquivo `.env` na raiz do projeto e definindo as seguintes variáveis:

- `NODE_ENV`: Define o ambiente de execução da aplicação, pode ser "development" ou "production".
- `PORT`: A porta em que o servidor será executado.
- `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL.
- `DEFAULT_TOKEN`: Token utilizado para criptografia de dados sensíveis.

Para ambientes de produção, você também precisa especificar as chaves privada e pública para configurar HTTPS:

- `SSL_KEY`: Caminho para a chave privada SSL.
- `SSL_CERT`: Caminho para o certificado SSL.

## Instalação

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Em seguida, execute os seguintes comandos para instalar as dependências do projeto e iniciar o servidor:

```bash
npm install
npm run dev
```

Este comando iniciará o servidor de desenvolvimento.

## Endpoints

### Autenticação

#### POST /admin/login

- Descrição: Endpoint para autenticar um usuário administrador.
- Parâmetros da requisição:
  - `password` (string): Senha do administrador.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "token": "token_de_acesso" }`
- Resposta de erro:
  - Código de status: 403 Forbidden
  - Corpo da resposta: `{ "error": "Acesso negado" }`

### Eventos

#### GET /admin/events

- Descrição: Obtém todos os eventos.
- Parâmetros da requisição: Nenhum.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "events": [...] }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### GET /admin/events/:id

- Descrição: Obtém um evento específico.
- Parâmetros da requisição:
  - `id` (number): ID do evento.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "event": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### POST /admin/events

- Descrição: Adiciona um novo evento.
- Parâmetros da requisição:
  - `title` (string): Título do evento.
  - `description` (string): Descrição do evento.
  - `grouped` (boolean): Define se o evento é agrupado ou não.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "event": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### PUT /admin/events/:id

- Descrição: Atualiza um evento existente.
- Parâmetros da requisição:
  - `id` (number): ID do evento.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "event": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### DELETE /admin/events/:id

- Descrição: Remove um evento existente.
- Parâmetros da requisição:
  - `id` (number): ID do evento.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "event": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

### Grupos

#### GET /admin/events/:id_event/groups

- Descrição: Obtém todos os grupos de um evento específico.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "groups": [...] }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### GET /admin/events/:id_event/groups/:id

- Descrição: Obtém um grupo específico de um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id` (number): ID do grupo.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "group": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### POST /admin/events/:id_event/groups

- Descrição: Adiciona um novo grupo a um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `name` (string): Nome do grupo.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "group": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### PUT /admin/events/:id_event/groups/:id

- Descrição: Atualiza um grupo existente em um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id` (number): ID do grupo.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "group": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta

: `{ "error": "Ocorreu um erro" }`

#### DELETE /admin/events/:id_event/groups/:id

- Descrição: Remove um grupo existente de um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id` (number): ID do grupo.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "group": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

### Pessoas

#### GET /admin/events/:id_event/groups/:id_group/people

- Descrição: Obtém todas as pessoas de um grupo específico de um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id_group` (number): ID do grupo.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "people": [...] }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### GET /admin/events/:id_event/groups/:id_group/people/:id

- Descrição: Obtém uma pessoa específica de um grupo em um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id_group` (number): ID do grupo.
  - `id` (number): ID da pessoa.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "person": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### POST /admin/events/:id_event/groups/:id_group/people

- Descrição: Adiciona uma nova pessoa a um grupo em um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id_group` (number): ID do grupo.
  - `name` (string): Nome da pessoa.
  - `cpf` (string): CPF da pessoa.
- Resposta bem-sucedida:
  - Código de status: 201 Created
  - Corpo da resposta: `{ "person": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### PUT /admin/events/:id_event/groups/:id_group/people/:id

- Descrição: Atualiza os dados de uma pessoa em um grupo em um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id_group` (number): ID do grupo.
  - `id` (number): ID da pessoa.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "person": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

#### DELETE /admin/events/:id_event/groups/:id_group/people/:id

- Descrição: Remove uma pessoa de um grupo em um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id_group` (number): ID do grupo.
  - `id` (number): ID da pessoa.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "person": { ... } }`
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

### Pesquisa de Pessoas

#### GET /admin/events/:id_event/groups/:id_group/people/search

- Descrição: Pesquisa uma pessoa por CPF em um grupo específico de um evento.
- Parâmetros da requisição:
  - `id_event` (number): ID do evento.
  - `id_group` (number): ID do grupo.
  - `cpf` (string): CPF da pessoa a ser pesquisada.
- Resposta bem-sucedida:
  - Código de status: 200 OK
  - Corpo da resposta: `{ "person": { ... }, "personMatched": { ... } }` (caso haja correspondência)
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }` (caso contrário)
- Resposta de erro:
  - Código de status: 500 Internal Server Error
  - Corpo da resposta: `{ "error": "Ocorreu um erro" }`

## Interceptador de Requisições

Todas as requisições recebidas pelo servidor são interceptadas por um middleware que registra as informações relevantes no console, incluindo o método da requisição, a URL original e os dados da requisição.

## Outros Detalhes

O projeto utiliza Prisma como ORM para interagir com o banco de dados PostgreSQL. Certifique-se de executar as migrações antes de iniciar o servidor em ambientes de desenvolvimento ou produção.

Para mais detalhes sobre a estrutura do projeto, consulte os arquivos de código-fonte e os comentários fornecidos.

Para quaisquer dúvidas ou problemas, entre em contato com o administrador do sistema. Obrigado por utilizar nossa API!
