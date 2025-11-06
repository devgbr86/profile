# Roadmap: Fundamentos Web, Git e Ferramentas

## Índice
1. [História da Web e Fundamentos](#1-história-da-web-e-fundamentos)
2. [Servidores Web](#2-servidores-web)
3. [Protocolo HTTP Profundo](#3-protocolo-http-profundo)
4. [DNS e Domínios](#4-dns-e-domínios)
5. [Git Completo](#5-git-completo)
6. [GitHub Avançado](#6-github-avançado)
7. [VS Code Mastery](#7-vs-code-mastery)

---

## 1. História da Web e Fundamentos

### 1.1 Linha do Tempo

**1969 - ARPANET**: Primeira rede de computadores, precursora da internet.

**1989 - Proposta da WWW**: Tim Berners-Lee no CERN propõe um sistema de gerenciamento de informações usando hipertexto.

**1990 - Primeira Página Web**: Tim Berners-Lee cria o primeiro servidor web, navegador e página HTML.

**1991 - WWW Pública**: A World Wide Web se torna pública fora do CERN.

**1993 - Mosaic**: Primeiro navegador gráfico popular, facilitando o acesso à web.

**1994 - W3C**: Fundação do World Wide Web Consortium para padronização.

**1995 - JavaScript**: Brendan Eich cria JavaScript em 10 dias na Netscape.

**2004 - Web 2.0**: Termo cunhado para web interativa e colaborativa.

**2008 - HTML5**: Início do desenvolvimento do HTML5 moderno.

**2010s - Web Moderna**: SPAs, APIs REST, Mobile-first, Progressive Web Apps.

### 1.2 Arquitetura Cliente-Servidor

```
Cliente (Browser)          Servidor Web
      |                         |
      |---- HTTP Request ------>|
      |                         |
      |                    [Processa]
      |                         |
      |<--- HTTP Response ------|
      |                         |
   [Renderiza]
```

**Cliente**: 
- Navegador (Chrome, Firefox, Safari, Edge)
- Envia requisições HTTP
- Interpreta HTML, CSS, JavaScript
- Renderiza interface visual
- Gerencia cookies e localStorage

**Servidor**:
- Recebe e processa requisições
- Acessa banco de dados
- Executa lógica de negócio
- Retorna recursos (HTML, JSON, arquivos)
- Gerencia sessões e autenticação

### 1.3 Como Funciona uma Requisição Web

1. **Digite URL**: `https://exemplo.com/pagina`
2. **DNS Lookup**: Converte domínio em IP (ex: 192.168.1.1)
3. **TCP Handshake**: Estabelece conexão com servidor
4. **TLS Handshake**: Se HTTPS, negocia criptografia
5. **HTTP Request**: Browser envia requisição
6. **Server Processing**: Servidor processa e prepara resposta
7. **HTTP Response**: Servidor retorna dados
8. **Rendering**: Browser renderiza HTML/CSS/JS
9. **Additional Requests**: Carrega imagens, CSS, JS externos

### 1.4 URLs e URIs

**Anatomia de uma URL**:
```
https://usuario:senha@www.exemplo.com:443/caminho/pagina.html?parametro=valor#secao

[protocolo]://[autenticação]@[host]:[porta][caminho][query string][fragmento]
```

- **Protocolo**: http, https, ftp, ws, wss
- **Host**: Nome do domínio ou IP
- **Porta**: 80 (HTTP), 443 (HTTPS), ou customizada
- **Caminho**: Localização do recurso
- **Query String**: Parâmetros `?chave=valor&outra=valor2`
- **Fragmento**: Âncora na página `#secao`

---

## 2. Servidores Web

### 2.1 Tipos de Servidores

**Apache HTTP Server**:
- Mais antigo e popular
- Modular e extensível
- Arquivo `.htaccess` para configuração
- Bom para hospedagem compartilhada

**Nginx**:
- Alto desempenho e baixo consumo de memória
- Excelente para servir conteúdo estático
- Proxy reverso e load balancer
- Arquitetura event-driven

**Node.js (Express)**:
- JavaScript no backend
- Non-blocking I/O
- Ideal para aplicações real-time
- NPM ecosystem

**Outros**:
- IIS (Microsoft)
- LiteSpeed
- Caddy (auto HTTPS)
- Tomcat (Java)

### 2.2 Hospedagem Web

**Shared Hosting**: Múltiplos sites no mesmo servidor (baixo custo, recursos limitados)

**VPS (Virtual Private Server)**: Servidor virtual dedicado (mais controle e recursos)

**Dedicated Server**: Servidor físico exclusivo (máximo controle e desempenho)

**Cloud Hosting**: Infraestrutura distribuída (escalável, paga pelo uso)
- AWS (EC2, S3, CloudFront)
- Google Cloud Platform
- Microsoft Azure
- DigitalOcean
- Vercel, Netlify (frontend)

### 2.3 Servidor Web Básico

**Python Simple Server**:
```bash
python -m http.server 8000
```

**Node.js com Express**:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

### 2.4 Conceitos de Servidor

**Load Balancing**: Distribuição de tráfego entre múltiplos servidores.

**Caching**: Armazenamento temporário para reduzir carga e latência.

**CDN (Content Delivery Network)**: Rede de servidores distribuídos geograficamente.

**Rate Limiting**: Controle de quantidade de requisições por tempo.

**SSL/TLS Certificates**: Criptografia de dados (Let's Encrypt gratuito).

---

## 3. Protocolo HTTP Profundo

### 3.1 Estrutura de uma Requisição HTTP

```
GET /index.html HTTP/1.1
Host: www.exemplo.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: pt-BR
Connection: keep-alive
Cookie: sessionId=abc123
```

**Linha de Requisição**: Método + Caminho + Versão
**Headers**: Metadados da requisição
**Body**: Dados enviados (POST, PUT, PATCH)

### 3.2 Métodos HTTP Completos

**GET**: Recuperar recurso (idempotente, cacheable)
```
GET /api/users/123
```

**POST**: Criar novo recurso (não idempotente)
```
POST /api/users
Content-Type: application/json

{"nome": "João", "email": "joao@email.com"}
```

**PUT**: Substituir recurso completamente (idempotente)
```
PUT /api/users/123
Content-Type: application/json

{"nome": "João Silva", "email": "joao@email.com", "idade": 30}
```

**PATCH**: Atualizar parcialmente (idempotente)
```
PATCH /api/users/123
Content-Type: application/json

{"idade": 31}
```

**DELETE**: Remover recurso (idempotente)
```
DELETE /api/users/123
```

**HEAD**: Igual GET mas sem body (metadata apenas)

**OPTIONS**: Retorna métodos permitidos (CORS preflight)

**CONNECT**: Estabelece túnel (usado em proxies)

**TRACE**: Debug (echo da requisição)

### 3.3 Status Codes HTTP

**1xx - Informational**:
- 100 Continue
- 101 Switching Protocols

**2xx - Success**:
- 200 OK: Sucesso geral
- 201 Created: Recurso criado
- 204 No Content: Sucesso sem conteúdo
- 206 Partial Content: Range request

**3xx - Redirection**:
- 301 Moved Permanently: Redirecionamento permanente
- 302 Found: Redirecionamento temporário
- 304 Not Modified: Cache válido
- 307 Temporary Redirect
- 308 Permanent Redirect

**4xx - Client Error**:
- 400 Bad Request: Sintaxe inválida
- 401 Unauthorized: Autenticação necessária
- 403 Forbidden: Sem permissão
- 404 Not Found: Recurso não existe
- 405 Method Not Allowed
- 409 Conflict: Conflito de estado
- 429 Too Many Requests: Rate limit

**5xx - Server Error**:
- 500 Internal Server Error: Erro genérico
- 502 Bad Gateway: Proxy/gateway inválido
- 503 Service Unavailable: Servidor sobrecarregado
- 504 Gateway Timeout

### 3.4 Headers Importantes

**Request Headers**:
```
Accept: text/html,application/json
Accept-Encoding: gzip, deflate, br
Accept-Language: pt-BR,en;q=0.9
Authorization: Bearer eyJhbGc...
Cache-Control: no-cache
Content-Type: application/json
Cookie: sessionId=abc123
Origin: https://exemplo.com
Referer: https://exemplo.com/pagina
User-Agent: Mozilla/5.0...
```

**Response Headers**:
```
Access-Control-Allow-Origin: *
Cache-Control: max-age=3600
Content-Encoding: gzip
Content-Length: 1234
Content-Type: application/json; charset=utf-8
ETag: "686897696a7c876b7e"
Expires: Wed, 21 Oct 2025 07:28:00 GMT
Last-Modified: Tue, 15 Nov 2024 12:45:26 GMT
Location: https://exemplo.com/novo-recurso
Set-Cookie: sessionId=xyz789; HttpOnly; Secure
X-Frame-Options: DENY
```

### 3.5 HTTPS e Segurança

**TLS/SSL**:
- Criptografia de dados em trânsito
- Autenticação do servidor
- Integridade dos dados

**Processo de Handshake**:
1. Cliente envia "hello" com protocolos suportados
2. Servidor responde com certificado
3. Cliente verifica certificado
4. Troca de chaves criptográficas
5. Comunicação criptografada estabelecida

**Certificados**:
- Let's Encrypt (gratuito, auto-renovável)
- Certificados comerciais (maior validação)
- Self-signed (apenas desenvolvimento)

### 3.6 HTTP/2 e HTTP/3

**HTTP/1.1**:
- Uma requisição por conexão
- Headers em texto plano
- Sem priorização

**HTTP/2**:
- Multiplexação: múltiplas requisições simultâneas
- Compressão de headers (HPACK)
- Server Push
- Priorização de streams
- Binário (não texto)

**HTTP/3**:
- Baseado em QUIC (UDP)
- Menor latência
- Melhor performance em redes instáveis
- Migração de conexão

### 3.7 REST API Principles

**Representational State Transfer**:

**Princípios**:
1. Cliente-Servidor
2. Stateless (sem estado)
3. Cacheable
4. Interface uniforme
5. Sistema em camadas
6. Código sob demanda (opcional)

**Boas Práticas**:
- Usar substantivos para recursos: `/users`, `/products`
- Plural para coleções: `/users` não `/user`
- Usar métodos HTTP corretamente
- Versionamento: `/api/v1/users`
- Filtros via query: `/users?status=active&limit=10`
- HATEOAS: incluir links relacionados
- Paginação: `?page=1&per_page=20`

**Exemplo RESTful**:
```
GET    /api/v1/users          # Listar usuários
GET    /api/v1/users/123      # Obter usuário específico
POST   /api/v1/users          # Criar usuário
PUT    /api/v1/users/123      # Atualizar completamente
PATCH  /api/v1/users/123      # Atualizar parcialmente
DELETE /api/v1/users/123      # Deletar usuário
```

---

## 4. DNS e Domínios

### 4.1 Sistema DNS

**Domain Name System**: Traduz nomes de domínio em endereços IP.

**Hierarquia**:
```
.                          # Root
  |
  |- .com                  # Top-Level Domain (TLD)
      |
      |- exemplo           # Second-Level Domain
          |
          |- www           # Subdomain
```

**Tipos de Registro DNS**:

**A**: Nome para IPv4
```
exemplo.com  →  192.168.1.1
```

**AAAA**: Nome para IPv6
```
exemplo.com  →  2001:0db8:85a3::8a2e:0370:7334
```

**CNAME**: Alias para outro domínio
```
www.exemplo.com  →  exemplo.com
```

**MX**: Mail exchange
```
exemplo.com  →  mail.exemplo.com  (prioridade: 10)
```

**TXT**: Texto arbitrário (SPF, DKIM, verificação)
```
exemplo.com  →  "v=spf1 include:_spf.google.com ~all"
```

**NS**: Name servers
```
exemplo.com  →  ns1.exemplo.com
```

### 4.2 Processo de Resolução DNS

1. **Browser Cache**: Verifica cache local
2. **OS Cache**: Verifica cache do sistema
3. **Router Cache**: Verifica cache do roteador
4. **ISP DNS**: Servidor DNS do provedor
5. **Root Server**: Retorna TLD server
6. **TLD Server**: Retorna authoritative server
7. **Authoritative Server**: Retorna IP final

**Tempo típico**: 20-120ms

### 4.3 Registradores de Domínio

- GoDaddy
- Namecheap
- Google Domains
- Cloudflare Registrar
- Registro.br (Brasil)

**Custos**: $10-50/ano dependendo do TLD

---

## 5. Git Completo

### 5.1 Conceitos Fundamentais

**Repository (Repo)**: Diretório com histórico completo do projeto.

**Working Directory**: Arquivos atuais no sistema de arquivos.

**Staging Area (Index)**: Área intermediária antes do commit.

**Commit**: Snapshot do projeto em um ponto no tempo.

**Branch**: Linha independente de desenvolvimento.

**HEAD**: Ponteiro para o commit atual.

**Remote**: Versão do repositório em servidor remoto.

**Origin**: Nome padrão do remote principal.

### 5.2 Estados de Arquivos

```
Untracked  →  [git add]  →  Staged  →  [git commit]  →  Committed
                ↑                                           |
                |_________________[modificar]_______________|
```

**Untracked**: Arquivo novo não rastreado
**Unmodified**: Arquivo rastreado sem mudanças
**Modified**: Arquivo modificado
**Staged**: Arquivo pronto para commit

### 5.3 Comandos Essenciais

**Configuração Inicial**:
```bash
# Configurar identidade
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Configurar editor padrão
git config --global core.editor "code --wait"

# Configurar linha de comando
git config --global init.defaultBranch main

# Ver configurações
git config --list
```

**Criar e Clonar**:
```bash
# Inicializar novo repositório
git init

# Clonar repositório existente
git clone https://github.com/usuario/repo.git

# Clonar branch específica
git clone -b develop https://github.com/usuario/repo.git
```

**Workflow Básico**:
```bash
# Ver status
git status
git status -s  # formato curto

# Adicionar arquivos
git add arquivo.txt
git add .  # todos os arquivos
git add *.js  # padrão
git ad


