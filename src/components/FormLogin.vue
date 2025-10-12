<template>
<main class="mx-5 mt-5">
    <form @submit="cadastrar">  
        <div>
            <input type="email" placeholder="E-mail" >
        </div>
        <div>
            <input type="password" placeholder="Senha" >
        </div>
        <div>
            <input type="submit" value="Login" class="btn btn-primary">
        </div>
    </form>
</main>
</template>
