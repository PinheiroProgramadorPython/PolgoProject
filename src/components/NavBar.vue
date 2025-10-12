<script setup>
import { Collapse } from 'bootstrap';
import { ref, onMounted, onUnmounted } from 'vue';


const navRef = ref(null);

const navbarCollapseRef = ref(null);

let bsCollapse = null;

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
      <div class="botoes">
        <a href="#cadastro" @click="closeMenu">
          <button class="btn btn-warning" type="button">Cadastre-se</button>
        </a>
        <a href="#cadastro" @click="closeMenu">
          <button class="btn btn-warning" type="button">Login</button>
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
</style>
