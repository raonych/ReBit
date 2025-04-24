# ReBit - Plataforma Sustentável de E-commerce de Eletrônicos ♻️

ReBit é uma plataforma de e-commerce voltada para a compra e venda de dispositivos eletrônicos novos, seminovos e danificados, como placas, consoles e hardwares em geral. Seu objetivo é incentivar o consumo responsável, a reutilização e a reciclagem de tecnologia, contribuindo com os Objetivos de Desenvolvimento Sustentável (ODS 12 e ODS 13).

A plataforma funciona no modelo C2C (Consumer to Consumer), onde os próprios usuários podem anunciar e adquirir produtos, sem controle de estoque centralizado.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**
- **Prisma ORM**
- **MySQL** (via XAMPP)
- **Zod** (validação)
- **Bcrypt** (hash de senhas)
- **JWT** (autenticação)
- **Tailwind CSS** (estilização)

---

## 🧑‍💻 Como rodar o projeto localmente

### 1. 🧬 Clone o repositório

```bash
git clone https://github.com/seu-usuario/rebit.git
cd rebit
```

---

### 2. 🔑 Crie o arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:@localhost:3306/rebit"
JWT_SECRET="uma_chave_secreta_segura"
```

> ✅ Certifique-se de que o **XAMPP** está rodando com o MySQL na porta 3306.  
> ✅ Crie o banco `rebit` no phpMyAdmin ou MysqlWorkbench antes de rodar o projeto.

---

### 3. 📦 Instale as dependências

```bash
npm install
```

---

### 4. 🔧 Gere os arquivos do Prisma

```bash
npx prisma generate
```

---

### 5. 📂 Crie a estrutura do banco de dados

```bash
npx prisma db push
```

---

### 6. 🌱 Popule o banco com dados iniciais

```bash
npx prisma db seed
```

> O seed cria:
> - 1 vendedor (usuário com ID 1)
> - 3 compradores
> - 10 categorias
> - 10 produtos
> - 3 compras (com diferentes status)
> - avaliações, conversas, mensagens, favoritos

---

### 7. 🚀 Inicie o servidor de desenvolvimento

```bash
npm run dev
```

> A aplicação estará disponível em `http://localhost:3000`
