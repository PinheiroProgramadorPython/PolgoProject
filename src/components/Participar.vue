<script setup>
import { ref, onMounted } from 'vue';
import Cadastro from './Cadastro.vue';
import apiBase from "../services/api.js";
import { isAdmin } from "../services/auth.js";


const admin = isAdmin();

let atualizarBtn = true;

let id = "";

let regras = ref([]);

let obj = ref({title: "", description: ""});

onMounted(async () => {
    await fetch(`${apiBase}/regras`)
    .then(req => req.json())
    .then(resp => regras.value = resp)
});

async function cadastrar (event) {
    event.preventDefault()
    await fetch(`${apiBase}/regras`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })
    .then(req => req.json())
    .then(resp => {
        regras.value.push(resp)
    })

    atualizarBtn = true;

    obj.value.title = ""
    obj.value.description = ""  
}

async function atualizar () {
    const resp = await fetch(`${apiBase}/regras/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })

    let data = await resp.json()
    
    let indiceRegra = regras.value.findIndex(objP => {
            return objP.id === data.id;
    })
    regras.value[indiceRegra] = data;
   
    atualizarBtn = true;

    obj.value.title = ""
    obj.value.description = ""
    
}

async function deletar () {
    await fetch(`${apiBase}/regras/${id}`, {
       method: "DELETE",
       headers: {"Content-Type": "application/json"}
    })
    .then(req => req.json())
    .then( resp => {
        let indiceRegra = regras.value.findIndex(objP => {
            return objP.id === resp.id;
        })
        regras.value.splice(indiceRegra, 1)
    })

    atualizarBtn = true;

    obj.value.title = ""
    obj.value.description = ""
}

function selecionar (i) {
    obj.value = {
        title: regras.value[i].title,
        description: regras.value[i].description
    }

    id = regras.value[i].id;

    atualizarBtn = false;
}
</script>

<template>
<main class="mx-5 my-5">
    <section class="text-center container">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Saiba como Participar e Ganhar</h1>
                <p class="lead text-body-secondary">
                    Conheça todas as Regras e Seja Vc o Proximo Ganhador
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
    
    <div class="album py-5 mt-3 bg-body-tertiary">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div class="col" v-for="(regra, i) in regras">
                    <div class="card shadow-sm">
                        <img src="" alt="">
                        <div class="card-body">
                            <h2 class="card-text">{{ regra.title }}</h2>
                            <p>{{ regra.description }}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <i class="bi bi-controller fs-1"></i>
                                </div>
                                <small class="text-warning fs-6">Regra da Promoção</small>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <button v-if="admin" class="btn btn-primary mt-1" @click="selecionar(i)">Selecionar Regra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form v-if="admin" class="row g-3 my-5" @submit="cadastrar">
        <div class="col-12">
            <input type="text" placeholder="Regra" class="form-control" v-model="obj.title">
        </div>
        <div class="col-12">
            <input type="text" placeholder="Descrição" class="form-control" v-model="obj.description">
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
.card:hover{
    transform: scale(1.1, 1.1);
    transition: 0.5s;
}

.control:hover{
    transform: scale(1.2, 1.2);
    transition: 0.5s;
}
</style>
