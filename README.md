# 💻 Gestabook

**Gestabook** é uma aplicação web moderna para **gestão, controle e inventário de equipamentos de TI**. O sistema permite o gerenciamento de carrinhos de recarga, controle do estado de conservação e status de manutenção.

---

## 🚀 Tecnologias Utilizadas

* **[Vue 3](https://vuejs.org/):** Framework JavaScript progressivo utilizando a API `<script setup>` com **TypeScript**.
* **[Vite](https://vitejs.dev/):** Build tool ultra-rápida configurada com suporte a PWA (`vite-plugin-pwa`).
* **[Pinia](https://pinia.vuejs.org/):** Gerenciamento de estado reativo centralizado.
* **[Vue Router](https://router.vuejs.org/):** Roteamento Single Page Application (SPA) com guias de navegação (guards).
* **[Firebase](https://firebase.google.com/):** 
  * **Authentication:** Autenticação via conta Google.
  * **Firestore Database:** Armazenamento em tempo real para inventário e whitelist.
* **Material Design 3 (M3):** Estilização customizada seguindo as diretrizes do Material 3.

---

## ✨ Funcionalidades

- **🔐 Autenticação & Permissões (RBAC):**
  - Login seguro via Google Account.
  - Verificação de papel (Role) por e-mail através de uma lista de acesso (Whitelist no Firestore):
    - **Admin:** Acesso total a painéis de controle, gerenciamento de usuários e controle de reservas.
    - **User:** Acesso à visualização, consulta de inventário e reservas.
    - **Denied:** Bloqueio automático para e-mails não autorizados.

- **📦 Gerenciamento de Equipamentos:**
  - Cadastro completo de notebooks.
  - Filtros interativos por **Carrinhos de Recarga** e **Modelos Frequentes**.
  - Marcação visual de conservação (*Excelente*, *Boa*, *Ruim*) e controle de equipamentos em **Manutenção**.

- **📱 Interface Responsiva & PWA:**
  - Layout otimizado para desktop e dispositivos móveis com barra de navegação inferior (Bottom Bar).
  - Suporte a instalação como Progressive Web App (PWA).

---

## 📂 Estrutura do Projeto

```text
gestabook/
├── public/                 # Arquivos públicos e ícones PWA
├── src/
│   ├── assets/             # Logos e recursos estáticos
│   ├── components/         # Componentes M3 reutilizáveis (Header, Bottombar, Modais, Cards)
│   ├── config/             # Configuração e inicialização do Firebase (`firebaseConfig.ts`)
│   ├── pages/              # Páginas e views (Login, Dashboard, Listagens, Admin)
│   │   ├── admin/          # Painel e gestão de reservas do administrador
│   │   └── equip/          # Formuários e listagem de equipamentos/notebooks
│   ├── router/             # Configuração de rotas e guias de acesso (navigation guards)
│   ├── stores/             # Stores Pinia (Autenticação e controle de sessão)
│   ├── types/              # Definições de tipos TypeScript
│   ├── material3.css       # Sistema de design Material Design 3 em CSS
│   ├── App.vue             # Componente raiz
│   └── main.ts             # Ponto de entrada da aplicação
├── package.json
└── vite.config.ts
```

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* `npm` ou `yarn`

### 1. Clonar o Repositório e Instalar Dependências

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/gestabook.git

# Acesse a pasta do projeto
cd gestabook

# Instale as dependências
npm install
```

### 2. Configurar o Firebase

Certifique-se de que o arquivo [`src/config/firebaseConfig.ts`](file:///Users/sweden/Ignite/gestabook/src/config/firebaseConfig.ts) contenha as chaves de API válidas do seu projeto Firebase (Authentication & Firestore).

### 3. Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse a aplicação no navegador em `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

* **`npm run dev`**: Inicia o servidor de desenvolvimento Vite.
* **`npm run build`**: Executa a checagem de tipos com `vue-tsc` e gera a build de produção na pasta `dist`.
* **`npm run preview`**: Inicia um servidor local para visualizar a build de produção.
* **`npm run deploy`**: Faz o deploy automático da pasta `dist` para o GitHub Pages.

