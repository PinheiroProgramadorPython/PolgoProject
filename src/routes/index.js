import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ComoParticipar from "../views/ComoParticipar.vue";
import FAQ from "../views/FAQ.vue";
import Ganhadores from "../views/Ganhadores.vue";
import Lojas from "../views/Lojas.vue";
import Premios from "../views/Premios.vue";
import CriarConta from "../views/CriarConta.vue";
import Login from "../views/Login.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/comoparticipar",
            name: "comoparticipar",
            component: ComoParticipar
        },
        {
            path: "/faq",
            name: "faq",
            component: FAQ
        },
        {
            path: "/ganhadores",
            name: "ganhadores",
            component: Ganhadores
        },
        {
            path: "/lojas",
            name: "lojas",
            component: Lojas
        },
        {
            path: "/premios",
            name: "premios",
            component: Premios
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/criarconta",
            name: "criarconta",
            component: CriarConta
        }
    ]
});

export default router;
