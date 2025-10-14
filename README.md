# 🎨 Polgo Project - Frontend

Frontend da aplicação **Polgo Project**, desenvolvido em **Vue 3 + Vite** com **Bootstrap 5**.  
A aplicação é uma **Landing Page interativa e responsiva** conectada ao backend via API REST.

## 🚀 Tecnologias Utilizadas

- **Vue 3 (Composition API)**
- **Vite** (ambiente de build e desenvolvimento)
- **Vue Router** (navegação entre rotas)
- **Bootstrap 5** (estilo e componentes responsivos)
- **Axios** (requisições HTTP)
- **SweetAlert2** (alertas e feedbacks)
- **Leaflet.js** (mapas interativos)
- **Netlify** (deploy do frontend)


## 📂 Estrutura do Projeto

PolgoProject/
│
├── src/
│ ├── assets/ # Imagens e ícones
│ ├── components/ # Componentes reutilizáveis
│ │ ├── Header.vue
│ │ ├── Footer.vue
│ │ ├── Mapa.vue
│ │ └── CardPremio.vue
│ │
│ ├── pages/ # Páginas principais
│ │ ├── Home.vue
│ │ ├── Premios.vue
│ │ ├── Lojas.vue
│ │ ├── Ganhadores.vue
│ │ ├── Faq.vue
│ │ ├── ComoParticipar.vue
│ │ ├── Login.vue
│ │ └── Cadastro.vue
│ │
│ ├── router/
│ │ └── index.js # Configuração do Vue Router
│ │
│ ├── App.vue # Componente principal
│ └── main.js # Ponto de entrada da aplicação
│
├── public/
│ └── imagens locais
│
└── package.json

## ⚙️ Configuração do Projeto

### Instalar dependências:
npm install

### Executar o servidor local:
npm run dev

### O projeto ficará disponível em:
http://localhost:5173

<a href="https://polgoproject.netlify.app/">Acesse a Aplicação</a>
