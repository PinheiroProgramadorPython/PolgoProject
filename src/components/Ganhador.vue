<script setup>
import { onMounted, ref } from 'vue';
import Cadastro from './Cadastro.vue';
import MapaGanhador from './MapaGanhador.vue';
import apiBase from "../services/api.js";
import { isAdmin } from "../services/auth.js";


const admin = isAdmin();

let ganhadores = ref([]);

let premios = ref([]);

let obj = ref({nome: "", estado: "", cidade: "", premio: ""});


let atualizarBtn = true;

let id = "";

const otimizarImagem = (url) => {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;

  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
};


onMounted(async () => {
    const reqGanhadores = await fetch(`${apiBase}/ganhadores`);
    const ganhadoresData = await reqGanhadores.json();

    const reqPremios = await fetch(`${apiBase}/premios`);
    const premiosData = await reqPremios.json();
    premios.value = premiosData;
  
    ganhadores.value = ganhadoresData.map(g => {
        let premioRelacionado = premiosData.find(p => p.title === g.premio); 
        console.log("Premio Selecionado:",premioRelacionado.image);
        return { ...g, premioRelacionado }
    });
});


async function cadastrar (event) {
    event.preventDefault()
    await fetch(`${apiBase}/ganhadores`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })
    .then(req => req.json())
    .then(resp => ganhadores.value.push(resp));

    atualizarBtn = true;

    obj.value.nome = ""
    obj.value.estado = ""
    obj.value.cidade = ""
    obj.value.premio = ""
}

async function atualizar () {
    const resp = await fetch(`${apiBase}/ganhadores/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })

    let data = await resp.json()
    
    let indiceGanhador = ganhadores.value.findIndex(objP => {
            return objP.id === data.id;
    })
    ganhadores.value[indiceGanhador] = data;
   
    atualizarBtn = true;

    obj.value.nome = ""
    obj.value.estado = ""
    obj.value.cidade = ""
    obj.value.premio = ""
}

async function deletar () {
    await fetch(`${apiBase}/ganhadores/${id}`, {
       method: "DELETE",
       headers: {"Content-Type": "application/json"}
    })
    .then(req => req.json())
    .then( resp => {
        let indiceGanhador = ganhadores.value.findIndex(objP => {
            return objP.id === resp.id;
        })
        ganhadores.value.splice(indiceGanhador, 1)
    })
    atualizarBtn = true;

    obj.value.nome = ""
    obj.value.estado = ""
    obj.value.cidade = ""
    obj.value.premio = ""
}

function selecionar (i) {
    obj.value = {
        nome: ganhadores.value[i].nome,
        estado: ganhadores.value[i].estado,
        cidade: ganhadores.value[i].cidade,
        premio: ganhadores.value[i].premio
    }
    id = ganhadores.value[i].id;
    atualizarBtn = false;
}
</script>

<template>
    <main class="mx-5 my-5">
        <section class="text-center container">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Veja os Ganhadores</h1>
                    <p class="lead text-body-secondary">
                        Conheça os Ganhadores , quem Sabe Você é um Deles
                    </p>
                    <div class="d-flex flex-wrap gap-3">
                        <div class="control"><i class="bi bi-controller me-3 fs-3 text-warning">Comprar</i></div>
                        <div class="control"><i class="bi bi-controller me-3 fs-2 text-primary">Participar</i></div>
                        <div class="control"><i class="bi bi-controller me-3 fs-1 text-success">Ganhar</i></div>
                    </div>
                </div>
            </div>
            <div class="control mt-3">          
                <a href="#cadastro">
                    <button class="btn btn-primary">Cadastre-se Agora</button>
                </a>        
            </div>
        </section>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(ganhador, i) in ganhadores">
                <div class="card p-3 mt-4">
                    <h2 class="card-title">{{ ganhador.nome }}</h2>
                    <p class="card-text">Estado: {{ ganhador.estado }}</p>
                    <p class="card-text">Cidade: {{ ganhador.cidade }}</p>
                    <p class="card-text">Premio: {{ ganhador.premio }}</p>
                    <p class="card-text">Data: {{ new Date(ganhador.data).toLocaleDateString("pt-BR") }}</p>
                    <div>
                        <img class="img-fluid rounded" :src="ganhador.premioRelacionado.image" :alt="ganhador.premio">
                    </div>                 
                </div>
                <button v-if="admin" class="btn btn-primary mt-3" @click="selecionar(i)">selecionar</button>
            </div>
        </div>
        <form v-if="admin" class="row g-3 my-5" @submit="cadastrar">
            <div class="col-12">
                <input type="text" placeholder="Nome do Ganhador" class="form-control" v-model="obj.nome">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Estado" class="form-control" v-model="obj.estado">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Cidade" class="form-control" v-model="obj.cidade">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Premio" class="form-control" v-model="obj.premio">
            </div>
            <div class="col-12">
                <input v-if="atualizarBtn" type="submit" value="Cadastrar" class="btn btn-primary me-3">
                <input v-if="!atualizarBtn" type="button" value="Editar" class="btn btn-primary me-3" @click="atualizar">
                <input v-if="!atualizarBtn" type="button" value="Excluir" class="btn btn-primary" @click="deletar">
            </div>
        </form>
    </main>
    <MapaGanhador></MapaGanhador>
    <Cadastro></Cadastro>
</template>

<style scoped>
.card:hover{
    transform: scale(1.15, 1.15);
    transition: 0.5s;
    cursor: pointer;
}

.control:hover{
    transform: scale(1.2, 1.2);
    transition: 0.5s;
}
</style>
