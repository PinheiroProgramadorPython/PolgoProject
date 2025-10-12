<script setup>
import { ref } from 'vue';
import apiBase from '../services/api';

const obj = ref({name: "", lastname: "", email: "", whatsapp: 0, senha: "", tokenAdmin: ""});

async function cadastrar (event) {
    event.preventDefault();
    let criarConta = await fetch(`${apiBase}/usuarios`);
    let dados = await criarConta.json();
}
</script>

<template>
<main>
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
            <input type="text" placeholder="Digite o Token, somente se Souber" v-model="obj.tokenAdmin">
        </div>
        <div>
            <input type="submit" value="Criar Conta" class="btn btn-primary">
        </div>
    </form>
</main>
</template>
