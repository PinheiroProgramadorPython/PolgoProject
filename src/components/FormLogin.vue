<script setup>
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router'
import apiBase from '../services/api';
import Swal from 'sweetalert2';
import { token, user } from "../services/auth.js";


const router = useRouter();

let id ;

let usuarios = ref(null);

let obj = ref({email: "", senha: ""});


onMounted(async () => {
    let reqDados = await fetch(`${apiBase}/usuarios`);
    let dados = await reqDados.json();
    usuarios.value = dados;
})

const logar = async function (event) {
    event.preventDefault();
    for (let usuario of usuarios.value){
        if (usuario.email === obj.value.email){
            id = usuario.id
        } 
    }

    let login = await fetch(`${apiBase}/usuarios/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj.value)
    });
    let dados = await login.json()
    console.log(dados.usuario)

    if (login.ok){
        localStorage.setItem("token", dados.token);
        localStorage.setItem("user", JSON.stringify(dados.usuario));
        token.value = dados.token;
        user.value = dados.usuario;
        Swal.fire("Sucesso!", "Login Realizado com sucesso!", "success");
        router.push("/");
    } else {
        alert(dados.message || "Erro ao Fazer Login");
    }  
}
</script>

<template>
<main class="mx-5 mt-5">
    <div class="container text-center">
        <h2>Faça login em nosso Sistema</h2>
    </div>
    <form @submit="logar">  
        <div class="container mb-3">
            <label class="form-label">E-mail</label>
            <input class="form-control" type="email" placeholder="E-mail" v-model="obj.email">
        </div>
        <div class="container mb-3">
            <label class="form-label">Senha</label>
            <input class="form-control" type="password" placeholder="Senha" v-model="obj.senha">
        </div>
        <div class="container mb-3 text-center">
            <input type="submit" value="Login" class="btn btn-primary">
        </div>
    </form>
</main>
</template>
