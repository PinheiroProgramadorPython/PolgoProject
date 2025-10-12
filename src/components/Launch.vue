<script setup>
import { ref, onMounted } from 'vue';
import { Carousel } from 'bootstrap';
import Cadastro from './Cadastro.vue';
import apiBase from "../services/api.js";


let premios = ref([]);

let myCarouselElement = ref(null)

onMounted( async () => {
    await fetch(`${apiBase}/premios`)
    .then(req => req.json())
    .then(resp => premios.value = resp)

    myCarouselElement = document.querySelector('#carouselAutoplaying');
  
    if (myCarouselElement) {
        const carousel = new Carousel(myCarouselElement, {
        interval: 2000, 
        ride: 'carousel' 
        });
    }
});
</script>

<template>
<main class="mx-5 my-5">
    <div class="px-4 text-center">
        <h1 class="display-5 fw-bold text-body-emphasis">
            <font dir="auto" style="vertical-align: inherit;">
                <font dir="auto" style="vertical-align: inherit;">
                    Nosso Principal Objetivo
                </font>
            </font>
        </h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
                <font dir="auto" style="vertical-align: inherit;">
                    <font dir="auto" style="vertical-align: inherit;">
                        Reunir Pessoas e Empresas num só Objetivo<br>A magia que traz Felicidade
                    </font>
                </font>
            </p>
            <div class="d-flex gap-4">
                <div class="control"><i class="bi bi-controller me-3 fs-3 text-warning">Comprar</i></div>
                <div class="control"><i class="bi bi-controller me-3 fs-2 text-primary">Participar</i></div>
                <div class="control"><i class="bi bi-controller me-3 fs-1 text-success">Ganhar</i></div>
            </div>
        </div>
        <div class="control">          
            <a href="#cadastro">
                <button class="btn btn-primary">Cadastre-se Agora</button>
            </a>        
        </div>
    </div>  
    <div class="mt-3">
        <h2 class="text-center">
            <font dir="auto" style="vertical-align: inherit;">
                <font dir="auto" style="vertical-align: inherit;">
                    Veja os Premios que Você poderá Ganhar!
                </font>
            </font>
        </h2>
    </div>
    <div id="carouselAutoplaying" class="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="2000">
        <div class="carousel-inner">
            <div
                v-for="(premio, i) in premios"
                :key="premio.id"
                :class="['carousel-item', { active: i === 0 }]"
                >
                <h3 class="text-center mb-2">{{ premio.title }}</h3>
                <img
                    :src="premio.image"
                    class="d-block w-100 img-fluid rounded premio-img"
                    alt="Imagem do prêmio"
                />
                <p class="text-center my-4 lead">{{ premio.description }}</p>
            </div>           
        </div>
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselAutoplaying"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselAutoplaying"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próximo</span>
        </button>
    </div>
</main>
<Cadastro></Cadastro>
</template>

<style scoped>
.premio-img {
  max-height: 12.5rem; /* ajuste o tamanho que quiser */
  max-width: 20rem;
  margin: 0 auto;
}

.premio-img:hover{
    transform: scale(1.1 ,1.1);
    transition: 0.5s;
    cursor: pointer;
}

.control:hover{
    transform: scale(1.2, 1.2);
    transition: 0.5s;
}
</style>
