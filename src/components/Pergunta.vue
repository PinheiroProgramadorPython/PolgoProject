<script setup>
import { onMounted, ref } from 'vue';
import Cadastro from './Cadastro.vue';
import apiBase from "../services/api.js";


let id = ""

let atualizarBtn = ref(true);

let perguntas = ref([]);

let obj = ref({pergunta: "", resposta: ""});

onMounted(async () => {
    await fetch(`${apiBase}/perguntas`)
    .then(req => req.json())
    .then(resp => perguntas.value = resp)
});

async function cadastrar (event) {
    event.preventDefault()
    await fetch(`${apiBase}/perguntas`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })
    .then(req => req.json())
    .then(resp => {
        perguntas.value.push(resp)
    })

    atualizarBtn.value = true;

    obj.value.pergunta = ""
    obj.value.resposta = ""  
}

async function atualizar () {
    const resp = await fetch(`${apiBase}/perguntas/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })

    let data = await resp.json()
    
    let indicePergunta = perguntas.value.findIndex(objP => {
            return objP.id === data.id;
    })
    perguntas.value[indicePergunta] = data;
   
    atualizarBtn.value = true;

    obj.value.pergunta = ""
    obj.value.resposta = ""
    
}

async function deletar () {
    await fetch(`${apiBase}/perguntas/${id}`, {
       method: "DELETE",
       headers: {"Content-Type": "application/json"}
    })
    .then(req => req.json())
    .then( resp => {
        let indicePergunta = perguntas.value.findIndex(objP => {
            return objP.id === resp.id;
        })
        perguntas.value.splice(indicePergunta, 1)
    })

    atualizarBtn.value = true;

    obj.value.pergunta = ""
    obj.value.resposta = ""
}

function selecionar (i) {
    obj.value = {
        pergunta: perguntas.value[i].pergunta,
        resposta: perguntas.value[i].resposta
    }

    id = perguntas.value[i].id;

    atualizarBtn.value = false;
}
</script>

<template>
<main class="mx-5 my-5">
    <section class="text-center container">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Perguntas e Respostas</h1>
                <p class="lead text-body-secondary">
                    Veja as Respostas para as Perguntas mais Frequentes
                </p>
                <div class="d-flex gap-4">
                    <div class="control"><i class="bi bi-controller me-3 fs-3 text-warning">Comprar</i></div>
                    <div class="control"><i class="bi bi-controller me-3 fs-2 text-primary">Participar</i></div>
                    <div class="control"><i class="bi bi-controller me-3 fs-1 text-success">Ganhar</i></div>
                </div>
            </div>
        </div>
        <div class="control">          
            <a href="#cadastro">
                <button class="btn btn-primary">Cadastre-se Agora</button>
            </a>        
        </div>
    </section>
    <div class="accordion accordion-flush mt-3" id="accordion">
        <div class="accordion-item mb-3 rounded-3" v-for="(pergunta, i) in perguntas">
            <h2 class="accordion-header">             
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${i}`" aria-expanded="false" :aria-controls="`collapse${i}`">
                    {{ pergunta.pergunta }}
                </button>
            </h2>
            <div :id="`collapse${i}`" class="accordion-collapse collapse" data-bs-parent="#accordion">
                <div class="accordion-body">
                    <strong>{{ pergunta.pergunta }}</strong><br>{{ pergunta.resposta }}
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn-primary mt-1" @click="selecionar(i)">Selecionar Pergunta</button>
                </div>
            </div>
        </div>
    </div>
    
    <form class="row g-3 my-5" @submit="cadastrar">
        <div class="col-12">
            <input type="text" placeholder="Pergunta" class="form-control" v-model="obj.pergunta">
        </div>
        <div class="col-12">
            <input type="text" placeholder="Resposta" class="form-control" v-model="obj.resposta">
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

<style>
.accordion-item:hover{
    transform: scale(1.1, 1.1);
    transition: 0.5s;
}

.control:hover{
    transform: scale(1.2, 1.2);
    transition: 0.5s;
}
</style>
