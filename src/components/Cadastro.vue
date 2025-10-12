<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import apiBase from "../services/api.js";


let participantes = ref([]);

let obj = ref({nome: "", idade: 0, email: "", whatsapp: 0, cupom_fiscal: "", cpf: 0});

async function cadastrar (event) {
    event.preventDefault()
    await fetch(`${apiBase}/participantes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    })
    .then(req => req.json())
    .then(resp => {
        participantes.value.push(resp)
    })

    Swal.fire("Sucesso!", "Cadastro realizado com sucesso!", "success")

    obj.value.nome = ""
    obj.value.idade = "" 
    obj.value.email = "" 
    obj.value.whatsapp = "" 
    obj.value.cupom_fiscal = ""
    obj.value.cpf = "" 
}
</script>

<template>
<main id="cadastro" class="mx-5">
    <div>
        <div class="text-center"> 
            <h2 class="h2">Preencha o Formulario de Cadastro</h2> 
            <p class="lead">Suas informações ficaram guardadas de maneira sigilosa em nossos banco de dados, respeitando as regras, normas e leis de Proteção de Dados</p> 
        </div>
        <form class="row g-3 my-5" @submit="cadastrar">
            <div class="col-12">
                <input type="text" placeholder="Nome Completo" class="form-control" v-model="obj.nome">
            </div>
            <div class="col-12">
                <input type="number" placeholder="Idade" class="form-control" v-model="obj.idade">
            </div>
            <div class="col-12">
                <input type="email" placeholder="E-mail" class="form-control" v-model="obj.email">
            </div>
            <div class="col-12">
                <input type="tel" placeholder="WhatsApp" class="form-control" v-model="obj.whatsapp">
            </div>
            <div class="col-12">
                <input type="text" placeholder="Cupom-Fiscal" class="form-control" v-model="obj.cupom_fiscal">
            </div>
            <div class="col-12">
                <input type="number" placeholder="CPF" class="form-control" v-model="obj.cpf">
            </div>
            <div class="col-12 text-center">
                <input type="submit" value="Cadastrar" class="btn btn-primary">
            </div>
        </form>
    </div>
</main>
</template>
