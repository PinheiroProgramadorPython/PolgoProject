<script setup>
import { ref } from 'vue';
import apiBase from '../services/api';
import Swal from 'sweetalert2';

let usuarios = ref([]);

const obj = ref({name: "", lastname: "", email: "", whatsapp: 0, senha: "", tokenAdmin: ""});

async function cadastrar (event) {
    event.preventDefault();
    let criarConta = await fetch(`${apiBase}/usuarios/criarConta`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    });
    let dados = await criarConta.json();
    usuarios.value.push(dados);

    if(dados){Swal.fire("Sucesso!", "Conta Criada com sucesso!", "success");}

    obj.value.name = ''
    obj.value.lastname = ''
    obj.value.email = ''
    obj.value.whatsapp = ''
    obj.value.senha = ''
    obj.value.tokenAdmin = ''
}
</script>

<template>
<main class="mx-5 mt-5">
    <form @submit="cadastrar">
        <div>
            <input type="text" placeholder="Nome" v-model="obj.name">
        </div>
        <div>
            <input type="text" placeholder="Sobrenome" v-model="obj.lastname">
        </div>
        <div>
            <input type="email" placeholder="E-mail" v-model="obj.email">
        </div>
        <div>
            <input type="tel" placeholder="WhatsApp" v-model="obj.whatsapp">
        </div>
        <div>
            <input type="password" placeholder="Senha" v-model="obj.senha">
        </div>
        <div>
            <input type="password" placeholder="Confirmar Senha" v-model="obj.senha">
        </div>
        <div>
            <input type="password" placeholder="Digite o Token, somente se Souber" v-model="obj.tokenAdmin">
        </div>
        <div>
            <input type="submit" value="Criar Conta" class="btn btn-primary">
        </div>
    </form>
</main>
</template>
