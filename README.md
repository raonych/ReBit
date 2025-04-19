# ReBit - Plataforma Sustentável de E-commerce de Eletrônicos ♻️

ReBit é uma plataforma de e-commerce voltada para a compra e venda de dispositivos eletrônicos novos, seminovos e danificados, como placas, consoles e hardwares em geral. Seu objetivo é incentivar o consumo responsável, a reutilização e a reciclagem de tecnologia, contribuindo com os Objetivos de Desenvolvimento Sustentável (ODS 12 e ODS 13).

A plataforma funciona no modelo C2C (Consumer to Consumer), onde os próprios usuários podem anunciar e adquirir produtos, sem controle de estoque centralizado.

---

## 📚 Endpoints da API

### 📁 USUÁRIO

- [✅] POST `/api/login`
- [✅] POST `/api/usuarios/cadastro`
- [🔒] GET `/api/usuarios/me`
- [🔒] PUT `/api/usuarios/atualizar`
- [🔒] DELETE `/api/usuarios/excluir`

### 🏠 ENDEREÇO

- [🔒] GET `/api/enderecos`
- [🔒 ✅] POST `/api/enderecos`
- [🔒] PUT `/api/enderecos/:id`
- [🔒] DELETE `/api/enderecos/:id`

### 🛍️ PRODUTO

- [🔒 ✅] POST `/api/produtos/criar`
- [ ] GET `/api/produtos`
- [ ] GET `/api/produtos/:id`
- [ ] GET `/api/produtos/usuario/:id`
- [🔒] PUT `/api/produtos/:id`
- [🔒] DELETE `/api/produtos/:id`

### 🧾 COMPRA

- [🔒] POST `/api/compras`
- [🔒] GET `/api/compras`
- [🔒] GET `/api/compras/:id`
- [🔒] PUT `/api/compras/:id/status`

### 📂 CATEGORIA

- [ ] GET `/api/categorias`
- [🔒] POST `/api/categorias` (admin?)
- [🔒] PUT `/api/categorias/:id` (admin?)
- [🔒] DELETE `/api/categorias/:id` (admin?)

### ⭐ AVALIAÇÃO

- [🔒] POST `/api/avaliacoes`
- [ ] GET `/api/avaliacoes/:usuarioId`

### ❤️ FAVORITOS

- [🔒] POST `/api/favoritos`
- [🔒] GET `/api/favoritos`
- [🔒] DELETE `/api/favoritos/:id`
