<script setup>
import { ref, onMounted } from 'vue';
import { Carousel } from 'bootstrap';
import Cadastro from './Cadastro.vue';
import apiBase from "../services/api.js";
import { isAdmin } from "../services/auth.js";


const admin = isAdmin();


let id = ''

let inputFile = ref(null);

let atualizarBtn = true;

let myCarouselElement = ref(null);

let premios = ref([]);

let image = ref({});

let obj = ref({title: "", description: "", image: null});

function selecionarArquivo(event) {
    let arquivoSelecionado = event.target.files[0];
    obj.value.image = arquivoSelecionado;
    console.log("arquivo selecionado:",arquivoSelecionado);
}



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

async function cadastrar (event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", obj.value.image);

    const apiCloudinary = await fetch(`${apiBase}/premios/image`,{method: "POST", body: formData});
    image = await apiCloudinary.json();
    console.log("urlimage:",image);
    

    let postPremio = await fetch(`${apiBase}/premios`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: obj.value.title,
            description: obj.value.description,
            image: image.url
        })
    });
    
    let resPremio = await postPremio.json();

    premios.value.push(resPremio)

    atualizarBtn = true;

    obj.value.title = ""
    obj.value.description = ""
    obj.value.image = ""
}

async function atualizar () {
    let premioSelecionado = premios.value.find(p => p.id === id)
    let imagePremio = premioSelecionado.image
    const formDataImage = new FormData();
    const formData = new FormData();
    formData.append("title", obj.value.title);
    formData.append("description", obj.value.description);
    if (obj.value.image instanceof File){
        formDataImage.append("image", obj.value.image);
        const apiCloudinary = await fetch(`${apiBase}/premios/image`,{method: "POST", body: formDataImage});
        image = await apiCloudinary.json();
    } else {
        formData.append("image", imagePremio);
    }
    

    const premioAtualizado = await fetch(`${apiBase}/premios/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: obj.value.title,
            description: obj.value.description,
            image: image.url
        })
    })

    let data = await premioAtualizado.json()
    
    let indicePremio = premios.value.findIndex(objP => {
            return objP.id === data.id;
    })
    premios.value[indicePremio] = data;
   
    atualizarBtn = true;

    obj.value.title = ""
    obj.value.description = ""
    obj.value.image = ""  
}

async function deletar () {
    await fetch(`${apiBase}/premios/${id}`, {
       method: "DELETE",
       headers: {"Content-Type": "application/json"}
    })
    .then(req => req.json())
    .then( resp => {
        let indicePremio = premios.value.findIndex(objP => {
            return objP.id === resp.id;
        })
        premios.value.splice(indicePremio, 1)
    })

    atualizarBtn = true;

    obj.value.title = ""
    obj.value.description = ""
    obj.value.image = ""
}

function selecionar (i) {
    let p = premios.value[i];

    obj.value = {
        title: premios.value[i].title,
        description: premios.value[i].description,
        image: p.image
    }

    id = premios.value[i].id;

    atualizarBtn = false;
}
</script>

<template>
    <main class="mx-5 my-5">
        <section class="text-center container mb-0">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Veja o Carrousel de Premios</h1>
                    <p class="lead text-body-secondary">
                        Conheça os Premios que você pde Ganhar, Compre agora numa de nossas Lojas Participantes
                    </p>
                    <div class="d-flex flex-wrap gap-3 flex-md-nowrap">
                        <div class="control"><i class="bi bi-controller me-3 fs-3 text-warning">Comprar</i></div>
                        <div class="control"><i class="bi bi-controller me-3 fs-2 text-primary">Participar</i></div>
                        <div class="control"><i class="bi bi-controller me-3 fs-1 text-success">Ganhar</i></div>
                    </div>
                </div>
                <div class="control mt-3">          
                    <a href="#cadastro">
                        <button class="btn btn-primary">Cadastre-se Agora</button>
                    </a>        
                </div>
            </div>          
        </section>
        <div id="carouselAutoplaying" class="carousel slide mt-3" data-bs-ride="carousel" data-bs-interval="2000">
            <div class="carousel-inner">
                <div
                    v-for="(premio, i) in premios"
                    :key="premio.id"
                    :class="['carousel-item', { active: i === 0 }]"
                    >
                    <h2 class="text-center mb-4">{{ premio.title }}</h2>
                    <img
                        :src="premio.image"
                        class="d-block w-100 img-fluid rounded premio-img"
                        alt="Imagem do prêmio"
                    />
                    <p class="text-center my-4 lead">{{ premio.description }}</p>
                    <div class="text-center mt-3">
                    <button v-if="admin" class="btn btn-primary mt-1" @click="selecionar(i)">Selecionar Prêmio</button>
                </div>
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
        <form v-if="admin" class="row g-3 my-5" @submit="cadastrar" enctype="multipart/form-data">
            <div class="col-12">
                <input type="text" placeholder="Titulo" class="form-control" v-model="obj.title">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Descrição" class="form-control" v-model="obj.description">
            </div>
            <div class="col-12">
                <input type="file" :ref="inputFile" class="form-control" @change="selecionarArquivo">
            </div>
            <div class="col-12">
                <input v-if="atualizarBtn" type="submit" value="Cadastrar" class="btn btn-primary me-3">
                <input v-if="!atualizarBtn" type="button" value="Editar" class="btn btn-primary me-3" @click="atualizar">
                <input v-if="!atualizarBtn" type="button" value="Excluir" class="btn btn-primary" @click="deletar">
            </div>
        </form>
    </main>
    <Cadastro></Cadastro>
</template>

<style scoped>
.premio-img {
  max-height: 12.5rem;
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
