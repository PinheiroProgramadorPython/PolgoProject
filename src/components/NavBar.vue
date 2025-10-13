<script setup>
import { Collapse } from 'bootstrap';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { logout, token, user } from "../services/auth.js";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';


const router = useRouter();

const usuario = user;

const usuarioLogado = computed(() => !!token.value);

const navRef = ref(null);

const navbarCollapseRef = ref(null);

let bsCollapse = null;

function sair () {
  Swal.fire("Saindo!", "Vc saiu da sua Conta!", "info");
  logout()
  router.push("/login");
}

onMounted(() => {
  bsCollapse = new Collapse(navbarCollapseRef.value, {toggle: false});
  document.addEventListener('mousedown', handleClickOutside);
});

const toggleMenu = () => {
  bsCollapse.toggle()
}

const closeMenu = () => {
  if (navbarCollapseRef.value.classList.contains('show')) {
    bsCollapse.hide()
  }
}

const handleClickOutside = (event) => {
  if (navRef.value && !navRef.value.contains(event.target)) {
    closeMenu() 
  }
}

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top mx-5 rounded-3" ref="navRef">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="navbarCollapseRef">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link navbar-brand" @click="closeMenu">
            <RouterLink to="/">Home</RouterLink>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link navbar-brand" @click="closeMenu">
            <RouterLink to="/premios">Prêmios</RouterLink>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link navbar-brand" @click="closeMenu">
            <RouterLink to="/ganhadores">Ganhadores</RouterLink>
          </a>
        </li>
        <li>
            <a class="nav-link navbar-brand" @click="closeMenu">
              <RouterLink to="/lojas">Lojas</RouterLink>
            </a>
        </li>
        <li>
            <a class="nav-link navbar-brand" @click="closeMenu">
              <RouterLink to="/comoparticipar">Como Participar</RouterLink>
            </a>
        </li>
        <li>
            <a class="nav-link navbar-brand" @click="closeMenu">
              <RouterLink to="/faq">Faq</RouterLink>
            </a>
        </li>
      </ul>
      <div v-if="usuarioLogado" class="container ms-5 text-warning saudacao">
        <h1> Olá {{ usuario.name }}</h1>
      </div>
      <div class="botoes">
        <a v-if="!usuarioLogado" @click="closeMenu">
          <RouterLink to="/criarconta" class="btn btn-warning">Criar Conta</RouterLink>
        </a>
        <a v-if="!usuarioLogado" @click="closeMenu">
          <RouterLink to="/login" class="btn btn-warning">Login</RouterLink>
        </a>
        <a v-if="usuarioLogado" @click="closeMenu">
          <button class="btn btn-warning" @click="sair">Sair</button>
        </a>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.botoes{
    display: flex;
    gap: 1rem;
}

.router-link-active {
  font-weight: bold;
  color: #0d6efd !important; /* azul bootstrap */ 
}

a{
  text-decoration: none;
}

a:hover{
  transform: scale(1.1, 1.1);
  transition: 0.5s;
  font-weight: bold;
  color: #0d6efd !important;
}

.btn:hover{
  transform: scale(1.1, 1.1);
  transition: 0.5s;
}

.saudacao:hover{
  transform: scale(1.2, 1.2);
  transition: 0.5s;
}
</style>
