<script setup>
import { onMounted, ref } from 'vue';
import Cadastro from './Cadastro.vue';
import MapaLoja from './MapaLoja.vue';
import apiBase from "../services/api.js";
import { isAdmin } from "../services/auth.js";


const admin = isAdmin();

let lojas = ref([]);

let obj = ref({nome: "", estado: "", cidade: "", endereco: ""});

let atualizarBtn = true;

let id = "";

onMounted(async () => {
    await fetch(`${apiBase}/lojas`)
    .then(req => req.json())
    .then(resp => lojas.value = resp)
});

async function cadastrar (event) {
    event.preventDefault()
    await fetch(`${apiBase}/lojas`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })
    .then(req => req.json())
    .then(resp => {
        lojas.value.push(resp)
    })
    atualizarBtn = true;

    obj.value.nome = ""
    obj.value.estado = ""
    obj.value.cidade = ""
    obj.value.endereco = ""
}

async function atualizar () {
    const resp = await fetch(`${apiBase}/lojas/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })

    let data = await resp.json()
    
    let indiceLoja = lojas.value.findIndex(objP => {
            return objP.id === data.id;
    })
    lojas.value[indiceLoja] = data;
   
    atualizarBtn = true;

    obj.value.nome = ""
    obj.value.estado = ""
    obj.value.cidade = ""
    obj.value.endereco = ""
}

async function deletar () {
    await fetch(`${apiBase}/lojas/${id}`, {
       method: "DELETE",
       headers: {"Content-Type": "application/json"}
    })
    .then(req => req.json())
    .then( resp => {
        let indiceLoja = lojas.value.findIndex(objP => {
            return objP.id === resp.id;
        })
        lojas.value.splice(indiceLoja, 1)
    })
    atualizarBtn = true;

    obj.value.nome = ""
    obj.value.estado = ""
    obj.value.cidade = ""
    obj.value.endereco = ""
}

function selecionar (i) {
    obj.value = {
        nome: lojas.value[i].nome,
        estado: lojas.value[i].estado,
        cidade: lojas.value[i].cidade,
        endereco: lojas.value[i].endereco
    }
    id = lojas.value[i].id
    atualizarBtn = false;
}
</script>

<template>
    <main class="mx-5 my-5">
        <section class="text-center container mb-3">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Lojas Participantes</h1>
                    <p class="lead text-body-secondary">
                        Conheça as Lojas Participantes, Selecione uma Loja e Veja no mapa a Localização mais perto de Você
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
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(loja, i) in lojas">
                <div class="card p-3 mt-4">
                    <h2 class="card-title text-warning">{{ loja.nome }}</h2>
                    <p class="card-text">Estado: {{ loja.estado }}</p>
                    <p class="card-text">Cidade: {{ loja.cidade }}</p>
                    <p class="card-text">Endereço: {{ loja.endereco }}</p>
                    <p><i class="bi bi-shop text-warning fs-1"></i></p>
                </div>
                <button v-if="admin" class="btn btn-primary mt-1" @click="selecionar(i)">Selecionar Loja</button>
            </div>
        </div>
        <form v-if="admin" class="row g-3 my-5" @submit="cadastrar">
            <div class="col-12">
                <input type="text" placeholder="Nome da Loja" class="form-control" v-model="obj.nome">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Estado" class="form-control" v-model="obj.estado">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Cidade" class="form-control" v-model="obj.cidade">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Endereço" class="form-control" v-model="obj.endereco">
            </div>
            <div class="col-12">
                <input v-if="atualizarBtn" type="submit" value="Cadastrar" class="btn btn-primary me-3">
                <input v-if="!atualizarBtn" type="button" value="Editar" class="btn btn-primary me-3" @click="atualizar">
                <input v-if="!atualizarBtn" type="button" value="Excluir" class="btn btn-primary" @click="deletar">
            </div>
        </form>
    </main>
    <MapaLoja :lojas="lojas"/>
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
